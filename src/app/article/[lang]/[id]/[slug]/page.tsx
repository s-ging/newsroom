// app/article/[lang]/[id]/[slug]/page.tsx
import { redirect } from 'next/navigation';
import { PressRelease } from '@/components/press-release';
import { fetchPressRelease } from '@/services/press-release';
import { headlineToSlug, languageToSlug } from '@/services/acn-adapter';

type Props = {
  params: Promise<{ lang: string; id: string; slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { lang, id, slug } = await params;
  const numericId = Number(id);
  const data = await fetchPressRelease(numericId);

  // Generate the canonical slug from the actual fetched data
  const correctSlug = headlineToSlug(data.headline, numericId);
  const correctLang = languageToSlug(data.language ?? 'english');

  // If slug or lang in the URL doesn't match, redirect to the correct URL
  if (slug !== correctSlug || lang !== correctLang) {
    redirect(`/article/${correctLang}/${id}/${correctSlug}`);
  }

  return (
    <main>
      <PressRelease data={data} />
    </main>
  );
}