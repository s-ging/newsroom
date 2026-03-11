// press-release/Headline.tsx
interface HeadlineProps {
  title: string;
  subhead?: string | null;
  className?: string;
}

export function Headline({ title, subhead, className = '' }: HeadlineProps) {
  return (
    <header className={`mb-6 ${className}`}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
      
      {subhead && (
        <h2 className="text-xl md:text-2xl text-gray-600 mt-3 font-medium leading-relaxed">
          {subhead}
        </h2>
      )}
    </header>
  );
}