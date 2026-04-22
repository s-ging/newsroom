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
      'src', 'alt', 'class', 'href', 'target', 'rel', 'width', 'height', 'align', 'border', 'cellpadding', 'cellspacing'
    ],
  });
  
  if (!content) return null;
  
  return (
    <div 
      className={`article-body prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}