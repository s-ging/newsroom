import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PressReleaseItem } from '@/components/press-release/PressReleaseItem';
import { fetchAllCompanyArticles } from '@/services/company-articles';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { companyName } = await fetchAllCompanyArticles(id);
  const name = companyName ?? `Company ${id}`;
  return { title: `${name} Press Releases | ACN Newswire` };
}

export default async function CompanyPage({ params, searchParams }: Props) {
  const { id } = await params;

  if (isNaN(Number(id))) notFound();

  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? '1', 10));
  const limit = Math.max(1, parseInt(sp.limit ?? '20', 10));

  const { articles, companyName, logoSrc } = await fetchAllCompanyArticles(id);
  const name = companyName ?? `Company ${id}`;

  const total = articles.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;
  const pageArticles = articles.slice(start, start + limit);

  const buildHref = (p: number) => {
    const qs = new URLSearchParams({ page: String(p) });
    if (sp.limit) qs.set('limit', sp.limit);
    return `/company/${id}?${qs}`;
  };

  return (
    <div className="relative container mx-auto px-4 py-6 max-w-7xl min-h-125">
      {logoSrc && (
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex items-center justify-center grayscale">
          <img src={logoSrc} alt="" className="w-4/5 object-contain" />
        </div>
      )}
      <h1 className="relative z-10 text-3xl tracking-tight text-black mb-8">
        Press Releases from {name}
      </h1>

      {total === 0 ? (
        <p className="text-gray-500 py-8">No press releases found for this company.</p>
      ) : (
        <>
          <div className="relative z-10">
            <div className="divide-y divide-gray-200">
              {pageArticles.map((article) => (
                <PressReleaseItem
                  key={article.id}
                  article={article}
                  companyName={name}
                  logoSrc={null}
                  hideLogo
                  sectors={null}
                  showMeta={false}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <Link
                  href={safePage > 1 ? buildHref(safePage - 1) : '#'}
                  aria-disabled={safePage <= 1}
                  className={`px-4 py-2 text-sm rounded border ${
                    safePage <= 1
                      ? 'text-gray-300 border-gray-200 pointer-events-none'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </Link>
                <span className="text-sm text-gray-600">
                  Page {safePage} of {totalPages}
                </span>
                <Link
                  href={safePage < totalPages ? buildHref(safePage + 1) : '#'}
                  aria-disabled={safePage >= totalPages}
                  className={`px-4 py-2 text-sm rounded border ${
                    safePage >= totalPages
                      ? 'text-gray-300 border-gray-200 pointer-events-none'
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
