"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

const pricingTiers = [
  {
    name: "Starter",
    price: 200,
    priceRange: "$200 - $300",
    description: "Perfect for small businesses and startups",
    features: [
      "Fully verified accounts",
      "Clean transaction history",
      "Instant delivery (1-10 min)",
      "Basic support",
      "Email delivery",
      "30-day guarantee"
    ],
    popular: false,
    cta: "Browse Starter Accounts"
  },
  {
    name: "Professional",
    price: 350,
    priceRange: "$350 - $500",
    description: "Ideal for growing businesses",
    features: [
      "Aged verified accounts",
      "Proven revenue history",
      "Priority delivery",
      "Phone & chat support",
      "Secure credential delivery",
      "60-day guarantee",
      "Transaction history included"
    ],
    popular: true,
    cta: "Browse Professional Accounts"
  },
  {
    name: "Enterprise",
    price: 600,
    priceRange: "$600 - $1000+",
    description: "For large-scale operations",
    features: [
      "Enterprise-grade accounts",
      "High-volume transaction history",
      "Dedicated account manager",
      "24/7 premium support",
      "Custom verification packages",
      "90-day guarantee",
      "Bulk pricing available",
      "Custom integrations"
    ],
    popular: false,
    cta: "Contact Enterprise Sales"
  }
];

export default function PricingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useLanguage();

  const handleTierSelect = (tier: typeof pricingTiers[0]) => {
    if (tier.name === "Enterprise") {
      // Redirect to contact or Telegram for enterprise
      window.open("https://t.me/Fundarex", "_blank");
      return;
    }

    // For other tiers, redirect to accounts page with filter
    router.push("/accounts");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transparent Pricing for Finance Teams
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Choose the perfect account tier for your business needs. All accounts come with our escrow guarantee and instant delivery.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative border-slate-800 bg-slate-900/50 backdrop-blur ${
                tier.popular ? "border-cyan-500/50 ring-2 ring-cyan-500/20" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-white mb-2">{tier.name}</CardTitle>
                <div className="text-4xl font-bold text-white mb-1">
                  ${tier.price}
                  {tier.name !== "Enterprise" && <span className="text-lg text-slate-400"> starting</span>}
                </div>
                <p className="text-sm text-slate-400 mb-4">{tier.priceRange}</p>
                <p className="text-slate-300">{tier.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleTierSelect(tier)}
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">All Plans Include</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Escrow protection guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    24/7 customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Secure delivery methods
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Money-back guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    PCI DSS compliance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Enterprise Benefits</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    Custom account packages
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    API integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    Bulk pricing discounts
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    Custom SLAs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">How does escrow protection work?</h4>
                  <p className="text-slate-400">
                    Our escrow service holds funds securely until you confirm account delivery. Only release funds when you're satisfied with the account quality and functionality.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">What's included in account delivery?</h4>
                  <p className="text-slate-400">
                    All accounts include login credentials, 2FA setup instructions, account history documentation, and step-by-step verification guide.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h4>
                  <p className="text-slate-400">
                    Yes, we offer money-back guarantees ranging from 30-90 days depending on the account tier. Contact support if you encounter any issues.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
