"use client"

import { useLanguage } from "@/lib/language-context"
import { Facebook, Send } from "lucide-react"

export function CommunitySection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.community.title}</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.community.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <a
          href="https://web.facebook.com/groups/464341585962798"
          target="_blank"
          rel="noopener noreferrer"
          className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Facebook className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{t.community.facebook}</h3>
          <p className="text-gray-400 mb-6">{t.community.facebookDesc}</p>
          <span className="inline-flex items-center gap-2 text-blue-400 font-bold group-hover:gap-3 transition-all">
            {t.community.joinGroup}
            <Send className="w-4 h-4" />
          </span>
        </a>

        <a
          href="https://t.me/Fundarex"
          target="_blank"
          rel="noopener noreferrer"
          className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Send className="w-7 h-7 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{t.community.telegram}</h3>
          <p className="text-gray-400 mb-6">{t.community.telegramDesc}</p>
          <span className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all">
            {t.community.joinChannel}
            <Send className="w-4 h-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
