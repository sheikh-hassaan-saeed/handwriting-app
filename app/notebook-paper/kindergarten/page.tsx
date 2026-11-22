import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/kindergarten";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## How the sheet is built

Kindergarten paper uses the same three-line set as primary paper, but much taller. Each set has a solid top line, a dashed midline and a solid baseline, and is about 16.8 mm tall with a gap of about 12.6 mm between sets. That fits nine rows on A4 and eight on US Letter. The lines are a darker grey than on other templates, and the margin line is a stronger red, about 21 mm from the left edge, so a young child can see where to start.

## Who it suits

Young children whose pencil control is still developing write large. They need rows tall enough to make a whole letter without squeezing it. This paper suits children learning to write their name and the first letters of the alphabet, usually between about four and six years old, though that depends on the child. It also works for anyone who needs oversized guides, for example a child with fine motor difficulties.

## A worked example

To make a name-writing sheet, open this page, write the child's name in the header area as a model, and print one page. Have the child copy the name on every row, starting at the margin line. For an easier version, use the [name tracing generator](/tools/name-tracing-generator) first so the child traces over dotted letters, then move to blank rows here. The guide on [teaching a child to write their name](/blog/how-to-teach-a-child-to-write-their-name) lays out the steps in detail.

## What you can adjust

The row height slider starts at 64 px and ranges from 5 px to 100 px. If rows are too tall for your child, lower it towards 48 px, which is the [primary writing](/notebook-paper/primary-writing) size. You can also turn the margin off, change colours, add a header such as "Name:" and "Date:", and download several pages. Our article on [handwriting line height by age](/blog/handwriting-line-height-guide-by-age) discusses how line size relates to a child's stage.

## Printing tips

Print at 100% or "Actual size". Thicker pencils and chunky crayons suit these tall rows, and a laminated copy used with a dry-erase pen can be reused again and again. Because each page holds only eight or nine rows, you may need a few sheets for a practice session, and the PDF download can include several pages. For letter-by-letter dotted practice instead of blank rows, try the [alphabet tracing generator](/tools/alphabet-tracing-generator).
`;

export default function KindergartenPaperPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="kindergarten" />
    </PlatformLayout>
  );
}
