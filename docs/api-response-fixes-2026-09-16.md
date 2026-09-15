# API response fixes — 2026-09-16

Two service-layer changes, both in the **API response reading** only. No components, no routes,
no styling, no types outside `services/`. Nothing in `src/components/` was opened.

This was done alongside an in-flight refactor on `staging`. Files under active edit at the time —
`services/acn-adapter.ts`, `services/press-release.ts`, `services/release-versions.ts`,
`services/mock-press-release.ts`, `services/index.ts`, `components/press-release/types.ts` —
were **deliberately left alone**. See *Not done* at the bottom; two real defects live in them.

Source of truth for every finding id below: `../contracts/` (repo root, one level up), which holds
before/after payloads for four wire surfaces captured 2026-09-10.

---

## C-M1 — the Industry row was blank on every company page

`src/services/company-profile.ts`

`buildIndustry()` read `s.sectorName` off each element of `sectors[]`. The endpoint has never sent
that key. Every element cleaned to `null`, the list came back empty, and the row rendered blank —
while the correct data sat in the response untouched.

The wire sends objects keyed `name`:

```json
{ "compId": 82, "id": 211, "name": "Aerospace & Defence", "description": "Aerospace & Defence" }
```

**Changed**

- Read `s.name`, falling back to `s.sectorName`. The old key stays in the union as tolerated, not
  expected — the article endpoints do use that spelling for their own coarser field.
- Resolve each name through `resolveIndustry()` per **BIBLE rule 7**, rather than rendering the raw
  string. `taxonomyKey` is punctuation-insensitive, so the wire's `"Construct, Engineering"` lands
  on the master list's `"Construct Engineering"`. All seven of company 82's sector names resolve.
- An unresolved name falls back to the wire's own string rather than being dropped, so a genuinely
  new industry still renders.
- `ApiCompany.sectors` now declares `name`. `id` is deliberately **not** declared — see below.

**Do not match sectors on `id`.** The API's sector ids are a different taxonomy from
`src/lib/sectors.ts`, and because both are dense small integers a wrong id resolves to a *real*
sector rather than to nothing. `acn-admin` made exactly this mistake and tagged Mitsubishi Heavy
Industries as **Fashion & Apparel** and **eSports Gaming**. That was fixed in the same pass
(`AC-M1`). A blank field is visibly missing; a wrong one is not.

---

## C-M8 — company feed rows lost their language tag

`src/services/company-articles.ts`

A comment on `CompanyArticle.language` said *"by-company does not return a language field"*. It
does, and always has — `NewApiArticle` has declared `language?: string | null` the whole time.
`mapArticle()` simply never read it, so every row in a company's release feed rendered with no
language tag.

**Changed**

- `mapArticle()` now sets `language: a.language ?? null`.
- The stale comment is replaced with what is actually true.

The raw wire tag is passed through rather than resolved here, which is **BIBLE rule 8**-compliant:
`shared/LanguageTag` calls `resolveLanguage()` at the render boundary, and an unrecognised value
renders verbatim with a tooltip saying it came from the newswire unchanged. The chain is
`mapArticle` → `PressReleaseItem` → `LanguageTag` → `lib/languages.ts`.

---

## Checks

Per BIBLE §6:

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm run build` | exit 0, `Generating static pages (19/19)` |
| `npm run components:map` | **not run** — no component was added, moved or imported |
| `npm run lint` | not run; broken before this change (`ajv` / `eslint@10`) |

No test runner exists in this repo, so neither fix has a regression guard here. Both have one in
`acn-admin`, which does run tests — `map-company.test.ts` now asserts that a heavy industrial firm
is not tagged Fashion & Apparel, and `map-article.test.ts` pins the language precedence.

---

## Not done — two defects in files that were under edit

Left untouched to avoid colliding with the refactor. Both are real and both are cheap.

**PR-M5 — co-issued releases drop every issuer but the first.**
`services/acn-adapter.ts` keeps only `companies[0]`. Article 109894 is jointly issued by
Mitsubishi Heavy Industries *and* NEC; the page credits MHI alone, and the headline names both.
The wire returns the full array. `acn-admin` already maps all of them.

**PR-M1 — `sectors` is declared as a JSON-encoded string and parsed defensively.**
`services/acn-api.types.ts` types it `sectors?: string | null` with a comment calling it a
JSON-encoded array. The wire sends a real `string[]`:

```json
"sectors": ["Enterprise IT", "Aerospace & Defence", "Artificial Intel [AI]", "Automation [IoT]"]
```

The parsing works around a problem that no longer exists. `acn-admin` declares `string[]`.

Also worth knowing, not acted on: **`hasImage` is unusable.** It was `false` on 100 of 100
consecutive rows while 28 of those same rows carried a non-empty `images[]`, and `imageUrl` was
`null` on all 100. Branch on `images.length`. The `HasThumbnail` *query parameter* filters
correctly, so the server knows — it just doesn't say so in the field.

---

## One thing to be careful of

The two repos' `lib/sectors.ts` files **do not hold the same industries**. `newsroom-main` resolves
all seven of company 82's sector names; `acn-admin`'s list has no entry for `Construct, Engineering`,
`Energy, Alternatives` or `EVs, Transportation` under any id or name. Anything written to work
across both apps has to account for that, and neither list matches the API's own taxonomy — that is
three taxonomies, none of which agree. It is the open question blocking any shared classification
code, and it needs the API team.
