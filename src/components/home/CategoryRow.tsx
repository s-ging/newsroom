'use client';

import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from 'react';
import type { NewsListItem } from '@/services/news-list';
import { formatDateTime } from '@/lib/utils';

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

function PRCard({ pr, image: initialImage, label }: {
  pr: NewsListItem;
  image: string | null;
  label: string;
}) {
  const [image, setImage] = useState<string | null>(initialImage);
  const [isLogo, setIsLogo] = useState(!initialImage); // no photo = it'll be a logo
  const [imgStyle, setImgStyle] = useState<React.CSSProperties>({
    width: "250px",
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

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (isLogo) return;
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    const isPortrait = h > w;
    const isLandscape = w > h;

    if (isPortrait) {
      const computedWidth = (w / h) * 320;
      const clampedWidth = clamp(computedWidth, 200, 280);
      setImgStyle({ width: `${clampedWidth}px`, height: "320px" });
    } else if (isLandscape) {
      setImgStyle({ width: "250px", height: "auto" });
    } else {
      setImgStyle({ width: "200px", height: "auto" });
    }
  }, [isLogo]);

  // Logo gets a fixed 250x250 container, press photo gets the dynamic one
  const containerStyle = isLogo
    ? { width: "200px", height: "320px" }
    : { height: "320px", width: imgStyle.width, minWidth: "200px", maxWidth: "320px" };

  const containerClass = isLogo
    ? "mb-4 flex items-center justify-center overflow-hidden p-6"
    : "mb-4 flex items-end overflow-hidden";

  return (
    <article className="flex flex-col">
      <div className={containerClass} style={containerStyle}>
        {image ? (
          isLogo ? (
            // no press photo — show white mat box with logo inside
            <div
              className="flex items-end justify-center bg-white"
              style={{ width: "250px", height: "250px" }}
            >
              <img
                src={image}
                alt={label}
                loading="lazy"
                style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                className="block p-4"
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
          <div style={{ width: "250px", height: "250px" }} />
        )}
      </div>

      <div className="overflow-hidden" style={{ height: "250px", width: containerStyle.width }}>
        <h3 className="mb-3 text-base leading-snug text-black">
          {pr.headline}
        </h3>
        <p className="mb-2 text-xs font-semibold text-gray-500">
          {pr.stock?. [0]?.companyName}
        </p>
        <p className="text-xs text-gray-400">{formatDateTime(pr.dateTime, pr.language)}</p>
      </div>
    </article>
  );
}

export function CategoryRow({
  title,
  exploreHref,
  exploreLabel,
  items,
}: {
  title: string;
  exploreHref: string;
  exploreLabel: string;
  items: NewsListItem[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1920px] px-12 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl tracking-tight text-black">{title}</h2>
        <a href={exploreHref} className="button alt inline-flex items-center px-6 py-2.5">
          {exploreLabel}
        </a>
      </div>

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
    </section>
  );
}

function ShelfScrollBar({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
  });
  const dragRef = useRef<{
    startX: number;
    startScroll: number;
    trackPx: number;
  } | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setMetrics({
        scrollLeft: el.scrollLeft,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [scrollRef]);

  const { scrollLeft, scrollWidth, clientWidth } = metrics;
  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  const hasOverflow = maxScroll > 0;
  const thumbWidthPct = hasOverflow
    ? Math.max(10, (clientWidth / scrollWidth) * 100)
    : 100;
  const thumbLeftPct = hasOverflow
    ? (scrollLeft / maxScroll) * (100 - thumbWidthPct)
    : 0;

  const onThumbPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const scroll = scrollRef.current;
    if (!track || !scroll) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startScroll: scroll.scrollLeft,
      trackPx: track.clientWidth,
    };
  };

  const onThumbPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const scroll = scrollRef.current;
    if (!scroll) return;
    const dx = e.clientX - dragRef.current.startX;
    const usable = dragRef.current.trackPx * (1 - thumbWidthPct / 100);
    if (usable <= 0) return;
    const scrollDelta = (dx / usable) * maxScroll;
    scroll.scrollLeft = dragRef.current.startScroll + scrollDelta;
  };

  const onThumbPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    dragRef.current = null;
  };

  const onTrackClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-thumb]')) return;
    const track = trackRef.current;
    const scroll = scrollRef.current;
    if (!track || !scroll) return;
    const rect = track.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    scroll.scrollTo({
      left: Math.max(0, Math.min(maxScroll, clickRatio * maxScroll)),
      behavior: 'smooth',
    });
  };

  if (!hasOverflow) return null;

  const percent = maxScroll > 0 ? Math.round((scrollLeft / maxScroll) * 100) : 0;

  return (
    <div
      style={{ padding: '12px 0', margin: '-12px 0' }}
      className="group h-4 items-center justify-center origin-center relative mt-4 cursor-grab active:cursor-grabbing"
      onPointerDown={onThumbPointerDown}
      onPointerMove={onThumbPointerMove}
      onPointerUp={onThumbPointerUp}
      onPointerCancel={onThumbPointerUp}
    >
      <div
        ref={trackRef}
        role="scrollbar"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        onClick={onTrackClick}
        className="relative h-0.5 bg-neutral-200 transition-[height] origin-center duration-150 group-hover:h-1"
      >
        <div
          data-thumb
          onClick={(e) => e.stopPropagation()}
          style={{
            width: `${thumbWidthPct}%`,
            left: `${thumbLeftPct}%`,
            transition: dragRef.current ? 'none' : 'left 120ms ease-out',
          }}
          className="absolute inset-y-0 touch-none bg-black"
        />
      </div>
    </div>
  );
}
