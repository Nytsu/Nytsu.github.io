# Development

Personal portfolio. React + Vite + TypeScript + Tailwind v4, deployed to
GitHub Pages at <https://nytsu.github.io/>.

> `README.md` in this repo is the **GitHub profile README** — it renders on
> <https://github.com/Nytsu>. Don't repurpose it for project docs. This file is
> the project doc.

## Setup

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Dev server on :5173 |
| `pnpm build` | Typecheck, then build to `dist/` |
| `pnpm preview` | Serve the built output |
| `pnpm check` | Everything CI runs, minus the build |
| `pnpm format` | Biome, write mode |

## Editing the site

All copy lives in [`src/content.ts`](src/content.ts). Changing text, adding a
project, or editing the JustIn case study is a data edit — you should not need
to touch a component. Components only decide how the data is laid out.

The site is two static pages, each with its own Vite entry (see "Pages"
below): the homepage (`/`) and the JustIn project page (`/justin/`), which
carries the technical depth — architecture, hardware, software, and the live
field test — that used to live on the homepage.

Outstanding `TODO`s in that file (search for `TODO`):

- LinkedIn URL
- Contact email (currently the hotmail address)
- Résumé PDF at `public/justin-de-la-cruz-resume.pdf`
- Tags for the Fencing Federation Platform entry, if you want the stack shown
- The INprende end date ("2023 — 2026") — confirm before this ships
- The JustIn live-field-test breakdown (`justinFieldTest.detail`) — the
  summary line is filled in; the What worked / What didn't / Learned /
  Feedback / Next test rows need your actual, factual account

## Pages

`index.html` and `justin/index.html` are separate Vite entries, each with its
own `<script type="module">` pointing at its own `src/*-main.tsx` (see
`vite.config.ts` `build.rollupOptions.input`). There is no client-side router:
navigation between the two is a real page load via a plain `<a href>`, and
each route is a real, statically generated HTML file — so GitHub Pages serves
`/justin/` directly, no SPA-fallback trick required.

To add a third page, follow the same pattern: a new top-level directory with
its own `index.html`, a new `src/<name>-main.tsx` entry, a new root component,
and a new key in `rollupOptions.input`. Knip's Vite plugin only auto-detects
the root `index.html`'s script — any additional entry file needs adding to
`knip.json`'s `entry` array, or `pnpm knip` will report it and its content.ts
exports as unused.

## The design system

`src/index.css` is the single source of truth for colour and type. It is not a
normal Tailwind setup — the `@theme` block starts by **deleting** Tailwind's
default palette and type scale:

```css
--color-*: initial;
--text-*: initial;
```

After that, `bg-blue-500` and `text-lg` are not real classes. They compile to
nothing. Only the brand tokens exist.

**Important caveat:** Tailwind does *not* error on an unknown utility — it
silently emits no CSS. So an off-brand class gives you a visually broken element,
not a failed build. The hard failure comes from `scripts/check-brand.sh`
(`pnpm check:brand`), which fails on hard-coded hex values, arbitrary colour
values, Tailwind's default palette names, `text-lg`-style default sizes, and
pure black/white. That script is the actual enforcement; the `initial` wipe is
the safety net under it.

To add a colour or a size, add a token to `@theme`. That should feel like a
brand decision, because it is one.

### Accessibility constraint on colour

Every text colour token clears WCAG 2.1 AA (4.5:1) against `--color-bg`:

| Token | Hex | Ratio |
|---|---|---|
| `--color-ink` | `#1C1A17` | 16.93:1 |
| `--color-copy` | `#423B32` | 10.76:1 |
| `--color-secondary` | `#6E665B` | 5.51:1 |
| `--color-accent-deep` | `#B85826` | 4.59:1 |

`--color-accent` (`#C25E28`, 4.16:1) clears AA for **large text only** and is
restricted to the mark and 26px titles. Use `--color-accent-deep` for accent
words inside body copy.

The brand guidelines' `muted` (`#857D72`, 3.96:1) and `faint` (`#9C948A`,
2.92:1) are deliberately not in the token set — both fail AA at the 11–13px
sizes they were specified for. `--color-secondary` carries those roles.

If you add a colour, check its contrast before committing.

## Quality gates

Three layers, deliberately separated by speed:

1. **Pre-commit** (husky + lint-staged) — Biome on staged files only. Kept under
   a couple of seconds on purpose. A slow hook is a bypassed hook.
2. **CI** (`.github/workflows/ci.yml`) — types, lint, knip, brand guard,
   `pnpm audit --audit-level=high`, build, and a check that the built HTML is
   real output rather than the dev entry point.
3. **Deploy** (`.github/workflows/deploy.yml`) — gated on CI via `needs:`.
   Nothing reaches Pages that did not pass.

Dependabot (`.github/dependabot.yml`) opens a weekly grouped PR for minor and
patch bumps, monthly for Actions.

`audit` is set to `--audit-level=high`, not `moderate`, on purpose. This is a
static site: no server, no database, no user input, no secrets in the bundle.
Most moderate advisories will be in build tooling that never ships to a visitor
and cannot be reached by anyone loading the page. Blocking deploys on those
teaches you to ignore the signal.

Link checking (`.github/workflows/links.yml`) runs weekly and opens an issue,
rather than gating deploys — external links rot for reasons unrelated to the
commit being shipped. Once the `TODO` URLs are real, you can promote it to a
deploy gate by adding it to `needs:` in `deploy.yml`.

## Deployment

Pushing to `main` runs CI, then deploys.

**One-time setup, required:** Settings → Pages → Build and deployment →
Source = **GitHub Actions**. If it is left on "Deploy from a branch", this
workflow's output is ignored and Pages serves the repo source instead — which
renders a blank page, because the source `index.html` points at
`/src/main.tsx` and browsers reject it on MIME type.

`vite.config.ts` sets `base: "/"` because this is a GitHub *user site* (the repo
name matches the username), served at the domain root. If the site ever moves to
a project repo, `base` must become `"/<repo>/"`.

### Adding a custom domain later

1. Add `public/CNAME` containing the bare domain.
2. Point DNS at GitHub Pages.
3. Leave `base` as `"/"` — a custom domain serves at the root.
