'use client'

import Link from 'next/link'

interface IndustryMenuProps {
  onClose?: () => void
}

// Types and constants - this is a big one
const INDUSTRY_SECTIONS = [
  {
    category: 'Business',
    items: ['ASEAN', 'Daily News', 'Government', 'Human Resources', 'Local Biz', 'Startups']
  },
  {
    category: 'Communications',
    items: ['Advertising', 'TV, Film & Satellite', 'Media & Marketing', 'Telecoms & 5G', 'Mobility & Apps']
  },
  {
    category: 'Cryptocurrency',
    items: ['Blockchain', 'Crypto & Exchange', 'ICO & Tokens', 'Metaverse & Games', 'Mining & Staking', 'NFT & Assets']
  },
  {
    category: 'Environment',
    items: ['Agritech', 'Alternative Energy', 'Energy', 'Sustainability & ESG', 'EVs, Transportation', 'Smart Cities', 'Water']
  },
  {
    category: 'Finance',
    items: ['Banking & Insurance', 'Cards & Payments', 'Daily Finance', 'Exchanges & Software', 'Fintech', 'Funds & Equities', 'Legal & Compliance', 'PE, VC & Alternatives', 'Real Estate', 'Trade Finance']
  },
  {
    category: 'Healthcare',
    items: ['BioTech', 'Cannabis', 'Clinical Trials', 'Healthcare Programs', 'MedTech']
  },
  {
    category: 'Industry',
    items: ['Automotive', 'Aerospace & Defence', 'Chemicals', 'Engineering & Const.', 'Food and Beverage', 'Manufacturing', 'Marine & Offshore', 'Metals & Mining', 'Oil & Gas', 'Transport & Logistics']
  },
  {
    category: 'Lifestyle',
    items: ['Cosmetics & Personal', 'Design & Art', 'Education', 'eSports & Gaming', 'Fashion & Apparel', 'Jewelry & Watches', 'Motosports', 'Retail & eCommerce', 'Sports & Recreation', 'Travel & Hospitality']
  },
  {
    category: 'Technology',
    items: ['Artificial Intel (AI)', 'Automation (IoT)', 'Cloud & Enterprise', 'CyberSecurity', 'Digitalization', 'Electronics', 'Innovation', 'Materials & Nanotech']
  }
]

export default function IndustryMenu({ onClose }: IndustryMenuProps) {
  return (
    <div className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 max-h-[80vh] overflow-y-auto">
      <div className="container mx-auto px-4 py-6 relative">
        <div className="grid grid-cols-9 gap-6">
          {INDUSTRY_SECTIONS.map((section) => (
            <div key={section.category} className="dropdown-menu-section">
              <div className="flex flex-col">
                <p className="dropdown-link label mb-3">
                  {section.category}
                </p>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <Link
                      key={item}
                      href={`/industry/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="block dropdown-link"
                      onClick={onClose}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}