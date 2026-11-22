import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${config.breadcrumbs[0]?.href || PATH}` },
};

const article = `## Choosing a paper template

The generator above starts on wide ruled and switches to any other template from the Paper Template menu. Each template has its own default spacing, and every default can be changed with the sliders. These are the defaults on A4 (US Letter is within a fraction of a millimetre):

| Template | Spacing | Rows or lines on A4 | Best for |
| :--- | :--- | :--- | :--- |
| [Wide ruled](/notebook-paper/wide-ruled) | 8.7 mm (11/32 in) | 30 lines | Younger writers and larger handwriting |
| [College ruled](/notebook-paper/college-ruled) | 7.1 mm (9/32 in) | 37 lines | Notes and compact handwriting |
| [Primary writing](/notebook-paper/primary-writing) | 12.6 mm sets with a dashed midline | 12 rows | Learning letter height |
| [Kindergarten](/notebook-paper/kindergarten) | 16.8 mm sets with a dashed midline | 9 rows | The first letters and names |
| [Graph](/notebook-paper/graph-paper) | 5 mm squares | 42 by 59 squares | Maths, diagrams and plans |
| [Dot grid](/notebook-paper/dot-grid) | 5 mm dots | 42 by 59 dots | Bullet journals and sketching |

The menu also holds three templates without their own pages: a Cornell layout (see the [Cornell notes generator](/cornell-notes)), music manuscript, and an engineering grid with a green tint.

## What you can change

- **Paper size and direction:** A4, US Letter or Legal, in portrait or landscape.
- **Line spacing:** a slider from 5 px to 100 px. At the generator's 96 pixels-per-inch scale that is roughly 1.3 mm to 26 mm.
- **Margin offset:** from 0 to 250 px, which moves the vertical margin line. Wide and college ruled start with a 1.25 inch margin.
- **Colours:** one for the lines and one for the margin.
- **Headers and footer:** text in the top left, top right and bottom, plus optional page numbers.
- **Number of pages:** download several numbered pages in one PDF, or save a single page as a PNG image.

## A practical example

Say a ten-year-old is moving from wide to college ruled and keeps running letters into each other. Open wide ruled, drag the spacing down from 33 px to about 30 px, and print a page. The in-between size is something you cannot buy in a shop. Once that feels comfortable, switch to the college ruled template. The article on [wide ruled vs college ruled](/blog/wide-ruled-vs-college-ruled) helps decide where to start.

## Printing at the right size

The preview is drawn at a fixed size and saved to a PDF the same size as the paper. If you print with "Fit to page" or "Shrink to fit", the lines can come out a little smaller than listed above, so choose "Actual size" or 100%. After printing, put a ruler on the page and measure five lines. If they cover about 43.5 mm on wide ruled or 35.5 mm on college ruled, the page printed correctly. Full browser-by-browser steps are in [how to print notebook paper at actual size](/blog/how-to-print-notebook-paper).
`;

export default function NotebookPaperPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator />
    </PlatformLayout>
  );
}
