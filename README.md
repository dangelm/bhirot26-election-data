# מצפן הבחירה 2026 — נתונים ומתודולוגיה

**המקור החי: [https://bhirot26.online](https://bhirot26.online)** · הבחירות לכנסת ה-26: 27.10.2026

מאגר זה מפרסם את הנתונים שמאחורי [מצפן הבחירה 2026](https://bhirot26.online) — מחשבון שמשווה את עמדות
המשתמש לעמדות הרשימות המתמודדות — ואת השיטה שלפיה הם נאספו. הוא קיים כדי שאפשר יהיה
לבדוק את הכלי בלי להאמין לו: כל עמדה מובילה למקור, וכל מקור מוביל לציטוט מילולי
ולקישור לעמוד שממנו נלקח.

> [!IMPORTANT]
> **מצב הרשימות.** ועדת הבחירות המרכזית אישרה ב-27.9.2026 את 38 הרשימות ואת אותיות הפתק. בקשות הפסילה הוכרעו: הוועדה פסלה את רע"ם, את הרשימה המשותפת ואת המועמדים עופר כסיף וסאמי אבו שחאדה, ובית המשפט העליון ביטל ב-2.10.2026 את פסילת שתי הרשימות ואת פסילת כסיף; אבו שחאדה הסיר את מועמדותו. כל 38 הרשימות מתמודדות, והן יפורסמו ברשומות עד 18.10.2026. מה שעדיין לא סופי: סדר הרשימה המאושרת, ברשימות שלא פרסמו את סדרן; פרופילים למועמדים ברשימות שהוגשו שעדיין מופיעים בשם בלבד; ניקוד במחשבון לרשימות שלא פרסמו עמדות ברוב הסוגיות.

## המספרים

| | |
|---|---|
| רשימות מוצגות | 50 (38 מתמודדות, 12 שפרשו או התאחדו) |
| רשימות מנוקדות במחשבון | 18 |
| סוגיות | 20 |
| תאים (רשימה × סוגיה) | 360 |
| תאים עם מקור מוצג | 322 (89%) |
| תאים שנבדקו ולא נמצאה בהם אמירה פומבית | 38 (11%) |
| תאים שטרם נחקרו | 0 |
| רשומות מקור מאומתות | 827 |
| גרסת הנתונים | 2026-10-02 |

## הקבצים

| קובץ | מה יש בו |
|---|---|
| `data/parties.json` | כל 50 הרשימות: שם, אות, יו"ר, שיוך, והאם היא מנוקדת במחשבון |
| `data/petitions.json` | 15 בקשות הפסילה לכנסת ה-26: נגד מי, מי הגיש, סטטוס, עילה כפי שנטענה ומקורות |
| `data/issues.json` | 20 השאלות כלשונן, עם הנוסח המלא וההסבר שמוצג למשתמש |
| `data/positions.json` | 360 התאים: העמדה, סוג הראיה, המקור החזק ביותר ותאריכו |
| `data/sources.json` | 827 רשומות המקור עם הציטוט המילולי, וכן התאים שנבדקו ונמצאו ריקים |
| `data/positions.csv` | אותם 360 תאים כטבלה שטוחה, לניתוח בגיליון או ב-pandas |
| `methodology.md` | היררכיית המקורות, קידוד העמדות, תיקון הסיכוי, ומה שהכלי אינו עושה |
| `CHANGELOG.md` | כל שינוי בנתונים לפי תאריך |

## לשחזר את התוצאה, לא רק את הנתונים

הנתונים פתוחים, ומ-10.9.2026 גם החישוב. `score.mjs` הוא מימוש ייחוס של אותו חישוב
שהאתר מריץ, בלי תלויות, מול `data/positions.json` שכאן:

- `node score.mjs --party likud` — עונים בדיוק כמו רשימה; היא אמורה לחזור ראשונה ב-100%
- `node score.mjs '[1,0,0.5,null,...]'` — תשובות משלכם, אחת לכל סוגיה
- `node --test` — הבדיקות, כולל ההתחייבות שלכל רשימה יש מסלול שמביא אותה למקום הראשון

מי שרוצה להתווכח על השיטה — על תיקון הסיכוי, על מה שקורה לתשובה חלקית או לדילוג —
יכול לעשות את זה מול קוד שרץ, ולא מול תיאור שלו.

## איך לצטט

הנתונים משתנים עד יום הבחירות, ולכן ציטוט בלי גרסה אינו ניתן לבדיקה:

> מצפן הבחירה 2026, גרסת נתונים 2026-10-02. https://bhirot26.online · https://github.com/dangelm/bhirot26-election-data

## מה המאגר הזה אינו

- **אינו סקר ואינו תחזית.** הוא אומר מה מפלגות אמרו, לא מה בוחרים יחשבו או כיצד יצביעו.
- **אינו ממצה את השדה הפוליטי.** 20 שאלות אינן כל מה שמפריד בין רשימות.
- **אינו שלם.** ב-38 תאים חיפשנו ולא מצאנו אמירה פומבית. הם מסומנים ככאלה ולא
  מוצגים כעמדה — ההבחנה בין "המפלגה מסויגת" ל"המפלגה שתקה" נשמרת בכל הקבצים.
- **אינו קפוא.** רשימות מתמזגות ופורשות עד סגירתן; ראו `CHANGELOG.md`.

## רישיון

הנתונים מתפרסמים תחת [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — מותר להשתמש, לשנות ולפרסם, כולל
מסחרית, בתנאי מתן קרדיט ל[מצפן הבחירה 2026](https://bhirot26.online) וקישור לרישיון.

הרישיון חל על העבודה שלנו: האיסוף, הקידוד והמבנה. **הציטוטים אינם שלנו** — הם קטעים
קצרים ממקורות של אחרים, מובאים לצורך ייחוס ואימות, והזכויות בהם נשארות של מי שכתב
אותם. לכל ציטוט מצורף קישור למקור, וכך יש לצטט אותו הלאה.

---

## English

Open data behind **[מצפן הבחירה 2026](https://bhirot26.online)**, a voting-advice application for
Israel's 26th Knesset election (2026-10-27).

**Status (2026-10-02):** all 38 lists filed on 7–8 September 2026 were approved by the Central
Elections Committee on 27.9.2026, with their ballot letters. The committee disqualified Ra'am, the
Joint List and the candidates Ofer Cassif and Sami Abu Shehadeh; on 2.10.2026 the Supreme Court
overturned the disqualification of both lists (unanimously) and of Cassif (7–2), and Abu Shehadeh withdrew
his candidacy before a ruling was given. Two High Court petitions against the committee's refusal to
disqualify Otzma Yehudit were dismissed. All 38 lists are running, and the approved lists are to be
gazetted by 18.10.2026. `roster` is the list order as filed, up to the place published, without
candidates who withdrew after filing (they are in `former_candidates` with `removed_after_filing`);
`filed_name` is the list name as filed, and `data/petitions.json` records each petition's committee
decision and, in `court`, what the court did with it.

18 parties × 20 issues = 360 coded positions. 322 carry a
published primary source with a verbatim quote, a date and a link; 38 are cells where we
searched the party's platform, the news, and — for leaders who sat in the Knesset — the voting
and bill record, and found no public statement. Those are marked as documented silence rather
than treated as a hedged position. 0 cells remain unresearched.

Files are generated from the same modules that run the site, so the repository cannot contradict
it. See `methodology.md` for the source hierarchy and the scoring rules, and `CHANGELOG.md`
for what changed when. Licensed CC BY 4.0; quoted passages remain the property of their authors.
