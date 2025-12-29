"use client"

import { Navigation } from "@/components/ui/navigation"
import { Footer } from "@/components/home/footer"
import { useLanguage } from "@/lib/language-context"

export default function TermsPage() {
  const { t } = useLanguage()
  const terms = t.termsPage

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            {terms.title}
          </h1>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-sm text-gray-400">{terms.lastUpdated}</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section1Title}</h2>
              <p>{terms.section1Content}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section2Title}</h2>
              <p>{terms.section2Content}</p>
            </section>

            <section className="space-y-4 bg-red-950/30 border border-red-500/50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-red-400 mt-0">{terms.section3Title}</h2>
              <div className="space-y-4">
                <p className="font-semibold text-white">{terms.section3Main}</p>
                <p>{terms.section3Intro}</p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  {terms.section3List.map((item: string, index: number) => (
                    <li key={index} className="font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-red-300 font-semibold mt-4">{terms.section3Warning}</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section4Title}</h2>
              <p>{terms.section4Content}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {terms.section4List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section5Title}</h2>
              <p>{terms.section5Content}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {terms.section5List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section6Title}</h2>
              <p>{terms.section6Content}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {terms.section6List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{terms.section6Extra}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section7Title}</h2>
              <p>{terms.section7Content}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {terms.section7List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section8Title}</h2>
              <p>{terms.section8Content}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section9Title}</h2>
              <p>{terms.section9Content}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section10Title}</h2>
              <p>{terms.section10Content}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section11Title}</h2>
              <p>{terms.section11Content}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section12Title}</h2>
              <p>{terms.section12Content}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white mt-8">{terms.section13Title}</h2>
              <p>
                {terms.section13Content}{" "}
                <a
                  href="https://t.me/jamesGrugeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  @jamesGrugeon
                </a>
              </p>
            </section>

            <div className="mt-12 p-6 bg-yellow-950/30 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-300 font-semibold">{terms.finalWarning}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
