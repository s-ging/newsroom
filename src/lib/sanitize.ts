// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

// First decode HTML entities, then sanitize
function decodeHtmlEntities(text: string): string {
  return text
    // basic entities
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'")
    // curly quotes
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    // em/en dashes
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

export function sanitizeText(text: string | null | undefined): string {
  if (!text) return '';
  // Decode first, then sanitize
  const decoded = decodeHtmlEntities(text);
  return DOMPurify.sanitize(decoded, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
}

export function sanitizeHeadline(text: string | null | undefined): string {
  if (!text) return '';
  const decoded = decodeHtmlEntities(text);
  return DOMPurify.sanitize(decoded, {
    ALLOWED_TAGS: ['em', 'strong', 'b', 'i'],
    ALLOWED_ATTR: [],
  }).trim();
}