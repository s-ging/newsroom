// scripts/prefetch-articles.js
const fs = require('fs');
const path = require('path');

// Import or copy your SECTORS mapping
// For the script to work standalone, we need the sector name mapping
const SECTOR_NAME_MAP = {
  'Artificial Intel [AI]': 'Technology',
  'Automation [IoT]': 'Technology', 
  'CyberSecurity': 'Technology',
  'Datacenter & Cloud': 'Technology',
  'Digitalization': 'Technology',
  'Electronics': 'Technology',
  'Engineering': 'Technology',
  'Enterprise IT': 'Technology',
  'Materials & Nanotech': 'Technology',
  'Advertising': 'Communications',
  'Broadcast Film & Sat': 'Communications',
  'Media & Marketing': 'Communications',
  'Telecoms 5G': 'Communications',
  'Wireless Apps': 'Communications',
  'Banking & Insurance': 'Financial',
  'Cards & Payments': 'Financial',
  'Daily Finance': 'Financial',
  'Exchanges & Software': 'Financial',
  'FinTech': 'Financial',
  'Funds & Equities': 'Financial',
  'Legal & Compliance': 'Financial',
  'PE VC & Alternatives': 'Financial',
  'Real Estate & REIT': 'Financial',
  'Trade Finance': 'Financial',
  'BioTech': 'Medicine',
  'Clinical Trials': 'Medicine',
  'Healthcare & Pharm': 'Medicine',
  'MedTech': 'Medicine',
  'Alternative': 'Medicine',
  'Agritech': 'Sustainability',
  'Alternative Energy': 'Sustainability',
  'Energy Alternatives': 'Sustainability',
  'Environment ESG': 'Sustainability',
  'EVs Transportation': 'Sustainability',
  'Smart Cities': 'Sustainability',
  'Water': 'Sustainability',
  'Aerospace & Defence': 'Industrial',
  'Airlines': 'Industrial',
  'Automotive': 'Industrial',
  'Chemicals Spec.Chem': 'Industrial',
  'Construct Engineering': 'Industrial',
  'Cosmetics Spec.Chem': 'Industrial',
  'Food & Beverage': 'Industrial',
  'Manufacturing': 'Industrial',
  'Marine & Offshore': 'Industrial',
  'Metals & Mining': 'Industrial',
  'Oil & Gas': 'Industrial',
  'Print & Package': 'Industrial',
  'Transport & Logistics': 'Industrial',
  'Art Music & Design': 'Lifestyle',
  'Beauty & Skin Care': 'Lifestyle',
  'Boating': 'Lifestyle',
  'Education': 'Lifestyle',
  'eSports Gaming': 'Lifestyle',
  'Fashion & Apparel': 'Lifestyle',
  'Hospitality': 'Lifestyle',
  'Motorsports': 'Lifestyle',
  'Regional': 'Lifestyle',
  'Retail & eCommerce': 'Lifestyle',
  'Sports': 'Lifestyle',
  'Travel & Tourism': 'Lifestyle',
  'Watches & Jewelry': 'Lifestyle',
  'ASEAN': 'Business',
  'Daily News': 'Business',
  'Government': 'Business',
  'HR': 'Business',
  'Local Biz': 'Business',
  'SMEs': 'Business',
  'Startups': 'Business',
  'Trade Shows': 'Business',
  'Blockchain Technology': 'CryptoCurrency',
  'Crypto Exchange': 'CryptoCurrency',
  'ICOs & Tokens': 'CryptoCurrency',
  'Metaverse Games': 'CryptoCurrency',
  'Mining & Staking': 'CryptoCurrency',
  'NFTs': 'CryptoCurrency',
};

function mapSectorToType(sectorName) {
  return SECTOR_NAME_MAP[sectorName] || 'Business'; // Default fallback
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchArticle(id) {
  const url = `https://www.acnnewswire.com/acnnewswireapi/api/v1/News/GetArticleById/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    
    // Only keep articles with valid headline
    if (!data.headline || data.headline === 'string') return null;
    
    // Get ALL sectors from API (it's an array)
    const apiSectors = data.sector || [];
    
    // Map each sector to its sector_type using your taxonomy
    const mappedSectors = apiSectors.map(sectorName => ({
      name: sectorName,
      type: mapSectorToType(sectorName),
    }));
    
    // For backward compatibility with existing components
    const primarySector = apiSectors[0] || null;
    const primarySectorType = primarySector ? mapSectorToType(primarySector) : null;
    
    return {
      id: data.id || id,
      headline: data.headline,
      dateTime: data.dateTime,
      thumbImage: data.photo?.[0]?.thumbImage || null,
      bigImage: data.photo?.[0]?.bigImage || null,
      summary: data.summary || data.bodyText?.slice(0, 200) || '',
      // Companies
      companyName: data.companies?.[0]?.company_Name || null,
      companyLogo: data.companies?.[0]?.logofilename || null,
      companyId: data.companies?.[0]?.comp_ID || null,
      // Sectors — FULL array now
      sectors: apiSectors,  // Original API sector names
      sectorMappings: mappedSectors,  // With types
      primarySector: primarySector,
      primarySectorType: primarySectorType,
      // Raw data for debugging
      rawLanguage: data.language,
      rawSource: data.source,
      location: data.location?.name || null,
    };
  } catch (err) {
    console.error(`Failed on ${id}:`, err.message);
    return null;
  }
}

async function prefetchArticles() {
  console.log('🚀 Starting prefetch with FULL sector mapping...');
  
  const startId = 107000;
  const endId = 107303;
  const articles = [];
  
  for (let id = startId; id <= endId; id++) {
    process.stdout.write(`Fetching ${id}...`);
    const article = await fetchArticle(id);
    if (article) {
      articles.push(article);
      const sectorCount = article.sectors.length;
      console.log(` ✅ (${sectorCount} sector${sectorCount !== 1 ? 's' : ''})`);
    } else {
      console.log(` ❌`);
    }
    await sleep(100);
  }
  
  // Save to JSON file
  const outputPath = path.join(__dirname, '../src/data/prefetched-articles.json');
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2));
  
  // Stats
  const totalSectors = articles.reduce((sum, a) => sum + a.sectors.length, 0);
  const uniqueSectors = new Set(articles.flatMap(a => a.sectors));
  
  console.log(`\n✨ Done!`);
  console.log(`📊 Stats:`);
  console.log(`   - Articles: ${articles.length}`);
  console.log(`   - Total sector assignments: ${totalSectors}`);
  console.log(`   - Unique sectors found: ${uniqueSectors.size}`);
  console.log(`   - Unique sectors: ${[...uniqueSectors].sort().join(', ')}`);
  console.log(`\n📁 Saved to: ${outputPath}`);
}

prefetchArticles().catch(console.error);