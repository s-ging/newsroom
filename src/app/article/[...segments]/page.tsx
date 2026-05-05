// app/article/[...segments]/page.tsx
import { redirect, notFound } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { PressRelease } from '@/components/press-release';
import { fetchPressRelease } from '@/services/press-release';
import { fetchCompanyArticles } from '@/services/company-articles';
import { headlineToSlug, languageToSlug } from '@/services/acn-adapter';

type Props = {
  params: Promise<{ segments: string[] }>
}

export default async function ArticlePage({ params }: Props) {
  const { segments } = await params;

  let id: string;
  let lang: string | undefined;
  let slug: string | undefined;

  if (segments.length === 1) {
    [id] = segments;
  } else if (segments.length === 2) {
    [lang, id] = segments;
  } else {
    [lang, id, slug] = segments;
  }

  const numericId = Number(id);
  if (isNaN(numericId)) notFound();

  try {
    const data = await fetchPressRelease(numericId);
    const correctSlug = headlineToSlug(data.headline, numericId);
    const correctLang = languageToSlug(data.language ?? 'english');

    if (slug !== correctSlug || lang !== correctLang) {
      redirect(`/article/${correctLang}/${id}/${correctSlug}`);
    }

    // Fetch related articles after the redirect check — compId is only known from data
    const relatedArticles = await fetchCompanyArticles(data.companies?.[0]?.comp_ID);

    return (
      <main>
        <PressRelease data={data} relatedArticles={relatedArticles} />
      </main>
    );
  } catch (e) {
    if (isRedirectError(e)) throw e; // ← let Next.js handle its own redirect
    notFound();
  }
}
