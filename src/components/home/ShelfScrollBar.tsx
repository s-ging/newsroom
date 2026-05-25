'use client';

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from 'react';

export function ShelfScrollBar({
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
    let mounted = true;
    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const update = () => {
      if (!mounted) return;
      setMetrics({
        scrollLeft: el.scrollLeft,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      });
    };

    // Three-stage measurement: immediate, pre-paint rAF, post-layout setTimeout
    update();
    rafId = requestAnimationFrame(update);
    timerId = setTimeout(update, 50);

    const observer = new ResizeObserver(() => update());
    observer.observe(el);
    el.addEventListener('scroll', update, { passive: true });

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      observer.disconnect();
      el.removeEventListener('scroll', update);
    };
  }, [scrollRef]);

  // bfcache restore — 100ms lets the browser fully re-layout the frozen page
useEffect(() => {
  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      // Force a full re-measure after bfcache restore
      // Use multiple timeouts to ensure browser has reflowed
      setTimeout(() => {
        const el = scrollRef.current;
        if (el) {
          // Force a reflow by reading layout properties
          const forceReflow = el.scrollWidth;
          setMetrics({
            scrollLeft: el.scrollLeft,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          });
        }
      }, 0);
      
      // Second pass after paint
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (el) {
          setMetrics({
            scrollLeft: el.scrollLeft,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          });
        }
      });
    }
  };
  
  window.addEventListener('pageshow', onPageShow);
  return () => window.removeEventListener('pageshow', onPageShow);
}, [scrollRef]);

useEffect(() => {
  const onPopState = () => {
    // Delay enough for React to rehydrate after back navigation
    setTimeout(() => {
      const el = scrollRef.current;
      if (el) {
        setMetrics({
          scrollLeft: el.scrollLeft,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
        });
      }
    }, 50);
  };
  
  window.addEventListener('popstate', onPopState);
  return () => window.removeEventListener('popstate', onPopState);
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
    scroll.scrollLeft = dragRef.current.startScroll + (dx / usable) * maxScroll;
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
      style={{ padding: '12px 0', margin: '-12px -12px' }}
      className="group relative mt-4 h-4 cursor-grab origin-center items-center justify-center active:cursor-grabbing"
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
        className="relative h-0.5 origin-center bg-neutral-200 transition-[height] duration-150 group-hover:h-1"
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
