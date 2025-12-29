"use client"

import { useLanguage } from "@/lib/language-context"
import { Star } from "lucide-react"

export function TrustpilotSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto">
      <div className="p-10 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-[#00b67a] mb-6">
          <Star fill="currentColor" className="w-8 h-8" />
          <span className="text-3xl font-black tracking-tighter">Trustpilot</span>
        </div>
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-10 h-10 bg-[#00b67a] flex items-center justify-center text-white">
              <Star fill="currentColor" className="w-6 h-6" />
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-4">{t.trustpilot.quote}</h3>
        <p className="text-gray-400 mb-8 max-w-xl">{t.trustpilot.description}</p>
        <a
          href="https://trustpilot.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full bg-[#00b67a] hover:bg-[#00a36d] transition-all font-bold flex items-center gap-2 shadow-lg shadow-[#00b67a]/20"
        >
          {t.trustpilot.cta}
        </a>
      </div>
    </section>
  )
}
