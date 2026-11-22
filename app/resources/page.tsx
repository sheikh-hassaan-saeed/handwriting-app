import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/resources";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `
## For teachers

A classroom rarely needs one generic worksheet. It needs this week's spelling list, a sheet with a particular child's name on it, or paper that matches the ruling your school uses. These tools are built for that kind of quick, specific print job.

- **Weekly spelling and sight words:** the [Handwriting Worksheet Creator](/tools/handwriting-worksheet-creator) takes any word list and repeats it across the page. Switch between print and cursive and between dotted tracing and solid letters.
- **Grade-level sheets:** the [kindergarten](/tools/handwriting-worksheets-kindergarten), [1st grade](/tools/handwriting-worksheets-grade-1) and [2nd grade](/tools/handwriting-worksheets-grade-2) pages open with line heights of 80px, 70px and 60px, so the guides get smaller as writers get older. Treat these as starting points and adjust the slider to match your school's paper.
- **Names for every child:** the [Name Tracing Generator](/tools/name-tracing-generator) builds a personalised tracing sheet from any name. Type each name, download, and print a batch before the week begins.
- **Letters and sentences:** use the [Alphabet Tracing Generator](/tools/alphabet-tracing-generator) for A to Z, and the [Sentence Tracing Generator](/tools/sentence-tracing-generator) once children can handle whole lines.
- **Paper that matches the lesson:** [Primary writing paper](/notebook-paper/primary-writing) has the solid top line, dashed midline and solid baseline that many early-grade classrooms use. [Kindergarten paper](/notebook-paper/kindergarten) is the same idea with taller rows.

Not sure how tall the lines should be? Our guide to [handwriting line height by age](/blog/handwriting-line-height-guide-by-age) explains how to choose.

## For students

Students mostly need clean paper and a way to organise notes, not worksheets.

- **Lecture and reading notes:** the [Cornell notes generator](/cornell-notes) splits the page into a cue column, a notes area and a summary box. The guide to [what Cornell notes are](/blog/what-are-cornell-notes) includes a worked example page.
- **Ruled paper in the spacing you actually use:** [college ruled](/notebook-paper/college-ruled) is about 7.1 mm between lines, and [wide ruled](/notebook-paper/wide-ruled) is about 8.7 mm. If you are unsure which suits your handwriting, read [wide ruled vs college ruled](/blog/wide-ruled-vs-college-ruled).
- **Maths and diagrams:** [graph paper](/notebook-paper/graph-paper) uses 5 mm squares, and [dot grid](/notebook-paper/dot-grid) gives the same spacing without full lines for sketching and bullet journals.
- **Planning and revision:** the [study planner](/printables/study-planner) has space for topics, key terms, a revision checklist and sixteen 25-minute focus circles. The [assignment tracker](/printables/assignment) and [weekly planner](/printables/weekly-planner) cover deadlines. All of them are collected on the [printables page](/printables).
- **Printing correctly:** if your lines come out too small, read [how to print notebook paper at actual size](/blog/how-to-print-notebook-paper).

## For adults improving or relearning handwriting

Adults usually do not need cartoon letters. They need plain ruled guides, their own words to copy, and a routine they can keep up.

- **Daily drills:** the [handwriting practice sheets](/tools/handwriting-practice-sheets) generator lets you type a sentence you really write, choose print, cursive or dotted trace, and print a page of repetitions.
- **Cursive:** start with the [cursive alphabet sheets](/tools/cursive-alphabet-practice-sheets), then move to the [cursive practice sheets](/tools/cursive-practice-sheets) for words and sentences. The guide to [cursive strokes for beginners](/blog/cursive-strokes-for-beginners) covers the five shapes behind most letters.
- **A plan to follow:** [how to improve handwriting as an adult](/blog/how-to-improve-handwriting-as-an-adult) lays out the routine, and [best handwriting practice sheets for adults](/blog/best-handwriting-practice-sheets-for-adults) helps you choose a sheet style.
- **Decorative lettering:** the [calligraphy generator](/calligraphy) prints slant-guide sheets for five script styles, and the [signature generator](/signature-generator) lets you try typed signatures in eight styles. Both use the fonts shown on the [fonts page](/fonts).

## Where to start

If you only try one tool, make it the one closest to the writer you are helping: a name tracing sheet for a preschooler, the spelling worksheet creator for a classroom, and the practice sheet generator for yourself. Print a single page first, check it at 100% scale, and adjust the line spacing before printing a stack.
`;

export default function ResourcesPage() {
  return <PlatformLayout path={PATH} config={config} contentMarkdown={article} />;
}
