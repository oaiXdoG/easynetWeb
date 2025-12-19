# Repository Guidelines

## Project Structure & Module Organization
- `src/main.ts` bootstraps Vue 3 + Pinia + Vue Router and applies global directives/theme.
- Layout shell in `src/layouts`; shared UI in `src/components` (PascalCase); route views under `src/views` (Auth, Dashboard, System, Project); navigation defined in `src/router`.
- Domain logic sits in `src/stores` (Pinia), `src/api` (Axios wrappers), `src/types` (shared typings), `src/hooks`/`src/utils` (composables + helpers), `src/directives` (custom directives).
- Styling lives in `src/styles/main.css` with CSS vars + light/dark toggle; static assets in `src/assets` and `public/`.
- Mock + design aids: `src/mock/data.ts` mirrors `database/schema.sql`; conceptual design note is `easynetWeb.md`.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — Vite dev server on http://localhost:3000 (auto-open); `/api` proxy points to `http://localhost:8080` and strips the `/api` prefix.
- `npm run build` — `vue-tsc` strict type-check then `vite build` to `dist/`.
- `npm run preview` — serves the production bundle for smoke testing.

## Coding Style & Naming Conventions
- Use Vue 3 Composition API with `<script setup lang="ts">`; keep components in PascalCase and composables as `useX`.
- Indent with 2 spaces, prefer single quotes, and match the current no-semicolon style.
- Import via `@/…` alias (configured in `tsconfig.json`/`vite.config.ts`); keep modules small and route-aware.
- Centralize theme/global styles in `src/styles`; avoid inline styles unless necessary.

## Testing Guidelines
- No automated test runner is wired yet; rely on `npm run build` for type safety until Vitest/Vue Test Utils are added.
- When adding tests, place specs beside source (`FeatureName.spec.ts`) or under `tests/`, and mock API calls via `src/mock/data.ts`.
- Aim for coverage on Pinia stores, route guards, and critical components (auth, project switching); include edge cases for role/permission changes.

## Commit & Pull Request Guidelines
- Recent history uses terse messages ("add"); prefer clear imperative or Conventional Commits (`feat: dashboard`, `fix: guard redirect`) with scoped summaries.
- Reference issues in the body (`Closes #123`), describe intent + outcome, and list commands run (e.g., `npm run build` / `npm run preview`).
- For UI changes, attach before/after screenshots or short clips; for API/proxy updates, note any `.env*` changes and backend expectations.
- Keep PRs focused; avoid bundling schema (`database/`) updates with UI tweaks unless tightly coupled.
