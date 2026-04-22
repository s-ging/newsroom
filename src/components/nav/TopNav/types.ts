// components/nav/TopNav/types.ts
export interface Language {
  code: 'en' | 'zh-CN' | 'zh-CHT' | 'ko-KR' | 'ja-JP';
  label: string;      // 'English', '简体中文', '繁體中文', '한국어', '日本語'
  href: string;
}

export interface ClientLink {
  id: 'clients' | 'journalists' | 'publishers';
  label: string;      // Translation key or string
  href: string;
}

export interface TopNavProps {
  activeLocale?: Language['code'];
  languages?: Language[];
  clientLinks?: ClientLink[];
}

// Default data with validation guards
export const DEFAULT_LANGUAGES: Language[] = [
  { code: 'en', label: 'English', href: 'https://www.acnnewswire.com' },
  { code: 'zh-CN', label: '简体中文', href: 'https://ch.acnnewswire.com' },
  { code: 'zh-CHT', label: '繁體中文', href: 'https://ct.acnnewswire.com' },
  { code: 'ko-KR', label: '한국어', href: 'https://kr.acnnewswire.com' },
  { code: 'ja-JP', label: '日本語', href: 'https://jcnnewswire.com' },
];

export const DEFAULT_CLIENT_LINKS: ClientLink[] = [
  { id: 'clients', label: 'Clients', href: '/clients' },
  { id: 'journalists', label: 'Journalists', href: '/journalists' },
  { id: 'publishers', label: 'Publishers', href: '/publishers' },
];