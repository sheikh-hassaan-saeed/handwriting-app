import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/primary-writing";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## How the sheet is built

Primary writing paper is not a set of evenly spaced lines. Each writing row is a set of three lines: a solid top line, a dashed line halfway down, and a solid bottom line. The bottom line is the baseline that letters sit on, the dashed line marks where small letters such as a, c and e should stop, and the top line is the height of tall letters like b, d and l. On this generator each set is about 12.6 mm tall, with a gap of about 9.5 mm between sets, so an A4 page fits 12 rows and a US Letter page fits 11. Lines are light grey, and a pink margin line sits about 21 mm from the left edge.

## Who it suits

It is designed for children who are learning how big each letter should be compared to the others. Seeing the dashed midline makes the difference between a tall letter and a short one concrete. It also suits anyone who wants to re-teach letter proportions, including adults rebuilding their handwriting. Most children use it in the early grades, before moving on to ordinary ruled paper. [Wide ruled paper](/notebook-paper/wide-ruled) is the usual next step.

## How to use it

Ask the child to start every letter on the bottom line. Tall letters reach the top line, small letters stop at the dashed line, and tails of g, j, p, q and y drop below the baseline into the gap. Then write a short sentence on each row, such as the child's name or a spelling word. A page of twelve rows is a lot for a young child, so many teachers use half a page and stop when the writing gets sloppy. For tracing practice before copying, pair it with the [tracing worksheet generator](/tools/tracing-worksheet-generator).

## What you can adjust

The slider that controls row height starts at 48 px, and you can change it from 5 px to 100 px. Taller rows make the letters bigger, which suits younger children. You can also move or remove the margin line, change line colours, add a name and date in the header, and download several pages in one PDF. Our guide on [handwriting line height by age](/blog/handwriting-line-height-guide-by-age) explains how to choose a size.

## Printing

Print at 100% or "Actual size". If a row prints much smaller than 12.6 mm, the printer has probably shrunk the page. The sheets look best on plain white paper with a pencil or a soft marker. When a child is comfortable on this paper, the taller [kindergarten version](/notebook-paper/kindergarten) is the step down and the [college ruled](/notebook-paper/college-ruled) page is the step up.
`;

export default function PrimaryWritingPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="primary" />
    </PlatformLayout>
  );
}
