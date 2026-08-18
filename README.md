# Melvin Angelo Buban — Portfolio

A professional portfolio positioning Melvin as an executive operations,
research, and project coordination partner. The site pairs a concise capability
narrative with three evidence-led case studies drawn from Melvin's work.

Live site: [vinangelooo.github.io/melvin-buban-portfolio](https://vinangelooo.github.io/melvin-buban-portfolio/)

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000`.

## Validation

```bash
npm run lint
npm test
npm run export:pages
npm run test:pages
```

## Content structure

- `app/page.tsx` — portfolio homepage
- `app/work/[slug]/page.tsx` — case-study template
- `app/site-data.ts` — case studies, experience, and tools
- `public/work/` — optimized portfolio evidence
- `public/melvin-angelo-buban-cv.pdf` — downloadable CV

The website uses Vinext and exports a static build for automatic deployment to
GitHub Pages from the `main` branch.
