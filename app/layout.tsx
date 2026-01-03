import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Navigation } from "@/components/ui/navigation";
import { Analytics as CustomAnalytics } from "@/components/analytics";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EscrowDeals - Secure Payment Accounts for Finance Teams | Verified Stripe, PayPal, Shopify",
  description:
    "Trusted escrow service for verified payment accounts. Instant delivery, bank-grade security, and 30+ countries supported. Perfect for finance teams seeking compliant payment solutions.",
  keywords: ["payment accounts", "escrow service", "verified stripe", "paypal accounts", "shopify verified", "finance compliance", "payment processing", "secure transactions"],
  authors: [{ name: "EscrowDeals" }],
  creator: "EscrowDeals",
  publisher: "EscrowDeals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://escrowdeals.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EscrowDeals - Secure Payment Accounts for Finance Teams",
    description: "Buy verified Stripe, PayPal, and Shopify accounts with escrow protection. Instant delivery, global compliance, trusted by 500+ finance companies.",
    url: "https://escrowdeals.com",
    siteName: "EscrowDeals",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EscrowDeals - Secure Payment Accounts for Finance Teams",
    description: "Buy verified Stripe, PayPal, and Shopify accounts with escrow protection. Instant delivery, global compliance.",
    creator: "@escrowdeals",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${geist.className}`}>
        <CustomAnalytics />
        <LanguageProvider>
          <Navigation /> {/* ✅ Global header */}
          <main>{children}</main>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
