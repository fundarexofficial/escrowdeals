"use client";

import { Suspense } from "react";
import { AccountCard } from "@/components/accounts/account-card";
import SearchFilter from "./SearchFilter";
import PlatformFilter from "./PlatformFilter";
import { FilterProvider, useFilters } from "./FilterProvider";
import { useLanguage } from "@/lib/language-context";

function AccountsContent() {
  const { t } = useLanguage();
  const { filteredAccounts, loading } = useFilters();

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">{t.accountsPage.title}</h1>
        <p className="text-slate-400 text-base lg:text-lg">
          {t.accountsPage.subtitle}
        </p>
        <p className="text-xs text-slate-500 mt-1 lg:mt-2">
          {t.accountsPage.trustedEscrow}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Platform Filter - Client Component with Suspense */}
        <Suspense fallback={
          <aside className="lg:w-64 lg:sticky lg:top-24">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-8 bg-slate-700 rounded"></div>
                ))}
              </div>
            </div>
          </aside>
        }>
          <PlatformFilter />
        </Suspense>

        {/* Main Content */}
        <main className="flex-1">
          {/* Tier Filter Row - Client Component with Suspense */}
          <Suspense fallback={
            <div className="mb-4 lg:mb-6">
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-10 bg-slate-700 rounded-lg animate-pulse w-20"></div>
                ))}
              </div>
            </div>
          }>
            <SearchFilter />
          </Suspense>

          {/* Account Grid */}
          {loading ? (
            <div className="text-center py-12 lg:py-20">
              <p className="text-slate-400 text-base lg:text-lg">{t.accountsPage.loading}</p>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center py-12 lg:py-20">
              <p className="text-slate-400 text-base lg:text-lg">
                {t.accountsPage.noAccounts}
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

export default function AccountsClient() {
  return (
    <FilterProvider>
      <AccountsContent />
    </FilterProvider>
  );
}
