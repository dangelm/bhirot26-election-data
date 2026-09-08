# מצפן הבחירות 2026 — נתונים ומתודולוגיה

**המקור החי: [https://bhirot26.online](https://bhirot26.online)** · הבחירות לכנסת ה-26: 27.10.2026

מאגר זה מפרסם את הנתונים שמאחורי [מצפן הבחירות 2026](https://bhirot26.online) — מחשבון שמשווה את עמדות
המשתמש לעמדות הרשימות המתמודדות — ואת השיטה שלפיה הם נאספו. הוא קיים כדי שאפשר יהיה
לבדוק את הכלי בלי להאמין לו: כל עמדה מובילה למקור, וכל מקור מוביל לציטוט מילולי
ולקישור לעמוד שממנו נלקח.

## המספרים

| | |
|---|---|
| רשימות שהוגשו ומוצגות | 36 |
| רשימות מנוקדות במחשבון | 21 |
| סוגיות | 20 |
| תאים (רשימה × סוגיה) | 420 |
| תאים עם מקור מוצג | 365 (87%) |
| תאים שנבדקו ולא נמצאה בהם אמירה פומבית | 55 (13%) |
| תאים שטרם נחקרו | 0 |
| רשומות מקור מאומתות | 808 |
| גרסת הנתונים | 2026-09-07 |

## הקבצים

| קובץ | מה יש בו |
|---|---|
| `data/parties.json` | כל 36 הרשימות: שם, אות, יו"ר, שיוך, והאם היא מנוקדת במחשבון |
| `data/issues.json` | 20 השאלות כלשונן, עם הנוסח המלא וההסבר שמוצג למשתמש |
| `data/positions.json` | 420 התאים: העמדה, סוג הראיה, המקור החזק ביותר ותאריכו |
| `data/sources.json` | 808 רשומות המקור עם הציטוט המילולי, וכן התאים שנבדקו ונמצאו ריקים |
| `data/positions.csv` | אותם 420 תאים כטבלה שטוחה, לניתוח בגיליון או ב-pandas |
| `methodology.md` | היררכיית המקורות, קידוד העמדות, תיקון הסיכוי, ומה שהכלי אינו עושה |
| `CHANGELOG.md` | כל שינוי בנתונים לפי תאריך |

## איך לצטט

הנתונים משתנים עד סגירת הרשימות, ולכן ציטוט בלי גרסה אינו ניתן לבדיקה:

> מצפן הבחירות 2026, גרסת נתונים 2026-09-07. https://bhirot26.online · https://github.com/dangelm/bhirot26-election-data

## מה המאגר הזה אינו

- **אינו סקר ואינו תחזית.** הוא אומר מה מפלגות אמרו, לא מה בוחרים יחשבו או כיצד יצביעו.
- **אינו ממצה את השדה הפוליטי.** 20 שאלות אינן כל מה שמפריד בין רשימות.
- **אינו שלם.** ב-55 תאים חיפשנו ולא מצאנו אמירה פומבית. הם מסומנים ככאלה ולא
  מוצגים כעמדה — ההבחנה בין "המפלגה מסויגת" ל"המפלגה שתקה" נשמרת בכל הקבצים.
- **אינו קפוא.** רשימות מתמזגות ופורשות עד סגירתן; ראו `CHANGELOG.md`.

## רישיון

הנתונים מתפרסמים תחת [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — מותר להשתמש, לשנות ולפרסם, כולל
מסחרית, בתנאי מתן קרדיט ל[מצפן הבחירות 2026](https://bhirot26.online) וקישור לרישיון.

הרישיון חל על העבודה שלנו: האיסוף, הקידוד והמבנה. **הציטוטים אינם שלנו** — הם קטעים
קצרים ממקורות של אחרים, מובאים לצורך ייחוס ואימות, והזכויות בהם נשארות של מי שכתב
אותם. לכל ציטוט מצורף קישור למקור, וכך יש לצטט אותו הלאה.

---

## English

Open data behind **[מצפן הבחירות 2026](https://bhirot26.online)**, a voting-advice application for
Israel's 26th Knesset election (2026-10-27).

21 parties × 20 issues = 420 coded positions. 365 carry a
published primary source with a verbatim quote, a date and a link; 55 are cells where we
searched the party's platform, the news, and — for leaders who sat in the Knesset — the voting
and bill record, and found no public statement. Those are marked as documented silence rather
than treated as a hedged position. 0 cells remain unresearched.

Files are generated from the same modules that run the site, so the repository cannot contradict
it. See `methodology.md` for the source hierarchy and the scoring rules, and `CHANGELOG.md`
for what changed when. Licensed CC BY 4.0; quoted passages remain the property of their authors.
