// press-release/Meta.tsx
interface MetaProps {
  sectors: string[];
  topic: string;
  source: string;
  dateTime: string;
  location: string;
  views?: string | number;
  className?: string;
}

export function Meta({ 
  sectors, 
  topic, 
  source, 
  dateTime, 
  location,
  views,
  className = '' 
}: MetaProps) {
  
  const formattedDate = new Date(dateTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className={`border-y border-gray-200 py-4 my-4 ${className}`}>
      {sectors && sectors.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {sectors.map((sector, index) => (
            <span 
              key={`${sector}-${index}`}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
            >
              {sector}
            </span>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Topic:</span>
          <span>{topic}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Source:</span>
          <span>{source}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Location:</span>
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Published:</span>
          <time dateTime={dateTime}>{formattedDate}</time>
        </div>
        
        {views && (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Views:</span>
            <span>{Number(views).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}