import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/handwriting-practice";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: PATH },
};

const article = `
## Which tool fits you

| If you are... | Use this | Why |
| :--- | :--- | :--- |
| An adult tidying print or relearning cursive | [Handwriting practice sheets](/tools/handwriting-practice-sheets) | Type a sentence you really write and print rows of it in print, cursive or dotted trace, with 5 to 20 lines per page |
| A teacher planning a spelling or sight-word week | [Handwriting worksheet creator](/tools/handwriting-worksheet-creator) | Repeats a word list in single-word, two-word or sentence layouts |
| Helping a preschooler or kindergartener | [Tracing worksheet generator](/tools/tracing-worksheet-generator) or [name tracing](/tools/name-tracing-generator) | Dotted letters to trace, built around the child's own name or letters |
| Learning joined-up writing | [Cursive practice sheets](/tools/cursive-practice-sheets) and [cursive alphabet sheets](/tools/cursive-alphabet-practice-sheets) | Connected script with dotted tracing or solid copy lines |
| Matching a school grade | [Kindergarten](/tools/handwriting-worksheets-kindergarten), [1st grade](/tools/handwriting-worksheets-grade-1), [2nd grade](/tools/handwriting-worksheets-grade-2) | Line heights of 80px, 70px and 60px as starting points |
| Just needing the paper | [Notebook paper](/notebook-paper) or [handwriting paper generator](/tools/handwriting-paper-generator) | Blank ruled sheets with no text on them |

## What good handwriting practice involves

Legible handwriting comes from repeating the same letter shapes until the hand no longer has to think about them. A useful practice sheet therefore does three things: it keeps letter height and baseline steady with guidelines, it repeats the same word or sentence several times, and it uses words the writer actually needs. A random alphabet drill teaches less than a sentence you will really write.

Print is the easier place to start, because each letter stands alone and a mistake is easy to see and fix. Cursive adds joins and rhythm, and tends to go better once print letters are consistent. If you are deciding which to teach a child first, read [print vs cursive: which to teach first](/blog/print-vs-cursive-which-to-teach-first).

## Setting up a routine

Short, regular sessions are easier to sustain than long, occasional ones. A page or two a day is plenty, and it helps to write slowly enough that every letter is intentional. If you want a structured plan, [how to improve handwriting as an adult](/blog/how-to-improve-handwriting-as-an-adult) walks through one, and [best handwriting practice sheets for adults](/blog/best-handwriting-practice-sheets-for-adults) explains how to match a sheet style to your goal. For young children, [how to teach a child to write their name](/blog/how-to-teach-a-child-to-write-their-name) is a good first project, and the [pencil grip guide](/blog/pencil-grip-for-kids-stages-and-fixes) covers the physical side.
`;

export default function HandwritingPracticePage() {
  return <PlatformLayout path={PATH} config={config} contentMarkdown={article} />;
}
