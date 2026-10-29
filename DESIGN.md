# ByteWright — Design direction (Phase 1)

## The idea
A studio site that behaves like the work it sells: quiet, exact, and confident. Type does the talking, the work is the
imagery, and structure comes from whitespace, type size and weight rather than boxes or rules. If a choice can't be explained, it's removed.

## Type
- **Switzer** (self-hosted, 400 + 500 only). A neo-grotesk with more warmth than Helvetica and none of the
  overexposure of Inter. Headlines at 500, tracked tight (−0.03 to −0.045em), leading 0.95–1.05. Body at 400, 17–18px, 1.6.
- **Instrument Serif Italic**, one word per major headline. It's the "hand" in the machine: the human
  note against an engineered grotesk. Sized up 6% because it sits optically small next to Switzer.
- **Labels, nav and metadata**: Switzer 14px, weight 400 (500 for emphasis), sentence case, normal letter-spacing,
  muted gray. "Selected work", never "SELECTED WORK". See the revision note at the end.
- **JetBrains Mono, numbers only**: 13px (to sit level with 14px Switzer), normal tracking, tabular figures.
  Used for section and project numbers (01, 02, 03), years and counts. Nothing else is set in mono.
- Fluid scale from 375 → 1600px with `clamp()`: display / h1 / h2 / h3 / lead / body / label. Hero runs ~9.4vw on desktop
  and 62px on a 360px phone, so it fills the width without overflowing.

## Colour
| token | dark (default) | light | use |
|---|---|---|---|
| bg | #0B0B0C | #F4F2EE | warm near-black / warm paper |
| fg | #EDEBE7 | #111110 | ink, 16.5:1 / 16.9:1 |
| fg-muted | #8C8983 | #5F5C56 | secondary copy, AA on both |
| line | ink @ 12% | ink @ 12% | list dividers and form fields only |
| accent | #4F8EF7 | #4F8EF7 | CTA fill, "Wright" only |
| accent-ink | #4F8EF7 | #2A62C9 | link-hover text (brand blue is 2.9:1 on paper, so it's deepened) |

The CTA is blue with near-black text in both themes (6.1:1). About 95% of any screen is monochrome.

## Grid & space
12 columns ≥1024px, 6 on tablet, 4 on phones. Gutter 20 → 56px, max width 1600px. Headlines hang from the left edge;
supporting copy offsets to column 4 or 7. Asymmetry is the default and centring is the exception. Sections sit 112px apart
on phones and 160–208px on desktop. Space and the headline do the separating: no rules, no section numbers.

## Motion
Expo-out easing everywhere, so moves start fast and land softly. Headlines rise line by line from a mask (900ms, 80ms stagger,
once). Work images scale 1 → 1.04 and drift slightly on hover, with a "View" cursor on fine pointers only. Lenis smooth
scroll. A slow service marquee (~40s per loop). With `prefers-reduced-motion`, everything snaps to its end state, and
Lenis and the marquee turn off. No parallax for its own sake, no bounce, no scroll-jacking.

## Hero options
- **A (recommended):** "Software, *crafted*." / "We design and build websites, apps, and AI tools for people who care how
  things are made." The shortest true statement of what the studio does, and the italic word carries the craft idea.
- **B:** "Small studio. *Serious* software." / "Two engineers who design. Websites, products, and AI tools, built with
  the care of a much bigger team." More personality and more honest about size, but it leads with "small", which some
  larger clients may read as risk.

## Decisions made without asking
- Only Switzer 400/500 ship (about 37KB in total). No italic Switzer, since emphasis is the serif's job.
- CTA wording site-wide: **"Start a project"**.
- The CTA is the only rounded element (pill). Everything else is square-edged.
- Theme preference is saved per visitor and applied before paint, so there's no flash.
- `/system` is a living style guide set to `noindex`.

---

# Phase 2 — Homepage

## Decisions
- **Hero:** option A. The display size starts at 62px so "Software," fits a 360px phone; it reaches ~9.4vw on desktop.
- **CTA contrast:** near-black #0B0B0C on #4F8EF7 = 6.1:1 (AA). White on blue (3.2:1) is never used.
- **Services:** four pillars (Websites, Apps & Products, AI & Automation, Infrastructure & Support), framed as
  "One team from idea to launch and beyond." UI/UX design is written into each pillar instead of being sold separately.
  One data file (`src/lib/services.ts`) feeds the homepage, the marquee, the Services page and the contact form options.
- **Faint text** was raised to #7C7973 / #726E67 so tertiary labels still pass AA (4.5:1).
- **Section numbers:** removed in the second revision (see end of file).
- **Testimonial** is a clearly marked placeholder. No invented quotes.
- **Hero motion uses CSS keyframes** (starts at first paint, no wait for JavaScript). Below the fold, reveals use one
  IntersectionObserver plus CSS transitions. Motion is loaded only for the desktop cursor and when the mobile menu
  opens, which keeps it out of the first-load bundle.
- **Header** hides on scroll down and returns on scroll up. It gets a hairline once the page scrolls.

## Project screenshots
Drop files into `public/work/` named after the project slug, e.g.:
`new-york-buddhist-bihar.webp`, `bridging-generations.webp`, `ny-construction.webp` (jpg/png also work).
They replace the placeholders automatically on the next build. Suggested size: 2400×1500 or larger, top of page.

## Lighthouse (production build, local)
Desktop 100 / 100 / 96 / 100. Mobile 94–98 / 100 / 96 / 100.
Best-practices is 96 only because the nav links to pages that arrive in Phase 3.

---

# Responsive QA (before Phase 3)

Tested at 360 / 390 / 430 (touch), 844×390 and 932×430 landscape, 768 and 1024 (touch, portrait and landscape),
and 1280 / 1440 / 1920 (mouse). An automated sweep checks horizontal overflow and 44px tap targets on every route at every width.

- **Input-based, not width-based.** `touch:` and `can-hover:` variants (globals.css). Hover zoom and the "View" cursor
  only exist with a fine pointer; touch gets a press-in and a "View case study →" label.
- **Tap targets.** `tap` utility: 44×44 minimum on touch, no visual change with a mouse. Visible pressed state on tap.
- **Scrolling.** Lenis runs only for mouse/trackpad. Touch devices keep native momentum scrolling. Keyboard focus,
  anchors, and route changes scroll correctly with Lenis on.
- **Viewport.** `viewport-fit=cover`; safe-area insets on the header, menu, gutters (landscape notch) and footer.
  Hero uses `svh`, capped on tall tablets; menu uses `dvh`. A `short:` variant tightens layouts on landscape phones.
- **Mobile menu.** Disclosure pattern (button with aria-expanded/controls). The page behind is `inert`, scroll is locked
  (Lenis stopped too), focus starts on the first link and returns to the button on Escape. Closes on link tap,
  route change and resize to desktop.
- **Tablet.** 6-column layouts designed for 768–1279: two-up staggered work, three-column footer, wider copy columns.
- **Forms.** Inputs ≥16px (no iOS zoom), correct `type`/`inputmode`/`autocomplete`/`enterkeyhint`.
- **Images.** AVIF/WebP; `sizes` per layout so phones fetch 640–1080w.

# Phase 3 — Remaining pages

- **Work** `/work`: alternating image/text index. **Case studies** `/work/[slug]`: challenge, approach, gallery
  (2 screenshot slots), result, quote placeholder, next project. Copy is a first draft in `src/lib/work.ts`; please confirm.
- **Services** `/services`: jump index, the four pillars (what's included, example deliverables, UI/UX note),
  and "Working together", which explains that pricing comes after a call. No prices anywhere.
- **About** `/about`: story (draft; please confirm), the team (Mostafa Anwari, CEO; Wasif Karim, CTO; Khokon Barua, Software Development Intern), four values.
- **Insights** `/insights` + `/insights/[slug]`: MDX posts in `src/content/insights/*.mdx`, indexed in
  `src/lib/insights.ts`. Three placeholder drafts.
- **Contact** `/contact`: name, email, company, service (from `services.ts`), budget range, description.
  Client and server validation share one function; errors move focus and are announced; success and error states;
  honeypot spam trap; works without JavaScript. Email delivery is a marked TODO in `src/app/contact/actions.ts`.
- **SEO.** Per-page metadata and canonical URLs, Open Graph images for every page/case study/post (rendered with the
  site's fonts), `sitemap.xml`, `robots.txt` (style guide excluded), a designed 404.
- **Reveals** are server-rendered markup; one `RevealObserver` plays them with the Web Animations API, so nothing
  touches React-owned attributes (no hydration mismatches) and pages hydrate fewer components.

## Lighthouse (production build)
Desktop: 100 / 100 / 100 / 100 on every page. Mobile (simulated slow 4G, 4× CPU): performance 93–97 across runs,
accessibility, best practices and SEO 100. The remaining mobile cost is the React/Next runtime hydrating (~71KB).

---

# Revision — labels (after Phase 3)

The uppercase, letter-spaced mono labels read as a template cliché, so they're gone everywhere.

- `label` utility (globals.css): Switzer 14px / 1.45, weight 400 (500 where a label needs emphasis), no letter-spacing,
  sentence case, `--fg-muted`. Used for every section label, nav item (header and footer), form label, metadata
  (type, review, status, scope), breadcrumbs, the theme toggle, the Menu button and the "View" cursor.
- `num` utility: JetBrains Mono 13px, no tracking, tabular figures. Wraps numbers only: 01/02/03, `5` stars,
  `3` min read, © `2026`, `404`. The `--text-meta` token and all `uppercase` / `tracking-[0.12em]` styles are removed.
- `link` utility: every email address is lowercase, in ink, with an underline that appears on hover and focus.
- The "Scroll ↓" indicator is removed with nothing in its place.
- Share images (Open Graph) use Switzer for their labels too. Inline `code` in posts uses Switzer (no posts use it today).
- Body copy keeps numbers in Switzer ("We reply within 24 hours."). Mono is for numbers that act as labels or data.

---

# Revision 2: removing template patterns

The "number, rule, label" opener (`04 —— In their words`) and its relatives read as generated. The rule now is:
**a section is introduced by its headline alone.**

## What changed
- **Section openers.** Removed every section number, every decorative rule beside a label and every small label above a
  headline, sitewide. `SectionHead` and `PageHero` now take only the headline (and an optional aside).
- **Homepage labels: zero.** The hero's two corner labels ("Software studio", the services line) and the email/rule row
  under the hero are gone. The hero is now the headline, one sentence and two actions.
- **Numbers kept only where order matters:** the four process steps (1–4, scaled with their headings), the project list
  (01–03) and the three "what happens next" steps on Contact. Removed from pillars, services, deliverables, case-study
  approach points, values, the mobile menu and the services jump index.
- **Rules removed:** above every section, above case-study blocks, around the testimonial CTA, under the hero, above and
  inside the footer, around the marquee, above meta lists, on placeholders, on the contact aside and success message,
  on blog bullet lists and blog pull quotes (the blue bar also broke the accent rule).
  **Kept**, because they divide items in a list or are functional: post lists, the mobile menu list, form field underlines,
  the form error marker and the sticky header's edge once you scroll.
- **Headlines rewritten to say something specific:**

  | Before | After |
  |---|---|
  | Recent work. | Three recent launches, all rated *five* stars. |
  | Four steps. No surprises. | How a project *actually* runs. |
  | In their words (label) | What clients say after launch |
  | Have something in mind? | Prefer to talk first? |
  | Notes from the studio. | What we’ve learned, kept *short.* |
  | Let’s build something good. | Tell us what you’re *building.* |
  | Selected work. (Work page) | Built for a monastery, a nonprofit and a *builder.* |
  | A small studio with high standards. | A small team on every project, start to *finish.* |
  | Where creativity meets top-notch engineering. (About story) | Good ideas kept losing to rushed builds. |
  | 02 The team | You work with *us,* not an account manager. |
  | Four things we won’t compromise on. | The rules we work by. |
  | Notes from the studio. (Insights page) | Short notes on how we *work.* |
  | The challenge / Our approach / The result | Where it started / What we did / Where it landed |
  | More notes | Keep reading |

- **Em dashes removed from all copy**, titles and placeholders: "ByteWright: Software, crafted.", page titles
  "Services · ByteWright", "[Client quote to be added]", "Screenshot: slug", "Photo of Mostafa Anwari". En dashes remain only
  in number ranges ($10k – $25k).
- **Smaller simplifications.** Breadcrumbs became a single "All work" / "All notes" link. Pillar rows on the homepage dropped
  their arrow, numbers, dash bullets and "UI/UX" tag; the includes are now one plain sentence in sentence case. The marquee
  separates items with space and alternating tone instead of serif slashes (which broke the one-serif-word rule).
  Services no longer ends with two calls to action in a row. Share images dropped their rule.

---

# Hero object: "The Byte" (revision 4)

Replaces the project card stack (the projects live in the featured work section directly below).

## The object
Eight cubes in a 2×2×2 block: 8 bits, 1 byte, a nod to the name. Matte near-black (#151517), roughness ~0.75 with a fine
grain (procedural roughness + bump map, fixed seed), rounded edges (radius 0.07). Not glossy, not glassy.

## Light
- One soft warm key light from the top-left (spot, full penumbra, long falloff).
- A thin rim in brand blue (#4F8EF7) from directly behind the object relative to the camera, so only silhouette edges
  catch it. Nothing neon.
- A small in-scene light environment (one softbox, one thin blue strip, 64px, no HDR download) for the soft
  highlights on the rounded edges.
- A faint floor glow and a soft baked contact shadow (radial textures). No real-time shadow maps: no hard plane edges,
  no shadow pass per frame.
- CSS: a very soft radial light behind the canvas (`.byte-glow`, `--hero-glow`) so the right side isn't flat black.

## Motion (src/components/byte/timeline.ts)
One pure function of time drives everything, so the live canvas, the still and the phone video are the same motion.
Slow constant turn (7.5°/s). Every 6 s the block opens slightly, the top ring of four steps one slot clockwise while the
bottom ring steps the other way, each cube turns a quarter, and everything settles back with a spring overshoot.
After 12 s the object looks identical to the start: the video's seamless loop length. On desktop the whole object
tilts gently toward the cursor (±0.18 rad, eased).

## Loading strategy
| Visitor | What they get |
|---|---|
| Everyone, instantly | The still (`public/hero/byte.webp`, transparent, rendered from the scene at t=0), preloaded |
| Desktop with a mouse | The live canvas, loaded on the first mouse move, scroll, touch or key press, then faded in over the still once shaders have compiled (`compileAsync`) and the first frame is drawn |
| Phones and tablets, dark theme | A 12 s seamless video loop (`public/hero/byte-loop.mp4`, 720², 410KB), plays only while on screen |
| Reduced motion, light-theme touch devices, no WebGL | The still only |

Rendering stops when the hero is off screen; device pixel ratio is capped at 2. `?byte=live|video|still` forces a
mode for QA. three.js + R3F + drei load only on the desktop live path (code-split, ~260KB gzipped).

## Re-rendering the still and video
`npm run dev`, then `/lab/byte` (development only; 404 in production) exposes `window.__byteSetTime(t)`. The still is
t=0 at 1200²; the video is 360 frames (t = 0…11.97 s at 30fps) at 720² composited over the same glow as `.byte-glow`
and encoded with H.264 (crf 26, faststart).

## Performance (production build, Lighthouse 12)
- Desktop, as shipped: 100 / 100 / 100 / 100 (TBT 0–10ms).
- Mobile, as shipped: 94–98 / 100 / 100 / 100.
- Desktop with the 3D forced to load during the audit: 68–70, almost all from one long task when the scene first
  renders. Measured in a headless browser with software WebGL (no GPU), which makes shader compilation and the light
  environment far slower than on real hardware; check the real cost on a laptop in Chrome DevTools › Performance.

---

# Hero composition (revision 3)

- **Desktop (≥1280px):** the headline, sentence and actions sit on the left; the three projects sit on the right as a loose
  stack of cards, tilted a few degrees and overlapping like prints on a desk. Back cards are dimmed slightly.
  Hover lifts a card 14px. Dragging a card more than 90px shuffles the stack (the front card goes to the back, a back card
  comes to the front); a click (under 5px of movement) opens the case study. Drag exists only for mouse and trackpad;
  touch and keyboard simply open the links. Built with pointer events and CSS transitions, so the hero ships no
  animation library. Cards are image-only: captions peeking from behind other cards read as clutter. Missing screenshots
  show a neutral card with the project name in the bottom-right corner, the one corner visible in every slot.
- **Tablet and phone:** the same text, then a native, snap-scrolling row of the three projects below the buttons. The next
  card peeks in from the edge, which says "swipe" without a label. No JavaScript.
- **Paragraph colour:** new `--fg-soft` token (#B3B0AA dark, 9.1:1 · #45423D light, 9.0:1), between ink and muted.
- **Height:** the hero is sized to its content, so the work section's headline shows at the bottom of a 1440×900 (and
  1280×800) screen. Scroll reveals now trigger 4% above the bottom of the viewport (was 12%) so that peek is visible.
- **Motion:** cards are dealt in once on load (1.1s, staggered). With reduced motion: no deal-in, no lift, no transitions;
  shuffling still works, instantly.
- **Performance:** only the front screenshot is preloaded (the same 640w file serves the phone row and the desktop
  stack). Desktop Lighthouse stays at 100; mobile performance is 91–95 now that the first screen holds an image.
