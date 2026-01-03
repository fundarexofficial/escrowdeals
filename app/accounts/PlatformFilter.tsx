'use client'

import { useLanguage } from '@/lib/language-context'
import { useFilters } from './FilterProvider'

// Static platform list
const PLATFORMS = [
  "All",
  "Stripe",
  "Shopify",
  "PayPal",
  "Amazon",
  "eBay",
  "SumUp",
  "N26",
  "Binance",
  "Mercury",
  "Revolut",
] as const

export default function PlatformFilter() {
  const { t } = useLanguage()
  const { selectedTier, selectedPlatform, updateFilters } = useFilters()

  const activePlatform = selectedPlatform || "All"

  return (
    <aside className="lg:w-64 lg:sticky lg:top-24">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
        <h2 className="text-sm font-semibold text-slate-300 mb-3">{t.accountsPage.filterByPlatform}</h2>
        <nav className="space-y-1">
          {PLATFORMS.map((platform) => {
            const isActive = activePlatform === platform

            return (
              <button
                key={platform}
                onClick={() => updateFilters(selectedTier, platform === "All" ? null : platform)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-teal-600 text-white font-medium"
                    : "text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {t.accountsPage.platforms[platform.toLowerCase() as keyof typeof t.accountsPage.platforms] || platform}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
