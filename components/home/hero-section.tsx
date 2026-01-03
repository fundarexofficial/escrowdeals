"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Zap, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-slate-950 to-teal-950/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/50 px-4 py-2 text-sm text-slate-300 border border-slate-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            {t.hero.badge}
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance">
            {t.hero.headline}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 text-pretty max-w-3xl mx-auto">{t.hero.description}</p>

          {/* Pain Points Statement */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mt-8 max-w-4xl mx-auto">
            <p className="text-slate-300 text-lg leading-relaxed">
              <span className="text-cyan-400 font-semibold">Struggling with fraud risk, payment delays, and verification issues?</span>{" "}
              Finance teams face mounting challenges securing verified payment accounts that are both trustworthy and compliant.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/accounts">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-lg px-8 h-14"
              >
                {t.hero.browseAccounts}
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 h-14 bg-transparent"
              >
                {t.hero.createAccount}
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">Secure Escrow</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">30+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
