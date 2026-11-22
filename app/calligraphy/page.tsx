import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import CalligraphyGenerator from "@/components/CalligraphyGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/calligraphy";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## What the sheet gives you

The generator prints a page of practice rows. Each row has horizontal guidelines for the ascender line, the waistline (the top of lowercase letters), the baseline and the descender line, plus faint diagonal slant lines. Your chosen text is printed in light grey so you can trace over it with a pen, and then copy it on blank rows. The sheet is A4.

## The five style presets

| Preset | Slant | Ascender : x-height : descender | Font model |
| :--- | :--- | :--- | :--- |
| Copperplate | 55° | 2 : 1 : 2 | Great Vibes |
| Spencerian | 52° | 3 : 1 : 3 | Monsieur La Doulaise |
| Chancery Italic | 78° | 1 : 1 : 1 | Playball |
| Modern | 60° | 1.5 : 1 : 1.5 | Dancing Script |
| Brush lettering | 90° (upright) | 1 : 1 : 1 | Homemade Apple |

Choosing a preset sets all of these values, and then you can adjust them by hand. The slant slider runs from 45° to 90°. The x-height slider runs from 14 px to 45 px. The ratio menu offers 2:1:2, 3:1:3, 1.5:1:1.5 and 1:1:1. The text opacity slider controls how faint the traced text is, and slant lines can be switched off.

## Understanding the proportions

The x-height is the height of letters such as a, o and x. Ascenders (b, d, h, l) and descenders (g, j, p, y) are measured as multiples of it. In the Copperplate setting, an ascender is twice the x-height, so tall letters extend well above the body of the word. Spencerian goes to three times, which gives its tall, narrow look. These ratios are a teaching aid, not a strict rule, since traditional hands vary. The font models on the page are digital fonts, so use them to see the shape and proportion, not as a perfect model for pen strokes.

## A worked practice session

Start with the "Basic Warm-Up Strokes" drill, which prints rows of slanted strokes, ovals and the u and n shapes. Trace over it for ten minutes, keeping the strokes parallel to the slant lines. Next, switch to the "Focus word minimum" drill. The word is made of repeated downstrokes and joins, which make it a classic test of consistency. When the strokes look even, move to the lowercase alphabet, then the pangram. The other drills include the uppercase alphabet and a custom text box.

## Printing tips

Print at 100% or "Actual size", since slant lines and x-height depend on the printed size. Use smooth paper that will not catch a pen nib, and choose a thicker grade if you use ink. The [fonts page](/fonts) shows each script font with a sample. If you want a signature rather than a practice sheet, use the [signature generator](/signature-generator). For plain handwriting practice, start with the [practice sheets hub](/handwriting-practice).
`;

export default function CalligraphyPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <CalligraphyGenerator />
    </PlatformLayout>
  );
}
