"use client"

import { useLanguage } from "@/lib/language-context"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: t.faq.q1,
      answer: t.faq.a1,
    },
    {
      question: t.faq.q2,
      answer: t.faq.a2,
    },
    {
      question: t.faq.q3,
      answer: t.faq.a3,
    },
    {
      question: t.faq.q4,
      answer: t.faq.a4,
    },
    {
      question: t.faq.q5,
      answer: t.faq.a5,
    },
  ]

  return (
    <section className="py-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.faq.title}</h2>
        <p className="text-gray-400 text-lg">{t.faq.subtitle}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-lg pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && <div className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
