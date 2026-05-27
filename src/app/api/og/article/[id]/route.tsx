import { ImageResponse } from 'next/og';
import { fetchPressRelease } from '@/services/press-release';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.acnnewswire.com';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return new Response('Not Found', { status: 404 });
  }

  try {
    const article = await fetchPressRelease(numericId);

    const company = article.companies[0];
    const companyLogoUrl = company?.logofilename
      ? `https://www.acnnewswire.com/images/company/${company.logofilename}`
      : null;

    const headline =
      article.headline.length > 110
        ? article.headline.slice(0, 107).trimEnd() + '…'
        : article.headline;

    const source = article.source || company?.company_Name || '';

    let date = '';
    try {
      date = new Date(article.dateTime).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      // omit date if parsing fails
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            height: '630px',
            backgroundColor: '#001f3f',
            padding: '48px 60px',
            justifyContent: 'space-between',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Top row: ACN brand text + company logo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {/* ACN Newswire brand */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: '#2088C9',
                  fontSize: '56px',
                  fontWeight: '900',
                  lineHeight: '1',
                  letterSpacing: '-2px',
                }}
              >
                ACN
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '17px',
                  fontWeight: '400',
                  letterSpacing: '10px',
                  lineHeight: '1',
                  marginTop: '6px',
                }}
              >
                NEWSWIRE
              </span>
            </div>

            {/* Company logo */}
            {companyLogoUrl && (
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '14px 22px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={companyLogoUrl}
                  width={160}
                  height={60}
                  style={{ objectFit: 'contain' }}
                  alt=""
                />
              </div>
            )}
          </div>

          {/* Middle: accent bar + headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                width: '52px',
                height: '5px',
                backgroundColor: '#2088C9',
                marginBottom: '22px',
              }}
            />
            <span
              style={{
                color: 'white',
                fontSize: '40px',
                fontWeight: '700',
                lineHeight: '1.3',
                wordBreak: 'break-word',
              }}
            >
              {headline}
            </span>
          </div>

          {/* Footer: source + date on left, domain on right */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {source && (
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
                  {source}
                </span>
              )}
              {date && (
                <span
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '15px',
                    marginTop: '4px',
                  }}
                >
                  {date}
                </span>
              )}
            </div>
            <span
              style={{ color: '#2088C9', fontSize: '18px', fontWeight: '600' }}
            >
              {SITE_URL.replace(/^https?:\/\//, '')}
            </span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
