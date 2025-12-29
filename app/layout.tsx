import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Navigation } from "@/components/ui/navigation"; // ← added

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Escrow Deals - Verified Payment Accounts",
  description:
    "Buy and sell pre-verified Stripe, PayPal, Shopify accounts. Instant delivery, secure escrow, trusted globally.",
  generator: "v0.app",
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
        <LanguageProvider>
          <Navigation /> {/* ✅ Global header */}
          <main>{children}</main>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}