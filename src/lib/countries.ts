// src/lib/countries.ts

export interface CountryInfo {
  name: string;           // Display name (e.g., "United States")
  continent: string;      // Asia, Americas, Europe, Africa, Oceania
  region: string;         // East Asia, Southeast Asia, North America, etc.
  aliases?: string[];     // Alternative names from API (e.g., "USA", "United States of America")
}

export const COUNTRIES: CountryInfo[] = [
  // ============ ASIA ============
  // Greater China
  { name: 'China', continent: 'Asia', region: 'Greater China', aliases: ['People\'s Republic of China', 'CN'] },
  { name: 'Hong Kong', continent: 'Asia', region: 'Greater China', aliases: ['Hong Kong SAR', 'HK'] },
  { name: 'Taiwan', continent: 'Asia', region: 'Greater China', aliases: ['Taiwan, ROC', 'TW'] },
  { name: 'Macau', continent: 'Asia', region: 'Greater China', aliases: ['Macao', 'MO'] },
  
  // East Asia
  { name: 'Japan', continent: 'Asia', region: 'East Asia', aliases: ['JP', 'Nippon'] },
  { name: 'South Korea', continent: 'Asia', region: 'East Asia', aliases: ['Korea', 'Republic of Korea', 'KR'] },
  { name: 'North Korea', continent: 'Asia', region: 'East Asia', aliases: ['DPRK', 'KP'] },
  { name: 'Mongolia', continent: 'Asia', region: 'East Asia', aliases: ['MN'] },
  
  // Southeast Asia
  { name: 'Singapore', continent: 'Asia', region: 'Southeast Asia', aliases: ['SG', 'Republic of Singapore'] },
  { name: 'Malaysia', continent: 'Asia', region: 'Southeast Asia', aliases: ['MY'] },
  { name: 'Thailand', continent: 'Asia', region: 'Southeast Asia', aliases: ['TH', 'Kingdom of Thailand'] },
  { name: 'Vietnam', continent: 'Asia', region: 'Southeast Asia', aliases: ['VN', 'Socialist Republic of Vietnam'] },
  { name: 'Indonesia', continent: 'Asia', region: 'Southeast Asia', aliases: ['ID'] },
  { name: 'Philippines', continent: 'Asia', region: 'Southeast Asia', aliases: ['PH', 'Republic of the Philippines'] },
  { name: 'Myanmar', continent: 'Asia', region: 'Southeast Asia', aliases: ['Burma', 'MM'] },
  { name: 'Cambodia', continent: 'Asia', region: 'Southeast Asia', aliases: ['KH', 'Kingdom of Cambodia'] },
  { name: 'Laos', continent: 'Asia', region: 'Southeast Asia', aliases: ['LA', 'Lao PDR'] },
  { name: 'Brunei', continent: 'Asia', region: 'Southeast Asia', aliases: ['BN', 'Brunei Darussalam'] },
  { name: 'Timor-Leste', continent: 'Asia', region: 'Southeast Asia', aliases: ['East Timor', 'TL'] },
  
  // South Asia
  { name: 'India', continent: 'Asia', region: 'South Asia', aliases: ['IN', 'Republic of India'] },
  { name: 'Pakistan', continent: 'Asia', region: 'South Asia', aliases: ['PK'] },
  { name: 'Bangladesh', continent: 'Asia', region: 'South Asia', aliases: ['BD'] },
  { name: 'Sri Lanka', continent: 'Asia', region: 'South Asia', aliases: ['LK', 'Ceylon'] },
  { name: 'Nepal', continent: 'Asia', region: 'South Asia', aliases: ['NP'] },
  { name: 'Bhutan', continent: 'Asia', region: 'South Asia', aliases: ['BT'] },
  { name: 'Maldives', continent: 'Asia', region: 'South Asia', aliases: ['MV'] },
  { name: 'Afghanistan', continent: 'Asia', region: 'South Asia', aliases: ['AF'] },
  
  // Central Asia
  { name: 'Kazakhstan', continent: 'Asia', region: 'Central Asia', aliases: ['KZ'] },
  { name: 'Uzbekistan', continent: 'Asia', region: 'Central Asia', aliases: ['UZ'] },
  { name: 'Turkmenistan', continent: 'Asia', region: 'Central Asia', aliases: ['TM'] },
  { name: 'Kyrgyzstan', continent: 'Asia', region: 'Central Asia', aliases: ['KG'] },
  { name: 'Tajikistan', continent: 'Asia', region: 'Central Asia', aliases: ['TJ'] },
  
  // Middle East / Western Asia
  { name: 'United Arab Emirates', continent: 'Asia', region: 'Middle East', aliases: ['UAE', 'Dubai', 'Abu Dhabi', 'AE'] },
  { name: 'Saudi Arabia', continent: 'Asia', region: 'Middle East', aliases: ['SA', 'KSA'] },
  { name: 'Qatar', continent: 'Asia', region: 'Middle East', aliases: ['QA'] },
  { name: 'Kuwait', continent: 'Asia', region: 'Middle East', aliases: ['KW'] },
  { name: 'Bahrain', continent: 'Asia', region: 'Middle East', aliases: ['BH'] },
  { name: 'Oman', continent: 'Asia', region: 'Middle East', aliases: ['OM'] },
  { name: 'Jordan', continent: 'Asia', region: 'Middle East', aliases: ['JO'] },
  { name: 'Lebanon', continent: 'Asia', region: 'Middle East', aliases: ['LB'] },
  { name: 'Israel', continent: 'Asia', region: 'Middle East', aliases: ['IL'] },
  { name: 'Palestine', continent: 'Asia', region: 'Middle East', aliases: ['PS', 'State of Palestine'] },
  { name: 'Cyprus', continent: 'Asia', region: 'Middle East', aliases: ['CY'] },
  { name: 'Turkey', continent: 'Asia', region: 'Middle East', aliases: ['TR', 'Türkiye'] },
  { name: 'Iran', continent: 'Asia', region: 'Middle East', aliases: ['IR', 'Islamic Republic of Iran'] },
  { name: 'Iraq', continent: 'Asia', region: 'Middle East', aliases: ['IQ'] },
  { name: 'Syria', continent: 'Asia', region: 'Middle East', aliases: ['SY'] },
  { name: 'Yemen', continent: 'Asia', region: 'Middle East', aliases: ['YE'] },
  
  // ============ OCEANIA ============
  { name: 'Australia', continent: 'Oceania', region: 'Australasia', aliases: ['AU'] },
  { name: 'New Zealand', continent: 'Oceania', region: 'Australasia', aliases: ['NZ'] },
  { name: 'Papua New Guinea', continent: 'Oceania', region: 'Pacific Islands', aliases: ['PG'] },
  { name: 'Fiji', continent: 'Oceania', region: 'Pacific Islands', aliases: ['FJ'] },
  { name: 'Solomon Islands', continent: 'Oceania', region: 'Pacific Islands', aliases: ['SB'] },
  { name: 'Vanuatu', continent: 'Oceania', region: 'Pacific Islands', aliases: ['VU'] },
  { name: 'New Caledonia', continent: 'Oceania', region: 'Pacific Islands', aliases: ['NC'] },
  
  // ============ EUROPE ============
  // Western Europe
  { name: 'United Kingdom', continent: 'Europe', region: 'Western Europe', aliases: ['UK', 'Britain', 'GB', 'England', 'Scotland', 'Wales'] },
  { name: 'Germany', continent: 'Europe', region: 'Western Europe', aliases: ['DE', 'Bundesrepublik Deutschland'] },
  { name: 'France', continent: 'Europe', region: 'Western Europe', aliases: ['FR'] },
  { name: 'Italy', continent: 'Europe', region: 'Western Europe', aliases: ['IT'] },
  { name: 'Spain', continent: 'Europe', region: 'Western Europe', aliases: ['ES'] },
  { name: 'Portugal', continent: 'Europe', region: 'Western Europe', aliases: ['PT'] },
  { name: 'Netherlands', continent: 'Europe', region: 'Western Europe', aliases: ['NL', 'Holland'] },
  { name: 'Belgium', continent: 'Europe', region: 'Western Europe', aliases: ['BE'] },
  { name: 'Luxembourg', continent: 'Europe', region: 'Western Europe', aliases: ['LU'] },
  { name: 'Ireland', continent: 'Europe', region: 'Western Europe', aliases: ['IE', 'Republic of Ireland'] },
  { name: 'Switzerland', continent: 'Europe', region: 'Western Europe', aliases: ['CH'] },
  { name: 'Austria', continent: 'Europe', region: 'Western Europe', aliases: ['AT'] },
  
  // Northern Europe
  { name: 'Norway', continent: 'Europe', region: 'Northern Europe', aliases: ['NO'] },
  { name: 'Sweden', continent: 'Europe', region: 'Northern Europe', aliases: ['SE'] },
  { name: 'Denmark', continent: 'Europe', region: 'Northern Europe', aliases: ['DK'] },
  { name: 'Finland', continent: 'Europe', region: 'Northern Europe', aliases: ['FI'] },
  { name: 'Iceland', continent: 'Europe', region: 'Northern Europe', aliases: ['IS'] },
  { name: 'Estonia', continent: 'Europe', region: 'Northern Europe', aliases: ['EE'] },
  { name: 'Latvia', continent: 'Europe', region: 'Northern Europe', aliases: ['LV'] },
  { name: 'Lithuania', continent: 'Europe', region: 'Northern Europe', aliases: ['LT'] },
  
  // Eastern Europe
  { name: 'Poland', continent: 'Europe', region: 'Eastern Europe', aliases: ['PL'] },
  { name: 'Czech Republic', continent: 'Europe', region: 'Eastern Europe', aliases: ['CZ', 'Czechia'] },
  { name: 'Slovakia', continent: 'Europe', region: 'Eastern Europe', aliases: ['SK'] },
  { name: 'Hungary', continent: 'Europe', region: 'Eastern Europe', aliases: ['HU'] },
  { name: 'Romania', continent: 'Europe', region: 'Eastern Europe', aliases: ['RO'] },
  { name: 'Bulgaria', continent: 'Europe', region: 'Eastern Europe', aliases: ['BG'] },
  { name: 'Serbia', continent: 'Europe', region: 'Eastern Europe', aliases: ['RS'] },
  { name: 'Croatia', continent: 'Europe', region: 'Eastern Europe', aliases: ['HR'] },
  { name: 'Slovenia', continent: 'Europe', region: 'Eastern Europe', aliases: ['SI'] },
  { name: 'Bosnia and Herzegovina', continent: 'Europe', region: 'Eastern Europe', aliases: ['BA'] },
  { name: 'Albania', continent: 'Europe', region: 'Eastern Europe', aliases: ['AL'] },
  { name: 'North Macedonia', continent: 'Europe', region: 'Eastern Europe', aliases: ['MK'] },
  { name: 'Montenegro', continent: 'Europe', region: 'Eastern Europe', aliases: ['ME'] },
  { name: 'Kosovo', continent: 'Europe', region: 'Eastern Europe', aliases: ['XK'] },
  
  // Southern Europe
  { name: 'Greece', continent: 'Europe', region: 'Southern Europe', aliases: ['GR'] },
  { name: 'Malta', continent: 'Europe', region: 'Southern Europe', aliases: ['MT'] },
  
  // ============ AMERICAS ============
  // North America
  { name: 'United States', continent: 'Americas', region: 'North America', aliases: ['USA', 'US', 'America', 'United States of America'] },
  { name: 'Canada', continent: 'Americas', region: 'North America', aliases: ['CA'] },
  { name: 'Bahamas', continent: 'Americas', region: 'North America', aliases: ['BS'] },
  
  // Central America & Caribbean
  { name: 'Mexico', continent: 'Americas', region: 'Central America', aliases: ['MX'] },
  { name: 'Belize', continent: 'Americas', region: 'Central America', aliases: ['BZ'] },
  { name: 'Panama', continent: 'Americas', region: 'Central America', aliases: ['PA'] },
  { name: 'Costa Rica', continent: 'Americas', region: 'Central America', aliases: ['CR'] },
  { name: 'Guatemala', continent: 'Americas', region: 'Central America', aliases: ['GT'] },
  { name: 'Honduras', continent: 'Americas', region: 'Central America', aliases: ['HN'] },
  { name: 'El Salvador', continent: 'Americas', region: 'Central America', aliases: ['SV'] },
  { name: 'Nicaragua', continent: 'Americas', region: 'Central America', aliases: ['NI'] },
  { name: 'Jamaica', continent: 'Americas', region: 'Caribbean', aliases: ['JM'] },
  { name: 'Puerto Rico', continent: 'Americas', region: 'Caribbean', aliases: ['PR'] },
  { name: 'Cuba', continent: 'Americas', region: 'Caribbean', aliases: ['CU'] },
  { name: 'Dominican Republic', continent: 'Americas', region: 'Caribbean', aliases: ['DO'] },
  { name: 'Trinidad and Tobago', continent: 'Americas', region: 'Caribbean', aliases: ['TT'] },
  
  // South America
  { name: 'Brazil', continent: 'Americas', region: 'South America', aliases: ['BR', 'Federative Republic of Brazil'] },
  { name: 'Argentina', continent: 'Americas', region: 'South America', aliases: ['AR'] },
  { name: 'Colombia', continent: 'Americas', region: 'South America', aliases: ['CO'] },
  { name: 'Chile', continent: 'Americas', region: 'South America', aliases: ['CL'] },
  { name: 'Peru', continent: 'Americas', region: 'South America', aliases: ['PE'] },
  { name: 'Venezuela', continent: 'Americas', region: 'South America', aliases: ['VE'] },
  { name: 'Ecuador', continent: 'Americas', region: 'South America', aliases: ['EC'] },
  { name: 'Bolivia', continent: 'Americas', region: 'South America', aliases: ['BO'] },
  { name: 'Paraguay', continent: 'Americas', region: 'South America', aliases: ['PY'] },
  { name: 'Uruguay', continent: 'Americas', region: 'South America', aliases: ['UY'] },
  { name: 'Guyana', continent: 'Americas', region: 'South America', aliases: ['GY'] },
  { name: 'Suriname', continent: 'Americas', region: 'South America', aliases: ['SR'] },
  
  // ============ AFRICA ============
  // Northern Africa
  { name: 'Egypt', continent: 'Africa', region: 'Northern Africa', aliases: ['EG'] },
  { name: 'Algeria', continent: 'Africa', region: 'Northern Africa', aliases: ['DZ'] },
  { name: 'Morocco', continent: 'Africa', region: 'Northern Africa', aliases: ['MA'] },
  { name: 'Tunisia', continent: 'Africa', region: 'Northern Africa', aliases: ['TN'] },
  { name: 'Libya', continent: 'Africa', region: 'Northern Africa', aliases: ['LY'] },
  { name: 'Sudan', continent: 'Africa', region: 'Northern Africa', aliases: ['SD'] },
  { name: 'South Sudan', continent: 'Africa', region: 'Northern Africa', aliases: ['SS'] },
  
  // Sub-Saharan Africa
  { name: 'South Africa', continent: 'Africa', region: 'Southern Africa', aliases: ['ZA', 'RSA'] },
  { name: 'Nigeria', continent: 'Africa', region: 'Western Africa', aliases: ['NG'] },
  { name: 'Kenya', continent: 'Africa', region: 'Eastern Africa', aliases: ['KE'] },
  { name: 'Ghana', continent: 'Africa', region: 'Western Africa', aliases: ['GH'] },
  { name: 'Ethiopia', continent: 'Africa', region: 'Eastern Africa', aliases: ['ET'] },
  { name: 'Tanzania', continent: 'Africa', region: 'Eastern Africa', aliases: ['TZ'] },
  { name: 'Uganda', continent: 'Africa', region: 'Eastern Africa', aliases: ['UG'] },
  { name: 'Rwanda', continent: 'Africa', region: 'Eastern Africa', aliases: ['RW'] },
  { name: 'Zimbabwe', continent: 'Africa', region: 'Southern Africa', aliases: ['ZW'] },
  { name: 'Zambia', continent: 'Africa', region: 'Southern Africa', aliases: ['ZM'] },
  { name: 'Mozambique', continent: 'Africa', region: 'Southern Africa', aliases: ['MZ'] },
  { name: 'Angola', continent: 'Africa', region: 'Central Africa', aliases: ['AO'] },
  { name: 'Cameroon', continent: 'Africa', region: 'Central Africa', aliases: ['CM'] },
  { name: 'Ivory Coast', continent: 'Africa', region: 'Western Africa', aliases: ['Côte d\'Ivoire', 'CI'] },
  { name: 'Senegal', continent: 'Africa', region: 'Western Africa', aliases: ['SN'] },
  { name: 'Botswana', continent: 'Africa', region: 'Southern Africa', aliases: ['BW'] },
  { name: 'Namibia', continent: 'Africa', region: 'Southern Africa', aliases: ['NA'] },
  { name: 'Mauritius', continent: 'Africa', region: 'Eastern Africa', aliases: ['MU'] },
  { name: 'Seychelles', continent: 'Africa', region: 'Eastern Africa', aliases: ['SC'] },
  { name: 'Madagascar', continent: 'Africa', region: 'Eastern Africa', aliases: ['MG'] },
];

// Helper functions
export function getCountryInfo(countryName: string): CountryInfo | undefined {
  const normalized = countryName.trim();
  
  // Direct match
  let found = COUNTRIES.find(c => 
    c.name === normalized || 
    c.name.toLowerCase() === normalized.toLowerCase()
  );
  
  if (found) return found;
  
  // Alias match
  found = COUNTRIES.find(c => 
    c.aliases?.some(alias => 
      alias === normalized || 
      alias.toLowerCase() === normalized.toLowerCase()
    )
  );
  
  return found;
}

export function getCountriesByContinent(continent: string): CountryInfo[] {
  return COUNTRIES.filter(c => c.continent === continent);
}

export function getCountriesByRegion(region: string): CountryInfo[] {
  return COUNTRIES.filter(c => c.region === region);
}

export function getAllContinents(): string[] {
  return [...new Set(COUNTRIES.map(c => c.continent))];
}

export function getAllRegions(): string[] {
  return [...new Set(COUNTRIES.map(c => c.region))];
}

// For region hierarchy building
export interface RegionNode {
  id: string;
  name: string;
  children?: RegionNode[];
}

export function buildRegionHierarchy(): RegionNode[] {
  const continents = new Map<string, Map<string, string[]>>();
  
  COUNTRIES.forEach(country => {
    if (!continents.has(country.continent)) {
      continents.set(country.continent, new Map());
    }
    
    const regions = continents.get(country.continent)!;
    if (!regions.has(country.region)) {
      regions.set(country.region, []);
    }
    
    regions.get(country.region)!.push(country.name);
  });
  
  const hierarchy: RegionNode[] = [];
  
  continents.forEach((regions, continentName) => {
    const continentNode: RegionNode = {
      id: continentName,
      name: continentName,
      children: []
    };
    
    regions.forEach((countries, regionName) => {
      const regionNode: RegionNode = {
        id: regionName,
        name: regionName,
        children: countries.map(country => ({
          id: country,
          name: country
        }))
      };
      continentNode.children!.push(regionNode);
    });
    
    hierarchy.push(continentNode);
  });
  
  return hierarchy;
}