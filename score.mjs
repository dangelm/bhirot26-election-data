// חישוב ההתאמה של מצפן הבחירות, כמימוש ייחוס.
//
// למה זה כאן: הנתונים פתוחים, אבל עד עכשיו התוצאה לא הייתה. מי שרצה לבדוק אם האחוז
// שהאתר מציג נובע באמת מהנתונים היה צריך לקרוא JavaScript בתוך index.html ולהאמין
// שהעתיק אותו נכון. הקובץ הזה הוא אותו חישוב בדיוק, בלי תלויות, מול data/positions.json
// שבמאגר הזה — כך שאפשר לשחזר כל אחוז שהאתר מציג ולהתווכח על השיטה מול קוד ולא מול טענה.
//
// הרצה:  node score.mjs '[1,0,0.5,null,...]'      (20 תשובות: 1 כן, 0 לא, 0.5 חלקית, null דילוג)
//        node score.mjs --party likud             (עונים בדיוק כמו רשימה — אמור להחזיר אותה ב-100%)
import { readFileSync } from "node:fs";

export function loadData(path = new URL("./data/positions.json", import.meta.url)) {
    const raw = JSON.parse(readFileSync(path, "utf8"));
    const issues = [...new Set(raw.positions.map((p) => p.issue))];
    const parties = [...new Set(raw.positions.map((p) => p.party))];
    const matrix = {};
    for (const p of raw.positions) (matrix[p.party] ??= {})[p.issue] = p.stance;
    const names = Object.fromEntries(raw.positions.map((p) => [p.party, p.party_name]));
    return { issues, parties, matrix, names, version: raw.version };
}

/**
 * answers: מערך באורך מספר הסוגיות. 1 = כן, 0 = לא, 0.5 = חלקית, null = דילוג.
 *
 * שני חלקים. הראשון פשוט: הציון לשאלה הוא 1 − |התשובה − העמדה|, וההתאמה הגולמית היא
 * הממוצע על השאלות שנענו. השני הוא התיקון לסיכוי, והוא הסיבה שהמימוש הזה קיים —
 * מפלגה שאינה מכריעה לעולם אינה רחוקה יותר מחצי דרגה מאף תשובה, ולכן היא צוברת
 * נקודות בלי להסכים. לכן מחסירים מכל מפלגה את מה שהיא מקבלת ממילא מתשובה אקראית
 * *מתוך התשובות שהמשתמש נתן בפועל*, ומותחים את מה שנשאר חזרה ל-0..1.
 */
export function score(answers, data = loadData()) {
    const { issues, parties, matrix, names } = data;
    if (answers.length !== issues.length) {
        throw new Error(`expected ${issues.length} answers, got ${answers.length}`);
    }
    const given = answers.filter((a) => a !== null);
    if (!given.length) throw new Error("no answers given");
    const expected = (pos) => given.reduce((s, x) => s + (1 - Math.abs(x - pos)), 0) / given.length;

    const out = parties.map((id) => {
        let sum = 0, n = 0, firm = 0, chance = 0;
        issues.forEach((slug, i) => {
            const a = answers[i];
            if (a === null) return;
            const pos = matrix[id][slug];
            sum += 1 - Math.abs(a - pos);
            chance += expected(pos);
            if (a === pos) firm++;
            n++;
        });
        const observed = sum / n;
        const chanceLevel = chance / n;
        const adjusted = chanceLevel < 1 ? Math.max(0, (observed - chanceLevel) / (1 - chanceLevel)) : 0;
        return { party: id, name: names[id], raw: observed, chance: chanceLevel, match: adjusted, pct: Math.round(adjusted * 100), exact: firm, answered: n };
    });
    // שובר שוויון: קודם ההתאמה, ואז מספר ההתאמות המדויקות. האתר מוסיף שובר שוויון
    // שלישי יציב לפי סדר הרשימות; כאן מספיקים השניים, וזוגות שנשארים שווים מסומנים.
    out.sort((a, b) => b.match - a.match || b.exact - a.exact);
    return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const data = loadData();
    const arg = process.argv[2];
    let answers;
    if (arg === "--party") {
        const id = process.argv[3];
        if (!data.matrix[id]) throw new Error(`unknown party "${id}". known: ${data.parties.join(", ")}`);
        answers = data.issues.map((slug) => data.matrix[id][slug]);
        console.log(`answering exactly like ${data.names[id]} (${id}) — data version ${data.version}\n`);
    } else if (arg) {
        answers = JSON.parse(arg);
    } else {
        console.error("usage: node score.mjs '[1,0,0.5,null,...]'   |   node score.mjs --party <id>");
        process.exit(2);
    }
    for (const [i, r] of score(answers, data).entries()) {
        console.log(`${String(i + 1).padStart(2)}. ${String(r.pct).padStart(3)}%  ${r.name}   (raw ${(r.raw * 100).toFixed(1)}%, chance ${(r.chance * 100).toFixed(1)}%, exact ${r.exact}/${r.answered})`);
    }
}
