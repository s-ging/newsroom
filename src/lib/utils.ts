// /lib/utils.ts
export function decodeHtmlEntities(str: string): string {
  if (typeof window === 'undefined') {
    return str
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

// lib/utils.ts — add to your existing file
const TIMEZONE_BY_LANGUAGE: Record<string, string> = {
  'Japanese': 'JST',
  'Korean': 'KST',
  'Simplified Chinese': 'CST',
  'Traditional Chinese': 'HKT/SGT',
  'English': 'HKT/SGT',
};

export function formatDateTime(raw: string, language?: string | null): string {
  const match = raw.match(/\w+,\s+(\d+)\s+(\w+)\s+(\d{4})\s+(\d{2}:\d{2})/);
  if (!match) return raw;
  const [, day, month, year, time] = match;
  const monthShort = new Date(`${month} 1`).toLocaleString('en', { month: 'short' });
  const tz = TIMEZONE_BY_LANGUAGE[language ?? ''] ?? 'HKT/SGT';
  return `${monthShort} ${day}, ${year} ${time} ${tz}`;
}