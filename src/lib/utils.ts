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