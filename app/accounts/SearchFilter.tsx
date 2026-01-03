'use client'

import { useLanguage } from '@/lib/language-context'
import { useFilters } from './FilterProvider'

export default function SearchFilter() {
  const { t } = useLanguage()
  const { selectedTier, selectedPlatform, updateFilters } = useFilters()

  return (
    <div className="mb-4 lg:mb-6">
      <div className="flex flex-wrap gap-2 lg:gap-3">
        {([
          { key: "All", label: t.accountsPage.allTiers },
          { key: "Tier1", label: t.accountsPage.tier1 },
          { key: "Tier2", label: t.accountsPage.tier2 }
        ] as const).map(({ key, label }) => {
          const isActive = key === "All"
            ? !selectedTier
            : selectedTier === key
          return (
            <button
              key={key}
              onClick={() => updateFilters(key === "All" ? null : key, selectedPlatform)}
              className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
