"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowRight, UserPlus, CreditCard, CheckCircle, Clock, Star, MessageCircle } from "lucide-react"

export function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: UserPlus,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      icon: CreditCard,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      icon: CheckCircle,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
    {
      icon: Clock,
      title: t.howItWorks.step4Title,
      description: t.howItWorks.step4Desc,
    },
    {
      icon: Star,
      title: t.howItWorks.step5Title,
      description: t.howItWorks.step5Desc,
    },
    {
      icon: MessageCircle,
      title: t.howItWorks.step6Title,
      description: t.howItWorks.step6Desc,
    },
  ]

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.howItWorks.title}</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/25">
              {index + 1}
            </div>
            <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
              <step.icon className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-cyan-500/30">
                <ArrowRight className="w-8 h-8" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
