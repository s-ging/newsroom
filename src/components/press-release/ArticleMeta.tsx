// press-release/ArticleMeta.tsx
interface ArticleMetaProps {
  topic?: string;
  sectors?: string[];
  source?: string;
  // TODO: replace hardcoded defaults once the API provides region/country fields
  region?: string;
  country?: string;
  className?: string;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-gray-600">{label}:</dt>
      <dd className="font-semibold text-gray-900">{value}</dd>
    </div>
  );
}

export function ArticleMeta({
  topic,
  sectors,
  source,
  region = 'East Asia',
  country = 'Japan',
  className = '',
}: ArticleMetaProps) {
  return (
    <dl className={`mt-10 text-sm space-y-1 ${className}`}>
      {topic && <Row label="Topic" value={topic} />}
      <Row label="Region" value={region} />
      <Row label="Country" value={country} />
      {source && <Row label="Source" value={source} />}
      {sectors && sectors.length > 0 && (
        <Row label="Sectors" value={sectors.join(', ')} />
      )}
    </dl>
  );
}
