# CLAUDE.md

## Read this first

**Before writing any code, read [`BIBLE.md`](BIBLE.md).**

It is the contract: the component tier rule, the hard rules, how to add a component, how to
change styling, and what to run before claiming you are done. It is short, and it tells you
which of the three companion files to open next.

| File | Covers | Generated? |
|---|---|---|
| [`BIBLE.md`](BIBLE.md) | the rules — **read first, every time** | no |
| [`COMPONENTS.toon`](COMPONENTS.toon) | every component, its tier, and every file importing it | **yes** — `npm run components:map` |
| [`STYLING.toon`](STYLING.toon) | tokens, canonical class strings, known visual debt | no |
| [`PROJECT-CONTEXT.toon`](PROJECT-CONTEXT.toon) | routes, services, API health, blockers | no |

Do not re-derive what those files already state. Do verify anything marked fast-rotting
(`api_health`, `blockers`, `current_steps`) before acting on it — those carry a `probed`/`updated`
date.

## The component tier rule

Everything under `src/components/` sits in one of three tiers, and imports flow one way:

```
features/  ──►  shared/  ──►  common/
```

- `common/` — mounted by `app/layout.tsx`, so on every page
- `shared/` — imported by **2+ different feature areas**
- `features/<area>/` — one feature area only

A `features/` component never imports from another `features/` area. If two areas need it,
promote it to `shared/`. Types live in `src/types/`, never in a component folder.
`BIBLE.md` §2 has the full test.

## Maintaining these files

- `COMPONENTS.toon` is **generated** — hand-editing it is pointless. It refreshes on every
  commit once you run `git config core.hooksPath .githooks`.
- `PROJECT-CONTEXT.toon` is refreshed **twice monthly**; `meta.next_review` holds the next date,
  and its `update_protocol` section lists the steps.
- Row counts are declared in TOON as `key[N]{...}:` — if you add or remove a hand-written row,
  update `N`.
- Never put credentials, tokens or env values in any of them. Record the variable name and
  where it is read.

## Repo-specific gotchas

- `README.md` is **stale** — roughly 12 of its claims are false (route groups, Zod,
  isomorphic-dompurify, wired next-intl, `.env.example`, a working `USE_MOCK` path). Trust
  these files over the README.
- `npm run lint` is **broken** — the `ajv: ^8.18.0` override is incompatible with `eslint@10`.
  Pre-existing. `tsc --noEmit` and `npm run build` are the real gates.
- `NEXT_PUBLIC_API_BASE_URL` is documented but **read by no code**. API hosts are hardcoded in
  `src/services/*.ts`. Changing it in Netlify does nothing.
- There is **no test runner**. The two files in `src/lib/__tests__/` cannot run as configured.
- Deploy config (build command, env vars) lives in the **Netlify dashboard**, not in this repo —
  there is no `netlify.toml`.
- Articles rendering locally but 404ing on the deployed site is a known failure mode: the local
  `.next/cache/fetch-cache` serves stale pre-outage responses that a fresh Netlify build has no
  copy of. See the `local_vs_deployed` section of `PROJECT-CONTEXT.toon`.

## Conventions

Pages and route handlers fetch; components take props. `revalidate` is set per `fetch()` call,
never as a route-segment export. Every right-hand rail goes through `<Rail>` in
`src/components/shared/Rail.tsx` — never hand-roll an `<aside>`. Anything button-shaped uses
`.button` / `.button.alt` from `globals.css`, with Tailwind for layout only. Sector/industry
logic goes through `src/lib/taxonomy.ts`, not the older `src/lib/sector-mapper.ts`. Language
strings resolve through `src/lib/languages.ts`.
