'use client';

import { useState } from 'react';

interface ShareBarProps {
  headline: string;
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function ShareBar({ headline }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const getEncodedURL = () => encodeURIComponent(window.location.href);
  const encodedHeadline = encodeURIComponent(headline);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnClass =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors';

  return (
    <div className="flex flex-wrap gap-2 my-6">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${getEncodedURL()}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon />
        LinkedIn
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${getEncodedURL()}&text=${encodedHeadline}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="Share on X"
      >
        <XIcon />
        X
      </a>

      <a
        href={`mailto:?subject=${encodedHeadline}&body=${getEncodedURL()}`}
        className={btnClass}
        aria-label="Share via Email"
      >
        <EmailIcon />
        Email
      </a>

      <button
        type="button"
        onClick={handleCopyLink}
        className={`${btnClass} cursor-pointer`}
        aria-label="Copy link"
      >
        <LinkIcon />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
