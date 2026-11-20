import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import LetterTracingGenerator from "@/components/LetterTracingGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/letter-tracing";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

const article = `
## What letter tracing teaches

Tracing dashed or dotted letterforms builds the fine motor control a child needs before they can write freehand. Following a fixed outline trains the hand to move in the correct stroke order, which is why tracing usually comes before copying, and copying comes before independent writing.

## Uppercase, lowercase and the full alphabet

Some letters, like b, d, p and q, are often reversed by early writers because their shapes mirror each other, so it helps to practise uppercase and lowercase forms side by side rather than in isolation. Use the [Alphabet Tracing Generator](/tools/alphabet-tracing-generator) to drill the full A–Z set, or the tool above to focus on the few letters a child is struggling with.

## From letters to names and sentences

Once individual letters are steady, a child's own name is usually the most motivating next word to trace. The [Name Tracing Generator](/tools/name-tracing-generator) takes any name and repeats it down the page. For older children ready for whole phrases, the [Sentence Tracing Generator](/tools/sentence-tracing-generator) applies the same dotted guides to sentences and copywork.

## Pairing tracing with the right paper

Young writers need more vertical room than older students. The [kindergarten writing paper](/notebook-paper/kindergarten) preset has tall three-line rows to match, and once a child moves from tracing to writing on their own, the [handwriting practice sheets](/handwriting-practice) pick up where tracing leaves off. For a step-by-step plan, read [how letter tracing fits into learning to write](/blog/how-letter-tracing-helps).
`;

export default function LetterTracingPage() {
  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <LetterTracingGenerator />
    </PlatformLayout>
  );
}
