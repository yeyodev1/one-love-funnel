# One Love Funnel — Agent Notes

> ⚠️ **Repo identity mismatch**: the folder is `one-love-funnel`, but `package.json` is named `zeonatec-funnel`, `index.html` still carries Zeonatec SEO, and `CLAUDE.md` describes a stale "Ocean Safety" project. The active funnel is **One Love — wedding cinematography**. Do not trust `CLAUDE.md`; verify against running code.

## Stack & Tooling
- Vue 3 + Vite 7 + TypeScript. Project refs: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`.
- Package manager: **pnpm**. `pnpm-workspace.yaml` only lists `allowBuilds:` (pnpm v10 native-dep allowlist); this is **not** a monorepo.
- Node engines: `^20.19.0 || >=22.12.0`.
- State: Pinia (`src/stores/contact.ts`).
- Routing: vue-router (`src/router/index.ts`).
- Styling: SCSS with auto-injected variables (`vite.config.ts` injects `@use "@/styles/colorVariables.module.scss" as *;`).
- GSAP is installed but unused.
- No tests, lint, or CI configuration.

## Commands
```bash
pnpm install
pnpm dev          # Vite dev server
pnpm build        # run-p type-check + build-only in parallel
pnpm build-only   # vite build without type check
pnpm type-check   # vue-tsc --build
pnpm preview      # vite preview
pnpm format       # prettier --write src/
```

## Funnel Flow
All routes render through `App.vue` → `<RouterView />`.

```
/                         FunnelView        (landing + RegistrationModal CTA)
/ver-video                VideoView         (VSL + qualification gate)
/agendar                  BookingView       (GHL calendar iframe)
/cita-confirmada          BookedView        (success page)
/sin-espacio              NoSpaceView       (disqualified / no availability)
/politicas-privacidad     PrivacyPolicyView
/aviso-legal              LegalNoticeView
```

## Router Guards (`src/router/index.ts`)
- `os_booked_at` TTL: **3 days** — fresh booking redirects everything to `/cita-confirmada`.
- `os_disq_at` TTL: **48 hours** — fresh disqualification blocks `/agendar` and `/cita-confirmada`.
- Guards are **disabled on `localhost`** (`import.meta.env.DEV`) so you can navigate freely.
- `/sin-espacio` redirects to `/` unless the user is currently disqualified.

## LocalStorage Keys
| Key | Written by | Purpose |
|---|---|---|
| `os_contact` | `RegistrationModal` | `{ nombre, email, phone, timestamp }` |
| `os_disq_at` | `CalendarModal` | disqualification timestamp |
| `os_booked_at` | `BookingView` | booking timestamp from GHL `msgsndr-booking-complete` |
| `os_fb` | `fbclid.ts` | session Meta attribution params |

## External Integrations
- **Wistia**: there are **two different media IDs in use**:
  - `h5bs715nzv` — loaded dynamically by `FunnelView.vue` and used in `VideoView.vue`.
  - `3ffgiuig80` — loaded in `index.html` and used in the unused `TheHero.vue`; also appears as a CSS fallback image in `VideoView.vue`.
  Do not assume one ID rules them all; verify the file you are editing.
- **GHL calendar**: `https://api.leadconnectorhq.com/widget/booking/HStRfsTDdiNFqEGU4ahD`.
- **Meta Pixel**: id `230057058337186` hardcoded in `index.html`.
- **GHL tracking webhook**: hardcoded in `src/utils/ghl.ts`.
- **Environment variables**: `.env` is committed and gitignored at the same time (tracked despite `.gitignore`). It currently contains production webhook URLs and the FB access token. `ghl.ts` and the qualification form read `VITE_FB_PIXEL_ID` / `VITE_FB_ACCESS_TOKEN` at runtime.

## Code Conventions
- Path alias `@/` maps to `src/` (Vite + TS both configured).
- Prettier: `semi: false`, `singleQuote: true`, `printWidth: 100`. Run `pnpm format` before committing.
- Use FontAwesome for UI icons (`<i class="fa-solid fa-..."></i>`).
- Brand colors are in `src/styles/colorVariables.module.scss`; legacy aliases (`$OS-*`) still exist.

## Typography
- **Montserrat** is loaded from Google Fonts with weights `300;400` only (`index.html`).
- **Avenir Next** is loaded locally from `/public/fonts/Avenir Next.ttc`.
- All font weights across the repo were normalized to **400** (or 300 where already thin). `global.scss` resets `strong, b, h1–h6, th, dt, legend, optgroup, button, input, select, textarea { font-weight: 400; }` so browser defaults never produce texto grueso.
- If you add new styles, keep `font-weight` at 400 or below.

## Gotchas / Dead Code
- **Contact shape mismatch**: `src/stores/contact.ts` defines `BkContact` with `apellido`, `negocio`, `telefono`, but `RegistrationModal.vue` only writes `nombre`, `email`, `phone`, `timestamp` to `localStorage`. Code that reads `contact.apellido` / `contact.telefono` (e.g., `CalendarModal.vue`, `VideoView.vue`) will get empty/missing values. Prefer reading directly from `localStorage.getItem('os_contact')` and use the keys actually written.
- **Do not use / wire back**: `TheGlobalLoader.vue`, `TheHero.vue`, `TheContact.vue`, `ContactWizard.vue`, `ToolsView.vue`, `TheHeader.vue`, `TheFooter.vue`, `TheStrategies.vue`, `TheTestimonials.vue`, `TestimonialsHeader.vue`, `TestimonialCard.vue`, `TheScrollOverlay.vue`, `TheScrollGuide.vue`, `useContactModal.ts`, and the `booked/*` subcomponents are not imported by any active view. `FunnelView.vue` inlines its own hero; `BookedView.vue` inlines its success layout.
- `RegistrationModal.vue` has a duplicated `router.push('/ver-video')` (lines ~278 and ~280).
- `replace-video.cjs` is a one-off migration script; do not rerun it.
- `CalendarModal.vue` disqualifies users when `presupuesto === 'low'` (less than $1,000) and writes `os_disq_at`.
