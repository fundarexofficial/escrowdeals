"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AccountCard } from "@/components/accounts/account-card";

// Static platform list for sidebar (ordered per your spec)
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
] as const;

type Platform = (typeof PLATFORMS)[number];

export default function AccountsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL
  const [selectedTier, setSelectedTier] = useState<string | null>(
    ["Tier1", "Tier2"].includes(searchParams.get("tier") || "") ? searchParams.get("tier") : null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(
    PLATFORMS.includes(searchParams.get("platform") as Platform) && searchParams.get("platform") !== "All"
      ? searchParams.get("platform")
      : null
  );

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      const res = await fetch('/api/accounts');
      const data = await res.json();
      setAccounts(data.accounts.map((acc: any) => ({
        ...acc,
        inStock: Boolean(acc.in_stock),
      })));
      setLoading(false);
    };
    fetchAccounts();
  }, []);

  // Filter accounts based on selected filters
  const filteredAccounts = accounts.filter((acc) => {
    const tierMatch = !selectedTier || acc.tier === selectedTier;
    const platformMatch = !selectedPlatform || acc.platform === selectedPlatform;
    return tierMatch && platformMatch;
  });

  const updateFilters = (tier: string | null, platform: string | null) => {
    setSelectedTier(tier);
    setSelectedPlatform(platform);

    // Update URL
    const params = new URLSearchParams();
    if (tier) params.set("tier", tier);
    if (platform && platform !== "All") params.set("platform", platform);
    router.push(`/accounts${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  const activePlatform = selectedPlatform || "All";

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">Available Accounts</h1>
        <p className="text-slate-400 text-base lg:text-lg">
          Browse verified payment accounts ready for instant delivery
        </p>
        <p className="text-xs text-slate-500 mt-1 lg:mt-2">
          Trusted escrow: James Grugeon • 500k+ volume secured
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:sticky lg:top-24">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <h2 className="text-sm font-semibold text-slate-300 mb-3">Filter by Platform</h2>
            <nav className="space-y-1">
              {PLATFORMS.map((p) => {
                const isActive = activePlatform === p;

                return (
                  <button
                    key={p}
                    onClick={() => updateFilters(selectedTier, p === "All" ? null : p)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-teal-600 text-white font-medium"
                        : "text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Tier Filter Row */}
          <div className="mb-4 lg:mb-6">
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {(["All", "Tier1", "Tier2"] as const).map((t) => {
                const isActive = t === "All"
                  ? !selectedTier
                  : selectedTier === t;
                return (
                  <button
                    key={t}
                    onClick={() => updateFilters(t === "All" ? null : t, selectedPlatform)}
                    className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {t === "All" ? "All Tiers" : `Tier ${t.slice(-1)}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Grid */}
          {loading ? (
            <div className="text-center py-12 lg:py-20">
              <p className="text-slate-400 text-base lg:text-lg">Loading accounts...</p>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <p className="text-slate-400 text-base lg:text-lg">
                No accounts found matching your filters
              </p>
            </div>
          ) : (
            <div className="space-y-4 lg:space-y-5">
              {filteredAccounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
