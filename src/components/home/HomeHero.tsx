'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { PressReleaseData } from '@/components/press-release/types';

const INTERVAL_MS = 8000;
const SLIDE_DURATION_MS = 700;

export function HomeHero({ slides }: { slides: PressReleaseData[] }) {
  const [active, setActive] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  const count = slides.length;
  const displayActive = count > 0 ? active % count : 0;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setEnableTransition(true);
      setActive((i) => i + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [count, active]);

  const handleTransitionEnd = () => {
    if (active === count) {
      setEnableTransition(false);
      setActive(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true));
      });
    }
  };

  const jumpTo = (i: number) => {
    setEnableTransition(true);
    setActive(i);
  };

  if (count === 0) return null;

  const trackSlides = [...slides, slides[0]];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured news"
      className="relative overflow-hidden"
    >
      <style>{`
        @keyframes heroFillBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div
        className="flex"
        style={{
          transform: `translateX(-${active * 100}%)`,
          transition: enableTransition
            ? `transform ${SLIDE_DURATION_MS}ms ease-out`
            : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {trackSlides.map((slide, i) => (
          <Slide key={i} data={slide} hidden={i !== active} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 px-16 py-8">
        {slides.map((_, i) => {
          const isPast = i < displayActive;
          const isCurrent = i === displayActive;
          return (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isCurrent ? 'true' : undefined}
              className="relative h-0.5 cursor-pointer overflow-hidden bg-neutral-200 transition-opacity hover:opacity-50"
            >
              {isPast && <span className="absolute inset-0 bg-black" />}
              {isCurrent && (
                <span
                  key={displayActive}
                  className="absolute inset-0 origin-left bg-black"
                  style={{
                    animation: `heroFillBar ${INTERVAL_MS}ms linear forwards`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Slide({ data, hidden }: { data: PressReleaseData; hidden: boolean }) {
  const image = data.photo?.[0] ?? null;
  const description = data.subHeadline ?? data.bodyText ?? '';

  return (
    <div
      aria-hidden={hidden}
      className="grid min-w-full grid-cols-1 md:grid-cols-[1fr_1fr]"
    >
      <div className="relative aspect-[16/10] md:aspect-auto md:h-[560px] bg-neutral-200">
        {image && (
          <Image
            src={image}
            alt={data.headline}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="flex flex-col justify-center bg-[#fafafa] px-8 py-12 md:px-16">
        <h1 className="text-3xl font-medium leading-tight text-black md:text-4xl lg:text-5xl">
          {data.headline}
        </h1>
        {description && (
          <p className="mt-6 mb-10 text-base text-gray-500 md:text-lg line-clamp-5">
            {description}
          </p>
        )}
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="button alt inline-flex w-fit items-center px-6 py-2.5"
          tabIndex={hidden ? -1 : 0}
        >
          Read more
        </a>
      </div>
    </div>
  );
}
