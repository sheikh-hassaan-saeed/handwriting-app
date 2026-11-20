# AdSense Approval Audit — handwritingmaker.com

Audit date: 2026-11-20. Covers every route in the codebase (165 prerendered pages) plus live checks of the production domain.

Fixes are committed locally in two commits (`ef21513`, `9e83b08`) and **not pushed**. They include owner-input placeholders that would render on the live site, so fill those in (Section 6) before deploying.

---

## 1. Readiness verdict: **Ready after fixes**

The technical and legal basics are now in good shape:

- HTTPS is enforced and `robots.txt` is clean.
- The sitemap only lists indexable 200 pages.
- No ad scripts or other ad networks are live.
- The legal pages are complete and linked from every page.
- `ads.txt` is in place.
- The 100 template-swap name pages are already `noindex`.

Three things still stand between the site and a safe application:

1. **The author identity** needs to be real and verifiable. The previous persona couldn't be confirmed and is now a placeholder.
2. **About 19 thin pages** are still indexed: five ~150-word blog posts, nine planner pages, three resource hubs, `/fonts` and `/cornell-notes/template`.
3. **The in-depth content base is small.** Only about 9 pages are substantial articles; most other indexed pages are generator tools built on the same component.

None of these is hard to fix. Fill in the owner details, approve the noindex/merge list in Section 7, and ideally add 3–5 articles written from your own experience before applying.

---

## 2. Score summary (indexable content pages, excluding legal/About/Contact)

| Category | Count | Pages |
|---|---|---|
| **Strong** | 9 | 7 long static blog posts, `/letter-tracing`, `/blog/wide-ruled-vs-college-ruled` |
| **Needs work** | 29 | Homepage, 15 tool pages, `/handwriting-practice`, `/notebook-paper` + 6 presets, `/cornell-notes`, `/calligraphy`, `/signature-generator`, `/printables`, `/letter-tracing/custom-name` |
| **Thin** (<200 words of real content) | 19 | 5 short blog posts, 9 planner pages, 3 resource hubs, `/fonts`, `/cornell-notes/template` |
| **Duplicate / overlapping intent** | 4 groups | See Section 7 |
| **Already noindex** | 100 | `/letter-tracing/name/*` (template swaps; correctly hidden) |

Rubric averages are my assessment against the 10 criteria in the brief. Word counts are the rendered main area (header/footer/nav excluded). On tool pages they include UI labels, so the real prose is smaller than the number shown.

---

## 3. Critical blockers (fix before applying)

1. **Author identity: all pages showing an author box (~45 pages) — `lib/seo.ts` `AUTHOR_INFO`.**
   - **Problem:** The site credited "Hassaan Riaz, Chief Educational Resource Designer, who has spent years researching penmanship, occupational motor skills…". It also linked LinkedIn and GitHub profiles named `hassaanriaz`. Your git identity is Sheikh Hassaan Saeed, so the name and both profile links may not be yours. The credential claims can't be verified. Unverifiable expertise and fake personas are exactly what reviewers look for.
   - **Fix:** Replaced with `[[OWNER INPUT]]` placeholders and removed the profile links. Fill in your real name (or a pen name you're comfortable owning), your real role, and a bio based only on true background. Re-add `sameAs` links only to profiles that are actually yours.
2. **About page: `/about`.**
   - **Problem:** The old page was three generic sentences with no person behind the site.
   - **Fix:** Rewritten with factual sections. You still need to fill in two placeholders: who runs the site and why, and how content is written (including AI use).
3. **Contact form: `/contact`.**
   - **Problem:** The form was fake. It showed "Message Sent Successfully! ... we'll get back to you within 24 to 48 hours" without sending anything. A reviewer testing it would see a deceptive page.
   - **Fix:** Fixed. It now opens the visitor's email app addressed to `hello@handwritingmaker.com` (the address already in your Privacy Policy). **You must confirm that inbox actually receives mail.**
4. **Thin indexed pages: 19 URLs listed in Section 7.**
   - **Problem:** "Low value content" is the #1 rejection reason.
   - **Fix:** Approve noindex/merge, or ask me to expand specific ones.
5. **EEA/UK consent (CMP), required once ads serve.**
   - **Problem:** Google requires a certified consent management platform for EEA/UK visitors. The Privacy Policy now says consent is collected there, so that must be true when ads go live.
   - **Fix:** Enable Google's own "Privacy & messaging" CMP in AdSense at approval time.

---

## 4. Page-by-page table

Action key: keep · expand · merge · noindex. Status: **fixed** (changed in this audit) · **needs owner** · **pending approval**.

### Blog

| URL | Words | Rubric avg | AI-pattern hits (after fixes) | Action | Status |
|---|---|---|---|---|---|
| /blog/cursive-handwriting-practice-sheets | 2,999 | 4.2 | Ends in FAQ (same skeleton as all static posts) | keep | — |
| /blog/how-to-improve-handwriting-as-an-adult | 2,766 | 3.9 | "Proven"/"expert tips" removed. Unsourced timelines remain ("3 to 4 weeks", "60 to 90 days", "50% speed") | keep; source or soften the timelines | fixed (puffery) / needs owner (timelines) |
| /blog/cursive-strokes-for-beginners | 2,227 | 3.4 | **32 em-dashes** in ~1,400 words; FAQ ending | keep; hand-edit the dashes | needs owner / pending |
| /blog/best-handwriting-practice-sheets-for-adults | 1,527 | 3.7 | "Research suggests" removed | keep | fixed |
| /blog/how-to-convert-handwriting-to-a-font | 1,430 | 3.8 | none | keep | — |
| /blog/handwriting-without-tears-alternatives-free | 1,358 | 3.7 | 3× "Research suggests" removed | keep | fixed |
| /blog/how-to-make-cursive-handwriting-practice-sheets | 1,254 | 3.3 | Shares an identical H2 ("What Makes a Good Cursive Practice Sheet?") with the cursive sheets post | keep; differentiate | pending |
| /blog/wide-ruled-vs-college-ruled | 723 | 3.4 | none | keep | — |
| /blog/how-letter-tracing-helps | 203 | 1.9 | Generic, ~120-word body | expand or noindex | pending approval |
| /blog/what-are-cornell-notes | 195 | 2.0 | Same 4-part skeleton as other dynamic posts | expand or noindex | pending approval |
| /blog/how-to-print-notebook-paper | 190 | 2.2 | Same skeleton | expand or noindex | pending approval |
| /blog/professional-signature-ideas | 159 | 1.8 | Generic advice, no examples | expand or noindex | pending approval |
| /blog/modern-calligraphy | 154 | 1.9 | Generic, no specifics | expand or noindex | pending approval |
| /blog (index) | 433 | — | "Proven" removed from card | keep | fixed |

### Tools and hubs

| URL | Words | Rubric avg | AI-pattern hits | Action | Status |
|---|---|---|---|---|---|
| / (homepage) | 709 | 3.3 | "SaaS-grade", "letter-perfect", "absolute privacy", "internet's leading" removed | keep | fixed |
| /letter-tracing | 853 | 3.6 | Badge removed | keep | fixed |
| /handwriting-practice | 496 | 3.2 | Duplicated intro removed | keep; differentiate from 2 overlapping tool pages | fixed / pending |
| /tools/handwriting-practice-sheets | 880 | 3.3 | "Research suggests" removed | keep | fixed |
| /tools/cursive-practice-sheets | 833 | 3.3 | Badge removed | keep | fixed |
| /tools/cursive-alphabet-practice-sheets | 803 | 3.2 | Badge removed | keep | fixed |
| /tools/handwriting-worksheet-creator | 704 | 3.0 | False "vector PDF" claims fixed | keep | fixed |
| /tools/handwriting-paper-generator | 685 | 3.0 | False "drawn as clean geometry / vector" claims fixed | keep (merge target) | fixed |
| /tools/handwriting-worksheets-kindergarten | 670 | 3.0 | Badge removed | keep | fixed |
| /tools/tracing-worksheet-generator | 662 | 3.3 | Badge removed | keep | fixed |
| /tools/handwriting-worksheets-grade-1 | 651 | 3.0 | Badge removed | keep | fixed |
| /tools/name-tracing-generator | 649 | 3.1 | Badge removed | keep (merge target) | fixed |
| /tools/handwriting-worksheets-grade-2 | 640 | 3.0 | Badge removed | keep | fixed |
| /tools/sentence-tracing-generator | 619 | 3.0 | Badge removed | keep | fixed |
| /tools/animated-handwriting-generator | 596 | 3.2 | "Research suggests" removed | keep | fixed |
| /tools/alphabet-tracing-generator | 587 | 3.0 | Badge removed | keep | fixed |
| /tools/handwriting-practice-generator | 494 | 2.8 | False "vector PDF" claim fixed | merge or differentiate | pending approval |
| /tools/blank-handwriting-paper | 471 | 2.7 | Badge removed | merge → handwriting-paper-generator | pending approval |
| /tools/printable-handwriting-worksheets | 459 | 3.0 | none | keep (directory hub) | — |
| /printables | 611 | 3.0 | False "vector PDF" FAQ fixed | keep | fixed |
| /signature-generator | 374 | 2.8 | Badge removed | expand | pending |
| /notebook-paper | 339 | 2.8 | Duplicated intro and false fallback removed | expand | fixed / pending |
| /cornell-notes | 331 | 2.8 | Duplicated intro removed | expand | fixed / pending |
| /calligraphy | 326 | 2.9 | Duplicated intro removed | expand | fixed / pending |
| /notebook-paper/college-ruled | 308 | 2.7 | — | expand | pending |
| /notebook-paper/wide-ruled | 300 | 2.7 | — | expand | pending |
| /letter-tracing/custom-name | 291 | 2.4 | Same intent as /tools/name-tracing-generator | merge | pending approval |
| /notebook-paper/kindergarten | 271 | 2.5 | — | expand | pending |
| /notebook-paper/dot-grid | 263 | 2.5 | — | expand | pending |
| /notebook-paper/primary-writing | 262 | 2.5 | — | expand | pending |
| /notebook-paper/graph-paper | 260 | 2.5 | — | expand | pending |
| /cornell-notes/template | 233 | 2.2 | Near-duplicate of /cornell-notes | merge | pending approval |
| /printables/daily-planner | 184 | 2.1 | Only intro + 1 FAQ remain once boilerplate is removed | noindex or expand | pending approval |
| /printables/weekly-planner | 177 | 2.1 | same | noindex or expand | pending approval |
| /printables/monthly-planner | 179 | 2.1 | same | noindex or expand | pending approval |
| /printables/habit-tracker | 179 | 2.1 | same | noindex or expand | pending approval |
| /printables/reading-log | 178 | 2.1 | same | noindex or expand | pending approval |
| /printables/study-planner | 176 | 2.1 | same | noindex or expand | pending approval |
| /printables/assignment | 173 | 2.1 | same | noindex or expand | pending approval |
| /printables/journal-page | 172 | 2.0 | same | noindex or expand | pending approval |
| /printables/todo-list | 162 | 2.0 | same | noindex or expand | pending approval |
| /teacher-resources | 184 | 1.8 | Link directory, little original text | noindex or merge | pending approval |
| /fonts | 180 | 1.9 | Short list with no comparison detail | noindex or expand | pending approval |
| /student-resources | 163 | 1.7 | Link directory | noindex or merge | pending approval |
| /study-resources | 139 | 1.6 | Link directory | noindex or merge | pending approval |
| /letter-tracing/name/* (100 pages) | ~290 each | 1.5 | Template swap (name only changes) | keep noindex, or delete + 301 | already noindex / pending |

### Trust and legal

| URL | Words | Status |
|---|---|---|
| /about | 309 | fixed; **needs owner** (2 placeholders) |
| /contact | 143 | fixed (real mailto, own metadata); **needs owner** (inbox test) |
| /privacy-policy | 854 | fixed (analytics accuracy, GDPR/UK GDPR, CCPA, consent, email data) |
| /terms | 588 | ok |
| /disclaimer | 302 | **new** |
| 404 page | — | **new** (returns real 404, `noindex`) |

---

## 5. Changes made

**Commit `ef21513` (legal / trust)**
- `app/contact/page.tsx` and new `components/ContactForm.tsx`: removed the fake "Message Sent" flow; the form now builds a `mailto:` to `hello@handwritingmaker.com` and says so honestly. The page is now a server component with its own title (it previously inherited the homepage's "Text to Handwriting Converter" title).
- `lib/constants.ts`: added `CONTACT_EMAIL`.
- `app/about/page.tsx`: rewritten with factual sections plus owner placeholders. Removed "open-source" and "100% data security".
- `app/privacy-policy/page.tsx`:
  - The analytics section now states accurately that no analytics script is installed (it previously said "we may use Google Analytics").
  - Added GDPR/UK GDPR and CCPA/CPRA rights, the consent statement, and how emailed messages are used. Updated the date.
- New `app/disclaimer/page.tsx`: educational-use and OT disclaimer, print-scale accuracy, typed-signature caveat, trademark non-affiliation (HWT, Zaner-Bloser, D'Nealian), ads, corrections.
- New `app/not-found.tsx`: custom 404 with links to the most-used tools.
- `public/ads.txt`: `google.com, pub-2722346158425205, DIRECT, f08c47fec0942fa0`. The publisher ID is the one already in your `google-adsense-account` meta tag.
- `app/sitemap.ts`: added `/disclaimer`.
- `components/SiteFooter.tsx`: added a Disclaimer link.

**Commit `9e83b08` (accuracy / scaled-content signals)**
- `lib/seo.ts`:
  - Every PDF is a rasterised canvas image (`pdf.addImage(..., "PNG")`), so 11 "vector PDF / 300 DPI / clean geometry" claims were false. They now say "print-ready PDF", with print-at-100% advice.
  - Removed "letter-perfect", "absolute privacy" and "democratize access".
  - Author persona replaced with placeholders.
- `components/platform/PlatformLayout.tsx` (~35 pages):
  - Removed the "Detailed Introduction" block that repeated the hero intro word-for-word.
  - Removed the identical "Interactive Workspace Generator" paragraph.
  - Removed a false fallback paragraph ("vector grids… 300 DPI").
  - Removed the "Conclusion" heading and the "Verified High Authority Printables" badge.
  - Added a Disclaimer link to the footer.
- `components/generators/WorksheetPageClient.tsx` (homepage + 13 tools): removed the "SaaS-grade" badge and the "internet's leading free resource" claim. Added About/Contact/Privacy/Terms/Disclaimer links; the homepage previously had **no** legal links.
- `app/letter-tracing/name/[slug]/page.tsx`: footer legal links; "vector PDF" removed from the description.
- 4 files: unsourced "Research suggests…" sentences rewritten as practical advice.
- `how-to-improve-handwriting-as-an-adult` (+ blog index, RSS): "7 Proven Techniques" became "7 Techniques", and "expert tips" became "practical tips".

Verified after the changes:
- `next build` succeeds (165 pages), with no lint errors.
- Every page has a unique title and description.
- No indexable page is missing from the sitemap except the redirect stub.
- In-browser: the contact `mailto` works, homepage footer legal links are present, the 404 status is correct, and `ads.txt` is served as `text/plain`.

---

## 6. Owner action list

- [ ] **`lib/seo.ts` → `AUTHOR_INFO`:** real name, role and bio. Re-add `sameAs` only for profiles you own.
- [ ] **`app/about/page.tsx`:** fill "Who runs HandwritingMaker" and "How content is written and checked". Be honest about AI use; Google doesn't penalise disclosure.
- [ ] Optional but strong for E-E-A-T: a real photo of you on the About page.
- [ ] Send a test email to `hello@handwritingmaker.com` and confirm it arrives. If that inbox doesn't exist, tell me the right address (one constant in `lib/constants.ts`).
- [ ] Confirm `pub-2722346158425205` in `public/ads.txt` matches your AdSense account.
- [ ] `/blog/how-to-improve-handwriting-as-an-adult`: either link a source for the improvement timelines ("3–4 weeks", "60–90 days", "50% speed"), or reword them as your own experience: `[[OWNER INPUT: what happened when you practised]]`.
- [ ] Add first-hand material where you have it: photos of real printed worksheets, a filled-in practice sheet, or a before/after of your own handwriting. This is the single biggest "information gain" lever for the tool pages.
- [ ] Search Console:
  - Confirm no manual actions or security issues.
  - Resubmit the sitemap after deploying.
  - Check `site:handwritingmaker.com`.
- [ ] At approval: enable AdSense's Privacy & messaging CMP for EEA/UK/Switzerland.
- [ ] Reminder: the AdSense account holder must be 18+, with payee details matching a real person or business.
- [ ] **Deploy only after the placeholders above are filled**, then push `main`.

---

## 7. Pending approval (nothing below has been applied)

**Noindex now, or expand with real content** (19 pages):
- 5 short dynamic posts: `how-letter-tracing-helps`, `what-are-cornell-notes`, `how-to-print-notebook-paper`, `professional-signature-ideas`, `modern-calligraphy`.
  - Alternative: I expand each to a genuinely useful article (e.g. Cornell notes with a worked example page; printing with real per-browser print-dialog steps).
- 9 planner pages under `/printables/*`.
  - Alternative: keep them as tools but noindex them, and let `/printables` be the indexed hub.
- `/teacher-resources`, `/student-resources`, `/study-resources`: noindex, or merge into one indexed "Resources" page with real guidance.
- `/fonts`: noindex, or expand into a real font comparison with rendered samples.
- `/cornell-notes/template` → 301 to `/cornell-notes`. It's the same generator and intent.

**Merges (301 redirects):**
- `/letter-tracing/custom-name` → `/tools/name-tracing-generator` (same intent).
- `/tools/blank-handwriting-paper` → `/tools/handwriting-paper-generator` (same tool, one toggle apart).
- `/tools/handwriting-practice-generator` vs `/tools/handwriting-practice-sheets` vs `/handwriting-practice`: three pages for "handwriting practice generator". Either merge two of them, or make the differences explicit (adult print/cursive drills vs classroom worksheets vs hub).

**Deletions:**
- `app/tools/handwriting-worksheet-maker/page.tsx`: an empty redirect stub. `next.config.mjs` already 301s this URL, so the file can go.
- `/letter-tracing/name/*` (100 pages): currently `noindex, follow`, which is acceptable. Option to delete them and 301 to `/tools/name-tracing-generator` for a cleaner site.

---

## 8. Nice-to-have (not blockers)

- **Em-dash density:**
  - `cursive-strokes-for-beginners` has 32 (in ~1,400 words).
  - The tool-page copy in `lib/seo.ts` has 66.
  - Rewrite by hand into commas, colons or separate sentences. A mechanical swap would create run-ons.
- **Uniform article skeleton.** All 7 static posts end with a 4–6 question FAQ. Drop the FAQ where it repeats the body (e.g. `best-handwriting-practice-sheets-for-adults` FAQs restate its sections).
- **Shared H2.** `how-to-make-cursive-handwriting-practice-sheets` and `cursive-handwriting-practice-sheets` share an H2. Rename one.
- **Redirect chain.** `http://handwritingmaker.com` → `https://handwritingmaker.com` → `https://www.` is two hops; set the host to redirect straight to `https://www.`.
- **Images.** Only 2 of 13 articles have images; all images have alt text. Original photos of printed sheets would help most.
- **Breadcrumbs** are missing on the static blog posts (present on dynamic posts and tool hubs).
- **No analytics installed.** If you add Google Analytics, update Privacy section 4 first.
