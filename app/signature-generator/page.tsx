import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import SignatureGenerator from "@/components/SignatureGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/signature-generator";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `## What the tool does

Type a name and the generator draws it in one of eight script fonts, with an optional decorative underline, then lets you download it as a PNG image, an SVG file or a one-page PDF. It runs in your browser, so the name you type is not sent anywhere.

## The eight styles

| Style | Font | Look |
| :--- | :--- | :--- |
| Elegant Cursive | Great Vibes | Flowing loops |
| Business Executive | Playball | Formal and upright |
| Modern Minimalist | Sacramento | Fine, even strokes |
| Prestige Luxury | Pinyon Script | Slanted, high contrast |
| Fountain Pen | Allura | Light and flowing |
| Standard Ballpoint | Alex Brush | Everyday connected script |
| Bold Marker | Caveat | Quick felt-tip print script |
| Artist Brush | Reenie Beanie | Loose freehand |

The [fonts page](/fonts) shows each one with a live sample.

## Controls

- **Ink colour:** pick from the preset ink colours.
- **Size:** a slider from 40 to 120 px.
- **Underline:** none, a single swoop, a double swirl or a cross-strike, with a line weight slider from 1 to 6.
- **Background:** transparent by default, or white.

## Which download to use

Use the **PNG** for almost everything, because a transparent PNG sits cleanly over a signature line in a PDF or a word-processing document. The **SVG** is a scalable file, but it refers to the font by name and loads it from the web, so on a computer that is offline it may show in a substitute font. The **PDF** is a small page with the signature on it, useful for printing.

## A worked example

To sign a PDF, type your name, choose Business Executive, set the ink to dark blue or black, leave the background transparent and download the PNG. Open the PDF in your reader, use the insert-image or sign tool, place the PNG over the signature line, and resize it to fit. If you want something that looks a little more personal, try the Fountain Pen style at a larger size.

## An honest note on legal use

A typed or image signature is not always accepted. Many places treat an electronic signature as valid for everyday agreements, but the rules differ by country and by document, and some documents need a wet-ink signature, a witnessed signature or a dedicated e-signature service. Check what the other party requires before using a generated signature on anything important. This is not legal advice. The [disclaimer](/disclaimer) has more detail. If you would like to learn a signature by hand, the [calligraphy generator](/calligraphy) prints guide sheets.
`;

export default function SignaturePage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <SignatureGenerator />
    </PlatformLayout>
  );
}
