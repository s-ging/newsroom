export const COUNTRY_TO_REGION: Record<string, string> = {
  // Asia
  Japan: 'Asia',
  China: 'Asia',
  'Hong Kong': 'Asia',
  'South Korea': 'Asia',
  Taiwan: 'Asia',
  Vietnam: 'Asia',
  Thailand: 'Asia',
  Singapore: 'Asia',
  Malaysia: 'Asia',
  Indonesia: 'Asia',
  India: 'Asia',
  Philippines: 'Asia',

  // Oceania
  Australia: 'Oceania',
  'New Zealand': 'Oceania',

  // Africa
  'South Africa': 'Africa',
  Kenya: 'Africa',
  Nigeria: 'Africa',
  Egypt: 'Africa',

  // Americas
  USA: 'Americas',
  'United States': 'Americas',
  Canada: 'Americas',
  Mexico: 'Americas',
  Brazil: 'Americas',
  Argentina: 'Americas',

  // Europe
  UK: 'Europe',
  'United Kingdom': 'Europe',
  Germany: 'Europe',
  France: 'Europe',
  Italy: 'Europe',
  Spain: 'Europe',
};

export function getArticleRegion(locationName: string | null | undefined): string | null {
  if (!locationName) return null;
  return COUNTRY_TO_REGION[locationName] ?? null;
}
