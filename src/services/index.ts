// services/index.ts
import type { PressReleaseData } from '@/components/press-release/types';
import { mockPressRelease } from './mock-press-release';
import { fetchPressRelease } from './press-release';
 
const USE_MOCK = process.env.USE_MOCK === 'true';
 
/**
 * Get a press release by ID.
 *
 * When USE_MOCK=true  → returns local mock data (no backend needed)
 * When USE_MOCK=false → hits the real ACN Newswire API
 */
export async function getPressRelease(
  id: number,
): Promise<PressReleaseData> {
  if (USE_MOCK) {
    return mockPressRelease;
  }
  return fetchPressRelease(id);
}
 