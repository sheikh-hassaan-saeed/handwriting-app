import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/dot-grid";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## The measurements

Dot grid paper replaces the lines of graph paper with a quiet pattern of small dots. On this generator the dots are about 5 mm apart, the same as the [graph paper](/notebook-paper/graph-paper) squares, with 42 dots across and 59 down on A4. The dots are pale grey and small, so they guide the pen without dominating the page. There is no margin line.

## Who it suits

Dot grids are popular for bullet journals, planners and sketchnotes, because you can write in straight lines, draw boxes and charts, or sketch freely, and the page does not look cluttered. They also help with lettering and calligraphy practice, where the dots give a consistent baseline and spacing without forcing a line. If you want to practise slanted script, the [calligraphy generator](/calligraphy) prints slant guides.

## A worked example

To set up a weekly spread in a journal, print a dot page and draw a box seven dots wide and ten dots tall for each day. Because the dots are evenly spaced, the boxes come out the same size without a ruler. For handwriting, write on every second row of dots: the row of dots becomes the baseline, and the gap between rows gives about 10 mm of height for letters and descenders.

## What you can adjust

The spacing slider starts at 19 px (about 5 mm) and can be set from 5 px to 100 px. A larger value gives roomier dots for bigger handwriting or drawing, and a smaller value gives finer detail. You can change the dot colour, pick A4, US Letter or Legal paper, choose portrait or landscape, add a header or footer, and download several pages as a single PDF or one page as a PNG.

## Printing tips

Print at 100% or "Actual size" so the dot spacing stays at 5 mm. Pale dots can disappear on a low-quality print, so if they are too faint, choose a darker dot colour. On thin paper, ink from a fountain pen may show through, so a heavier paper works better. For writing with ruled lines instead, see the options on the [notebook paper](/notebook-paper) page, and for printing settings see [how to print notebook paper at actual size](/blog/how-to-print-notebook-paper).
`;

export default function DotGridPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="dot-grid" />
    </PlatformLayout>
  );
}
