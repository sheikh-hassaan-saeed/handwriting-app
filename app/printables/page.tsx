import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import PrintablesLibrary from "@/components/PrintablesLibrary";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/printables";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `
## What is on each planner

**[Daily planner](/printables/daily-planner).** An hourly schedule from 6 AM to 9 PM down the left side, with three priority lines, a ten-row to-do list, eight water-glass circles and five lines for notes on the right. It suits someone whose day is built around appointments or classes. Print tip: the hour rows are narrow, so fine pens work better than markers.

**[Weekly planner](/printables/weekly-planner).** Seven boxes, Monday to Sunday, each with four writing lines, plus a goals box with four more lines at the end. It suits students and parents who want the whole week visible in one place. Print tip: print a small stack at once and fill in the "Week of" date as you start each sheet.

**[Monthly planner](/printables/monthly-planner).** A blank seven-column, five-row grid with an empty box for every date and four lines underneath for the month's focus. The dates are not pre-filled, so one sheet works for any month. Print tip: write the first of the month in the correct weekday box before you photocopy, if you want several copies of the same month.

**[To-do list](/printables/todo-list).** Two columns of 22 checkboxes each: tasks on the left, personal items and habits on the right. It suits long errand lists or a project with many small steps. Print tip: print on lightly coloured paper if you keep it on a fridge or desk.

**[Reading log](/printables/reading-log).** Seventeen rows with columns for title, author, start date, finish date, a five-star rating you can colour in, and a done box. It suits children with a school reading target and adults tracking a book list. Print tip: print one per term and staple them, so the log stays in order.

**[Assignment tracker](/printables/assignment).** Eighteen rows with columns for subject, task details, due date, priority, a done box and the grade received. It suits secondary school and university students juggling several courses. Print tip: keep it at the front of a binder and fill the due-date column first.

**[Study planner](/printables/study-planner).** Eight lines for core topics, ten for key terms or formulas, a ten-line revision checklist, nine lines for a summary, and sixteen circles to colour in, one per 25-minute focus session. It suits exam preparation. Print tip: print a fresh copy for each subject rather than sharing one sheet across several.

**[Habit tracker](/printables/habit-tracker).** Fifteen habit rows against a box for each day from 1 to 31, so one page covers a month. It suits people building one or two routines at a time. Print tip: write the habits in pencil, so you can swap them next month.

**[Journal page](/printables/journal-page).** A single sheet with 28 evenly spaced ruled lines, a title and a date line. It suits daily writing or handwriting practice on plain paper. Print tip: if you want smaller handwriting, use the [college ruled notebook paper](/notebook-paper/college-ruled) generator instead, where the line spacing can be changed.

## Paper templates in the library

The library also links to ready-made paper: [Cornell notes](/cornell-notes), [graph paper](/notebook-paper/graph-paper), [dot grid](/notebook-paper/dot-grid), [kindergarten writing paper](/notebook-paper/kindergarten) and [primary guidelines paper](/notebook-paper/primary-writing). For help choosing a ruling, see [wide ruled vs college ruled](/blog/wide-ruled-vs-college-ruled).

## Printing the planners

Every planner downloads as an A4 PDF. Print at 100% ("Actual size") rather than "Fit to page" so checkboxes and lines keep their size, and check the first page before printing a batch. On US Letter paper, a small margin difference is normal. The step-by-step settings for each browser are in [how to print notebook paper at actual size](/blog/how-to-print-notebook-paper).
`;

export default function PrintablesPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <PrintablesLibrary />
    </PlatformLayout>
  );
}
