import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import CornellNotesGenerator from "@/components/CornellNotesGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/cornell-notes";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## How the page is divided

The sheet has four zones. A header band about 29 mm tall holds a title, a subject line and a date. Below it, the page splits into a narrow cue column on the left and a wide notes area on the right. A summary box runs across the bottom. With the default settings on A4, the cue column is about 57 mm wide (30% of the writing width), the summary box is about 54 mm tall (20% of the space below the header), and there is a 10.5 mm margin on each side.

## What you can change

- **Cue column width:** from 20% to 45% of the page. A wider column suits students who write full questions, while a narrower column leaves more room for notes.
- **Summary box height:** from 15% to 35%. Choose a taller box if you like to write a paragraph summary.
- **Line spacing:** from 18 px to 50 px, starting at 28 px (about 7.4 mm). Lower numbers give more lines; higher numbers suit larger handwriting.
- **Layout:** standard lined, dotted grid, graph grid, lined with cursive-style labels, or blank.
- **Header text:** change the title, subject and date text, or leave the placeholders to fill in by hand.
- **Paper:** A4 or US Letter, saved as a PDF.

## Which layout to choose

Lined is the default and suits almost everything. Dotted and graph layouts suit subjects with diagrams and equations, such as maths, physics and chemistry, because you can draw and write on the same page. Blank is for people who like to draw their own boxes and arrows. The cursive-labels layout prints the section names ("Cues / Questions", "Notes", "Summary") in a script font and suits younger students who are also practising cursive. See the [fonts page](/fonts) for what that font looks like.

## A worked example

For a 45-minute lesson, print one sheet per lesson, write the topic in the subject line, and take notes in the right-hand area during the lesson. Afterwards, write questions in the cue column that your notes would answer, and a two or three sentence summary at the bottom. To revise, cover the notes with a sheet of paper and try to answer each cue question from memory. The guide [what Cornell notes are, with a worked example](/blog/what-are-cornell-notes) shows a completed page and a review routine.

## Printing

Print at 100% or "Actual size", and check that the summary box is not clipped at the bottom edge. The same page works for meeting notes, and the [study planner](/printables/study-planner) is a good companion for revision.
`;

export default function CornellNotesPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <CornellNotesGenerator />
    </PlatformLayout>
  );
}
