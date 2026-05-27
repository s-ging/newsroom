// services/acn-adapter.ts
// This file's only job: convert old API shape → your clean PressReleaseData.
// When you move to the new database, you delete this file and nothing else changes.

import type { AcnPressRelease } from './acn-api.types';
import type { PressReleaseData } from '@/components/press-release/types';
import { slugify } from 'transliteration';
import { sanitizeText, sanitizeHeadline } from '@/lib/sanitize';

export function adaptAcnPressRelease(raw: AcnPressRelease): PressReleaseData {
  return {
    id:           raw.id,
    headline:     sanitizeHeadline(raw.headline),
    subHeadline:  sanitizeText(raw.subHeadline) ?? null,
    dateTime:     raw.dateTime,
    bodyText:     sanitizeText(raw.bodyText) ?? '',
    bodyHtml:     raw.bodyHtml,
    language:     raw.language,      // "Japanese", "English", etc.
    source:       sanitizeText(raw.source),
    supplier:     raw.supplier,
    location:     raw.location,      // shape is identical, pass through
    url:          raw.url,
    sector:       raw.sector ?? [],
    topic:        sanitizeText(raw.topic),
    views:        raw.views,

    // Old API sends photo as objects — your mock uses string[].
    // We keep your existing type (string[]) and just pull the bigImage URL.
    photo: (raw.photo ?? []).map(p => p.bigImage),

    // Old API sends stock as an array or null. Keep null if empty.
    stock: raw.stock && raw.stock.length > 0 ? raw.stock[0] : null,

    // Strip fields your app doesn't need (issuer, companyNameCH, etc.)
    companies: (raw.companies ?? []).map(c => ({
      comp_ID:      sanitizeText(c.comp_ID),
      company_Name: sanitizeText(c.company_Name),
      companyNameJP: sanitizeText(c.companyNameJP),
      companyNameKO: sanitizeText(c.companyNameKO),
      companyNameCH: sanitizeText(c.companyNameCH),
      companyNameCT: sanitizeText(c.companyNameCT),
      logofilename: c.logofilename,
      url:          c.url,
      facebook:     c.facebook,
      twitter:      c.twitter,
      youtube:      c.youtube,
      linkedin:     c.linkedin,
      telegram:     c.telegram,
      // description not in old API — will be undefined, that's fine
    })),
  };
}

// Utility: "Japanese" → "japanese", "Simplified Chinese" → "simplified-chinese"
export function languageToSlug(language: string): string {
  return language.toLowerCase().replace(/\s+/g, '-');
}

// Utility: clean SEO slug from headline
// Falls back to press-release-{id} for non-Latin titles
export function headlineToSlug(headline: string, id: number): string {
  const slug = slugify(headline, {
    lowercase: true,      // ✅ correct option name (not `lowercase`)
    trim: true,       // strips leading/trailing separators
  }).slice(0, 80);    // ✅ maxLength doesn't exist — slice manually instead

  return slug.length > 5 ? slug : `press-release-${id}`;
}