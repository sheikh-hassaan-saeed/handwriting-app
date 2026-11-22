import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/graph-paper";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## The measurements

This graph paper is a plain square grid. The default square is about 5 mm, which is standard for school maths books. On an A4 page that gives 42 columns and 59 rows of squares, and on US Letter 42 columns and 55 rows. There is no margin line, and the lines are a light blue-grey so that pencil marks stand out. The squares fill the whole page.

## Who it suits

Graph paper is for work where position matters: plotting graphs, drawing geometry, sketching floor plans, scaling a drawing, or laying out lettering and pixel art. Students use it for coordinate geometry and science results, and designers use it for quick layouts. For free-form sketching where full lines get in the way, [dot grid paper](/notebook-paper/dot-grid) has the same 5 mm spacing with dots instead of lines.

## A worked setup

To plot a graph, print one page and mark the axes in pen along two heavy grid lines. With 5 mm squares, you can let each square stand for 1, 2, 5 or 10 units and the plot stays easy to read. For a floor plan, let each 5 mm square equal 10 cm, so a 3 m by 4 m room is 30 by 40 squares and fits easily on an A4 page.

## What you can adjust

The grid size slider starts at 19 px (about 5 mm) and runs from 5 px to 100 px, which is roughly 1.3 mm to 26 mm. Smaller squares suit detailed technical work, and larger ones suit younger children learning to plot points. You can change the line colour, choose A4, Letter or Legal paper in portrait or landscape, add header and footer text, and download several pages. The menu also has an engineering grid template with a green tint, which is a variation for technical drawing.

## Printing and checking

Print at 100% or "Actual size" so the squares stay square and keep their size. To check, measure ten squares with a ruler: they should cover about 50 mm. If you need a grid that is accurate for drawing to scale, always check this before starting. For lined writing paper, use [college ruled](/notebook-paper/college-ruled) or [wide ruled](/notebook-paper/wide-ruled) instead, and see [how to print notebook paper at actual size](/blog/how-to-print-notebook-paper) for the print settings.
`;

export default function GraphPaperPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="graph" />
    </PlatformLayout>
  );
}
