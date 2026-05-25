import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';

// Minimal shape consumed by both PressReleaseData and NewsListItem callers
export interface FeaturedItem {
  id: number;
  headline: string;
  dateTime: string;
  companyName?: string;
  sector?: string[];
  photo?: string[];
  language?: string | null;
}

interface Props {
  featuredArticle: FeaturedItem;
  featuredImageUrl: string;
  articles: FeaturedItem[];
}

function ArticleMeta({ sector, companyName }: { sector?: string; companyName?: string }) {
  if (!sector && !companyName) return null;
  return (
    <div className="flex min-w-0 items-center gap-1.5 mb-1">
      {sector && <span className="min-w-0 truncate text-xs font-semibold text-gray-500">{sector}</span>}
      {sector && companyName && <span className="shrink-0 text-xs text-gray-400">•</span>}
      {companyName && <span className="min-w-0 truncate text-xs font-semibold text-gray-500">{companyName}</span>}
    </div>
  );
}

function ArticleCard({ article }: { article: FeaturedItem }) {
  return (
    <Link href={`/article/${article.id}`} className="block">
      {article.photo?.[0] && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.photo[0]}
          alt={article.headline}
          loading="lazy"
          style={{ width: '100%', height: 'auto' }}
          className="mb-3"
        />
      )}
      <h3 className="mb-2 text-base leading-snug text-black">{article.headline}</h3>
      <ArticleMeta sector={article.sector?.[0]} companyName={article.companyName} />
      <p className="text-xs text-gray-400">{formatDateTime(article.dateTime, article.language)}</p>
    </Link>
  );
}

export function FeaturedReleases({ featuredArticle, featuredImageUrl, articles }: Props) {
  const [a0, a1, a2, a3] = articles;

  return (
    <section className="mx-auto max-w-[1920px] px-12 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl tracking-tight text-black">Today's Featured Stories</h2>
        <Link href="/news" className="button alt inline-flex items-center px-6 py-2.5">
          Explore Latest
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 0.2fr 0.2fr', gap: '24px' }}>

        {/* Column 1 — featured article with static image */}
        <Link href={`/article/${featuredArticle.id}`} className="block min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredImageUrl}
            alt={featuredArticle.headline}
            loading="lazy"
            style={{ width: '100%', height: 'auto' }}
          />
          <h3 className="text-[30px] mb-2 mt-3 leading-snug text-black">{featuredArticle.headline}</h3>
          <ArticleMeta sector={featuredArticle.sector?.[0]} companyName={featuredArticle.companyName} />
          <p className="text-xs text-gray-400">{formatDateTime(featuredArticle.dateTime, featuredArticle.language)}</p>
        </Link>

        {/* Column 2 — articles[0] and articles[1] */}
        <div className="flex min-w-0 flex-col">
          {([a0, a1] as (FeaturedItem | undefined)[]).map((article, i) =>
            article ? (
              <div key={article.id}>
                {i > 0 && <hr className="my-4 border-gray-200" />}
                <ArticleCard article={article} />
              </div>
            ) : null
          )}
        </div>

        {/* Column 3 — articles[2] and articles[3] */}
        <div className="flex min-w-0 flex-col">
          {([a2, a3] as (FeaturedItem | undefined)[]).map((article, i) =>
            article ? (
              <div key={article.id}>
                {i > 0 && <hr className="my-4 border-gray-200" />}
                <ArticleCard article={article} />
              </div>
            ) : null
          )}
        </div>

      </div>
    </section>
  );
}
