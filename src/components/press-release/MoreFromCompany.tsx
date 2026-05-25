// press-release/MoreFromCompany.tsx
import type { CompanyArticle } from '@/services/company-articles';
import { PressReleaseItem } from './PressReleaseItem';

interface Props {
  articles: CompanyArticle[];
  companyName: string;
  logoSrc: string | null;
  currentId: number;
}

export function MoreFromCompany({ articles, companyName, logoSrc, currentId }: Props) {
  const visible = articles.filter((a) => a.id !== currentId).slice(0, 3);
  if (visible.length === 0) return null;

  return (
    <section className="mt-8 pt-6">
      <h2 className="text-3xl text-black tracking-tight mb-4">
        More from {companyName}
      </h2>
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
