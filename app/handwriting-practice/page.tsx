import type { Metadata } from "next";
import PlatformLayout from "@/components/platform/PlatformLayout";
import PracticeSheetGenerator from "@/components/PracticeSheetGenerator";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/handwriting-practice";
const config = SEO_DATA[PATH];

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `${PATH}` },
};

export default function HandwritingPracticePage() {
  const article = `
### What Good Handwriting Practice Actually Involves
Consistent, legible handwriting comes from repeating the same letterforms enough times that your hand remembers the motion without conscious effort. That means a practice sheet works best when it combines a few things at once: guidelines that keep letter height and baseline steady, repetition of the same word or sentence across several lines, and text that's meaningful to the person practicing rather than a random string of characters.
<br/><br/>
### Print vs Cursive Practice
Print handwriting isolates each letter, which makes it easier to spot and fix individual mistakes, so it's usually the right starting point for young children or adults rebuilding their handwriting from scratch. Cursive practice adds letter connections and rhythm on top of that foundation, and tends to work best once print letterforms are already consistent. Switch between both styles on the same custom text below, or start with dotted <a class='text-indigo-600 hover:underline font-semibold' href='/letter-tracing'>letter tracing</a> if you're just introducing pencil control for the first time.
<br/><br/>
### Building a Practice Routine
Short, frequent sessions beat long infrequent ones. Ten to fifteen minutes of focused practice, three to five times a week, produces steadier improvement than a single long session. If you want a structured plan rather than open-ended drills, our guide on <a class='text-indigo-600 hover:underline font-semibold' href='/blog/how-to-improve-handwriting-as-an-adult'>how to improve handwriting as an adult</a> walks through a week-by-week routine, and <a class='text-indigo-600 hover:underline font-semibold' href='/blog/best-handwriting-practice-sheets-for-adults'>choosing the right practice sheet for your goals</a> covers how to match a sheet style to beginner, intermediate, or cursive-focused practice.
  `;

  return (
    <PlatformLayout path={PATH} config={config} contentMarkdown={article}>
      <PracticeSheetGenerator />
    </PlatformLayout>
  );
}
