// press-release/MoreFromCompany.tsx
import Link from 'next/link';
import type { CompanyArticle } from '@/services/company-articles';
import { PressReleaseItem } from './PressReleaseItem';

interface Props {
  articles: CompanyArticle[];
  companyName: string;
  companyId: string | number;
  logoSrc: string | null;
  currentId: number;
}

export function MoreFromCompany({ articles, companyName, companyId, logoSrc, currentId }: Props) {
  const visible = articles.filter((a) => a.id !== currentId).slice(0, 3);
  if (visible.length === 0) return null;

  return (
    <section className="mt-8 pt-6">
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="text-3xl text-black tracking-tight">
          More from {companyName}
        </h2>
        <Link
          href={`/company/${companyId}`}
          className="button alt inline-flex items-center px-6 py-2.5"
        >
          Read more
        </Link>
      </div>
      <ul>
        {visible.map((article) => (
          <li key={article.id}>
            <PressReleaseItem
              article={article}
              companyName={companyName}
              logoSrc={logoSrc}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
