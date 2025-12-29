import { Navigation } from "@/components/ui/navigation"
import { getAccounts, getUniquePlatforms } from "@/lib/db"
import { AccountCard } from "@/components/accounts/account-card"

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: { tier?: string; platform?: string }
}) {
  const accounts = await getAccounts(searchParams.tier, searchParams.platform)
  const platforms = await getUniquePlatforms()

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Available Accounts</h1>
          <p className="text-slate-400 text-lg">Browse verified payment accounts ready for instant delivery</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Tier</label>
            <div className="flex gap-2">
              <a
                href="/accounts"
                className={`px-4 py-2 rounded-lg text-sm ${
                  !searchParams.tier ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                } transition-colors`}
              >
                All
              </a>
              <a
                href="/accounts?tier=Tier1"
                className={`px-4 py-2 rounded-lg text-sm ${
                  searchParams.tier === "Tier1"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                } transition-colors`}
              >
                Tier 1
              </a>
              <a
                href="/accounts?tier=Tier2"
                className={`px-4 py-2 rounded-lg text-sm ${
                  searchParams.tier === "Tier2"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                } transition-colors`}
              >
                Tier 2
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Platform</label>
            <div className="flex flex-wrap gap-2">
              <a
                href={searchParams.tier ? `/accounts?tier=${searchParams.tier}` : "/accounts"}
                className={`px-4 py-2 rounded-lg text-sm ${
                  !searchParams.platform ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                } transition-colors`}
              >
                All
              </a>
              {platforms.map((p: any) => (
                <a
                  key={p.platform}
                  href={
                    searchParams.tier
                      ? `/accounts?tier=${searchParams.tier}&platform=${p.platform}`
                      : `/accounts?platform=${p.platform}`
                  }
                  className={`px-4 py-2 rounded-lg text-sm ${
                    searchParams.platform === p.platform
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  } transition-colors`}
                >
                  {p.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Account grid */}
        {accounts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No accounts found matching your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account: any) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
