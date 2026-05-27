'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type SyntheticEvent,
} from 'react';
import type { NewsListItem } from '@/services/news-list';
import { formatDateTime } from '@/lib/utils';
import { ShelfScrollBar } from './ShelfScrollBar';


function PRCard({ pr, image: initialImage, label }: {
  pr: NewsListItem;
  image: string | null;
  label: string;
}) {
  const [image, setImage] = useState<string | null>(initialImage);
  const [isLogo, setIsLogo] = useState(!initialImage); // no photo = it'll be a logo
  const [imgStyle, setImgStyle] = useState<CSSProperties>({
    width: "200px",
    height: "auto",
  });

  useEffect(() => {
    if (initialImage) return;
    fetch(`/api/press-release/${pr.id}`)
      .then(r => r.json())
      .then(data => {
        const logo = data?.companies?. [0]?.logofilename ?? null;
        if (logo) {
          setImage(logo);
          setIsLogo(true);
        }
      })
      .catch(() => {});
  }, [pr.id, initialImage]);

  const handleLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    if (isLogo) return;
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (w >= h) {
      // landscape/square — pin width to 200px, height scales freely
      setImgStyle({ width: "200px", height: "auto" });
    } else {
      // portrait — pin height to 200px, width scales proportionally
      setImgStyle({ width: `${Math.round((w / h) * 200)}px`, height: "200px" });
    }
  }, [isLogo]);

  // all containers are 200px tall; width follows the image
  const containerStyle = isLogo
    ? { width: "160px", height: "200px" }
    : { height: "200px", width: imgStyle.width };

  const containerClass = isLogo
    ? "mb-4 flex items-start justify-center overflow-hidden p-6"
    : "mb-4 flex items-end overflow-hidden";

  return (
    <article className="flex flex-col">
      <div className={containerClass} style={containerStyle}>
        {image ? (
          isLogo ? (
            // no press photo — show white mat box with logo inside
            <div
              className="flex items-center justify-center bg-white"
              style={{ width: "200px", height: "200px" }}
            >
              <img
                src={image}
                alt={label}
                loading="lazy"
                style={{ maxWidth: "120px", maxHeight: "120px", width: "auto", height: "auto" }}
                className="block"
              />
            </div>
          ) : (
            // has a real press photo — normal bottom-aligned image
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={label}
              loading="lazy"
              onLoad={handleLoad}
              style={imgStyle}
              className="block"
            />
          )
        ) : (
          // nothing at all — empty grey box
          <div style={{ width: "200px", height: "200px" }} />
        )}
      </div>

      <div className="overflow-hidden" style={{ height: "250px", width: containerStyle.width }}>
        <h3 className="mb-3 text-base leading-snug text-black line-clamp-4">
          {pr.headline}
        </h3>
        <p className="mb-1 text-sm font-semibold text-[#2088c9]">
          {pr.stock?. [0]?.companyName}
        </p>
        <p className="text-[10px] text-gray-400">{formatDateTime(pr.dateTime, pr.language)}</p>
      </div>
    </article>
  );
}

export function CategoryRow({
  title,
  exploreLabel,
  items,
}: {
  title: string;
  exploreLabel: string;
  items: NewsListItem[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1920px] px-12 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl tracking-tight text-black">{title}</h2>
        <Link href={`/search?sec=${encodeURIComponent(title)}`} className="button alt inline-flex items-center px-6 py-2.5">
          {exploreLabel}
        </Link>
      </div>

      <div key={pathname}>
        <div
          ref={scrollRef}
          role="region"
          aria-label={`${title} news`}
          tabIndex={0}
          className="scrollbar-hide -mx-6 flex items-center gap-6 overflow-x-auto px-6 pb-2"
        >
          {items.map((pr) => {
            const image = pr.photo?. [0] ?? null;
            const label = pr.source;

            return (
              <Link
                key={pr.id}
                href={`/article/${pr.id}`}
                className="shrink-0 self-start"
              >
                <PRCard pr={pr} image={image} label={label} />
              </Link>
            );
          })}
        </div>

        <ShelfScrollBar scrollRef={scrollRef} />
      </div>
    </section>
  );
}
