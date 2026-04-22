// services/press-release.ts
import type { PressReleaseData } from '@/components/press-release/types';
import type { AcnPressRelease } from './acn-api.types';
import { adaptAcnPressRelease } from './acn-adapter';

const API_BASE = 'https://www.acnnewswire.com/acnnewswireapi';

export async function fetchPressRelease(id: number): Promise<PressReleaseData> {
  const res = await fetch(
    `${API_BASE}/api/v1/News/GetArticleById/${id}`,
    {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    },
  );

  if (!res.ok) {
    throw new Error(`API error ${res.status} for press release ${id}`);
  }

  const raw: AcnPressRelease = await res.json();
  return adaptAcnPressRelease(raw);
}