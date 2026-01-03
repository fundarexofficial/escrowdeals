'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

interface FilterContextType {
  selectedTier: string | null
  selectedPlatform: string | null
  accounts: any[]
  filteredAccounts: any[]
  loading: boolean
  updateFilters: (tier: string | null, platform: string | null) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}

interface FilterProviderProps {
  children: ReactNode
}

export function FilterProvider({ children }: FilterProviderProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTier, setSelectedTier] = useState<string | null>(
    ["Tier1", "Tier2"].includes(searchParams.get("tier") || "") ? searchParams.get("tier") : null
  )
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(
    ["Stripe", "Shopify", "PayPal", "Amazon", "eBay", "SumUp", "N26", "Binance", "Mercury", "Revolut"].includes(searchParams.get("platform") || "")
      ? searchParams.get("platform")
      : null
  )

  // Fetch accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/accounts')
        const data = await res.json()
        setAccounts(data.accounts.map((acc: any) => ({
          ...acc,
          inStock: Boolean(acc.in_stock),
        })))
      } catch (error) {
        console.error('Failed to fetch accounts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAccounts()
  }, [])

  // Filter accounts based on selected filters
  const filteredAccounts = accounts.filter((acc) => {
    const tierMatch = !selectedTier || acc.tier === selectedTier
    const platformMatch = !selectedPlatform || acc.platform === selectedPlatform
    return tierMatch && platformMatch
  })

  const updateFilters = (tier: string | null, platform: string | null) => {
    setSelectedTier(tier)
    setSelectedPlatform(platform)

    // Update URL
    const params = new URLSearchParams()
    if (tier) params.set("tier", tier)
    if (platform) params.set("platform", platform)
    router.push(`/accounts${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false })
  }

  return (
    <FilterContext.Provider value={{
      selectedTier,
      selectedPlatform,
      accounts,
      filteredAccounts,
      loading,
      updateFilters
    }}>
      {children}
    </FilterContext.Provider>
  )
}
