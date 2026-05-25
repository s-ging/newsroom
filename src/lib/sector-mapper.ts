// src/lib/sector-mapper.ts
import { SECTORS, SECTOR_TYPES } from './sectors';

// Map API sector name → user-facing category (sector_type)
export function getSectorCategory(apiSectorName: string): string {
  const found = SECTORS.find(s => s.sector_name === apiSectorName);
  return found?.sector_type || 'Business'; // Default fallback
}

// For an article with multiple API sectors, get unique categories
export function getArticleCategories(apiSectors: string[]): string[] {
  if (!apiSectors || apiSectors.length === 0) return [];
  const categories = new Set<string>();
  apiSectors.forEach(sector => {
    categories.add(getSectorCategory(sector));
  });
  return Array.from(categories);
}

// Get all unique sector types for sidebar display
export const DISPLAY_SECTORS = SECTOR_TYPES; // ['Technology', 'Communications', ...]

// For debugging: see what API sector maps to what category
export function getSectorMappingTable(): Map<string, string> {
  const map = new Map<string, string>();
  SECTORS.forEach(s => {
    map.set(s.sector_name, s.sector_type);
  });
  return map;
}