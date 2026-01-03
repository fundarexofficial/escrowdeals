// components/home/tier-comparison.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const showcasedAccounts = [
  {
    id: "1",
    platform: "Shopify",
    price: 250,
    features: ["Fully verified", "Payout enabled", "Clean history"],
    color: "#0e8345",
    screenshot: "/8.jpg",
  },
  {
    id: "2",
    platform: "Stripe",
    price: 350,
    features: ["Aged account", "High limits", "Full access"],
    color: "#6772e5",
    screenshot: "/9.jpg",
  },
  {
    id: "3",
    platform: "Stripe Enterprise",
    price: 450,
    features: ["Enterprise level", "Multiple currencies", "Instant payouts"],
    color: "#6772e5",
    screenshot: "/10.jpg",
  },
  {
    id: "4",
    platform: "Mercury",
    price: 550,
    features: ["Business banking", "Debit cards", "Wire transfers"],
    color: "#000000",
    screenshot: "/11.jpg",
  },
];

export function TierComparison() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleBuyNow = async (account: (typeof showcasedAccounts)[0]) => {
    // 1. Auth check
    if (!user) {
      toast({
        title: t.signInRequired || "Sign in required",
        description: t.tiers?.signInToPurchase || "Please sign in to purchase an account.",
        variant: "warning",
      });
      // Redirect to sign-in, with return to homepage
      router.push(`/signin?redirect=/`);
      return;
    }

    // 2. Balance check
    if (user.balance < account.price) {
      toast({
        title: t.insufficientBalance || "Insufficient balance",
        description: t.tiers?.topUpRequired
          ? t.tiers.topUpRequired.replace("{price}", account.price.toString())
          : `You need $${account.price} to buy this account. Top up now.`,
        variant: "warning",
      });
      // Redirect to top-up with context
      router.push(`/dashboard/topup?required=${account.price}&accountId=${account.id}`);
      return;
    }

    // 3. Attempt purchase
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: account.id }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: t.purchaseSuccess || "Purchase successful!",
          description: t.tiers?.purchaseSuccessDesc
            ? t.tiers.purchaseSuccessDesc.replace("{platform}", account.platform)
            : `Your ${account.platform} account is being prepared. Check your dashboard in 1–10 minutes.`,
          variant: "success",
        });

        // ✅ Emit event to refresh user balance (e.g., in dashboard nav)
        window.dispatchEvent(new CustomEvent("userChanged"));
      } else {
        toast({
          title: t.purchaseFailed || "Purchase failed",
          description: data.error || t.somethingWentWrong || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: t.purchaseFailed || "Purchase failed",
        description: t.networkError || "Network error. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="bg-slate-950 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-balance">
            {t.tiers?.title || t.title || "Choose Your Account"}
          </h2>
          <p className="text-lg text-slate-400 text-pretty max-w-2xl mx-auto">
            {t.tiers?.description ||
              t.description ||
              "Select from our most popular verified accounts—ready for instant use and fully secured."}
          </p>
          <Link
            href="/accounts"
            className="group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            {t.tiers?.browseAll || t.browseAll || "View all accounts"}{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Section 1: Full-Image Account Showcase */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold text-slate-300 mb-6 text-center">
            {t.tiers?.popularNow || t.popularNow || "Popular Accounts This Week"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcasedAccounts.map((account) => (
              <Card
                key={account.id}
                className="group relative overflow-hidden bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all h-[380px] flex flex-col"
              >
                {account.screenshot ? (
                  <div className="absolute inset-0">
                    <Image
                      src={account.screenshot}
                      alt={`${account.platform} dashboard preview`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={account.id === "1"}
                      loading={account.id === "1" ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42GP6nwAAAgAB/6+q0wAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-60" />
                      <span className="text-sm">Image missing</span>
                    </div>
                  </div>
                )}

                <div className="relative z-10 p-5 flex flex-col h-full justify-end">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: account.color }}
                      />
                      <h3
                        className="text-lg font-bold"
                        style={{
                          color: account.platform === "Mercury" ? "#ffffff" : account.color,
                          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                        }}
                      >
                        {account.platform}
                      </h3>
                    </div>
                    <div
                      className="text-2xl md:text-3xl font-bold text-white"
                      style={{ textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}
                    >
                      ${account.price}
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {account.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-slate-200">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 🔁 Replaced <Link> with onClick handler */}
                  <Button
                    size="sm"
                    onClick={() => handleBuyNow(account)}
                    disabled={authLoading}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 text-sm transition-all"
                  >
                    {authLoading ? (
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        {t.loading || "Loading..."}
                      </span>
                    ) : (
                      t.buyNow || "Buy Now"
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2: Tiered Categories — unchanged (non-purchaseable tiers) */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-300 mb-6 text-center">
            {t.tiers?.tieredOptions || t.tieredOptions || "Account Tiers Built for Your Needs"}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tier 1 — Standard */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
              <CardHeader className="pb-4">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full">
                    {t.tiers?.tier1Title || t.tier1Title || "Standard Tier"}
                  </span>
                </div>
                <CardTitle className="text-2xl text-white flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$200</span>
                  <span className="text-slate-400">– $300</span>
                </CardTitle>
                <p className="text-slate-400 text-sm mt-1">
                  {t.tiers?.tier1Desc ||
                    t.tier1Desc ||
                    "Ideal for startups and new businesses seeking reliable gateways."}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {[
                    t.fullyVerified || "Fully verified and payout-enabled",
                    t.cleanHistory || "Clean history with no disputes",
                    t.instantDelivery || "Instant delivery within 1–10 minutes",
                    t.fullAccess || "Full login credentials + 2FA",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/accounts?tier=Tier1" className="block">
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                    {t.viewAccounts || "View Accounts"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tier 2 — Premium */}
            <Card className="border-cyan-500/30 bg-slate-900/50 backdrop-blur relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold rounded-full">
                    {t.premium || "PREMIUM"}
                  </span>
                </div>
                <CardTitle className="text-2xl text-white flex items-baseline gap-2 mt-3">
                  <span className="text-4xl font-bold">$600</span>
                  <span className="text-slate-400">– $800+</span>
                </CardTitle>
                <p className="text-slate-400 text-sm mt-1">
                  {t.tiers?.tier2Desc ||
                    t.tier2Desc ||
                    "Enterprise-grade accounts for scaling businesses with high-volume needs."}
                </p>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <ul className="space-y-3">
                  {[
                    t.highLimit || "High-limit, aged enterprise accounts",
                    t.provenHistory || "Proven high-revenue transaction history",
                    t.prioritySupport || "Priority support via Telegram",
                    t.rareAccess || "Exclusive access to rare accounts",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://t.me/Fundarex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                    {t.contactTelegram || "Contact on Telegram"}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}