// components/nav/MainNav/types.ts
export interface MainNavProps {
  logo?: {
    src: string
    alt: string
    href?: string
  }
  navItems?: Array<{
    label: string      // Translation key
    href: string
    isButton?: boolean // For Login/Register styling
    variant?: 'outline' | 'solid'
  }>
  className?: string
}