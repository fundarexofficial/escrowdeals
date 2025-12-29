// app/about/page.tsx
"use client";

import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users, Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
  const { t } = useLanguage();
  // ✅ Fix 1: Safe access to about (after fixing translations.ts structure)
  const about = (t as any).about;

  const data = about || {
    title: "About Escrow Deals",
    subtitle: "Your trusted partner for verified payment account solutions",
    secure: {
      title: "Secure & Trusted",
      content: "All accounts are thoroughly verified and delivered through secure escrow. Your funds are protected throughout the entire transaction.",
    },
    fastDelivery: {
      title: "Fast Delivery",
      content: "Receive your account credentials within 1–10 minutes. Automated delivery system ensures quick turnaround for all purchases.",
    },
    happyCustomers: {
      title: "7,500+ Happy Customers",
      content: "Join thousands of satisfied customers who trust us for their payment account needs. Read our reviews on Trustpilot.",
    },
    globalReach: {
      title: "Global Reach",
      content: "Serving customers in 30+ countries with multi-language support and 24/7 Telegram assistance for premium clients.",
    },
    mission: {
      title: "Our Mission",
      content: `Escrow Deals specializes in providing verified payment gateway solutions for businesses worldwide. We understand the challenges entrepreneurs face when trying to access reliable payment processing accounts, and we're here to bridge that gap.
Our team carefully vets every account to ensure it meets our high standards for quality and compliance. Whether you need a Tier 1 entry account or a premium Tier 2 enterprise solution, we have the expertise and inventory to meet your needs.`,
    },
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {data.title}
            </h1>
            <p className="text-xl text-slate-400">{data.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.secure.title}
                </h3>
                <p className="text-slate-400">{data.secure.content}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.fastDelivery.title}
                </h3>
                <p className="text-slate-400">{data.fastDelivery.content}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.happyCustomers.title}
                </h3>
                <p className="text-slate-400">{data.happyCustomers.content}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.globalReach.title}
                </h3>
                <p className="text-slate-400">{data.globalReach.content}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                {data.mission.title}
              </h2>
              {data.mission.content.split("\n").map((paragraph: string, idx: number) => (
                <p
                  key={idx}
                  className={`text-slate-300 leading-relaxed ${idx === 0 ? "mb-4" : ""}`}
                >
                  {paragraph.trim()}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}