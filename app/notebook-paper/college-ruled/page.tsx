import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/college-ruled";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## The measurements

College ruled paper has lines about 7.1 mm apart, or 9/32 of an inch. That is roughly a fifth narrower than wide ruled, so an A4 page here holds 37 lines against 30, and a US Letter page holds 34 against 28. The red margin line is 1.25 inches (about 31.5 mm) from the left edge, the same as wide ruled, so the two papers differ only in line spacing. Lines are pale blue.

## Who it suits

The tighter spacing fits more writing on a page, which is why it is the usual choice for lecture notes, journals and long drafts. It suits writers whose handwriting is already small and steady. A lowercase letter has about 7 mm to work with, so people with large, loopy handwriting may find it cramped. If your descenders (the tails of g, y and p) hit the line below, try wide ruled instead or widen the spacing a little with the slider.

## A worked setup

For a lecture, set the left header to the course name and the right header to the date, turn page numbers on, and download several pages. Because the headers are printed in the generator, you do not need to write them by hand each time. If you take a lot of notes, the [Cornell notes generator](/cornell-notes) offers a page with a cue column and a summary box, and the guide to [what Cornell notes are](/blog/what-are-cornell-notes) shows how to use it.

## Adjusting the defaults

The line spacing slider starts at 27 px, and you can set it anywhere from 5 px to 100 px. Raising it to about 30 px gives a spacing between college and wide ruled, which suits someone who finds 7.1 mm too tight. The margin offset moves the red line, and setting it to zero removes it. Line and margin colours can be changed too, and a darker grey line is easier to see in dim light or on a low-contrast scan.

## Printing tips

Choose "Actual size" or 100% when printing. Then lay a ruler against five lines: they should cover about 35.5 mm. If they cover much less, your printer shrank the page, and you can follow the steps in [how to print notebook paper at actual size](/blog/how-to-print-notebook-paper). The paper also prints well in landscape, which suits spreadsheets-style notes or a wide timeline.

To compare the two common rulings side by side, read [wide ruled vs college ruled](/blog/wide-ruled-vs-college-ruled), or use [wide ruled paper](/notebook-paper/wide-ruled) if you want more space between lines.
`;

export default function CollegeRuledPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="college-ruled" />
    </PlatformLayout>
  );
}
