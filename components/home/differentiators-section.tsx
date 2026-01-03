"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Globe, CheckCircle, Award, Lock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function DifferentiatorsSection() {
  const { t } = useLanguage()

  const differentiators = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Military-grade encryption with multi-factor authentication and secure escrow protection that exceeds industry standards.",
      highlight: "99.9% Uptime"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Delivery",
      description: "Instant account verification and delivery within minutes, not days. Get your payment accounts when you need them.",
      highlight: "< 5 min avg"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access to 30+ countries with local compliance and regulatory support. Expand internationally with confidence.",
      highlight: "30+ Countries"
    },
    {
      icon: CheckCircle,
      title: "Verified & Compliant",
      description: "All accounts undergo rigorous verification processes ensuring PCI DSS compliance and fraud protection.",
      highlight: "100% Verified"
    },
    {
      icon: Award,
      title: "Trusted by Finance Teams",
      description: "Used by payment processors, fintech companies, and financial institutions worldwide for their critical operations.",
      highlight: "500+ Companies"
    },
    {
      icon: Lock,
      title: "Zero Fraud Risk",
      description: "Our escrow system protects both buyers and sellers, with dispute resolution and chargeback protection built-in.",
      highlight: "0% Fraud Rate"
    }
  ]

  return (
    <section className="py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-balance">
            Why Choose EscrowDeals for Finance?
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Built specifically for finance teams who demand the highest standards of security, speed, and compliance.
          </p>
        </div>

        {/* Competitor Comparison */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">How We Compare</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-red-400 text-3xl font-bold mb-2">✗</div>
                <h4 className="text-white font-semibold mb-2">Traditional Banks</h4>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• 2-4 week delays</li>
                  <li>• Complex paperwork</li>
                  <li>• High rejection rates</li>
                  <li>• Limited countries</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-3xl font-bold mb-2">○</div>
                <h4 className="text-white font-semibold mb-2">Payment Processors</h4>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Moderate delays</li>
                  <li>• Basic verification</li>
                  <li>• Variable fees</li>
                  <li>• Limited support</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-3xl font-bold mb-2">✓</div>
                <h4 className="text-cyan-400 font-semibold mb-2">EscrowDeals</h4>
                <ul className="text-cyan-400 text-sm space-y-1">
                  <li>• Instant delivery</li>
                  <li>• Bank-grade security</li>
                  <li>• 30+ countries</li>
                  <li>• 24/7 expert support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff, index) => (
            <Card key={index} className="border-slate-800 bg-slate-900/50 backdrop-blur hover:bg-slate-800/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                  <diff.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{diff.title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed">{diff.description}</p>
                <div className="text-cyan-400 font-semibold text-sm">{diff.highlight}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
