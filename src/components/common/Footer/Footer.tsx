// components/common/Footer/Footer.tsx
//
// Converted off Footer.css (now deleted) to Tailwind. That stylesheet was the
// last pure-CSS component in the tree and the single largest styling
// inconsistency in it - 156 unscoped global .footer-* rules that read like a
// Webflow export, because that is what they were.
//
// The rendering is deliberately unchanged, including the two Webflow
// breakpoints. They are 991px and 479px, NOT Tailwind's 1024px/480px, so they
// are written as arbitrary variants (min-[992px], min-[480px]) rather than
// rounded to lg:/sm: - rounding them would silently move the layout.
//
// One thing DID change on purpose: the divider and link-hover blue was
// #1171ae, a fourth spelling of the brand accent found nowhere else in the
// app. It is now the real accent, #2088c9. See STYLING.toon.
//
// KNOWN ISSUES, deliberately left alone as out of scope here:
//   - the logo is still fetched from a Webflow CDN rather than the local
//     src/app/logo.svg that MainNav uses. If that bucket ever goes away the
//     footer loses its logo.
//   - every link below is href="#". None of these routes exist yet.

import React from 'react';
import SocialIcon from './SocialIcon';

const LINK =
  'inline-block p-1 text-sm text-[#666] no-underline hover:text-[#2088c9]';
const COLUMN_HEADER =
  'mb-1 py-1 pr-2 pl-0.5 font-medium text-black no-underline';

/** The two stacked link columns, left group then middle group. */
const COLUMN_GROUPS: { header: string; links: string[] }[][] = [
  [
    { header: 'About', links: ['Corporate', 'Services', 'Partners', 'Contact', 'Media Kit'] },
    { header: 'Terms', links: ['Privacy Policy', 'Terms of Use', 'Cookies Policy', 'Disclaimer'] },
  ],
  [
    { header: 'Research', links: ['Company', 'Region', 'Sector', 'Industry', 'Language'] },
    { header: 'Participate', links: ['Register', 'Login', 'FAQ', 'Support', 'ACN RSS'] },
  ],
];

const SOCIALS: { platform: string; label: string }[] = [
  { platform: 'facebook', label: 'Facebook' },
  { platform: 'linkedin', label: 'LinkedIn' },
  { platform: 'x', label: 'X (Twitter)' },
  { platform: 'stocktwits', label: 'Stock Twits' },
  { platform: 'pinterest', label: 'Pinterest' },
  { platform: 'reddit', label: 'Reddit' },
  { platform: 'instagram', label: 'Instagram' },
  { platform: 'telegram', label: 'Telegram' },
  { platform: 'tumblr', label: 'Tumblr' },
];

function LinkColumn({ header, links }: { header: string; links: string[] }) {
  return (
    <div className="flex flex-col items-start">
      <a href="#" className={COLUMN_HEADER}>
        {header}
      </a>
      <div className="flex w-full flex-col text-sm">
        {links.map((label) => (
          <a key={label} href="#" className={LINK}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full min-w-[300px] bg-white text-black">
      <div className="h-px w-full bg-[#d9d9d9]" />

      <div className="mx-auto max-w-[1920px] p-6 pt-12 min-[992px]:px-[60px] min-[992px]:py-16">
        <div className="flex flex-col gap-8 min-[992px]:flex-row min-[992px]:justify-between">
          <a href="/" className="mb-8 inline-block w-[clamp(150px,100%,250px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.prod.website-files.com/64b55c025f5ac9325be4bb24/64b56139c31d22c33d88fed2_ACN%20logo.png"
              loading="lazy"
              alt="ACN Newswire logo"
              className="h-auto w-full"
            />
          </a>

          <div className="grid w-full grid-cols-1 gap-6 min-[480px]:grid-cols-2 min-[480px]:gap-8 min-[992px]:w-3/5 min-[992px]:grid-cols-3">
            {COLUMN_GROUPS.map((group, i) => (
              <div key={i} className="flex flex-col gap-6">
                {group.map((column) => (
                  <LinkColumn key={column.header} {...column} />
                ))}
              </div>
            ))}

            <div className="flex flex-col items-start">
              <a href="#" className={COLUMN_HEADER}>
                Follow Us
              </a>
              <div className="flex w-full flex-col text-sm">
                <div className="flex w-full flex-col">
                  {SOCIALS.map(({ platform, label }) => (
                    <div key={platform} className="flex flex-row items-center gap-0">
                      <SocialIcon platform={platform} className="h-5 w-5" />
                      {/* pl/pr/pt here replace the base p-1, as the old
                          `.footer-link-wrap .footer-link` rule did. */}
                      <a href="#" className={`${LINK} pt-1.5 pr-1.5 pl-2`}>
                        {label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-[#2088c9]" />

      <div className="mx-auto w-full max-w-[1920px] px-8 py-6 text-left">
        <div className="inline-block p-1 text-xs text-[#666]">
          Copyright © {currentYear} ACN Newswire. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
