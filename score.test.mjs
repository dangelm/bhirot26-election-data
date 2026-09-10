// בדיקות למימוש הייחוס. הרצה: node --test
//
// הבדיקה המעניינת היא האחרונה: היא מוודאת שהמימוש הזה משחזר את ההתחייבות שהאתר
// בודק אצלו — לכל רשימה יש מסלול תשובות שמביא אותה למקום הראשון ב-100%. אם המימוש
// כאן היה סוטה מהאתר, הבדיקה הזו הייתה נופלת.
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadData, score } from "./score.mjs";

const data = loadData();

test("the dataset loads with parties and issues", () => {
    assert.ok(data.parties.length > 0, "no parties");
    assert.ok(data.issues.length > 0, "no issues");
    for (const p of data.parties) {
        assert.equal(Object.keys(data.matrix[p]).length, data.issues.length, `${p} has a hole in its row`);
    }
});

test("stances are only 0, 0.5 or 1", () => {
    for (const p of data.parties) for (const s of data.issues) {
        assert.ok([0, 0.5, 1].includes(data.matrix[p][s]), `${p}/${s} = ${data.matrix[p][s]}`);
    }
});

test("wrong number of answers is refused rather than guessed", () => {
    assert.throws(() => score([1, 0, 1], data), /expected \d+ answers/);
});

test("answering nothing is refused", () => {
    assert.throws(() => score(data.issues.map(() => null), data), /no answers/);
});

test("a skipped question counts for nobody", () => {
    const a = data.issues.map(() => 1);
    const b = a.slice(); b[0] = null;
    assert.equal(score(a, data)[0].answered, data.issues.length);
    assert.equal(score(b, data)[0].answered, data.issues.length - 1);
});

test("the chance correction leaves a perfect match at 100%", () => {
    for (const id of data.parties) {
        const answers = data.issues.map((s) => data.matrix[id][s]);
        const own = score(answers, data).find((r) => r.party === id);
        assert.equal(own.pct, 100, `${id} does not reach 100% on its own row`);
    }
});

test("every list leads its own answer path — the site's fairness guarantee", () => {
    for (const id of data.parties) {
        const answers = data.issues.map((s) => data.matrix[id][s]);
        const top = score(answers, data)[0];
        assert.equal(top.party, id, `answering exactly like ${id} returns ${top.party} first`);
    }
});

test("hedging does not beat agreeing for a decisive voter", () => {
    // מצביע שעונה רק כן/לא, בדיוק לפי רשימה מכריעה. מפלגה שכל עמדותיה חלקיות
    // מגיעה אצלו לציון גולמי גבוה — וזה בדיוק מה שהתיקון לסיכוי אמור לנטרל.
    const decisive = data.parties.find((p) => data.issues.every((s) => data.matrix[p][s] !== 0.5));
    if (!decisive) return; // no fully decisive list in this version of the data
    const answers = data.issues.map((s) => data.matrix[decisive][s]);
    const ranked = score(answers, data);
    const hedgiest = [...data.parties].sort(
        (a, b) => data.issues.filter((s) => data.matrix[b][s] === 0.5).length - data.issues.filter((s) => data.matrix[a][s] === 0.5).length,
    )[0];
    const rankOf = (id) => ranked.findIndex((r) => r.party === id);
    assert.ok(rankOf(decisive) < rankOf(hedgiest), "the hedging list outranked the one the voter actually agrees with");
});
