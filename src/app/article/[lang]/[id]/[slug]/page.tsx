// app/article/[lang]/[id]/[slug]/page.tsx
import { PressRelease } from '@/components/press-release';
import { getPressRelease } from '@/services/press-release';

type Props = {
  params: Promise<{ lang: string; id: string; slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { lang, id, slug } = await params;
  const data = await getPressRelease(Number(id));

  return (
    <main>
      <PressRelease data={data} />
    </main>
  );
}