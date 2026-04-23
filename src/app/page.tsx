import { HomeHero } from '@/components/home/HomeHero';
import { CategoryRow } from '@/components/home/CategoryRow';
import { CATEGORIES } from '@/config/categories';
import { fetchLatestNews, type NewsListItem } from '@/services/news-list';

export default async function Home() {
  let newsItems: NewsListItem[] = [];
  try {
    newsItems = await fetchLatestNews(20);
  } catch {
    newsItems = [];
  }

  const heroSlides = newsItems
    .filter(item => item.photo.length > 0)
    .slice(0, 5);

  return (
    <main>
      <h1 className="sr-only">ACN Newswire Newsroom</h1>
      <HomeHero slides={heroSlides} />
      {CATEGORIES.map((category) => (
        <CategoryRow
          key={category.slug}
          title={category.title}
          exploreHref={category.exploreHref}
          exploreLabel={category.exploreLabel}
          items={newsItems.filter(category.matches)}
        />
      ))}
    </main>
  );
}
