// components/home/tier-comparison.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function TierComparison() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-950 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-balance">{t.tiers.title}</h2>
          <p className="text-lg text-slate-400 text-pretty max-w-2xl mx-auto">{t.tiers.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tier 1 */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <CardHeader className="pb-4">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full">
                  {t.tiers.tier1Title}
                </span>
              </div>
              <CardTitle className="text-2xl text-white flex items-baseline gap-2">
                <span className="text-4xl font-bold">$200</span>
                <span className="text-slate-400">– $300</span>
              </CardTitle>
              <p className="text-slate-400 text-sm mt-1">{t.tiers.tier1Desc}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Fully verified and payout-enabled</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Clean history with no disputes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Instant delivery within 1–10 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Full login credentials + 2FA</span>
                </li>
              </ul>
              <Link href="/accounts?tier=Tier1" className="block">
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                  {t.tiers.viewAccounts}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Tier 2 — ✅ Updated to match Tier 1 layout */}
          <Card className="border-cyan-500/30 bg-slate-900/50 backdrop-blur relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5" />
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold rounded-full">
                    PREMIUM
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl text-white flex items-baseline gap-2 mt-3">
                <span className="text-4xl font-bold">$600</span>
                <span className="text-slate-400">– $800+</span>
              </CardTitle>
              <p className="text-slate-400 text-sm mt-1">{t.tiers.tier2Desc}</p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">High-limit, aged enterprise accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Proven high-revenue transaction history</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Priority support via Telegram</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Exclusive access to rare accounts</span>
                </li>
              </ul>
              <a
                href="https://t.me/Fundarex"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                  {t.tiers.contactTelegram}
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}