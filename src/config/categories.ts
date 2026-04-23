import type { NewsListItem } from '@/services/news-list';

export interface CategoryConfig {
  slug: string;
  title: string;
  exploreHref: string;
  exploreLabel: string;
  matches: (item: NewsListItem) => boolean;
}

const passThrough = (_item: NewsListItem) => true;

export const CATEGORIES: readonly CategoryConfig[] = [
  {
    slug: 'business',
    title: 'Business',
    exploreHref: '#',
    exploreLabel: 'Explore Business',
    matches: passThrough,
  },
  {
    slug: 'communication',
    title: 'Communication',
    exploreHref: '#',
    exploreLabel: 'Explore Communication',
    matches: passThrough,
  },
  {
    slug: 'cryptocurrency',
    title: 'Cryptocurrency',
    exploreHref: '#',
    exploreLabel: 'Explore Cryptocurrency',
    matches: passThrough,
  },
  {
    slug: 'finance',
    title: 'Finance',
    exploreHref: '#',
    exploreLabel: 'Explore Finance',
    matches: passThrough,
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    exploreHref: '#',
    exploreLabel: 'Explore Healthcare',
    matches: passThrough,
  },
  {
    slug: 'lifestyle',
    title: 'Lifestyle',
    exploreHref: '#',
    exploreLabel: 'Explore Lifestyle',
    matches: passThrough,
  },
  {
    slug: 'sustainability',
    title: 'Sustainability',
    exploreHref: '#',
    exploreLabel: 'Explore Sustainability',
    matches: passThrough,
  },
  {
    slug: 'technology',
    title: 'Technology',
    exploreHref: '#',
    exploreLabel: 'Explore Technology',
    matches: passThrough,
  },
] as const;
