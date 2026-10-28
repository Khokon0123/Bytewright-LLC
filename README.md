# ByteWright

Studio site. Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind v4 · Motion · Lenis · MDX.

```bash
npm install
npm run dev      # http://localhost:3000  ·  style guide at /system
npm run build && npm start
```

## Where things live
| What | File |
|---|---|
| Company details, nav, CTA wording | `src/lib/site.ts` |
| Services (homepage, Services page, marquee, contact form) | `src/lib/services.ts` |
| Projects and case-study copy | `src/lib/work.ts` |
| Project screenshots | `public/work/<slug>.webp`, `<slug>-2.webp`, `<slug>-3.webp` |
| Insights index / posts | `src/lib/insights.ts` / `src/content/insights/*.mdx` |
| Contact form, server action | `src/app/contact/` |
| Design tokens | `src/app/globals.css`; rationale in `DESIGN.md` |

## Before launch (search for `TODO`)
- Real domain in `site.ts`, email address, social links
- Email delivery in `src/app/contact/actions.ts` (e.g. Resend; add `RESEND_API_KEY` on Vercel)
- Project screenshots, team photos (`public/team/<slug>.webp`, still needed: `mostafa-anwari`), confirmed case-study and About copy, real client quotes
- Replace the three placeholder posts

## Deploy
Push to GitHub and import into Vercel. No environment variables are needed until email sending is added.
