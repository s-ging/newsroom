'use client'

import Link from 'next/link'

interface RegionMenuProps {
  onClose?: () => void
}

// Types and constants - this is a massive one
const REGIONS = [
  {
    continent: 'Asia',
    subRegions: [
      {
        name: 'Greater China',
        countries: ['China', 'Hong Kong', 'Taiwan']
      },
      {
        name: 'East Asia',
        countries: ['Japan', 'Korea']
      },
      {
        name: 'South Asia',
        countries: ['India']
      },
      {
        name: 'Southeast Asia',
        countries: ['Indonesia', 'Malaysia', 'Philippines', 'Singapore', 'Thailand', 'Vietnam']
      },
    ]
  },
    {
    continent: 'Greater Asia',
    subRegions: [
      {
        name: 'Australasia',
        countries: ['Australia', 'New Zealand']
      }
    ]
  },
  {
    continent: 'Middle East',
    subRegions: [
      {
        name: 'UAE',
        countries: ['Abu Dhabi', 'Bahrain', 'Dubai']
      },
      {
        name: 'MENA',
        countries: ['Egypt', 'Israel', 'Jordan', 'Lebanon']
      }
    ]
  },
  {
    continent: 'Africa',
    subRegions: [
      {
        name: 'Northern Africa',
        countries: ['Algeria', 'Jordan']  // Note: Jordan appears twice in original? Keeping as is
      },
      {
        name: 'Central Africa',
        countries: ['Nigeria', 'Kenya']
      },
      {
        name: 'Southern Africa',
        countries: ['South Africa']
      }
    ]
  },
  {
    continent: 'Europe',
    subRegions: [
      {
        name: 'Western Europe',
        countries: ['France', 'Germany', 'Italy', 'Spain', 'UK']
      },
      {
        name: 'Central Europe',
        countries: ['Slovakia']
      },
      {
        name: 'Eastern Europe',
        countries: ['Estonia', 'Lithuania']
      }
    ]
  },
  {
    continent: 'Americas',
    subRegions: [
      {
        name: 'North America',
        countries: ['Canada', 'United States', 'Bahamas']
      },
      {
        name: 'Central America',
        countries: ['Mexico', 'Belize', 'Panama']
      },
      {
        name: 'South America',
        countries: ['Argentina', 'Brazil', 'Columbia']
      }
    ]
  }
]

export default function RegionMenu({ onClose }: RegionMenuProps) {
  return (
        <div className="grid grid-cols-6 gap-6">
          {REGIONS.map((region) => (
            <div key={region.continent} className="dropdown-menu-section">
              <div className="flex flex-col">
                <p className="dropdown-link label mb-3">
                  {region.continent}
                </p>

                {region.subRegions.map((subRegion) => (
                  <div key={subRegion.name} className="mb-4">
                    <p className="dropdown-link mb-3 uppercase text-xs! opacity-30 font-semibold pointer-events-none">
                      {subRegion.name}
                    </p>
                    <div className="space-y-3">
                      {subRegion.countries.map((country) => (
                        <Link
                          key={country}
                          href={`/region/${country.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block dropdown-link"
                          onClick={onClose}
                        >
                          {country}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  )
}