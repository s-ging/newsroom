// TODO: Replace with real event-article relation when API supports it
import type { Metadata } from 'next';
import type { PressReleaseData } from '@/components/press-release/types';
import { fetchPressRelease } from '@/services/press-release';
import { fetchEvents } from '@/services/events';
import { PressReleaseItem } from '@/components/press-release/PressReleaseItem';
import mappings from '@/data/event-article-mappings.json';

type Props = {
  params: Promise<{ eventId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params;
  const events = await fetchEvents();
  const event = events.find((e) => String(e.id) === eventId);
  const name = event?.description ?? `Event ${eventId}`;
  return { title: `Press Releases for ${name} | ACN Newswire` };
}

export default async function EventPressReleasesPage({ params }: Props) {
  const { eventId } = await params;

  const articleIds: number[] = (mappings as Record<string, number[]>)[eventId] ?? [];

  const [events, results] = await Promise.all([
    fetchEvents(),
    Promise.allSettled(articleIds.map((id) => fetchPressRelease(id))),
  ]);

  const event = events.find((e) => String(e.id) === eventId);
  const eventName = event?.description ?? `Event ${eventId}`;

  const articles: PressReleaseData[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') articles.push(result.value);
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-3xl tracking-tight text-black mb-8">
        Press Releases for {eventName}
      </h1>

      {articleIds.length === 0 ? (
        <p className="text-gray-500 py-8">No press releases linked to this event yet.</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500 py-8">No press releases found.</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {articles.map((data) => (
            <PressReleaseItem
              key={data.id}
              article={{
                id: data.id,
                headline: data.headline,
                dateTime: data.dateTime,
                thumbImage: data.photo?.[0] ?? null,
                description: data.bodyText ? data.bodyText.slice(0, 200) : null,
              }}
              companyName={data.companies?.[0]?.company_Name ?? data.source}
              logoSrc={data.companies?.[0]?.logofilename ?? null}
              sectors={data.sector.length > 0 ? data.sector : null}
              showMeta
            />
          ))}
        </div>
      )}
    </div>
  );
}
