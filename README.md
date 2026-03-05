# ACN Newswire — Frontend Rebuild

A Next.js frontend rebuild of [acnnewswire.com](https://acnnewswire.com) — an Asian press release distribution platform supporting 5 languages across regional subdomains.

***

## What This Is

A React/Next.js wrapper around the existing ACN Newswire ASPX backend. This project does **not** rebuild the backend, replace the database, or migrate press release data.

**Two internal sub-projects, one deployment:**

| Route Group | Purpose | Auth Required |
|---|---|---|
| `(public)` | Press release feed, search, filtering, individual release pages | No |
| `(portal)` | Publisher dashboard, billing, metrics, account management | Yes |

***

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS v4 + `@tailwindcss/typography` |
| Validation | Zod |
| Sanitization | isomorphic-dompurify |
| i18n | next-intl |
| Icons | Custom SVGs via barrel export |

***

## Getting Started

```bash
# Clone
git clone https://github.com/your-org/acn-newswire.git
cd acn-newswire

# Install
npm install

# Set up environment
cp .env.example .env.local

# Run dev server
npm run dev --turbopack
```

### Environment Variables

```bash
# .env.example

# Set to 'true' to use mock data (no backend required)
USE_MOCK=true

# Backend API base URL (leave blank when using mock)
NEXT_PUBLIC_API_BASE_URL=
```

> **Frontend is fully runnable without backend access.** Set `USE_MOCK=true` and all press release data is served from `lib/services/pressRelease.ts`.

***

## Project Structure

```
app/
  (public)/           # Public press release site — no auth
    layout.tsx        # Public layout (Nav + Footer)
    page.tsx          # Homepage / feed
    press-release/
      [slug]/         # Individual press release page
  (portal)/           # Publisher portal — auth required
    layout.tsx        # Portal layout
    login/
    dashboard/
    billing/

components/
  shared/             # Used by both public and portal
  public/             # Press release components
  portal/             # Dashboard components

lib/
  services/           # Data layer — swap mock → API via env flag
  types/              # Zod schemas + inferred TypeScript types

assets/
  icons/              # SVG files + barrel export
```

***

## Architecture Decisions

| Decision | Rationale |
|---|---|
| Server Components for press release pages | Full HTML in initial response — SEO and Google News crawler requirements |
| `dangerouslySetInnerHTML` in `PressReleaseBody.tsx` only | XSS risk isolated to one file with DOMPurify sanitization |
| Zod validation on all API responses | ASPX backend can return malformed or unexpected data |
| `USE_MOCK` env flag | Frontend development unblocked from backend availability |
| ISR `revalidate: 3600` on press release pages | Content stays fresh hourly without full rebuild |
| Route groups `(public)` / `(portal)` | Hard folder boundary — shared components live in `components/shared/` only |
| One repo, one deployment | Two-person team, shared components, one CI/CD pipeline |

***

## Localization

Five language variants served via subdomains:

| Subdomain | Locale |
|---|---|
| `www.acnnewswire.com` | `en` |
| `ch.acnnewswire.com` | `zh-CN` |
| `ct.acnnewswire.com` | `zh-CHT` |
| `kr.acnnewswire.com` | `ko-KR` |
| `jcnnewswire.com` | `ja-JP` |

Subdomain → locale routing handled in `next.config.ts` via rewrites.  
Translations managed via `next-intl` with message files in `messages/`.

***

## Build Status

### Public Site
- [x] Footer
- [x] SocialIcon system
- [x] Press release service layer (mock/API swappable)
- [x] Press release Zod schema + TypeScript types
- [x] Press release page — Server Component, `generateMetadata`, ISR
- [x] `PressReleaseBody` — DOMPurify isolated
- [ ] `PressReleaseHero` — 2 variants (with image / no image)
- [ ] Nav + Mega Menu
- [ ] Sidebar — widget shell
- [ ] Homepage / press release feed
- [ ] Localization wiring

### Portal
- [ ] Auth (login / register)
- [ ] Publisher dashboard
- [ ] Billing
- [ ] Metrics

***

## Backend Integration

The frontend connects to two backend surfaces:

```
Existing ASPX backend   → press release data (read-only)
New ASP.NET Core API    → auth, billing, portal, submissions
```

Both are consumed through `lib/services/`. When the API is ready, set `USE_MOCK=false` and provide `NEXT_PUBLIC_API_BASE_URL`. No component changes required.

***

## What This Repo Does NOT Contain

- Backend code (separate repo)
- Database schema or migrations
- ASPX / legacy frontend code
- Deployment infrastructure config (separate)
