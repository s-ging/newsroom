// components/press-release/InfiniteArticleFeed.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { PressRelease } from './PressRelease';
import { getNextArticleId, getReadingMode } from '@/services/reading-mode';
import type { PressReleaseData } from './types';
import type { CompanyArticle } from '@/services/company-articles';

interface LoadedArticle {
  data: PressReleaseData;
  relatedArticles: CompanyArticle[];
}

interface Props {
  firstId: number;
}

export function InfiniteArticleFeed({ firstId }: Props) {
  const [articles, setArticles] = useState<LoadedArticle[]>([]);
  const [lastId, setLastId] = useState(firstId);
  const [loading, setLoading] = useState(false);
  const [exhausted, setExhausted] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (exhausted) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loading) return;
        setLoading(true);

        const mode = getReadingMode();
        const nextId = await getNextArticleId(lastId, mode);

        if (!nextId) {
          setExhausted(true);
          setLoading(false);
          return;
        }

        const dataRes = await fetch(`/api/press-release/${nextId}`);
        if (!dataRes.ok) {
          setExhausted(true);
          setLoading(false);
          return;
        }

        const data: PressReleaseData = await dataRes.json();

        const compId = data.companies?.[0]?.comp_ID ?? '';
        const relatedRes = await fetch(`/api/company-articles/${compId}`);
        const relatedArticles: CompanyArticle[] = relatedRes.ok
          ? await relatedRes.json()
          : [];

        setArticles(prev => [...prev, { data, relatedArticles }]);
        setLastId(nextId);

        // update URL without navigation
        const slug = data.headline
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .slice(0, 80);
        window.history.replaceState(null, '', `/article/${nextId}/${slug}`);

        setLoading(false);
      },
      { rootMargin: '400px' }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [lastId, loading, exhausted]);

  return (
    <>
      {articles.map(({ data, relatedArticles }) => (
        <div key={data.id} className="mt-12 pt-12">
          <PressRelease data={data} relatedArticles={relatedArticles} />
        </div>
      ))}

      <div ref={sentinelRef} className="h-1" />

      {loading && (
        <div className="text-center py-8 text-sm text-gray-400">
          Loading next article...
        </div>
      )}

      {exhausted && (
        <div className="text-center py-8 text-sm text-gray-400">
          You've reached the end.
        </div>
      )}
    </>
  );
}