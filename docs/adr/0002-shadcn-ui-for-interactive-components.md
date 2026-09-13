# shadcn/ui for interactive components

Supersedes the "React + shadcn/ui" deferral in
[0001](0001-astro-static-site-no-runtime-state.md). Everything else in 0001
stands: the site is still static, with no server and no runtime state.

The first need was site navigation that collapses on mobile, now shadcn's
Sidebar. It wraps every page (`AppShell` in `Base.astro`), so every page
hydrates React. Hand-rolling each accessible
interactive piece (focus trapping, Escape, outside-click, ARIA) is more code to
own than copying in shadcn's Radix-based components, and the site is small
enough that a React island on the pages that need one is an acceptable cost.

## Decisions

- `@astrojs/react` is enabled. React components render as islands and ship JS
  only where a `client:*` directive is set; static markup stays `.astro`.
- Radix base, Remix Icon (`@remixicon/react`) as `iconLibrary`, matching the
  `astro-icon` Remix set already used in `.astro` files.
- shadcn's color tokens (`background`, `primary`, `accent`, …) are aliases onto
  the site palette in `global.css`, not a second palette. The amber link color
  was renamed from `accent` to `link` because shadcn uses `accent` for hover
  backgrounds.
- `dark:` is keyed off `data-theme="dark"`, the attribute the theme toggle
  already sets; there is no `.dark` class.

## Consequences

- `shadcn init` / `add` may rewrite `global.css`; review its diff and re-alias
  any new tokens instead of accepting a parallel palette.
