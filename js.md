# easynetWeb Technical Notes (for future AI agents)

## Project Snapshot
- Stack: Vue 3 + Vite + TypeScript + Pinia + Vue Router.
- Entry: `src/main.ts` mounts App, installs Pinia/Router, registers directives, loads `src/styles/main.css` (theme vars, scrollbar hidden).
- Layout: `src/layouts/DefaultLayout.vue` with header/sidebar/main:
  - Header styles: `src/styles/layout/header.css`; includes user/project dropdowns, theme toggle logic in code (localStorage `theme` + `html.dark` class).
  - Sidebar: `src/styles/layout/sidebar.css`; width 210px; menu groups defined in `AppSidebar.vue`.
  - Main: `src/styles/layout/main.css`.
- Styles refactor: Page styles moved to `src/styles/views/**` (dashboard, project/member|role|permission, system/user|project, auth/login, error, log placeholders). Components import their CSS; SFC `<style>` removed/placeholder only.
- Theme: CSS variables in `src/styles/main.css`; dark/light toggled via `html.dark`. Login page now includes its own toggle button and applies `dark` class on load.
- Scrollbar: hidden globally via `scrollbar-width:none` and zero-width webkit scrollbar.

## Navigation / Routes
- Static routes: login, 403/404, dashboard, project (member/role/permission), system (user/project), log module (game/server). See `src/router/index.ts`.
- Title: `router/guards.ts` now fixes `document.title = 'EasyNet 管理平台'` (no route-based title).
- Guards: checks login, loads default project + menus (Pinia stores), permission check if `meta.permissions`.

## State & Data
- Pinia stores: `auth`, `project`, `menu`, `permission`.
- Mock data in `src/mock/data.ts`; login/switch project responses include menus/permissions. ProjectListItem extended with `description/logo/status/isDefault` to match types.
- Type fixes: `MenuTreeNode` fields optional to accept mock data; unused imports removed.

## Menu / Role / Project Model (documented in `easynetWeb.md`)
- Each project should have its own menu baseline; role menus must be subset of project menus; permissions similar. Frontend should render only menus returned by current project context. Suggested APIs noted there.

## Recent UI Tweaks
- User dropdown text left-aligned, widened padding.
- Project dropdown shows check on left, name right, spacing tightened.
- Header/right cluster shifted left/down slightly.
- Login page restyled to dark-friendly card, with theme toggle.

## Build/Tooling
- Scripts: `npm run dev`, `npm run build`, `npm run preview`.
- Workaround for platform-specific rollup/esbuild issues: set `ROLLUP_DISABLE_NATIVE=1` in build; added `@esbuild/linux-x64`; if native rollup error reappears, reinstall deps on target platform (`npm ci` recommended).

## Log Module
- New top-level module “日志” with children “游戏日志”(`/log/game`) and “服务器信息日志”(`/log/server`); routes and sidebar entries added; views are placeholders under `src/views/Log/`.

## Open Risks / To-do
- **Dynamic menus**: Sidebar still hardcoded; need to render from backend menu tree (per current project) and filter by permissions. Plan: fetch menus in store, build route records dynamically, fallback to static for login/403/404.
- **API integration**: Auth/menu/project currently mock-driven. Replace mocks with real endpoints (`/login`, `/project/:id/context`, `/project/:id/roles/:roleId/menus` etc.), keep types aligned.
- **Theme toggle**: Works via localStorage + `html.dark`; ensure new pages/components use CSS vars only.
- **Scrollbar**: Hidden globally. If product requires visible scrollbars, tweak `src/styles/main.css`.
- **ESBuild/Rollup native deps**: If build fails on other OS, reinstall deps on target platform (`npm ci`) before build; keep `ROLLUP_DISABLE_NATIVE=1` unless native binaries are present.
- **Log module**: Views are placeholders; implement real data when API ready.
- **Form/validation**: Login form has basic checks only; if SSO/captcha needed, extend hook/useAuth.

## Quick Start (dev)
```bash
npm install   # on current platform to fix native deps
npm run dev
```

## If you continue work
- Keep new styles in `src/styles/views/...` with namespaced root classes.
- When adding routes, update sidebar/menu and provide placeholder views to avoid build errors.
- Maintain theme variables (`var(--bg-card)` etc.) and dark toggle logic.***
