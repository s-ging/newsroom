import { HomeHero } from '@/components/home/HomeHero';
import { BusinessRow } from '@/components/home/BusinessRow';
import { fetchLatestNews, type NewsListItem } from '@/services/news-list';

const BUSINESS_ROW_LIMIT = 10;

// page.tsx
export default async function Home() {
  let businessItems: NewsListItem[] = [];
  try {
    businessItems = await fetchLatestNews(20); // fetch more to have enough after filter
  } catch {
    businessItems = [];
  }

  const heroSlides = businessItems
    .filter(item => item.photo.length > 0)
    .slice(0, 5);

  return (
    <main>
      <h1 className="sr-only">ACN Newswire Newsroom</h1>
      <HomeHero slides={heroSlides} />
      <BusinessRow items={businessItems.slice(0, 10)} />
    </main>
  );
}