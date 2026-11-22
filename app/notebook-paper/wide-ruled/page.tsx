import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import NotebookPaperGenerator from "@/components/NotebookPaperGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/notebook-paper/wide-ruled";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## The measurements

Wide ruled paper has lines about 8.7 mm apart, which is 11/32 of an inch. On this generator an A4 page fits 30 ruled lines and a US Letter page fits 28, because Letter is shorter. The red vertical margin line sits 1.25 inches (about 31.5 mm) from the left edge, and the lines are a pale blue so they do not compete with pencil or pen. There is room at the top for a header line and at the bottom for a footer or page number.

## Who it suits

The extra height between lines gives letters room. Children who are still learning how tall a capital should be compared with a lowercase letter write more clearly here, and so do adults who are deliberately slowing down to rebuild consistent handwriting. People with large handwriting also tend to prefer it, whatever their age. If your letters touch the line above, move to wide ruled. If they float well below it, college ruled may fit better.

## A worked setup

For a child's spelling homework, set the left header to "Name:" and the right header to "Date:", leave page numbers off, and download a few pages. That gives a stack of identical sheets with the margin line and header text already printed. For handwriting practice, switch the header to the word list, since seeing the words at the top of the page is useful while copying.

## Adjusting the defaults

The line spacing slider starts at 33 px and ranges from 5 px to 100 px. A setting of about 36 px gives a little more room than standard wide ruled, which helps a child whose letters are still large. The margin offset slider can move the red line, or remove it entirely by setting it to zero. You can also change the line and margin colours, which is helpful for a student who finds pale blue hard to see.

## Printing tips

Print at 100% or "Actual size". Spacing printed on a different scale is the most common reason ruled paper looks wrong. To check, measure five lines with a ruler: they should span about 43.5 mm on this template. If the numbers are off, see [how to print notebook paper at actual size](/blog/how-to-print-notebook-paper).

If you are deciding between this and the narrower option, the page on [college ruled paper](/notebook-paper/college-ruled) has the same layout with tighter lines, and [wide ruled vs college ruled](/blog/wide-ruled-vs-college-ruled) compares them directly. For very young writers, [primary writing paper](/notebook-paper/primary-writing) adds a dashed midline to show letter height.
`;

export default function WideRuledPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <NotebookPaperGenerator defaultPreset="wide-ruled" />
    </PlatformLayout>
  );
}
