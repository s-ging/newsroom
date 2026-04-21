// services/press-release.ts
import type { PressReleaseData } from '@/components/press-release/types';
import type { AcnPressRelease } from './acn-api.types';
import { adaptAcnPressRelease } from './acn-adapter';
import { mockPressRelease } from './mock-press-release';

const API_BASE = 'https://www.acnnewswire.com/acnnewswireapi';

// ← flip to false when the real API is ready
const USE_MOCK = true;

export async function getPressRelease(id: number): Promise<PressReleaseData> {
  if (USE_MOCK) {
    return mockPressRelease; // already matches your clean type, no adapter needed
  }

  const res = await fetch(
    `${API_BASE}/PressRelease/GetPressReleaseByID?prid=${id}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`API error ${res.status} for press release ${id}`);
  }

  const raw: AcnPressRelease = await res.json();

  // ← this is the only place the adapter is ever called
  return adaptAcnPressRelease(raw);
}