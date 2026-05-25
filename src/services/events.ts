// services/events.ts
const API_BASE = 'https://www.acnnewswire.com/acnnewswireapi';

export interface Event {
  id: number;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  url: string;
  pressReleaseUrl: string | null;
  photo: string | null;
}

interface AcnEvent {
  id: number;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  location: string | null;
  url: string | null;
  pressReleaseUrl?: string | null;
  photo: string | null;
}

function normalizeUrl(url: string | null | undefined): string {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
}

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE}/api/v1/Event/GetAllEvent`, {
    next: { revalidate: 3600 },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) return [];

  const raw: AcnEvent[] = await res.json();

  return raw
    .filter((e) => e.startDate && e.description)
    .map((e) => ({
      id: e.id,
      startDate: e.startDate!,
      endDate: e.endDate ?? e.startDate!,
      description: e.description!,
      location: e.location ?? '',
      url: normalizeUrl(e.url),
      pressReleaseUrl: e.pressReleaseUrl ? normalizeUrl(e.pressReleaseUrl) : null,
      photo: e.photo ?? null,
    }));
}
