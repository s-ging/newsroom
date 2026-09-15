import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { TopNav, MainNav } from '@/components/common/nav';
import Footer from '@/components/common/Footer/Footer'
import { generateBaseMetadata } from '@/lib/metadata';
import AbOverlay from '@/components/common/ab/AbOverlay';

const inter = Inter ({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = generateBaseMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <TopNav />
        <MainNav />
        {children}
        <Footer />
        <Suspense fallback={null}>
          <AbOverlay />
        </Suspense>
      </body>
    </html>
  );
}