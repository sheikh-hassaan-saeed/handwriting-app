export interface SEOPageConfig {
  title: string;
  description: string;
  h1: string;
  intro: string;
  conclusion: string;
  lastUpdated: string;
  author: {
    name: string;
    role: string;
    bio: string;
    sameAs?: string[];
  };
  faqs: { q: string; a: string }[];
  relatedTools: { name: string; href: string }[];
  relatedArticles: { name: string; href: string }[];
  breadcrumbs: { name: string; href: string }[];
  softwareSchema?: {
    name: string;
    description: string;
    category: string;
  };
  howItWorksSteps?: { title: string; desc: string }[];
  customizeFeatures?: { title: string; desc: string }[];
  extraSection?: { heading: string; body: string };
  whoItsFor?: { bold: string; desc: string }[];
  whoItsForHeading?: string;
  relatedClosingLineHtml?: string;
}

export const AUTHOR_INFO = {
  name: "Sheikh Hassaan Saeed",
  role: "Founder & Developer, HandwritingMaker",
  bio: "Sheikh Hassaan Saeed is a web developer and graphic designer based in Pakistan, studying Software Engineering at Virtual University of Pakistan. He built HandwritingMaker's generators and writes and edits the site's guides.",
  sameAs: ["https://sheikhhassaan.com"],
};

export const SEO_DATA: Record<string, SEOPageConfig> = {
  // HOMEPAGE
  "/": {
    title: "Free Handwriting Worksheet Generator | HandwritingMaker",
    description: "Create free printable handwriting worksheets instantly. Adjust spacing, choose print or cursive styles, and download a ready-to-print A4/Letter PDF.",
    h1: "Free Handwriting Worksheet Generator",
    intro: "Create handwriting worksheets, practice sheets, and tracing templates for kids, toddlers, or adults in seconds. Type a child's name, list of spelling words, or sentences. Customize guidelines, choose print or cursive font styles, set repetitions, and generate a printable PDF instantly.",
    conclusion: "Generate, preview, and print handwriting worksheets in a few clicks. Everything runs in your browser, so the names and words you type are never uploaded.",
    lastUpdated: "2026-07-05",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How do I create a custom handwriting tracing worksheet?", a: "Enter a child's name or word list in the input box, select the 'Trace Letters' mode to render letters in dotted tracing guides, customize your page parameters (such as repetitions and lines), and click 'Download PDF' to save and print your custom tracing sheet." },
      { q: "Is this handwriting practice creator completely free to use?", a: "Yes. HandwritingMaker is 100% free for teachers, parents, and students. There are no subscriptions, no accounts, and no watermark stamps on downloaded PDFs." },
      { q: "What paper formats and sizes are supported?", a: "The generator supports standard International A4 and North American Letter sizes. It exports a print-ready PDF sized to the page, so guidelines line up correctly when printed at 100% scale." },
      { q: "Can I generate cursive handwriting worksheets?", a: "Yes. The creator has an option to switch font styles between primary print block lettering and standard connected cursive script, covering all penmanship learning levels." },
      { q: "How do I create handwriting worksheets online?", a: "Type the names, words, or sentences you want to practice into the text box, choose a layout (single word, two words, sentence repeat, or free writing), pick print or cursive style and guideline type, then click 'Download PDF'. The finished worksheet is ready to print immediately, with no account or software install needed." },
    ],
    relatedTools: [
      { name: "Notebook Paper Creator", href: "/notebook-paper" },
      { name: "Cornell Notes Maker", href: "/cornell-notes" },
      { name: "Letter Tracing Practice", href: "/letter-tracing" },
    ],
    relatedArticles: [
      { name: "Wide Ruled vs College Ruled Spacing", href: "/blog/wide-ruled-vs-college-ruled" },
      { name: "How to Improve Handwriting as an Adult", href: "/blog/how-to-improve-handwriting-as-an-adult" },
    ],
    breadcrumbs: [],
  },

  // NOTEBOOK PAPER
  "/notebook-paper": {
    title: "Free Printable Notebook Paper Generator | HandwritingMaker",
    description: "Design custom lined notebook paper. Configure line spacing, margin sizes, colors, and headers. Download A4 or Letter PDFs.",
    h1: "Printable Notebook Paper Generator",
    intro: "Need standard ruled sheets or specific grid templates? This free online notebook paper maker allows you to design and print custom lined, graph, primary guidelines, dot grid, engineering, and music manuscript sheets. Choose your colors, adjust line spacing, configure header borders, and export as multipage PDF files.",
    conclusion: "Stop searching for retail refills. Design your own custom notebook sheets, legal pads, or engineering grids and print them at home.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How do I print notebook paper to scale?", a: "Select either A4 or Letter size in the generator to match your printer paper. When printing the downloaded PDF, make sure to set the scale to '100%' or 'Actual Size' in the printer dialog to prevent guidelines from shifting." },
      { q: "Is there a charge to generate these printable templates?", a: "No, all templates generated on HandwritingMaker are 100% free for educational, personal, and commercial classrooms, with no watermark, branding, or email signups required." },
    ],
    relatedTools: [
      { name: "Wide Ruled Preset", href: "/notebook-paper/wide-ruled" },
      { name: "College Ruled Preset", href: "/notebook-paper/college-ruled" },
      { name: "Cornell Notes Generator", href: "/cornell-notes" },
    ],
    relatedArticles: [
      { name: "Wide Ruled vs College Ruled Paper", href: "/blog/wide-ruled-vs-college-ruled" },
      { name: "How to Print Notebook Paper at Home", href: "/blog/how-to-print-notebook-paper" },
    ],
    breadcrumbs: [{ name: "Notebook Paper", href: "/notebook-paper" }],
    softwareSchema: {
      name: "Notebook Paper Generator",
      description: "Generates custom ruled lined, grid, primary, or Cornell notebook papers.",
      category: "DesignApplication",
    },
  },
  "/notebook-paper/wide-ruled": {
    title: "Printable Wide Ruled Notebook Paper - Free PDF Maker",
    description: "Download free printable wide ruled notebook paper. Customize line color, margin size, page numbers, and print as A4 or Letter PDF sheets instantly.",
    h1: "Printable Wide Ruled Notebook Paper",
    intro: "Wide ruled paper (sometimes called legal ruled) features 11/32 inch (8.7mm) spacing between lines. This is the standard paper size used by kids in primary and elementary schools who are still refining their letter size. Generating a printable wide ruled PDF is an excellent choice for homework drafts, alphabet spelling drills, or simple journal logs.",
    conclusion: "Print high-quality wide ruled sheets customized with student name headers directly from our generator.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What is the standard spacing of wide ruled paper?", a: "Wide ruled paper is spaced at 11/32 in (8.7 mm) between lines, with a vertical margin line placed 1.25 inches (32 mm) from the left." },
    ],
    relatedTools: [
      { name: "College Ruled Paper", href: "/notebook-paper/college-ruled" },
      { name: "Kindergarten Writing Paper", href: "/notebook-paper/kindergarten" },
    ],
    relatedArticles: [
      { name: "Wide Ruled vs College Ruled Paper", href: "/blog/wide-ruled-vs-college-ruled" },
    ],
    breadcrumbs: [
      { name: "Notebook Paper", href: "/notebook-paper" },
      { name: "Wide Ruled", href: "/notebook-paper/wide-ruled" },
    ],
  },
  "/notebook-paper/college-ruled": {
    title: "Printable College Ruled Notebook Paper - Free PDF Maker",
    description: "Download free printable college ruled notebook paper templates. Adjust line spacing (7.1mm spacing), configure margins, add headers, and print instantly.",
    h1: "Printable College Ruled Notebook Paper",
    intro: "College ruled paper (or medium ruled) has 9/32 inch (7.1mm) line spacing. This is the standard spacing for high school and university students, as well as general office writing notebooks. It allows you to write more lines of text per sheet. Generate a college ruled PDF paper and customize margin widths and header titles.",
    conclusion: "Fit more ideas on a single page with custom margins and faint blue or grey college ruled lines.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What is the standard spacing of college ruled paper?", a: "College ruled paper is spaced at 9/32 in (7.1 mm) between lines, with a vertical margin line placed 1.25 inches (32 mm) from the left." },
    ],
    relatedTools: [
      { name: "Wide Ruled Paper", href: "/notebook-paper/wide-ruled" },
      { name: "Graph Paper Generator", href: "/notebook-paper/graph-paper" },
    ],
    relatedArticles: [
      { name: "Wide Ruled vs College Ruled Paper", href: "/blog/wide-ruled-vs-college-ruled" },
    ],
    breadcrumbs: [
      { name: "Notebook Paper", href: "/notebook-paper" },
      { name: "College Ruled", href: "/notebook-paper/college-ruled" },
    ],
  },
  "/notebook-paper/graph-paper": {
    title: "Printable Graph Grid Paper Generator - Free Math Grids",
    description: "Generate and download free graph paper sheets. Adjust grid size, grid line colors, margins, and print on A4 or Letter pages.",
    h1: "Printable Graph Grid Paper Generator",
    intro: "Math graph paper utilizes square grid lines to simplify drafting equations, geometry grids, sketches, engineering drafts, and blueprints. Choose grid spacing from 2mm up to 20mm, select thin grid colors (faint grey, blue, or green), and export your grid instantly.",
    conclusion: "Align your calculations or pixel-art sketches with custom-colored high-res printable graph sheets.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What grid sizes are available?", a: "You can adjust the slider from 5px to 100px grid squares, matching standard sizes like 5mm grids, quad-ruled grids, or technical blueprints." },
    ],
    relatedTools: [
      { name: "Dot Grid Paper", href: "/notebook-paper/dot-grid" },
      { name: "Cornell Notes Generator", href: "/cornell-notes" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Notebook Paper", href: "/notebook-paper" },
      { name: "Graph Paper", href: "/notebook-paper/graph-paper" },
    ],
  },
  "/notebook-paper/dot-grid": {
    title: "Printable Dot Grid Journal Page Generator - Free PDF",
    description: "Generate dot grid journal paper for bullet journaling. Customize dot spacing, opacity, colors, and print on A4 or Letter sizes.",
    h1: "Printable Dot Grid Journal Page Generator",
    intro: "Dot grid sheets provide structural guidelines without the visual clutter of full grid lines, making them the preferred choice for bullet journalists, design mockups, and lettering drills. Customize dot grid gaps, select faint gray dots, and output the PDF page.",
    conclusion: "Build a custom blank dot grid template sheet to kickstart your daily bullet journaling.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What is standard dot spacing for bullet journals?", a: "Most dot journals use a 5mm (approx 20px) spacing between dots, which is the default preloaded preset on this page." },
    ],
    relatedTools: [
      { name: "Graph Grid Paper", href: "/notebook-paper/graph-paper" },
      { name: "To-Do List Planner", href: "/printables/todo-list" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Notebook Paper", href: "/notebook-paper" },
      { name: "Dot Grid", href: "/notebook-paper/dot-grid" },
    ],
  },
  "/notebook-paper/primary-writing": {
    title: "Printable Primary Guidelines Writing Paper - Free PDF",
    description: "Generate printable primary writing paper for children. Features solid top/bottom lines and dashed center helpers for kids spelling drills.",
    h1: "Printable Primary Writing Paper",
    intro: "Primary writing paper uses a three-line structure: solid top and bottom lines to establish boundary bounds, and a dashed center line to mark letters height (x-height). This guidelines grid helps elementary students learn correct proportion of letter stems.",
    conclusion: "Empower kids to write straight, proportional letters with custom printed primary worksheets.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What age is primary writing paper for?", a: "Primary paper is designed for grades K-3 (ages 5 to 9) who are transitioning from block drawings to structured handwriting guidelines." },
    ],
    relatedTools: [
      { name: "Kindergarten Writing Paper", href: "/notebook-paper/kindergarten" },
      { name: "Letter Tracing Worksheets", href: "/letter-tracing" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Notebook Paper", href: "/notebook-paper" },
      { name: "Primary Paper", href: "/notebook-paper/primary-writing" },
    ],
  },
  "/notebook-paper/kindergarten": {
    title: "Printable Kindergarten Letter Writing Paper - Free PDF",
    description: "Download free printable kindergarten writing paper. Features large guidelines, red margins, and dashed midline helpers for early alphabet shapes.",
    h1: "Printable Kindergarten Letter Writing Paper",
    intro: "Kindergarten writing paper features extra-wide line spacing (typically 1.0 inch or 64px) to accommodate toddler gross motor movements. The wide solid borders and dashed center lines make it easy for nursery children to trace and copy their very first letters.",
    conclusion: "Print large-format guidelines sheets for nursery handwriting practice.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What is the standard spacing of kindergarten paper?", a: "Our kindergarten preset has a 64px line height spacing, which is ideal for children aged 3 to 6." },
    ],
    relatedTools: [
      { name: "Primary Writing Paper", href: "/notebook-paper/primary-writing" },
      { name: "Name Tracing Generator", href: "/tools/name-tracing-generator" },
    ],
    relatedArticles: [
      { name: "How Letter Tracing Helps Children", href: "/blog/how-letter-tracing-helps" },
    ],
    breadcrumbs: [
      { name: "Notebook Paper", href: "/notebook-paper" },
      { name: "Kindergarten Paper", href: "/notebook-paper/kindergarten" },
    ],
  },

  // CORNELL NOTES
  "/cornell-notes": {
    title: "Free Cornell Notes Generator - Custom PDF Printable Templates",
    description: "Generate free custom Cornell notes templates instantly. Adjust cue columns, summary box heights, titles, subjects, dates. Choose lined, dotted, grid layouts.",
    h1: "Free Cornell Notes Generator",
    intro: "Active recall study notes are best created with the Cornell notes method. This free Cornell sheet maker lets you design custom note pages with adjustable left-hand cue columns, bottom summary boxes, titles, subjects, and dates. Choose lined note rules, dot grid layouts, or cursive label guidelines.",
    conclusion: "Start studying smarter. Export custom Cornell pages as high-res PDFs and print exactly what you need.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What are the three sections of a Cornell notes page?", a: "The page is divided into: 1. The Notes column (right side) for key details; 2. The Cue column (left side) for questions and keywords; and 3. The Summary section (bottom) for collating the core takeaways." },
      { q: "How do I use a Cornell notes template effectively?", a: "Record lecture notes in the right-hand column during class. Right after class, review your notes and write down key concepts or questions in the left cue column. Finally, write a 3-4 sentence summary of the page at the bottom to consolidate memory." },
    ],
    relatedTools: [
      { name: "Study Planner & Pomodoro", href: "/printables/study-planner" },
      { name: "College Ruled Notebook Paper", href: "/notebook-paper/college-ruled" },
    ],
    relatedArticles: [
      { name: "What Are Cornell Notes?", href: "/blog/what-are-cornell-notes" },
    ],
    breadcrumbs: [{ name: "Cornell Notes", href: "/cornell-notes" }],
    softwareSchema: {
      name: "Cornell Notes Generator",
      description: "Creates custom structured Cornell study sheets.",
      category: "DesignApplication",
    },
  },

  // LETTER TRACING
  "/letter-tracing": {
    title: "Free Letter Tracing Worksheet Generator | HandwritingMaker",
    description: "Generate free printable letter tracing worksheets instantly. Enter custom names, alphabets, or word lists. Customize fonts, tracing styles, and pictures. PDF export.",
    h1: "Free Letter Tracing Worksheet Generator",
    intro: "Fine motor control is a fundamental skill for young learners. Tracing dashed guidelines helps preschool, kindergarten, and nursery students establish proper stroke memory. Simply type the target names or letters, adjust the layout, and print the PDF.",
    conclusion: "Build letters familiarity with custom tracing layouts featuring visual animal emojis and outline scripts.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How does picture support help in letter tracing?", a: "Picture support places an emoji representation of the letter at the top of the sheet (e.g. 🍎 for Apple on letter A). This builds associations between phonics sounds and written letterforms, supporting early literacy." },
      { q: "Can I generate a tracing sheet with my child's custom name?", a: "Yes, you can enter any name or word list in the input box. The tool repeats the text across guidelines, allowing custom name handwriting practice." },
    ],
    relatedTools: [
      { name: "Tracing Worksheet Generator", href: "/tools/tracing-worksheet-generator" },
      { name: "Name Tracing Generator", href: "/tools/name-tracing-generator" },
      { name: "Handwriting Practice Generator", href: "/handwriting-practice" },
      { name: "Kindergarten Ruled Paper", href: "/notebook-paper/kindergarten" },
    ],
    relatedArticles: [
      { name: "How Letter Tracing Helps Children", href: "/blog/how-letter-tracing-helps" },
    ],
    breadcrumbs: [{ name: "Letter Tracing", href: "/letter-tracing" }],
    softwareSchema: {
      name: "Letter Tracing Generator",
      description: "Generates custom alphabetical and name tracing sheets.",
      category: "EducationApplication",
    },
  },

  // HANDWRITING PRACTICE
  "/handwriting-practice": {
    title: "Free Handwriting Practice Sheet Generator | HandwritingMaker",
    description: "Generate free printable handwriting practice sheets instantly. Choose cursive or print, set spacing, select presets, or enter custom text. PDF download.",
    h1: "Handwriting Practice Sheet Generator",
    intro: "Penmanship is a skill that develops through consistent practice. With our generator, you can type target words, paragraphs, or sentences that are meaningful to your student, making the handwriting exercises far more engaging. Choose print or cursive script, adjust the spacing to fit their current fine motor skills, and print.",
    conclusion: "Create unlimited custom penmanship sheets with alphabetical drills or quotes to build a beautiful writing hand.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How many lines are typical for handwriting practice sheets?", a: "Normally 10 to 15 lines of practice per session is ideal. This builds muscle memory without causing hand fatigue. Younger children often start with 5 large lines." },
    ],
    relatedTools: [
      { name: "Calligraphy Practice Maker", href: "/calligraphy" },
      { name: "Letter Tracing Generator", href: "/letter-tracing" },
      { name: "Lined Notebook Paper", href: "/notebook-paper" },
    ],
    relatedArticles: [
      { name: "How to Improve Handwriting Guide", href: "/blog/how-to-improve-handwriting-as-an-adult" },
      { name: "Cursive Handwriting Practice Sheets", href: "/blog/cursive-handwriting-practice-sheets" },
    ],
    breadcrumbs: [{ name: "Handwriting Practice", href: "/handwriting-practice" }],
    softwareSchema: {
      name: "Handwriting Practice Generator",
      description: "Designs custom penmanship and spelling practice worksheets.",
      category: "EducationApplication",
    },
  },

  // CALLIGRAPHY
  "/calligraphy": {
    title: "Free Calligraphy Practice Generator - Slant Guidelines PDF",
    description: "Generate free calligraphy practice sheets online. Print templates for Copperplate, Spencerian, Chancery Italic, Modern Calligraphy, or Brush Lettering with custom slant lines.",
    h1: "Calligraphy Practice Sheet Generator",
    intro: "Calligraphy requires rigorous geometric consistency to produce beautiful script curves. Professional worksheets utilize angled grid overlays (slant lines) to guide your hand's angle and vertical ratios (ascenders and descenders) to align letter forms. Print custom calligraphy guides for dip pen, brush pen, or fountain pen penmanship.",
    conclusion: "Practice strokes, loops, minimum drills, and alphabetical letters using custom slants built to size.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What slant angle is standard for Copperplate calligraphy?", a: "The standard slant angle for English Roundhand and Copperplate calligraphy is 55 degrees from the horizontal baseline. Spencerian script utilizes a slightly steeper 52-degree slant." },
      { q: "What is x-height in calligraphy?", a: "The x-height refers to the height of lowercase letters (such as 'a', 'o', 'x') that do not have ascenders (like 'h') or descenders (like 'g'). It determines the scale and proportion of the script." },
    ],
    relatedTools: [
      { name: "Handwriting Practice Sheets", href: "/handwriting-practice" },
      { name: "Signature Generator", href: "/signature-generator" },
    ],
    relatedArticles: [
      { name: "Cursive Strokes for Beginners", href: "/blog/cursive-strokes-for-beginners" },
    ],
    breadcrumbs: [{ name: "Calligraphy", href: "/calligraphy" }],
    softwareSchema: {
      name: "Calligraphy Generator",
      description: "Generates custom calligraphy grid templates with slant lines.",
      category: "DesignApplication",
    },
  },

  // SIGNATURE
  "/signature-generator": {
    title: "Free Online Signature Generator - Draw Typed Signatures | HandwritingMaker",
    description: "Generate free handwritten signatures online from your typed name. Choose from 8 elegant script styles, adjust colors, toggle transparent backgrounds. Download PNG, SVG, PDF.",
    h1: "Free Online Signature Generator",
    intro: "Having a clean signature is essential for adding a personal touch to emails, newsletters, digital letters, and contract sign-offs. Our signature maker gives you instant access to 8 distinct handwritten personalities - from minimal cursive strokes to bold luxury calligraphy sweeps. Toggle the transparent background option to fit the download cleanly on any document page.",
    conclusion: "Get a vector SVG signature or high-res transparent PNG signature in seconds, entirely free.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Are these generated signatures legally binding?", a: "Yes, in many jurisdictions (such as under the ESIGN Act in the US), a typed signature that represents your intent to sign a document is legally binding. However, for official notary transactions or highly secure contracts, you should use standard encrypted e-signature platforms." },
      { q: "How do I add the signature to a PDF document?", a: "Download the signature as a transparent PNG. Open your document reader (e.g. Adobe Acrobat), select 'Sign' or 'Insert Image', and upload the PNG. Drag and position the signature over the sign line." },
    ],
    relatedTools: [
      { name: "Calligraphy Practice Maker", href: "/calligraphy" },
      { name: "Text to Handwriting Converter", href: "/" },
    ],
    relatedArticles: [
    ],
    breadcrumbs: [{ name: "Signature Generator", href: "/signature-generator" }],
    softwareSchema: {
      name: "Signature Generator",
      description: "Generates handwritten styled e-signatures from typed names.",
      category: "UtilityApplication",
    },
  },

  // PRINTABLES DIRECTORY
  "/printables": {
    title: "Printable Planners & Worksheet Template Library | HandwritingMaker",
    description: "Download free printable planners, calendars, logs, and homework templates. Get daily planners, weekly logs, study charts, graph paper. One-click PDF download.",
    h1: "Printable Templates Library",
    intro: "Browse our directory of free planners, checklists, reading logs, and academic grids. Generate high-quality A4 PDF sheets instantly with no login or email required.",
    conclusion: "Stay organized and productive. Choose a pre-made planner layout or click customize to adapt parameters to your workspace.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Are these printable files in high resolution?", a: "Each printable is rendered at full page size and saved as a PDF, which prints cleanly on standard home and school printers. Set the print scale to 100% (Actual Size) for the best result." },
      { q: "Can I customize the printables before downloading?", a: "Yes! Every printable item card features a 'Customize Template' link that opens the layout directly inside our online workspace generators, where you can modify columns, labels, spacing, and numbers." },
    ],
    relatedTools: [
      { name: "Daily Planner Planner", href: "/printables/daily-planner" },
      { name: "Weekly Planner Organizer", href: "/printables/weekly-planner" },
      { name: "Study Planner & Pomodoro", href: "/printables/study-planner" },
      { name: "To-Do Checklist", href: "/printables/todo-list" },
    ],
    relatedArticles: [],
    breadcrumbs: [{ name: "Printables", href: "/printables" }],
  },

  // INDIVIDUAL PLANNER PRESETS
  "/printables/daily-planner": {
    title: "Printable Daily Planner Template - Free PDF | HandwritingMaker",
    description: "Download a free printable daily planner template. Keep track of hourly schedules (6 AM - 9 PM), priorities, to-do lists, water logs, and notes.",
    h1: "Printable Daily Planner Template",
    intro: "Mapping your daily routines keeps your goals focused. This daily planner sheet provides a structured format featuring an hourly timeline to allocate tasks, priority checkboxes for key objectives, and water metrics trackers to monitor hydration.",
    conclusion: "Print a daily journal sheet to optimize your routine.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What sections are on the daily planner?", a: "It has a 16-hour schedule grid, top 3 priorities list, 10-row general checklist, water glass intake indicators, and open ruled notebook notes." },
    ],
    relatedTools: [
      { name: "Weekly Planner", href: "/printables/weekly-planner" },
      { name: "Monthly Calendar", href: "/printables/monthly-planner" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Daily Planner", href: "/printables/daily-planner" },
    ],
  },
  "/printables/weekly-planner": {
    title: "Printable Weekly Planner Template - Free PDF | HandwritingMaker",
    description: "Download a free weekly planner sheet. Organize seven day blocks, write homework tasks, review goals, and structure weekly calendars.",
    h1: "Printable Weekly Planner Template",
    intro: "Structure your whole week at a glance. The weekly planner contains 7 distinct boxes (Monday through Sunday) with writing rules, combined with a highlight section for your top checkbox targets for the week.",
    conclusion: "Organize semesters and projects with clean weekly binders.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Is the weekly planner sized for standard printing?", a: "Yes, it is formatted to compile directly to A4 or Letter sizes, printing perfectly in portrait orientation." },
    ],
    relatedTools: [
      { name: "Daily Planner", href: "/printables/daily-planner" },
      { name: "Assignment Tracker", href: "/printables/assignment" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Weekly Planner", href: "/printables/weekly-planner" },
    ],
  },
  "/printables/monthly-planner": {
    title: "Printable Blank Monthly Planner Grid - Free PDF",
    description: "Download a blank monthly calendar sheet. Fill date squares, schedule classes, log events, and take notes in clean layout margins.",
    h1: "Printable Monthly Planner Grid",
    intro: "Map long-term study schedules, exam dates, or class modules with a blank 5x7 monthly calendar table. Features large write-in boxes, days of week header blocks, and note segments below.",
    conclusion: "Plan month goals with editable structured calendar PDFs.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How do I fill dates on the monthly planner?", a: "The date squares feature empty bubble headers so you can write in the matching day numbers for any month of the year." },
    ],
    relatedTools: [
      { name: "Weekly Planner", href: "/printables/weekly-planner" },
      { name: "Study Planner", href: "/printables/study-planner" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Monthly Planner", href: "/printables/monthly-planner" },
    ],
  },
  "/printables/todo-list": {
    title: "Printable Task To-Do List Template - Free PDF Generator",
    description: "Get a printable to-do list checkbox template. Two columns for work assignments, daily goals, routines, and habits tracking.",
    h1: "Printable Task To-Do List Template",
    intro: "Checking off completed items triggers a dopamine release that keeps you writing and learning. This checklist template divides tasks into work objectives and habit logs, ensuring you stay organized.",
    conclusion: "Manage projects cleanly with checkboxes.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How many checkboxes are available?", a: "This sheet features 44 checkbox rows split into two structured columns." },
    ],
    relatedTools: [
      { name: "Daily Planner", href: "/printables/daily-planner" },
      { name: "Habit Tracker", href: "/printables/habit-tracker" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "To-Do List", href: "/printables/todo-list" },
    ],
  },
  "/printables/reading-log": {
    title: "Printable Student Reading Log Tracker - Free PDF",
    description: "Download a free student reading log. Record book details, authors, dates, rating stars, and checkboxes in a clean spreadsheet.",
    h1: "Printable Student Reading Log Tracker",
    intro: "Track literacy milestones with a reading log spreadsheet. Designed for school students, kids, and avid library readers, it provides columns for title, author, start and finish dates, star ratings, and checklists.",
    conclusion: "Help children develop structured reading habits.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How do ratings work on the reading log?", a: "Each row has 5 empty star outlines that kids can color in with crayons to rate books they finish." },
    ],
    relatedTools: [
      { name: "Letter Tracing Generator", href: "/letter-tracing" },
      { name: "Primary Writing Paper", href: "/notebook-paper/primary-writing" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Reading Log", href: "/printables/reading-log" },
    ],
  },
  "/printables/assignment": {
    title: "Printable Assignment Planner Checklist - Free PDF",
    description: "Download a student assignment tracker. Log school classes, homework details, project priorities, due dates, grades, and statuses.",
    h1: "Printable Assignment Planner Checklist",
    intro: "High school and university study cycles involve handling multiple coursework deliverables. Our homework checklist table helps you document subject fields, assignment specifics, due dates, priority markers, and final grades.",
    conclusion: "Never miss a homework due date with this structured binder sheet.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What columns are on the assignment planner?", a: "It contains: Subject, Assignment Details, Due Date, Priority level, Done checkbox, and Grade feedback." },
    ],
    relatedTools: [
      { name: "Study Planner", href: "/printables/study-planner" },
      { name: "Cornell Notes Generator", href: "/cornell-notes" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Assignment Tracker", href: "/printables/assignment" },
    ],
  },
  "/printables/study-planner": {
    title: "Printable Study Planner & Pomodoro focus Sheet - Free PDF",
    description: "Download a master study planner template. Track core topics, study checklists, key terms, Pomodoro focus circles, and summary rules.",
    h1: "Printable Study Planner & Pomodoro focus Sheet",
    intro: "Conquer exam season with active learning templates. This study tracker provides space to define topic focuses, mastery checklists, key formulas, Pomodoro focus circles, and summary take-aways.",
    conclusion: "Boost retention with Pomodoro focus sessions and recall templates.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How do Pomodoro trackers work on the sheet?", a: "There are 16 focus circles representing 25-minute intervals. Fill or color a circle for each study block completed." },
    ],
    relatedTools: [
      { name: "Cornell Notes Generator", href: "/cornell-notes" },
      { name: "Assignment Tracker", href: "/printables/assignment" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Study Planner", href: "/printables/study-planner" },
    ],
  },
  "/printables/habit-tracker": {
    title: "Printable Daily Habit Tracker Page - Free PDF Generator",
    description: "Download a free habit tracker sheet. Track daily goals, health routines, gym schedules, and checklists in a clean monthly table.",
    h1: "Printable Daily Habit Tracker Page",
    intro: "Forming positive habits takes daily repetition. Our habit tracker template lets you type or write your core routines (e.g. gym, meditation, reading) and color the grids for each day of the month you complete them.",
    conclusion: "Monitor health and personal objectives with clean grid sheets.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "How many habits can I track on one page?", a: "This template features 12 custom habit rows mapped against a 31-day calendar check grid." },
    ],
    relatedTools: [
      { name: "Daily Planner", href: "/printables/daily-planner" },
      { name: "To-Do List", href: "/printables/todo-list" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Habit Tracker", href: "/printables/habit-tracker" },
    ],
  },
  "/printables/journal-page": {
    title: "Printable Lined Journal Page Layout - Free PDF",
    description: "Download a blank lined journal template. Print notebook sheets with border margins, header dates, and clean horizontal lines.",
    h1: "Printable Lined Journal Page Layout",
    intro: "Refining thoughts or keeping a diary is a relaxing daily habit. Our journal page template prints elegant lined sheets with spacious borders, header date slots, and comfortable line spacing.",
    conclusion: "Download a printable journal page to begin your writing exercises.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What lines are on the journal template?", a: "It features 32 ruled horizontal lines with a margin border at 50px." },
    ],
    relatedTools: [
      { name: "Notebook Paper Generator", href: "/notebook-paper" },
      { name: "Wide Ruled Paper", href: "/notebook-paper/wide-ruled" },
    ],
    relatedArticles: [],
    breadcrumbs: [
      { name: "Printables", href: "/printables" },
      { name: "Journal Page", href: "/printables/journal-page" },
    ],
  },

  // LANDING SILOS

  // OTHERS
  "/fonts": {
    title: "Handwriting & Calligraphy Cursive Fonts Guide | HandwritingMaker",
    description: "Explore realistic handwriting cursive fonts loaded from Google Fonts. Compare Caveat, Patrick Hand, Homemade Apple, Great Vibes, and Sacramento styles.",
    h1: "Handwriting Cursive Fonts Guide",
    intro: "Our tools utilize standard Google Fonts to render realistic penmanship. This directory compares print scripts, slanted cursive, doctor scrawls, minimalist outlines, and luxury signature scripts.",
    conclusion: "Choose the perfect handwriting typeface for your quotes, traces, and signatures.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [],
    relatedTools: [
      { name: "Handwriting Practice Sheets", href: "/handwriting-practice" },
      { name: "Signature Generator", href: "/signature-generator" },
    ],
    relatedArticles: [],
    breadcrumbs: [{ name: "Fonts Guide", href: "/fonts" }],
  },
  "/about": {
    title: "About Us - HandwritingMaker Printable Platform",
    description: "Learn about HandwritingMaker, a free digital workbook platform to generate lined papers, tracing sheets, calligraphy slants, and signatures.",
    h1: "About HandwritingMaker",
    intro: "HandwritingMaker is a free set of tools for making printable handwriting worksheets, lined paper, planners and study templates. Everything runs in your browser, with no account and nothing you type uploaded.",
    conclusion: "Thank you for using HandwritingMaker. Print, customize, and study effectively.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [],
    relatedTools: [],
    relatedArticles: [],
    breadcrumbs: [{ name: "About Us", href: "/about" }],
  },
  "/contact": {
    title: "Contact Us - HandwritingMaker Platform Feedback",
    description: "Reach out to HandwritingMaker. Send suggestions for new school generators, planners, custom paper layouts, or report issues.",
    h1: "Contact Our Platform Team",
    intro: "Have suggestions for new tools (e.g. math worksheets, certificates, invigilation lists) or feedback on current templates? Reach out to us. We read all community emails.",
    conclusion: "Email us directly and we will respond as soon as possible.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [],
    relatedTools: [],
    relatedArticles: [],
    breadcrumbs: [{ name: "Contact Us", href: "/contact" }],
  },
  "/blog": {
    title: "Handwriting, Penmanship & Study Method Blog | HandwritingMaker",
    description: "Browse our topical cluster guides. Read tutorials on active recall, paper sizes, letter tracing, cursive writing guides, signature ideas.",
    h1: "Handwriting & Active Recall Study Blog",
    intro: "Explore our collection of articles. We write tutorials on active recall notes, toddler tracing milestones, handwriting improvements, calligraphy scripts, and print settings.",
    conclusion: "Read supporting cluster articles and use our free generators to apply these methods.",
    lastUpdated: "2026-06-26",
    author: AUTHOR_INFO,
    faqs: [],
    relatedTools: [],
    relatedArticles: [],
    breadcrumbs: [{ name: "Blog", href: "/blog" }],
  },
  "/tools/handwriting-worksheet-creator": {
    title: "Free Custom Handwriting Worksheet Creator | HandwritingMaker",
    description: "Create personalized handwriting worksheets in seconds. Enter any spelling list or vocabulary words, select block print or cursive styles, and print for free.",
    h1: "Free Custom Handwriting Worksheet Creator",
    intro: "This is the most flexible tool on the site — the one to reach for when no specialized generator quite fits. Type spelling lists, sight words, or vocabulary terms, and the creator lays them out as clean practice worksheets with proper guidelines, ready to download as a print-ready PDF.",
    conclusion: "Generate your custom worksheets now and save time preparing classroom materials.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Can I enter a whole spelling list at once?", a: "Yes. Type or paste the full list with words separated by spaces or line breaks, choose your layout, and the creator spreads the words across the sheet automatically." },
      { q: "How is this different from the Tracing Worksheet Generator?", a: "The Tracing Worksheet Generator is tuned for one job — dotted-line tracing practice with presets for young learners. The creator is the flexible all-rounder: any words, any style, print or cursive, for any age." },
      { q: "Can I make some sheets in print and others in cursive?", a: "Yes. Every sheet you generate can use either style, so you can print Monday's list in block letters and Friday's in cursive from the same word list." },
      { q: "Is there a limit to how many words I can enter?", a: "There's no set limit — enter a short list or a long one. Very long lists simply flow onto additional lines, and you can split them across multiple sheets if you prefer shorter practice sessions." },
    ],
    relatedTools: [
      { name: "Tracing Worksheet Generator", href: "/tools/tracing-worksheet-generator" },
      { name: "Name Tracing Generator", href: "/tools/name-tracing-generator" }
    ],
    relatedArticles: [],
    whoItsForHeading: "Who the Creator Is For",
    howItWorksSteps: [
      { title: "Type your words", desc: "Enter a spelling list, sight words, or vocabulary terms, separated by spaces or line breaks — as many as you need." },
      { title: "Pick a layout and style", desc: "Choose Single Word or Two Words per line, then block print lettering or connected cursive, with dotted tracing or solid model text." },
      { title: "Download your worksheet", desc: "The creator assembles a print-ready PDF sized for A4 or US Letter. Print it for the whole class or just one student — free, no account required." },
    ],
    customizeFeatures: [
      { title: "Any custom text", desc: "Spelling lists, sight words, vocabulary, names, sentences." },
      { title: "Single Word and Two Words per line layouts", desc: "Control how much repetition each word gets." },
      { title: "Print and cursive styles", desc: "School-friendly block lettering or flowing connected script." },
      { title: "Dotted trace or solid text", desc: "Tracing guides for beginners, clean models for copying." },
      { title: "Adjustable guidelines and spacing", desc: "Tune line height and letter size to the writer." },
      { title: "PDF download", desc: "Print-ready on A4 or Letter, no watermark, no signup." },
    ],
    extraSection: {
      heading: "When to use the creator",
      body: "Use this tool when the practice content matters more than the format — the weekly spelling list, unit vocabulary, the sight words your class is stuck on. The specialized generators (tracing, cursive, grade-level) offer tuned presets for common jobs; the creator covers everything else. A typical week: Monday’s spelling list becomes Monday’s worksheet, Tuesday’s vocabulary becomes Tuesday’s sheet, each one printed in under a minute.",
    },
    whoItsFor: [
      { bold: "Classroom teachers", desc: "Turn each week’s spelling list into a printed worksheet in minutes — one input box, one download, thirty identical sheets." },
      { bold: "Homeschool parents", desc: "Build custom practice around whatever their child is learning that week, from phonics words to science vocabulary." },
      { bold: "Tutors", desc: "Print targeted sheets for individual students, focusing each session’s worksheet on exactly the words that student needs." },
    ],
    relatedClosingLineHtml: "For ready-made tracing practice, try the <a href=\"/tools/tracing-worksheet-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Tracing Worksheet Generator</a> — or the <a href=\"/tools/name-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Name Tracing Generator</a> for personalized name sheets.",
    breadcrumbs: [{ name: "Handwriting Worksheet Creator", href: "/tools/handwriting-worksheet-creator" }]
  },
  // NOTE: "/tools/custom-handwriting-worksheets" was merged into "/tools/printable-handwriting-worksheets"
  // on 2026-10-07 (301 redirect in next.config.mjs) — identical generator preset, was a true orphan
  // page (zero inbound internal links), and had no distinguishing search data over its sibling.
  "/tools/printable-handwriting-worksheets": {
    title: "Free Printable Handwriting Worksheets | HandwritingMaker",
    description: "Download free printable handwriting sheets for kids and adults. Print customized name writing guides, cursive templates, and line paper.",
    h1: "Printable Handwriting Worksheets Directory",
    intro: "Access printable penmanship guidelines directly from your web browser. Skip the subscription binders: customize text lists, select line formats, and compile paper templates for free.",
    conclusion: "Generate standard worksheets on demand to support early child fine motor skills or adult script exercises.",
    lastUpdated: "2026-07-05",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Do these worksheets have watermarks?", a: "No. All downloaded PDF sheets are 100% clean and free of logos or watermarks for neat classroom printouts." }
    ],
    relatedTools: [
      { name: "Alphabet Tracing Generator", href: "/tools/alphabet-tracing-generator" }
    ],
    relatedArticles: [],
    breadcrumbs: [{ name: "Printable Handwriting Worksheets", href: "/tools/printable-handwriting-worksheets" }]
  },
  "/tools/tracing-worksheet-generator": {
    title: "Dotted Line Tracing Worksheet Generator | HandwritingMaker",
    description: "Convert any text into a dotted line tracing worksheet for early writing practice. Perfect for preschool children and toddlers.",
    h1: "Dotted Line Tracing Worksheet Generator",
    intro: "Most young writers learn to form letters by tracing them first. This dotted line generator turns any word you type into a tracing worksheet: flip on Trace Dots mode and solid letters become hollow dotted paths that a child can follow with a pencil. It works as a dotted line maker for letters, numbers, and punctuation alike, and every sheet downloads as a crisp PDF with no signup or watermark.",
    conclusion: "Support motor coordination and letter recognition with targeted tracing sheets.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Does this work for numbers too?", a: "Yes. Type letters, numbers, and common punctuation — a child practicing \"7\" or \"?\" gets the same dotted tracing treatment as the alphabet." },
      { q: "What's the difference between Trace Dots and hollow outline letters?", a: "Trace Dots draws letters as dots along the letter path — the classic tracing look. Hollow outline draws each letter as an empty shape to trace around or color in. Try both and see which your writer prefers." },
      { q: "Can I make cursive tracing sheets?", a: "Yes. Switch the font style to cursive and your text renders in connected dotted script — a good bridge for students moving from print to cursive." },
      { q: "Do I need to create an account?", a: "No. The generator is free, runs entirely in your browser, and never asks for a signup. Your text stays on your device." },
    ],
    relatedTools: [
      { name: "Name Tracing Generator", href: "/tools/name-tracing-generator" },
      { name: "Alphabet Tracing Generator", href: "/tools/alphabet-tracing-generator" }
    ],
    relatedArticles: [],
    howItWorksSteps: [
      { title: "Type your practice text", desc: "Enter a word, a name, a list of sight words, or a short sentence — whatever the writer needs to work on this week." },
      { title: "Turn on Trace Dots", desc: "Switch the letter style from solid to dotted tracing, pick block print or cursive, and use the sliders to set line height and letter size." },
      { title: "Preview and print", desc: "Check the live preview, then download the PDF or PNG and print as many copies as you need." },
    ],
    customizeFeatures: [
      { title: "Trace Dots mode", desc: "Converts any text into hollow dotted tracing letters — the heart of this tool." },
      { title: "Print or cursive lettering", desc: "Clean block print (Patrick Hand) or flowing cursive (Dancing Script)." },
      { title: "Guideline choices", desc: "Classic three-line dotted guides, solid lines, or no guides at all." },
      { title: "Size controls", desc: "Line spacing and font size sliders to fit small or growing hands." },
      { title: "Letters, numbers, punctuation", desc: "If you can type it, it becomes a tracing sheet." },
      { title: "Print-ready output", desc: "A4 or Letter, high-resolution PDF or PNG, generated right in your browser." },
    ],
    whoItsFor: [
      { bold: "Preschool and kindergarten teachers", desc: "Use it as a daily warm-up: type the week’s sight words, print a class set, and the sheet always matches what you’re actually teaching." },
      { bold: "Parents", desc: "Reach for it when one letter keeps tripping a child up. Type five lines of that tricky letter or word, print it, and turn a frustrating evening into ten minutes of calm practice." },
      { bold: "Tutors and occupational therapists", desc: "Use tracing sheets to build fine-motor control and steady pencil grip before expecting independent writing." },
    ],
    relatedClosingLineHtml: "When your writer outgrows single words, try the <a href=\"/tools/sentence-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Sentence Tracing Generator</a> — and the <a href=\"/tools/name-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Name Tracing Generator</a> builds a personalized sheet around any name.",
    breadcrumbs: [{ name: "Tracing Worksheet Generator", href: "/tools/tracing-worksheet-generator" }]
  },
  "/tools/name-tracing-generator": {
    title: "Free Custom Name Tracing Generator | HandwritingMaker",
    description: "Generate personalized name tracing worksheets for preschool and kindergarten. Enter any name and print instant tracing sheets for free.",
    h1: "Free Custom Name Tracing Generator",
    intro: "A child's own name is usually the first word they care about writing. This generator builds a personalized name tracing worksheet around any first or last name — type it once, set how many lines you want, and print a dotted-line sheet where every row reads their name. It takes seconds, it's free, and kids will practice a sheet with their own name far longer than a generic alphabet page.",
    conclusion: "Build child confidence and name familiarity with daily name-tracing practice sheets.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Can I make sheets for a whole class?", a: "Yes. Type each child's name one at a time and download a separate sheet per child. Many teachers print a full set at the start of the year and reuse them as morning warm-ups." },
      { q: "Can I use nicknames or last names?", a: "Absolutely — the sheet uses exactly the text you type, so nicknames, middle names, and last names all work. Just double-check the spelling before you print a class set." },
      { q: "Should I choose print or cursive?", a: "For preschoolers and kindergarteners, block print is the right starting point. Cursive suits older children who already form print letters with confidence." },
      { q: "Is it really free?", a: "Yes — no signup, no account, no watermark on the PDF. The sheet is generated in your browser and yours to print as many times as you like." },
    ],
    relatedTools: [
      { name: "Tracing Worksheet Generator", href: "/tools/tracing-worksheet-generator" },
      { name: "Letter Tracing Hub", href: "/letter-tracing" }
    ],
    relatedArticles: [
      { name: "How Letter Tracing Worksheets Support Development", href: "/blog/how-letter-tracing-helps" }
    ],
    howItWorksSteps: [
      { title: "Type the name", desc: "Enter any first name, last name, or nickname — the sheet is built around exactly what you type." },
      { title: "Set the repetitions", desc: "Choose the Single Word layout and decide how many dotted lines the name should repeat down the page." },
      { title: "Pick a style and print", desc: "Select dotted tracing or hollow outline, block print or cursive, then download the PDF and print." },
    ],
    customizeFeatures: [
      { title: "Personalized name input", desc: "Any name, spelled exactly as you enter it." },
      { title: "Single Word layout", desc: "The name repeats in neat rows down the page." },
      { title: "Repetition control", desc: "Set how many practice lines appear on the sheet." },
      { title: "Two tracing styles", desc: "Classic Trace Dots or hollow outline letters kids can color." },
      { title: "Print or cursive", desc: "Block lettering for beginners, connected script for older kids." },
      { title: "Free forever", desc: "No signup, no watermark; download the PDF and reprint as often as you like." },
    ],
    whoItsFor: [
      { bold: "Preschool teachers", desc: "Print a personalized sheet for every child in the class — a lovely first-day-of-school activity and a keepsake for the fridge at home. One teacher, twenty names, twenty sheets in minutes." },
      { bold: "Parents", desc: "Use it to make name-writing feel special. A sheet that says your child’s name turns practice into something they ask for instead of avoid." },
      { bold: "Daycare providers and nannies", desc: "Keep a stack on hand for quiet-time activities that build letter recognition without a screen in sight." },
    ],
    relatedClosingLineHtml: "Pair it with the <a href=\"/tools/alphabet-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Alphabet Tracing Generator</a> for full A–Z practice, or the main <a href=\"/tools/tracing-worksheet-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Tracing Worksheet Generator</a> when the child is ready to trace words beyond their name.",
    breadcrumbs: [{ name: "Name Tracing Generator", href: "/tools/name-tracing-generator" }]
  },
  "/tools/sentence-tracing-generator": {
    title: "Printable Sentence Tracing Generator | HandwritingMaker",
    description: "Create sentence tracing worksheets for kids. Type full sentences, quotes, or paragraphs, customize guidelines, and export as PDF.",
    h1: "Printable Sentence Tracing Generator",
    intro: "Single words teach letter shapes; sentences teach writing. This generator turns full sentences, quotes, or short paragraphs into dotted tracing text, so students practice spacing between words, staying on the line, and keeping a steady rhythm across a whole row. Long passages flow across pages on their own — paste a paragraph and get a multi-page tracing workbook.",
    conclusion: "Improve handwriting spacing and word connection with sentence tracing drills.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Can I print a multi-page sentence workbook?", a: "Yes. Enter multiple sentences or paragraphs and the generator paginates the lines across pages automatically — you get one PDF containing the whole workbook." },
      { q: "Is there a limit on how much text I can enter?", a: "The tool handles anything from a single sentence to several paragraphs. Very long passages simply become more pages in the downloaded PDF." },
      { q: "Can sentences be traced in cursive?", a: "Yes. Choose the cursive style and your sentences render in connected dotted script — helpful for students learning the joins between letters inside real words." },
      { q: "How do I keep the text from feeling cramped?", a: "Open up the rows with the line spacing slider before downloading. Wider spacing suits younger writers; tighter spacing works for confident hands." },
    ],
    relatedTools: [
      { name: "Tracing Worksheet Generator", href: "/tools/tracing-worksheet-generator" },
      { name: "Handwriting Practice Sheets", href: "/tools/handwriting-practice-sheets" }
    ],
    relatedArticles: [],
    howItWorksSteps: [
      { title: "Enter your sentences", desc: "Type or paste anything from one sentence to several paragraphs — spelling sentences, a favorite quote, a reading passage." },
      { title: "Switch to tracing", desc: "Turn on Trace Dots mode, choose print or cursive, and adjust the line spacing so the text has room to breathe." },
      { title: "Download the workbook", desc: "The generator paginates long text across pages by itself; download the PDF and print the whole set." },
    ],
    customizeFeatures: [
      { title: "Full-text input", desc: "Sentences, quotes, and paragraphs, not just single words." },
      { title: "Automatic pagination", desc: "Long passages flow across as many pages as needed." },
      { title: "Trace Dots for sentences", desc: "Every word rendered in dotted tracing form." },
      { title: "Print or cursive", desc: "Block letters for beginners, connected script for older students." },
      { title: "Spacing controls", desc: "Line height and font size sliders for comfortable tracing." },
      { title: "Print-ready export", desc: "Pick A4 or Letter, download a sharp PDF or PNG, and print the full multi-page set." },
    ],
    whoItsFor: [
      { bold: "Elementary teachers", desc: "Turn weekly spelling sentences or grammar examples into tracing homework that doubles as reading practice. A sentence a child traces is a sentence they’ve read three times over." },
      { bold: "Homeschool parents", desc: "Use it for copywork: pick a passage from the book you’re reading together, let the child trace it, then copy it freehand underneath." },
      { bold: "Students working on fluency", desc: "Get practice with the real mechanics of writing — word spacing, punctuation, and keeping letters uniform across a full line." },
    ],
    relatedClosingLineHtml: "Start with single words on the <a href=\"/tools/tracing-worksheet-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Tracing Worksheet Generator</a>, then graduate to sentences here — and the <a href=\"/tools/handwriting-practice-sheets\" class=\"text-indigo-600 font-semibold hover:underline\">Handwriting Practice Sheets</a> generator adds blank-line layouts for writing those same sentences from memory.",
    breadcrumbs: [{ name: "Sentence Tracing Generator", href: "/tools/sentence-tracing-generator" }]
  },
  // NOTE: "/tools/cursive-worksheet-generator" was merged into "/tools/cursive-practice-sheets"
  // on 2026-10-07 (301 redirect in next.config.mjs) — the two pages used an identical generator
  // preset and were splitting ranking signal for the same "cursive worksheets" search intent.
  // "/tools/cursive-practice-sheets" was kept as canonical since its slug exact-matches the
  // single highest-volume gap keyword ("cursive practice sheets", ~12,100/mo per SEMrush).
  "/tools/alphabet-tracing-generator": {
    title: "Alphabet Tracing Worksheet Generator | HandwritingMaker",
    description: "Create printable A-Z alphabet tracing worksheets. Customize upper and lowercase letters, guideline styles, and download PDFs.",
    h1: "Alphabet Tracing Worksheet Generator",
    intro: "Every writer starts with A. This generator builds a complete alphabet tracing workbook — uppercase, lowercase, or paired \"Aa Bb Cc\" rows — with dotted trace dashes under every letter. Pick block print for first-timers or cursive for students ready to learn connected letterforms, and print the whole A–Z set in seconds.",
    conclusion: "Help children master all 26 letters of the alphabet with systematic tracing practice.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Does the alphabet template include both uppercase and lowercase?", a: "Yes — and you control the mix. Show \"Aa Bb Cc\" pairs, uppercase only, or lowercase only, depending on what your lesson is covering." },
      { q: "Should beginners start with print or cursive?", a: "Start with block print. Cursive adds the extra challenge of connected strokes, so save it for students who already form print letters with confidence." },
      { q: "Can I make a sheet with just a few letters?", a: "This generator is built around the full A–Z sequence, but you can type any letters or letter groups into the main Tracing Worksheet Generator for focused practice on just the tricky ones." },
      { q: "Is it free to use?", a: "Completely — no signup, no watermark, and the PDF is yours to reprint whenever the class needs a fresh copy." },
    ],
    relatedTools: [
      { name: "Tracing Worksheet Generator", href: "/tools/tracing-worksheet-generator" },
      { name: "Name Tracing Generator", href: "/tools/name-tracing-generator" }
    ],
    relatedArticles: [],
    howItWorksSteps: [
      { title: "Choose your letter case", desc: "Show uppercase only, lowercase only, or uppercase–lowercase pairs, depending on what the lesson needs." },
      { title: "Pick a style", desc: "Select block print or cursive, then turn on the trace dashes." },
      { title: "Print the workbook", desc: "Preview the A–Z layout, download the PDF, and hand it out." },
    ],
    customizeFeatures: [
      { title: "Letter case options", desc: "Uppercase, lowercase, or paired rows like \"Aa Bb Cc\"." },
      { title: "Print or cursive alphabets", desc: "Block lettering for beginners, script for the next step." },
      { title: "Dotted trace dashes", desc: "Classic tracing guides on every letter." },
      { title: "Guideline styles", desc: "Three-line dotted guides, solid lines, or clean open rows." },
      { title: "Size sliders", desc: "Line height and font size adjust for little hands." },
      { title: "Easy printing", desc: "A4 or Letter sizing, crisp PDF or PNG output, no account required." },
    ],
    whoItsFor: [
      { bold: "Preschool teachers", desc: "Use it for letter-of-the-week routines: print the whole alphabet once, then hand out the featured letter’s row each week. One sheet serves the entire class all year." },
      { bold: "Parents teaching at home", desc: "Get a no-prep alphabet workbook — no hunting for printables, no apps to install, just print and practice." },
      { bold: "Daycare providers", desc: "Keep printed copies in the art corner, where tracing letters doubles as a quiet activity that builds letter recognition." },
    ],
    relatedClosingLineHtml: "Once the alphabet feels easy, the <a href=\"/tools/name-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Name Tracing Generator</a> personalizes practice around each child’s name, and the <a href=\"/tools/tracing-worksheet-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Tracing Worksheet Generator</a> handles any other words you want to add.",
    breadcrumbs: [{ name: "Alphabet Tracing Generator", href: "/tools/alphabet-tracing-generator" }]
  },
  "/tools/handwriting-paper-generator": {
    title: "Printable Lined Handwriting Paper Generator | HandwritingMaker",
    description: "Generate customized lined handwriting paper templates. Adjust line spacing heights, grid colors, and export Letter or A4 PDFs.",
    h1: "Printable Lined Handwriting Paper Generator",
    intro: "Sometimes you don't need a worksheet — you just need good paper. This generator builds custom lined handwriting paper with line heights from 40px to 140px, so young writers get tall guides and older students get compact lines for real assignments. Choose solid or dotted guidelines, tune the colors, and download a print-ready PDF.",
    conclusion: "Produce precise primary or college-ruled writing grids matching any penmanship level.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What line heights can I choose?", a: "Anywhere from 40px to 140px. Small heights suit older students and compact writing; large heights suit young children who are still learning letter sizing." },
      { q: "Can I print in landscape orientation?", a: "Yes. Both A4 and US Letter paper are available in portrait and landscape, so you can make wide practice sheets or sideways journal pages." },
      { q: "Will the printed lines look sharp?", a: "The page is rendered at full size before it is saved as a PDF, so lines print cleanly on a normal home printer. Print at 100% (Actual Size) so the line spacing stays exact." },
      { q: "How is this different from a worksheet generator?", a: "This tool makes blank lined paper with no text on it — the writer supplies the words. Worksheet generators like the Handwriting Worksheet Creator fill the lines with your spelling lists or sentences for structured practice." },
    ],
    relatedTools: [
      { name: "Notebook Paper Generator", href: "/notebook-paper" },
      { name: "Notebook Paper", href: "/notebook-paper" }
    ],
    relatedArticles: [],
    whoItsForHeading: "Who This Paper Is For",
    howItWorksSteps: [
      { title: "Choose a line style", desc: "Solid three-line guides for structured practice, or simple dotted lines for a lighter touch." },
      { title: "Set the line height", desc: "Slide from 40px for compact writing up to 140px for large early-writer lettering — match it to the writer's age and the task at hand." },
      { title: "Download and print", desc: "Pick A4 or US Letter, portrait or landscape, and export a print-ready PDF. No signup, no watermark." },
    ],
    customizeFeatures: [
      { title: "Line heights from 40px to 140px", desc: "One slider covers early writers through adults." },
      { title: "Solid or dotted guidelines", desc: "Full three-line guides or light dotted lines." },
      { title: "Customizable grid colors", desc: "Soft gray for subtle guides, darker tones for high contrast." },
      { title: "A4 and US Letter sizes", desc: "Each available in portrait or landscape orientation." },
      { title: "PDF export", desc: "Sized for A4 or Letter so your line spacing prints true at 100% scale." },
      { title: "Free and unlimited", desc: "Print one page or a whole stack." },
    ],
    extraSection: {
      heading: "Paper for every job",
      body: "Match the paper to the task and everything gets easier. Tall 120–140px lines suit kindergarten and first-grade writers still sizing their letters. Mid-range lines work for spelling tests and handwriting homework in the elementary years. Compact 40–60px lines suit journaling, essay drafts, and note-taking for older students. Teachers often print a class set at one height for the whole term; parents print a few sheets at a time as their child grows into smaller lines.",
    },
    whoItsFor: [
      { bold: "Teachers", desc: "Print spelling-test paper and handwriting homework sheets matched to their grade level, instead of settling for whatever the supply closet has." },
      { bold: "Students", desc: "Grab clean lined paper for journaling, essay drafts, and study notes — with spacing that actually fits their handwriting." },
      { bold: "Parents", desc: "Keep a stack on hand for extra practice at home, printing fresh sheets whenever the old ones run out." },
    ],
    relatedClosingLineHtml: "Need ready-made ruled styles instead? Browse the <a href=\"/notebook-paper\" class=\"text-indigo-600 font-semibold hover:underline\">Notebook Paper</a> collection for wide-ruled, college-ruled, and specialty layouts.",
    breadcrumbs: [{ name: "Handwriting Paper Generator", href: "/tools/handwriting-paper-generator" }]
  },
  "/tools/handwriting-worksheets-grade-1": {
    title: "Printable 1st Grade Handwriting Worksheets | HandwritingMaker",
    description: "Download free printable 1st grade handwriting worksheets. Customize spacings, dotted trace letters, and write paragraphs with high-resolution PDFs.",
    h1: "Printable 1st Grade Handwriting Worksheets",
    intro: "First grade is the year handwriting gets smaller. Children move from the big lines of kindergarten to a 70px line height — about five-eighths of an inch — and that jump trips up plenty of young writers. These worksheets use that first-grade line size as the starting point, with dotted trace and blank-line options for spelling words, sight words, and short sentences.",
    conclusion: "Practice writing full sentences and paragraphs to build 1st grade penmanship confidence.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What is the standard line spacing for 1st grade worksheets?", a: "Most first-grade paper uses lines around five-eighths of an inch tall, which matches the 70px line height preset on this tool. If your school's paper runs slightly larger or smaller, nudge the spacing slider to match." },
      { q: "Should my child trace first or write freehand?", a: "Trace new words first — two or three sessions of dotted tracing build the right motor pattern. Then switch to the blank-line version of the same words so the child writes from memory." },
      { q: "Can I build sheets around our spelling curriculum?", a: "Yes. The sheet uses whatever text you type, so paste in the week's list from any curriculum or workbook and the worksheet is ready in seconds." },
      { q: "Print or cursive in first grade?", a: "Print is the standard for first grade in most classrooms. If your school introduces cursive early, the cursive option is there — but there's no need to rush it." },
    ],
    relatedTools: [
      { name: "Kindergarten Worksheets", href: "/tools/handwriting-worksheets-kindergarten" },
      { name: "Grade 2 Worksheets", href: "/tools/handwriting-worksheets-grade-2" },
      { name: "Name Tracing Generator", href: "/tools/name-tracing-generator" }
    ],
    relatedArticles: [],
    howItWorksSteps: [
      { title: "Start from the 1st grade preset", desc: "Lines are set to the 70px height that matches standard first-grade paper." },
      { title: "Add this week's words", desc: "Type spelling lists, sight words, or a sentence; choose dotted tracing for new words or blank guidelines for review." },
      { title: "Print and practice", desc: "Download the PDF sized for A4 or Letter and run off a class set or a single homework sheet." },
    ],
    customizeFeatures: [
      { title: "1st grade line preset", desc: "70px line height, sized for the kindergarten-to-first-grade transition." },
      { title: "Spelling and sight-word input", desc: "Build sheets around your actual weekly word lists." },
      { title: "Dotted trace mode", desc: "Trace new or tricky words before writing them freehand." },
      { title: "Blank guideline option", desc: "Ruled lines with no text for independent practice." },
      { title: "Print or cursive lettering", desc: "Block print as standard, cursive available for early starters." },
      { title: "Classroom-ready printing", desc: "A4 or Letter PDFs at high resolution, made entirely in your browser." },
    ],
    whoItsFor: [
      { bold: "First grade teachers", desc: "Turn the weekly spelling list into a tracing-then-writing worksheet in minutes — trace on Monday, write from memory by Friday." },
      { bold: "Parents supporting homework", desc: "Get sheets that match what the classroom uses, so practice at home reinforces the same line size and letter shapes." },
      { bold: "Tutors", desc: "Work with students who still write large and use the preset as a gentle step down, shrinking the lines gradually instead of all at once." },
    ],
    relatedClosingLineHtml: "When smaller lines feel comfortable, move up to the <a href=\"/tools/handwriting-worksheets-grade-2\" class=\"text-indigo-600 font-semibold hover:underline\">2nd Grade Handwriting Worksheets</a> — and the <a href=\"/tools/sentence-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Sentence Tracing Generator</a> is a good next step for tracing full sentences at this size.",
    breadcrumbs: [{ name: "Grade 1 Worksheets", href: "/tools/handwriting-worksheets-grade-1" }]
  },
  "/tools/handwriting-worksheets-grade-2": {
    title: "Printable 2nd Grade Handwriting Worksheets | HandwritingMaker",
    description: "Download free printable 2nd grade handwriting worksheets. Custom guidelines spacing, dotted letters, and spelling practice lists.",
    h1: "Printable 2nd Grade Handwriting Worksheets",
    intro: "By second grade, most children can form their letters — the work now is fluency and stamina. These worksheets use a 60px line height, the smaller ruling second graders write on, with Sentence Repeat and Free Writing layouts that keep them writing longer passages instead of single words. Feed in the week's spelling list and print a sheet built for real writing practice.",
    conclusion: "Foster neat, consistent writing habits with structured daily worksheets.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What layout is recommended for 2nd graders?", a: "Sentence Repeat or Free Writing with the 60px line spacing works well for most second graders. Sentence Repeat builds fluency through repetition; Free Writing builds stamina for longer pieces." },
      { q: "When should kids stop tracing and switch to blank lines?", a: "Use tracing as a warm-up for new or difficult words, then move to blank lines for everything else. By second grade, most practice should be freehand — tracing is the scaffold, not the building." },
      { q: "Is second grade too early for cursive?", a: "Many schools introduce cursive in second or third grade. If yours does, generate the week's familiar spelling words in cursive so students learn new letterforms with words they already know." },
      { q: "Can I reuse the same template every week?", a: "Yes — just swap the text. Type the new spelling list, keep your layout and spacing settings, and download a fresh sheet. A week's worth of worksheets takes a few minutes." },
    ],
    relatedTools: [
      { name: "Grade 1 Worksheets", href: "/tools/handwriting-worksheets-grade-1" },
      { name: "Handwriting Practice Sheets", href: "/tools/handwriting-practice-sheets" }
    ],
    relatedArticles: [],
    howItWorksSteps: [
      { title: "Start from the 2nd grade preset", desc: "Lines are set to the 60px height second graders expect." },
      { title: "Choose a layout", desc: "Pick Sentence Repeat to drill one sentence down the page, or Free Writing for open ruled lines." },
      { title: "Add your words and print", desc: "Type the spelling list or sentences, download the PDF, and hand it out." },
    ],
    customizeFeatures: [
      { title: "2nd grade line preset", desc: "60px line height for growing, more confident writers." },
      { title: "Sentence Repeat layout", desc: "One sentence repeated down the page for fluency drills." },
      { title: "Free Writing layout", desc: "Open ruled lines for paragraphs and longer work." },
      { title: "Spelling list input", desc: "Sheets built around your actual weekly words." },
      { title: "Dotted trace on demand", desc: "Keep trace mode for tricky words, blank lines for the rest." },
      { title: "Quick export", desc: "A4 or Letter, high-resolution PDF or PNG, no signup standing between you and the printer." },
    ],
    whoItsFor: [
      { bold: "Second grade teachers", desc: "Get a weekly workhorse: spelling sentences on Monday in trace mode, the same sentences in Free Writing by Thursday, all from one tool." },
      { bold: "Parents building writing stamina at home", desc: "Print longer sheets than most workbooks offer — more lines, at the unbeatable cost of zero." },
      { bold: "Students meeting cursive", desc: "Try the cursive style on familiar words first, so the new letterforms don’t compete with new vocabulary at the same time." },
    ],
    relatedClosingLineHtml: "Coming from larger lines? The <a href=\"/tools/handwriting-worksheets-grade-1\" class=\"text-indigo-600 font-semibold hover:underline\">1st Grade Handwriting Worksheets</a> use the bigger 70px ruling — and the <a href=\"/tools/handwriting-practice-sheets\" class=\"text-indigo-600 font-semibold hover:underline\">Handwriting Practice Sheets</a> generator offers extra layouts like dotted trace and blank lines for any age.",
    breadcrumbs: [{ name: "Grade 2 Worksheets", href: "/tools/handwriting-worksheets-grade-2" }]
  },
  "/tools/handwriting-worksheets-kindergarten": {
    title: "Printable Kindergarten Handwriting Worksheets | HandwritingMaker",
    description: "Download free printable kindergarten handwriting worksheets. Large guidelines spacing, starting dots, and shape tracing guides.",
    h1: "Printable Kindergarten Handwriting Worksheets",
    intro: "Small hands need big lines. This generator builds kindergarten handwriting worksheets with large 80px guidelines that give four-, five-, and six-year-olds room to form each letter without squeezing. Type a child's name, a short letter range, or a simple word, and the tool turns it into a printable sheet designed for tracing first and independent writing second.",
    conclusion: "Make handwriting instruction fun and interactive for kindergarten students.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "What age are these kindergarten worksheets made for?", a: "They suit children roughly ages four to six — the preschool and kindergarten years. The large 80px guidelines match the stage when kids can grip a pencil but still need generous space to shape letters." },
      { q: "Should my child trace the dotted letters or write on the blank lines?", a: "Start with tracing. Dotted letters with starting dots teach correct stroke direction, and once a child can trace a letter smoothly a few times, they're usually ready to try it on the solid guidelines below." },
      { q: "Can I make a worksheet with just my child's name?", a: "Yes — type the name into the text box and the generator fills the sheet with it. Name writing is one of the most motivating first tasks because the word belongs to the child." },
      { q: "Do I need an account to download the worksheets?", a: "No. Everything is free to generate and print, with no signup and no watermark on the PDF." },
    ],
    relatedTools: [
      { name: "Tracing Worksheet Generator", href: "/tools/tracing-worksheet-generator" },
      { name: "Grade 1 Worksheets", href: "/tools/handwriting-worksheets-grade-1" }
    ],
    relatedArticles: [],
    whoItsForHeading: "Who These Worksheets Are For",
    howItWorksSteps: [
      { title: "Type short practice text", desc: "A first name, a letter range like Aa–Dd, or one simple word is plenty — young writers focus better when a sheet has a single job." },
      { title: "Choose a tracing style", desc: "Dotted letters with starting dots suit children still learning each letter's shape; solid guidelines suit kids ready to try letters on their own." },
      { title: "Print one copy per child", desc: "The sheet downloads as a PDF sized for A4 or US Letter paper, so a whole class set takes minutes and there's no account to create." },
    ],
    customizeFeatures: [
      { title: "Extra-large 80px guidelines", desc: "Tall three-line guides sized for developing pencil control." },
      { title: "Dotted tracing letters with starting dots", desc: "Every letter shows where the pencil begins." },
      { title: "Name-writing mode", desc: "Type any child's name and get a full sheet of it." },
      { title: "Letter-range sheets", desc: "Practice Aa–Ff or any group of letters in order." },
      { title: "Shape tracing guides", desc: "Simple lines and curves that build the strokes letters are made of." },
      { title: "Clean PDF export", desc: "A4 or Letter, sharp at print size, free with no watermark." },
    ],
    whoItsFor: [
      { bold: "Preschool teachers", desc: "Use these for morning name-writing practice — one personalized sheet per child, printed in a batch before the week starts." },
      { bold: "Kindergarten teachers", desc: "Build letter-of-the-week sheets and fine-motor centers around them, moving kids from dotted tracing to solid guidelines as the year goes on." },
      { bold: "Parents", desc: "Print a few sheets at home to practice name writing before kindergarten starts, or to give a child extra repetitions on whichever letters are giving them trouble." },
    ],
    relatedClosingLineHtml: "If your child is ready to move past single letters, try the <a href=\"/tools/name-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Name Tracing Generator</a> for personalized name sheets or the <a href=\"/tools/alphabet-tracing-generator\" class=\"text-indigo-600 font-semibold hover:underline\">Alphabet Tracing Generator</a> for full A–Z practice.",
    breadcrumbs: [{ name: "Kindergarten Worksheets", href: "/tools/handwriting-worksheets-kindergarten" }]
  },
  "/tools/cursive-practice-sheets": {
    title: "Free Cursive Practice Sheets Generator | HandwritingMaker",
    description: "Generate free printable cursive practice sheets and worksheets instantly. Customize slant guidelines, connected script styles, and download a print-ready PDF.",
    h1: "Free Cursive Practice Sheets Generator",
    intro: "Cursive fades fast when you stop using it — and it comes back faster than you'd expect with the right practice. This generator turns any word, sentence, or quote into a cursive practice sheet in connected script, with slant guidelines you can adjust to your comfort level. Kids learning cursive for the first time and adults rebuilding it after years of typing both start here.",
    conclusion: "Build a complete set of cursive writing practice sheets, from single-letter drills to full sentences, and print them instantly at home or in the classroom.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Can I download my cursive practice sheets as a PDF?", a: "Yes. Every sheet exports as a print-ready PDF in A4 or US Letter size. Print one copy or a whole stack — the download is free and carries no watermark." },
      { q: "Is this suitable for adults relearning cursive?", a: "Absolutely — it's one of the most common uses. Set the line spacing wide, start in dotted trace mode with short familiar words, and move to solid script with longer sentences as the letter connections come back." },
      { q: "What's the difference between dotted trace and solid script?", a: "Dotted trace shows faint letterforms to trace directly over, which rebuilds the path of each stroke. Solid script shows a clean model to copy from, which trains recall and fluency once the paths feel familiar." },
      { q: "Should I learn the cursive alphabet before practicing words?", a: "It helps. If individual letterforms feel shaky, start with the Cursive Alphabet Practice Sheets to drill A–Z in uppercase and lowercase, then come back here for words and sentences." },
    ],
    relatedTools: [
      { name: "Cursive Alphabet Practice Sheets", href: "/tools/cursive-alphabet-practice-sheets" },
      { name: "Handwriting Practice Sheets", href: "/tools/handwriting-practice-sheets" }
    ],
    relatedArticles: [
      { name: "Free Cursive Handwriting Practice Sheets", href: "/blog/cursive-handwriting-practice-sheets" },
      { name: "How to Make Cursive Handwriting Practice Sheets", href: "/blog/how-to-make-cursive-handwriting-practice-sheets" }
    ],
    whoItsForHeading: "Who These Sheets Are For",
    howItWorksSteps: [
      { title: "Type the text you want to practice", desc: "A spelling list, a favorite quote, a paragraph from a book — the generator renders whatever you type in flowing connected script." },
      { title: "Set the difficulty", desc: "Switch on dotted tracing to trace each letter's path, or use solid script to copy from the model. Adjust the slant and line spacing until the sheet feels comfortable to write on." },
      { title: "Download the PDF and print a stack", desc: "Sheets export as print-ready PDFs in A4 or US Letter, so you can print a full week of daily practice in one go — free, with nothing to install." },
    ],
    customizeFeatures: [
      { title: "Connected cursive script", desc: "Every word renders in joined-up lettering with proper connections between letters." },
      { title: "Adjustable slant guidelines", desc: "Tilt the guides to match the slant you're learning or relearning." },
      { title: "Dotted trace mode", desc: "Trace faint letterforms to rebuild stroke paths before writing freehand." },
      { title: "Solid copy mode", desc: "A clean model line to copy from once tracing feels easy." },
      { title: "Flexible line spacing and letter size", desc: "Roomy for beginners, compact for confident writers." },
      { title: "One-click PDF download", desc: "A4 or Letter, ready to print, no login required." },
    ],
    extraSection: {
      heading: "A simple daily practice routine",
      body: "Ten focused minutes a day beats an hour once a week. Pick one sentence or short paragraph and use it all week: trace it in dotted mode for the first two days, then switch to solid script and copy it from the model for the rest of the week. By Friday, the joins that felt awkward on Monday usually flow. Print five copies on Sunday night and the whole week is ready.",
    },
    whoItsFor: [
      { bold: "Elementary students learning cursive in school", desc: "Get sheets built from their actual spelling words and vocabulary, so handwriting practice doubles as study time." },
      { bold: "Adults relearning cursive", desc: "After years of keyboards, get a low-pressure way back — start with dotted tracing on familiar words, then move to copying quotes and sentences in solid script. Our guide to the <a href=\"/blog/best-handwriting-practice-sheets-for-adults\" class=\"text-indigo-600 font-semibold hover:underline\">best handwriting practice sheets for adults</a> pairs well with these sheets if you want a fuller routine." },
      { bold: "Homeschool families", desc: "Print a daily cursive sheet in under a minute, keeping handwriting in the routine without hunting for workbooks." },
    ],
    relatedClosingLineHtml: "If single letters still feel unfamiliar, start with the <a href=\"/tools/cursive-alphabet-practice-sheets\" class=\"text-indigo-600 font-semibold hover:underline\">Cursive Alphabet Practice Sheets</a> to drill A–Z first — then come back here to turn those letters into real writing.",
    breadcrumbs: [{ name: "Cursive Practice Sheets", href: "/tools/cursive-practice-sheets" }]
  },
  "/tools/cursive-alphabet-practice-sheets": {
    title: "Free Cursive Alphabet Practice Sheets | HandwritingMaker",
    description: "Generate free printable cursive alphabet practice sheets. Trace or copy all 26 uppercase and lowercase cursive letters, then download a print-ready PDF.",
    h1: "Free Cursive Alphabet Practice Sheets",
    intro: "Every smooth cursive word is just individual letters joined well. This generator drills the foundation: all 26 letters of the cursive alphabet in uppercase and lowercase, rendered with dotted tracing guides so you can learn each letterform correctly before worrying about words. Adjust the slant, spacing, and letter size to fit the writer, then print.",
    conclusion: "Master cursive letter formation one letter at a time, then move on to full cursive practice sheets once the alphabet feels natural.",
    lastUpdated: "2026-11-02",
    author: AUTHOR_INFO,
    faqs: [
      { q: "Does this cover both uppercase and lowercase cursive letters?", a: "Yes. The preset includes the full alphabet in both forms — Aa through Zz — so you can practice capitals and lowercase letters side by side on the same sheet." },
      { q: "Can I drill just a few letters instead of the whole alphabet?", a: "Yes. Replace the preset text with only the letters you want — say, the capitals Q, Z, and F — and the generator rebuilds the sheet around them instantly." },
      { q: "What should I practice after the cursive alphabet?", a: "Move to the Cursive Practice Sheets generator, which uses the same connected script for full words and sentences. That's where individual letterforms turn into real writing." },
      { q: "Do I need to know print handwriting first?", a: "It helps to be comfortable forming print letters, since cursive builds on the same shapes. But many learners pick up cursive directly — the dotted tracing guides show each stroke from scratch either way." },
    ],
    relatedTools: [
      { name: "Cursive Practice Sheets", href: "/tools/cursive-practice-sheets" },
      { name: "Alphabet Tracing Generator", href: "/tools/alphabet-tracing-generator" }
    ],
    relatedArticles: [
      { name: "Free Cursive Handwriting Practice Sheets", href: "/blog/cursive-handwriting-practice-sheets" },
      { name: "Cursive Strokes for Beginners", href: "/blog/cursive-strokes-for-beginners" }
    ],
    howItWorksSteps: [
      { title: "Load the alphabet", desc: "The full A–Z preset — uppercase and lowercase side by side — is ready out of the box, or type only the letters you want to drill." },
      { title: "Trace and tune", desc: "Trace the dotted letterforms slowly, watching how each stroke enters and exits. Widen the spacing and enlarge the letters while you're learning; tighten them as control improves." },
      { title: "Print and repeat", desc: "Download the PDF in A4 or US Letter and work through the alphabet a few letters at a time — short, repeated sessions beat one long sitting." },
    ],
    customizeFeatures: [
      { title: "Full A–Z preset", desc: "All 26 uppercase and lowercase cursive letters, ready instantly." },
      { title: "Dotted tracing guides", desc: "Faint letterforms to trace, teaching correct stroke paths." },
      { title: "Custom letter selection", desc: "Type just the letters giving you trouble and drill those alone." },
      { title: "Adjustable slant", desc: "Match the guides to the cursive style you're learning." },
      { title: "Letter size and spacing controls", desc: "Large and roomy for beginners, compact for practice." },
      { title: "Free PDF export", desc: "Prints sharp on A4 or Letter with no account needed." },
    ],
    extraSection: {
      heading: "How to practice the cursive alphabet",
      body: "Don’t march from A to Z in order — group letters by shape instead. Practice the small-loop letters (e, l, h) together, then the tall downstroke letters (f, j, g), then the capitals, which follow their own logic. Most cursive letters are built from three basic moves: an upward entry stroke, a connecting loop, and a downward exit stroke. Spend a few minutes on those moves alone before tackling full letters, and the alphabet gets noticeably easier. Once each letter feels steady on its own, practice the joins: write letter pairs like “th”, “er”, and “ou” to train the connections. That’s the bridge to real cursive writing.",
    },
    whoItsFor: [
      { bold: "Children learning cursive for the first time", desc: "Get a patient starting point — one letter at a time, with tracing guides that show exactly how each shape is built." },
      { bold: "Adults relearning cursive", desc: "Use it to fix the specific letters that never stuck — usually the capitals and the tricky joins — before moving on to full sentences." },
      { bold: "Tutors and teachers", desc: "Print targeted drills for students who reverse letters or struggle with connections, instead of handing out another full workbook page." },
    ],
    relatedClosingLineHtml: "Once the alphabet feels natural, head to the <a href=\"/tools/cursive-practice-sheets\" class=\"text-indigo-600 font-semibold hover:underline\">Cursive Practice Sheets</a> generator to put those letters to work in words and sentences.",
    breadcrumbs: [{ name: "Cursive Alphabet Practice Sheets", href: "/tools/cursive-alphabet-practice-sheets" }]
  },
  // NOTE: "/tools/alphabet-tracing-worksheets", "/tools/sentence-tracing-worksheets", and
  // "/tools/name-tracing-worksheets" were merged into their respective "-generator" siblings
  // on 2026-10-07 (301 redirects in next.config.mjs). Each was an identical-preset duplicate
  // and a true orphan page (zero inbound internal links, SEMrush showed the sibling pages
  // competing against each other for the same queries like "tracer generator").
};

// BLOG CLUSTERS DATABASE
export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  h1: string;
  category: "notebook" | "cornell" | "tracing" | "handwriting" | "calligraphy" | "signature" | "planners";
  contentMarkdown: string;
  lastUpdated: string;
  relatedTool: { name: string; href: string };
  faqs?: { q: string; a: string }[];
  relatedArticles?: { name: string; href: string }[];
}

export const BLOG_ARTICLES: Record<string, BlogArticle> = {
  "wide-ruled-vs-college-ruled": {
    slug: "wide-ruled-vs-college-ruled",
    title: "Wide Ruled vs College Ruled Paper: Key Spacing Differences",
    description: "Compare wide ruled vs college ruled paper. Check line spacing metrics (8.7mm vs 7.1mm) and print guides for school students and adults.",
    h1: "Wide Ruled vs College Ruled Paper Spacing",
    category: "notebook",
    lastUpdated: "2026-06-26",
    relatedTool: { name: "Notebook Paper Generator", href: "/notebook-paper" },
    contentMarkdown: `
### Key Line Spacing Metric Differences
Understanding lined paper standards helps you choose the right notebook. Wide ruled paper is spaced at 11/32 in (8.7mm), whereas College ruled paper uses a narrower 9/32 in (7.1mm) gap.

- **Wide Ruled:** Standard for elementary school classrooms. The wider spacing gives young learners ample space to write uppercase and lowercase letters without crowding.
- **College Ruled:** Preferred by high school, college, and office writers. It fits more text rows on a single page, making it highly efficient for note taking.

### Comparison Table
| Feature | Wide Ruled Paper | College Ruled Paper |
| :--- | :--- | :--- |
| Line Spacing | 11/32 in (8.7 mm) | 9/32 in (7.1 mm) |
| Standard Margin | 1.25 inches (left side red line) | 1.25 inches |
| Primary User | Grade school kids (Ages 5-10) | Older students & adults |
| Lines per A4 | ~28 lines | ~34 lines |

### Which Should You Choose?
Pick based on handwriting size, not grade level alone. If letters still sit unevenly on the baseline, or a student is still learning stroke height, wide ruled gives enough vertical room to keep individual letters legible. Once handwriting settles into a consistent, compact size, typically around ages 10-12, college ruled lets a page hold more notes without cramming, which matters most for lecture notes, dense study guides, or long-form journaling.

For adults relearning or refining penmanship, wide ruled is usually the better starting point even though it isn't marketed for adults. The extra spacing makes it easier to spot inconsistent letter height and slant while rebuilding muscle memory, and you can move to college ruled later once the habit is stable.

### How to Tell Them Apart at a Glance
Both use the same 1.25 inch left margin line, so spacing is the only reliable way to identify a sheet. Hold a ruler against five lines: wide ruled measures roughly 1.75 in (11/32 in x 5), college ruled measures roughly 1.4 in (9/32 in x 5). If you're buying pre-printed notebooks, wide ruled is also commonly labeled "legal ruled" or "8.5mm ruled" on packaging outside the US.

### Building Your Own Custom Spacing
Standard wide and college ruling are just two fixed presets. If a student needs something in between (for example, a 9-10mm spacing that isn't sold in stores), you don't need to special-order paper. Set an exact line height on our [Notebook Paper Generator](/notebook-paper) and print it directly, or start from the ready-made [wide ruled](/notebook-paper/wide-ruled) and [college ruled](/notebook-paper/college-ruled) presets and adjust margins, colors, or headers from there. For handwriting practice specifically — rather than note-taking — the [Handwriting Paper Generator](/tools/handwriting-paper-generator) lets you dial in line heights from 40px to 140px to match the writer's age and stage.
    `,
    faqs: [
      { q: "Is wide ruled or college ruled better for adults?", a: "College ruled is standard for most adult note-taking since it fits more lines per page. However, if you're working on improving your handwriting, wide ruled gives more room to catch and correct inconsistent letter height while you rebuild muscle memory." },
      { q: "What is the actual spacing difference in millimeters?", a: "Wide ruled lines are spaced 8.7mm apart. College ruled lines are spaced 7.1mm apart, about 1.6mm narrower per line." },
      { q: "Does wide ruled or college ruled fit more text on a page?", a: "College ruled fits more lines per page (around 34 on an A4 sheet versus around 28 for wide ruled), because its lines sit closer together." },
      { q: "Can I print custom line spacing that isn't wide or college ruled?", a: "Yes. Our Notebook Paper Generator lets you set an exact custom line height in addition to the standard wide and college ruled presets, so you can match any spacing you need." },
    ],
    relatedArticles: [
      { name: "How to Print Notebook Paper at Home (Actual Size)", href: "/blog/how-to-print-notebook-paper" },
      { name: "How to Improve Handwriting as an Adult", href: "/blog/how-to-improve-handwriting-as-an-adult" },
    ],
  },
  "how-to-print-notebook-paper": {
    slug: "how-to-print-notebook-paper",
    title: "How to Print Lined Notebook Paper at Home (Actual Size)",
    description: "Learn how to print lined paper templates, graph sheets, or primary guidelines to scale on standard printers.",
    h1: "How to Print Lined Notebook Paper at Home",
    category: "notebook",
    lastUpdated: "2026-06-26",
    relatedTool: { name: "Lined Notebook Paper Maker", href: "/notebook-paper" },
    contentMarkdown: `
### Avoid Common Scaling Pitfalls
When downloading printable PDFs, printers default to 'Scale to fit printable area'. This shrinks the grid lines, modifying the line spacing.

1. **Download PDF:** Get the letter or A4 template from our [Notebook Paper Generator](/notebook-paper).
2. **Open Dialog:** Click print or open the PDF in Adobe Acrobat reader.
3. **Configure Settings:** Look under 'Page Sizing & Handling'. Select **'Actual Size'** or set scale to **'100%'**.
4. **Select Paper Tray:** Match your format (A4 or Letter) to your printer's physical paper size.
5. **Print:** Hit print. Your ruled line gaps will print exactly to specifications.
    `,
  },
  "what-are-cornell-notes": {
    slug: "what-are-cornell-notes",
    title: "What Are Cornell Notes? Study System Guide for Students",
    description: "Learn what Cornell notes are, who developed them, and how the 3-section layout boosts memory retention.",
    h1: "What Are Cornell Notes?",
    category: "cornell",
    lastUpdated: "2026-06-26",
    relatedTool: { name: "Cornell Notes Generator", href: "/cornell-notes" },
    contentMarkdown: `
### Structured for High Performance
Developed in the 1950s by Walter Pauk at Cornell University, Cornell Notes is a structured taking method that enhances memory recall. The layout divides the notebook page into three clear segments:

- **Cue Column (Left Side):** 2.5-inch column for questions, keywords, and active recall prompts.
- **Lecture Notes (Right Side):** 6-inch area for detail definitions, charts, and main lecture points.
- **Summary (Bottom Box):** 2-inch footer box summarizing the page contents in 3-4 sentences.

Using this structured format allows you to cover the right side and quiz yourself on the questions in the left cue column. Generate a custom sheet on our [Cornell Notes Generator](/cornell-notes).
    `,
  },
  "how-letter-tracing-helps": {
    slug: "how-letter-tracing-helps",
    title: "How Letter Tracing Worksheets Support Child Development",
    description: "Learn how tracing letters builds fine motor skills, pencil control, and phonic associations in preschool toddlers.",
    h1: "How Letter Tracing Worksheets Support Development",
    category: "tracing",
    lastUpdated: "2026-06-26",
    relatedTool: { name: "Letter Tracing Worksheets", href: "/letter-tracing" },
    contentMarkdown: `
### Building Pencil Grip & Control
Tracing dashed letters does more than teach spelling - it establishes the gross and fine motor skills necessary for writing coordination.

- **Muscle Memory:** Tracing lines trains fingers in stroke order and pen control.
- **Phonics Recognition:** Using pictures (e.g. 🍎 next to A) links verbal sounds to printed glyphs.
- **Self-Confidence:** Kids feel successful when they can trace neat shapes before writing freehand.

Customize name worksheets for your class or toddler using our [Letter Tracing Generator](/letter-tracing). For structured word and sentence tracing on any custom text, the [Tracing Worksheet Generator](/tools/tracing-worksheet-generator) generates dotted-line practice sheets in seconds. Once individual letters are mastered, the [Alphabet Tracing Generator](/tools/alphabet-tracing-generator) drills all 26 letters A–Z in sequence.
    `,
  },
  // NOTE: "how-to-improve-handwriting" was removed (2026-08-17) — it was a ~120-word
  // duplicate of the much stronger /blog/how-to-improve-handwriting-as-an-adult article
  // and was diluting that page's ranking signal. Now 301-redirected in next.config.mjs.
};
