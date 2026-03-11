// press-release/Footer.tsx
interface FooterProps {
  views?: string | number;
  url: string;
  className?: string;
}

export function Footer({ views, url, className = '' }: FooterProps) {
  return (
    <footer className={`mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {views && (
          <div className="flex items-center gap-1">
            <span className="font-medium">Views:</span>
            <span>{Number(views).toLocaleString()}</span>
          </div>
        )}
        
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          View original press release →
        </a>
        
        <div>© {new Date().getFullYear()} ACN Newswire. All rights reserved.</div>
      </div>
    </footer>
  );
}