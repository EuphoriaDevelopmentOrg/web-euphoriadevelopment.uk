# Euphoria Development website

React, TypeScript, Vite, Tailwind CSS, and Lucide icons for [euphoriadevelopment.uk](https://euphoriadevelopment.uk).

## Local development

Use Node.js 24 and pnpm 11.24.0 (also specified in package.json).

```sh
npm install --global pnpm@11.24.0
pnpm install --frozen-lockfile
pnpm dev
```

Vite compiles Tailwind automatically. Build with `pnpm build`; the static output is in `dist/`. Use `pnpm preview` to view that build locally.

## Checks

Install the test browser once, then run the same checks used by CI:

```sh
pnpm exec playwright install chromium
pnpm check
```

`pnpm check` runs ESLint, TypeScript, a production build, and Playwright browser tests. On Linux, install browser system dependencies with `pnpm exec playwright install --with-deps chromium`.

The tests cover direct docs and legal routes, shared navigation and theme cleanup, mobile layouts, product links, API/GitHub outages, retry behavior, statistics, generated page metadata, and the sitemap. External APIs are mocked. Failed browser tests save screenshots and traces in `test-results/` and an HTML report in `playwright-report/`.

## Content and metadata

- `src/utils/web-apps.ts` contains the app listings, demos, and marketplace links. Listings render immediately; optional GitHub metadata loads separately.
- `src/utils/site-data.ts` shares concurrent requests to the stats API. Blueprints render as soon as the catalogue arrives. GitHub failures do not hide products.
- Project totals count returned Blueprints plus current web app editions. Free and paid Paste count separately; the Crafatar migration card does not count again. Unavailable statistics are labelled as unavailable; actual zero values stay zero.
- `src/site-pages.ts` defines page titles, descriptions, docs groups, and canonical paths. When adding a route, add it there as well as in `src/App.tsx`.
- `src/components/DocsLayout.tsx` owns the docs header, sidebar, footer, and theme. Article components contain only their page content.
- `build/site-pages.ts` generates route-specific HTML metadata and `sitemap.xml`. It emits both `path.html` and `path/index.html` for static hosts with different clean URL conventions. Serve those files before falling back to the homepage. The canonical URL stays the same for either form.

## Dokploy with the GitHub integration

The `Site checks` workflow runs on pull requests and pushes to `main`. After lint, types, build, and browser tests pass on `main`, its promotion job advances `production` to that exact checked commit. It skips outdated runs and only allows fast-forward pushes. Pull requests never promote. No Dokploy token or webhook secret is needed.

**One-time setup is required in Dokploy.** Its native GitHub integration deploys pushes to the selected branch immediately; adding CI alone does not delay deployments from `main`.

1. Turn off **Auto Deploy** in Dokploy while setting this up.
2. Commit and push these changes to `main`. Wait for both jobs in **Site checks** to succeed; the promotion job creates `production` on its first successful run.
3. In the application's GitHub source settings, change **Branch** from `main` to `production`, then save.
4. Turn **Auto Deploy** back on and deploy once to use the current checked commit. Future successful promotions trigger the GitHub integration automatically.

Keep developing on `main`; reserve `production` for the workflow. The promotion job needs repository Contents write permission, requested in the workflow. If organization policy or branch rules block the push, allow this automation to update `production`. Avoid manually pushing untested commits to that branch. A required `Lint, types, build and browser tests` check on main pull requests can also protect merges.

Dokploy should build with `pnpm install --frozen-lockfile` and `pnpm build`, then serve `dist/` as a static site. Keep the generated route files: an unconditional rewrite of every URL to `/index.html` would discard the route metadata. For an Nginx static host, the equivalent route lookup is `try_files $uri $uri.html $uri/index.html /index.html;`.

See Dokploy's [GitHub integration](https://docs.dokploy.com/docs/core/github) and [Auto Deploy](https://docs.dokploy.com/docs/core/auto-deploy) documentation for branch matching and the Auto Deploy setting.
