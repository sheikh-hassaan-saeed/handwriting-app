// Minimal markdown renderer for trusted, in-repo content (blog articles and tool-page guides).
// Supports: ## / ### headings, paragraphs, - and 1. lists, tables, > quotes, inline bold/italic/code/links,
// and raw HTML blocks (lines starting with "<").

export function headingId(text: string): string {
  return text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function inline(s: string): string {
  return s
    .replace(/`([^`]+)`/g, "<code class='bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "<a href='$2' class='text-indigo-600 hover:underline font-semibold'>$1</a>");
}

const isTableRow = (l: string) => /^\s*\|.*\|\s*$/.test(l);
const isSeparatorRow = (l: string) => /^\s*\|?\s*:?-{3,}/.test(l);
const isUl = (l: string) => /^\s*[-*]\s+/.test(l);
const isOl = (l: string) => /^\s*\d+\.\s+/.test(l);

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (!t) { i++; continue; }

    const h = t.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const cls = level === 2
        ? "text-xl font-bold text-gray-800 mt-8 mb-3 scroll-mt-20"
        : "text-lg font-bold text-gray-700 mt-6 mb-2 scroll-mt-20";
      out.push(`<h${level} id="${headingId(h[2])}" class="${cls}">${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    if (isTableRow(t)) {
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i].trim())) {
        if (!isSeparatorRow(lines[i].trim())) {
          rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim())));
        }
        i++;
      }
      const [head, ...body] = rows;
      out.push(
        "<div class='overflow-x-auto my-6 border border-gray-200 rounded-xl'><table class='min-w-full divide-y divide-gray-200 text-sm'>" +
          `<thead class='bg-gray-50'><tr>${head.map((c) => `<th class='px-4 py-3 text-left font-bold text-gray-700'>${c}</th>`).join("")}</tr></thead>` +
          `<tbody class='bg-white divide-y divide-gray-100'>${body
            .map((r) => `<tr>${r.map((c) => `<td class='px-4 py-3 text-gray-600 align-top'>${c}</td>`).join("")}</tr>`)
            .join("")}</tbody></table></div>`
      );
      continue;
    }

    if (isUl(t) || isOl(t)) {
      const ordered = isOl(t);
      const items: string[] = [];
      while (i < lines.length && (ordered ? isOl(lines[i].trim()) : isUl(lines[i].trim()))) {
        items.push(lines[i].trim().replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ""));
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      const cls = ordered ? "list-decimal" : "list-disc";
      out.push(`<${tag} class='${cls} pl-6 my-4 space-y-2 text-gray-600'>${items.map((it) => `<li>${inline(it)}</li>`).join("")}</${tag}>`);
      continue;
    }

    if (t.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote class='border-l-4 border-indigo-400 pl-4 py-1 my-4 text-gray-600'>${inline(quote.join(" "))}</blockquote>`);
      continue;
    }

    if (t.startsWith("<")) {
      const block: string[] = [];
      while (i < lines.length && lines[i].trim()) {
        block.push(lines[i]);
        i++;
      }
      out.push(block.join("\n"));
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{2,3}\s/.test(lines[i].trim()) &&
      !isTableRow(lines[i].trim()) &&
      !isUl(lines[i].trim()) &&
      !isOl(lines[i].trim()) &&
      !lines[i].trim().startsWith(">")
    ) {
      para.push(lines[i].trim());
      i++;
    }
    out.push(`<p class='mb-4 text-gray-600 leading-relaxed'>${inline(para.join(" "))}</p>`);
  }

  return out.join("\n");
}

export function extractHeadings(md: string): { text: string; id: string; isH3: boolean }[] {
  return (md.match(/^\s*#{2,3}\s+(.*)$/gm) || []).map((m) => {
    const isH3 = m.trim().startsWith("###");
    const text = m.replace(/^\s*#{2,3}\s+/, "").trim();
    return { text, id: headingId(text), isH3 };
  });
}
