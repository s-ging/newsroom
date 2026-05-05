// services/reading-mode.ts

export type ReadingMode = 'chronological' | 'company' | 'sector';

// Stub — will be driven by user account preferences later
export function getReadingMode(): ReadingMode {
  return 'chronological';
}

export async function getNextArticleId(
  currentId: number,
  mode: ReadingMode,
  context?: { companyId?: number; sectorId?: number }
): Promise<number | null> {
  switch (mode) {
    case 'chronological':
      return getNextChronological(currentId);
    case 'company':
      // stub — will use context.companyId once accounts exist
      return getNextChronological(currentId);
    case 'sector':
      // stub — will use context.sectorId once accounts exist
      return getNextChronological(currentId);
  }
}

async function getNextChronological(currentId: number): Promise<number | null> {
  try {
    const res = await fetch(
      `https://www.acnnewswire.com/acnnewswireapi/api/v1/News/GetNewsByLanguage?langType=0&pageNumber=1&pageSize=20`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const articles: { id: number }[] = await res.json();
    const idx = articles.findIndex(a => a.id === currentId);
    // articles are newest-first, so next chronologically = idx + 1
    return idx !== -1 && idx + 1 < articles.length ? articles[idx + 1].id : null;
  } catch {
    return null;
  }
}