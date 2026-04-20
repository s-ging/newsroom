// press-release/Body.tsx
'use client';

import DOMPurify from 'isomorphic-dompurify';

interface BodyProps {
  content: string;
  className?: string;
}

export function Body({ content, className = '' }: BodyProps) {
  // Security: Sanitize all HTML before rendering
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'figure', 'figcaption', 'div', 'span',
      'blockquote', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'src', 'alt', 'class', 'href', 'target', 'rel', 'width', 'height',
      'style', 'align', 'border', 'cellpadding', 'cellspacing'
    ],
  });
  
  if (!content) return null;
  
  return (
    <div 
      className={`
        prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-lg prose-img:shadow-md
        prose-figcaption:text-sm prose-figcaption:text-gray-500 prose-figcaption:text-center
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}