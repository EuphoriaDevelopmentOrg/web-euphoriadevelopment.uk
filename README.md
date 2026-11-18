# Euphoria Development website

React 19, TypeScript, Next.js (App Router), Tailwind CSS, and Lucide icons for [euphoriadevelopment.uk](https://euphoriadevelopment.uk).

## Local development

Use Node.js 24 and pnpm 11.25.0 (also specified in package.json).

```sh
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Build for production with `pnpm build`. Use `pnpm start` to run the production server locally, or `pnpm exec next start --port 4173` to use the browser tests' port.

## Checks

Install the test browser once, then run the same checks used by CI:

```sh
pnpm exec playwright install chromium
pnpm check
```

`pnpm check` runs oxlint, TypeScript, a production build, and Playwright browser tests. The tests start the built Next.js application on port 4173. On Linux, install browser system dependencies with `pnpm exec playwright install --with-deps chromium`.

The tests cover direct docs and legal routes, shared navigation and theme cleanup, mobile layouts, product links, API/GitHub outages, retry behavior, statistics, generated page metadata, and the sitemap. External APIs are mocked. Failed browser tests save screenshots and traces in `test-results/` and an HTML report in `playwright-report/`.

## Content and metadata

- `src/utils/web-apps.ts` contains the app listings, demos, and marketplace links. Listings render immediately; optional GitHub metadata loads separately.
- `src/utils/projects.ts` contains the Aquadactyl and Manta listings, logos and official links. These render before optional API data arrives, including during catalogue outages.
- `src/utils/site-data.ts` shares concurrent requests to the stats API. Blueprints render as soon as the catalogue arrives. GitHub failures do not hide products.
- Public metadata requests have a 5–8 second timeout, a 2 MiB response limit and a 60-second browser memory cache. Concurrent requests share a response; failed requests are not cached, and the catalogue's Retry action requests fresh data. The addon documentation uses one GitHub organization request instead of one request per addon.
- Project totals count Aquadactyl and Manta, returned Blueprints, and current web app editions. Free and paid Paste count separately; the Crafatar migration notice does not count again. Unavailable statistics are labelled as unavailable; actual zero values stay zero.
- `src/site-pages.ts` defines page titles, descriptions, docs groups, and canonical paths. When adding a route, add it there as well as in `src/app/`.
- `src/app/docs/layout.tsx` owns the docs header, sidebar and footer. Article components contain only their page content.
- `src/app/sitemap.ts` generates `sitemap.xml` dynamically using Next.js Metadata Route.
- Next.js pre-renders all pages at build time with route-specific HTML metadata (titles, canonical links, open graph, and twitter tags).

## Security and performance

API responses are treated as untrusted data: links require HTTPS without embedded credentials, repository links use canonical GitHub identifiers, and malformed fields are discarded before rendering. Text remains React-escaped. Environment files are ignored by Git; use `.env.example` for placeholders.

The app sends CSP, frame protection, MIME-sniffing protection, referrer and permissions policies, and a one-year HSTS policy. A reverse proxy must preserve these headers. Cloudflare currently overrides HSTS with `max-age=0`; correct its edge policy or response-header rule to make the origin policy effective publicly. The CSP allows Cloudflare's existing analytics beacon and the inline bootstrap scripts required by static Next.js pages; it restricts other external scripts and production `eval`, but is not a nonce-based policy that blocks every inline-script injection. Keep untrusted HTML out of rendered content.

The dependency audit currently reports [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) in picomatch, with no published patched version. Its use here is the trusted documentation/build glob pipeline, rather than visitor-provided patterns. The advisory is not suppressed; replace the dependency when an upstream fix becomes available.

Fonts are self-hosted, the panel wordmark uses Next.js image optimization, and homepage links load documentation code when followed. CI retains `.next/cache`, keyed by the dependency lockfile and commit, for incremental builds. Production pages remain statically generated.

## Dokploy with the GitHub integration

The `Site checks` workflow runs on pull requests and pushes to `main`. After lint, types, build, and browser tests pass on `main`, its promotion job advances `production` to that exact checked commit. It skips outdated runs and only allows fast-forward pushes. Pull requests never promote. No Dokploy token or webhook secret is needed.

**One-time setup is required in Dokploy.** Its native GitHub integration deploys pushes to the selected branch immediately; adding CI alone does not delay deployments from `main`.

1. Turn off **Auto Deploy** in Dokploy while setting this up.
2. Commit and push these changes to `main`. Wait for both jobs in **Site checks** to succeed; the promotion job creates `production` on its first successful run.
3. In the application's GitHub source settings, change **Branch** from `main` to `production`, then save.
4. Turn **Auto Deploy** back on and deploy once to use the current checked commit. Future successful promotions trigger the GitHub integration automatically.

Keep developing on `main`; reserve `production` for the workflow. The promotion job needs repository Contents write permission, requested in the workflow. If organization policy or branch rules block the push, allow this automation to update `production`. Avoid manually pushing untested commits to that branch. A required `Lint, types, build and browser tests` check on main pull requests can also protect merges.

Dokploy deploys this application as a Next.js / Node.js application: build with `pnpm install --frozen-lockfile` and `pnpm build`, then run with `pnpm start`. Next.js serves all pre-rendered routes, static assets, and dynamic APIs natively.

See Dokploy's [GitHub integration](https://docs.dokploy.com/docs/core/github) and [Auto Deploy](https://docs.dokploy.com/docs/core/auto-deploy) documentation for branch matching and the Auto Deploy setting.
