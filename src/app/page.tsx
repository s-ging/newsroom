import { HomeHero } from '@/components/home/HomeHero';
import { CategoryRow } from '@/components/home/CategoryRow';
import { EventsRow } from '@/components/home/EventsRow';
import { FeaturedReleases, type FeaturedItem } from '@/components/home/FeaturedReleases';
import { CATEGORIES } from '@/config/categories';
import { fetchLatestNews, type NewsListItem } from '@/services/news-list';
import { fetchEvents, type Event } from '@/services/events';
import { fetchPressRelease } from '@/services/press-release';
import type { PressReleaseData } from '@/components/press-release/types';

export default async function Home() {
  let newsItems: NewsListItem[] = [];
  let events: Event[] = [];
  let featured: PressReleaseData | null = null;
  let article107246: PressReleaseData | null = null;
  let article107300: PressReleaseData | null = null;
  let article107292: PressReleaseData | null = null;
  let article107230: PressReleaseData | null = null;

  try {
    [newsItems, events, featured, article107246, article107300, article107292, article107230] = await Promise.all([
      fetchLatestNews(60),
      fetchEvents(),
      fetchPressRelease(85791),
      fetchPressRelease(107246),
      fetchPressRelease(107300),
      fetchPressRelease(107292),
      fetchPressRelease(107230),
    ]);
  } catch {
    newsItems = [];
    events = [];
  }

  const featuredImageUrl = '/images/sector/environment/1.avif';

  const cn = (pr: PressReleaseData) => pr.companies?.[0]?.company_Name;

  const featuredArticles: FeaturedItem[] = [
    ...(article107246 ? [{ ...article107246, companyName: cn(article107246) }] : []),
    ...(article107300 ? [{ ...article107300, photo: ['/images/city/tokyo.avif'], companyName: cn(article107300) }] : []),
    ...(article107292 ? [{ ...article107292, photo: ['/images/city/hong-kong.avif'], companyName: cn(article107292) }] : []),
    ...(article107230 ? [{ ...article107230, companyName: cn(article107230) }] : []),
  ];

  const heroSlides = newsItems
    .filter(item => item.photo.length > 0)
    .slice(0, 5);

  return (
    <main>
      <h1 className="sr-only">ACN Newswire Newsroom</h1>
      <HomeHero slides={heroSlides} />
      <EventsRow events={events} />
      {featured && (
        <FeaturedReleases
          featuredArticle={{ ...featured, companyName: cn(featured) }}
          featuredImageUrl={featuredImageUrl}
          articles={featuredArticles}
        />
      )}
      {CATEGORIES.map((category) => (
        <CategoryRow
          key={category.slug}
          title={category.title}
          exploreLabel={category.exploreLabel}
          items={newsItems.filter(category.matches)}
        />
      ))}
    </main>
  );
}
