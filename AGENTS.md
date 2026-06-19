# One Love Funnel — Agent Notes

> ⚠️ **Repo identity mismatch**: the folder is `one-love-funnel`, but `package.json` is named `zeonatec-funnel`, `index.html` still carries Zeonatec SEO, and `CLAUDE.md` describes a stale "Ocean Safety" project. The active funnel is **One Love — wedding cinematography**. Do not trust `CLAUDE.md`; verify against running code.

## Stack & Tooling
- Vue 3.5.18 + Vite 7.0.6 + TypeScript 5.8. Project refs: `tsconfig.json` → `tsconfig.node.json` + `tsconfig.app.json`.
- Package manager: **pnpm**. `pnpm-workspace.yaml` only lists `allowBuilds:` (pnpm v10 native-dep allowlist); this is **not** a monorepo.
- Node engines: `^20.19.0 || >=22.12.0`.
- State: Pinia 3 (`src/stores/contact.ts`).
- Routing: vue-router 4.5.1 (`src/router/index.ts`).
- Styling: SCSS with auto-injected variables (`vite.config.ts` injects `@use "@/styles/colorVariables.module.scss" as *;`).
- GSAP is installed but unused; `vite-plugin-vue-devtools` is also installed.
- No tests, lint, or CI configuration. Prettier config is in `.prettierrc.json`.
- `vite.config.ts` pins an allowed ngrok host (`38828430451a.ngrok-free.app`).

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
- `os_booked_at` TTL: **3 days** — fresh booking redirects everything except legal pages to `/cita-confirmada`.
- `os_disq_at` TTL: **48 hours** — fresh disqualification blocks `/agendar` and `/cita-confirmada`.
- `/sin-espacio` redirects to `/` unless the user is currently disqualified. **This guard is active even on `localhost`** — set `localStorage.setItem('os_disq_at', String(Date.now()))` to test it.
- The booked/disqualified redirects are bypassed on `localhost` (`import.meta.env.DEV`) so you can navigate freely; the `/sin-espacio` guard is not.

## Stored Keys
| Key | Storage | Written by | Purpose |
|---|---|---|---|
| `os_contact` | localStorage | `RegistrationModal` | `{ nombre, email, phone, timestamp }` |
| `os_disq_at` | localStorage | `CalendarModal` | disqualification timestamp |
| `os_booked_at` | localStorage | `BookingView` | booking timestamp from GHL `msgsndr-booking-complete` |
| `os_fb` | **sessionStorage** | `fbclid.ts` | session Meta attribution params |
| `os_complete_fired` | sessionStorage | `BookedView` | dedupes Meta `CompleteRegistration` event |

## External Integrations
- **Wistia**: there are **three different media IDs in use**:
  - `h5bs715nzv` — loaded dynamically by `FunnelView.vue`.
  - `t3i94brx2s` — loaded dynamically by `VideoView.vue`.
  - `3ffgiuig80` — loaded in `index.html` and used in the unused `TheHero.vue`; also appears as a CSS fallback image in `VideoView.vue`.
  Do not assume one ID rules them all; verify the file you are editing.
- **GHL calendar**: `https://api.leadconnectorhq.com/widget/booking/HStRfsTDdiNFqEGU4ahD`.
- **Meta Pixel**: id `230057058337186` hardcoded in `index.html` and also stored in `.env` as `VITE_FB_PIXEL_ID`.
- **GHL tracking webhook**: hardcoded in `src/utils/ghl.ts`.
- **Environment variables**: `.env` is committed and gitignored at the same time (tracked despite `.gitignore`). It currently contains production webhook URLs and the FB access token. `ghl.ts` reads `VITE_FB_PIXEL_ID` / `VITE_FB_ACCESS_TOKEN` at runtime.

## Code Conventions
- Path alias `@/` maps to `src/` (Vite + TS both configured).
- Prettier: `semi: false`, `singleQuote: true`, `printWidth: 100`. Run `pnpm format` before committing.
- Use FontAwesome for UI icons (`<i class="fa-solid fa-..."></i>`).
- Brand colors are in `src/styles/colorVariables.module.scss`; legacy aliases (`$OS-*`, `$AB-*`, `$BAKANO-*`) still exist.

## Typography
- **Montserrat** is loaded from Google Fonts with weights `300;400` only (`index.html`).
- **Avenir Next** is loaded locally from `/public/fonts/Avenir Next.ttc`.
- All font weights across the repo were normalized to **400** (or 300 where already thin). `global.scss` resets `strong, b, h1–h6, th, dt, legend, optgroup, button, input, select, textarea { font-weight: 400; }` so browser defaults never produce texto grueso.
- If you add new styles, keep `font-weight` at 400 or below.

## Gotchas / Dead Code
- **Contact shape mismatch**: `src/stores/contact.ts` defines `BkContact` with `apellido`, `negocio`, `telefono`, but `RegistrationModal.vue` only writes `nombre`, `email`, `phone`, `timestamp` to `localStorage`. Code that reads `contact.apellido` / `contact.telefono` (e.g., `CalendarModal.vue`, `VideoView.vue`) will get empty/missing values. Prefer reading directly from `localStorage.getItem('os_contact')` and use the keys actually written.
- **Do not use / wire back**: `TheGlobalLoader.vue`, `TheHero.vue`, `TheContact.vue`, `ContactWizard.vue`, `ToolsView.vue`, `TheHeader.vue`, `TheFooter.vue`, `TheStrategies.vue`, `TheTestimonials.vue`, `TestimonialsHeader.vue`, `TestimonialCard.vue`, `TheScrollOverlay.vue`, `TheScrollGuide.vue`, `useContactModal.ts`, and the `booked/*` subcomponents are not imported by any active view. `FunnelView.vue` inlines its own hero; `BookedView.vue` inlines its success layout.
- `RegistrationModal.vue` has a duplicated `router.push('/ver-video')` (lines ~270 and ~272).
- `replace-video.cjs` is a one-off migration script; do not rerun it.
- `CalendarModal.vue` disqualifies users when `presupuesto === 'low'` (less than $1,000) and writes `os_disq_at`.
- `VideoView.vue` injects its own Wistia player scripts because `FunnelView.vue` only loads them on `/`; a direct reload of `/ver-video` must still define the `<wistia-player>` custom element.
