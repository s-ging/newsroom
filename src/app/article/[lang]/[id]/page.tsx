// app/article/[lang]/[id]/page.tsx
import { redirect } from 'next/navigation';
import { fetchPressRelease } from '@/services/press-release';
import { headlineToSlug, languageToSlug } from '@/services/acn-adapter';

type Props = {
  params: Promise<{ lang: string; id: string }>
}

export default async function ArticleRedirectPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  const data = await fetchPressRelease(numericId);

  const slug = headlineToSlug(data.headline, numericId);
  const lang = languageToSlug(data.language ?? 'english');

  redirect(`/article/${lang}/${id}/${slug}`);
}