import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { ResumeControl } from "@/components/layout/resume-control";
import { SiteFooter } from "@/components/layout/site-footer";
import { profile } from "@/data/profile";
import { personStructuredData, site } from "@/data/site";
import "./globals.css";

// Only the Latin subset is preloaded; no browser request is made to Google.
const bodyFont = Geist({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const displayFont = Space_Grotesk({ subsets: ["latin"], weight: "500", display: "swap", variable: "--font-display" });
const monoFont = Geist_Mono({ subsets: ["latin"], weight: "400", display: "swap", preload: false, variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: site.title,
    template: `%s | ${profile.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: `${profile.name} Portfolio`,
    type: "website",
    locale: "en_US",
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: site.socialImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [{ url: site.socialImage, alt: site.socialImageAlt }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:p-4 focus:text-canvas">
          Skip to content
        </a>
        <noscript><style>{".media-skeleton, .hero-loading-status { display: none; }"}</style></noscript>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ResumeControl />
      </body>
    </html>
  );
}
