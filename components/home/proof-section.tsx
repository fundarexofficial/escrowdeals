"use client"

import { useLanguage } from "@/lib/language-context"
import { Send } from "lucide-react"

export function ProofSection() {
  const { t } = useLanguage()

  const proofs = [
    {
      image: "/1.png",
      platform: "Stripe",
      label: "Funds Released",
      value: "$5,369.82",
      color: "green",
    },
    {
      image: "/2.png",
      platform: "Shopify",
      label: "Account Delivered",
      value: "Verified",
      color: "green",
    },
    {
      image: "/3.png",
      platform: "Stripe",
      label: "Account Delivered",
      value: "Verified",
      color: "green",
    },
    {
      image: "/4.png",
      platform: "Telegram",
      label: "Scammer Expose",
      value: "Banned",
      color: "red",
    },
  ]

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.proof.title}</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.proof.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {proofs.map((proof, index) => (
          <a
            key={index}
            href="https://t.me/Fundarex"
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-[4/5] rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group block"
          >
            <img
              src={proof.image || "/placeholder.svg"}
              alt={`${proof.platform} proof`}
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"

              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-xs font-bold text-cyan-400 mb-1 uppercase tracking-widest">{proof.platform}</p>
              <p className="text-lg font-bold mb-1">{proof.label}</p>
              <p className={`text-2xl font-extrabold ${proof.color === "red" ? "text-red-400" : "text-green-400"}`}>
                {proof.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
