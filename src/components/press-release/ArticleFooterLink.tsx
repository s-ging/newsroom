// press-release/ArticleFooterLink.tsx
interface ArticleFooterLinkProps {
  views?: string;
  className?: string;
}

export function ArticleFooterLink({ views, className = '' }: ArticleFooterLinkProps) {
  return (
    <footer className={`mt-8 pt-6 border-t border-gray-200 ${className}`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <a
            href="https://www.acnnewswire.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-bold text-[#2088c9] hover:underline"
          >
            https://www.acnnewswire.com
          </a>
          <p className="text-sm text-gray-600 mt-1">
            From the Asia Corporate News Network
          </p>
        </div>

        {views && (
          <p className="text-xs text-gray-500 shrink-0">{views} views</p>
        )}
      </div>
    </footer>
  );
}
