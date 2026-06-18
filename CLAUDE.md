# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`).

- `pnpm dev` — start Vite dev server with HMR
- `pnpm build` — type-check then build (`tsc -b && vite build`)
- `pnpm lint` — run ESLint over the repo
- `pnpm preview` — serve the production build locally

There is no test framework configured. Type-checking via `tsc -b` (run by `pnpm build`) is the main correctness gate alongside `pnpm lint`.

## Architecture

Single-page 3D portfolio. React 18 + TypeScript + Vite + Tailwind, with react-three-fiber/drei/three for WebGL, jotai for state, i18next for i18n, gsap + @react-spring/three for animation, and leva for dev controls.

### Two synchronized layers

The app renders two stacked layers that share one piece of state:

1. **3D world** — a full-screen `<Canvas>` in `App.tsx` renders `Pages.tsx`: floating shapes, an infinite grid, and the `CameraHandler`. This is the WebGL background.
2. **HTML overlay** — `Overlay.tsx` is a fixed, `z-10`, `pointer-events-none` DOM layer on top of the canvas that renders the 2D UI (titles, text, per-slide content). Interactive elements re-enable `pointer-events-auto`.

Both layers are driven by **`slideAtom`** (jotai atom defined in `Overlay.tsx`), an index into the `scenes` array (`utils/scenes.ts`). There are 3 slides: About Me (0), Experience (1), Skills (2).

- Navigation: arrow keys and the `Arrows` component mutate `slideAtom` (wrapping around). Navigation is locked during the ~2.6s transition (`isTransitioning`).
- `CameraHandler` watches `slideAtom` and animates the camera laterally between slides (each slide is offset by `viewport.width + slideDistance` on the x-axis) using drei `CameraControls`.
- The overlay cross-fades content on slide change (`displaySlide` lags `slide` by the transition duration).

When adding a slide you must keep these in sync: add to `scenes`, add a `ScenePaths` entry if it has a model, render its overlay branch in `Overlay.tsx`, and ensure the world geometry/camera math in `Pages.tsx` accounts for the new index.

### Embedding 3D inside a slide

Two patterns are used for per-slide 3D:

- **Render-to-texture** (`pages/AboutMe.tsx`): a `Scene` is rendered into a drei `RenderTexture` mapped onto a plane inside the main canvas.
- **Nested Canvas** (`pages/Experience.tsx`): a separate `<Canvas>` in the HTML overlay renders `DemoComputer` independently of the main world.

GLTF models live in `public/models/` and are loaded with `useGLTF` (with `useGLTF.preload`). Model paths are centralized in the `ScenePaths` enum.

### Content is data-driven

Page content comes from typed arrays in `src/utils/` (`scenes.ts`, `experience.ts`, `skills.ts`, `aboutMe.ts`), not hardcoded in components. Text fields in these arrays are **i18n keys**, not literal copy — components pass them through `t(...)`. To change copy, edit the translation JSON, not the util.

### Internationalization

`i18next` is initialized in `src/i18n/index.ts` and imported for side effects in `main.tsx`. Languages are `en` and `es`, each with a `translation.json`. Language is also persisted in the URL via the `?language=` query param (handled in `SelectLanguage.tsx`). Every translation key referenced in a util/component must exist in **both** `en` and `es` `translation.json`.

### Conventions

- **Barrel exports**: import components/pages/utils from the folder's `index.ts` (e.g. `import { Overlay, Scene } from "./components"`), and add new modules to that barrel.
- **Custom Tailwind colors** in `tailwind.config.js`: `my-pink`, `my-blue`, `coffee`, `brown`.
- **leva** dev panel is hidden in production via `<Leva hidden />` in `App.tsx`; `useControls` values (e.g. `slideDistance`, `dollyDistance`) tune camera/layout during development.
- TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters` — unused vars fail the build.
- Static assets (tech-stack SVGs, logos) live in `public/assets/`; reference them by root-relative path.
