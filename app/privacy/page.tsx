// app/privacy/page.tsx
"use client";

import { Footer } from "@/components/home/footer";
import { useLanguage } from "@/lib/language-context";

export default function PrivacyPage() {
  const { t } = useLanguage();
  const p = t.privacyPage;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            {p.title}
          </h1>

          <p className="text-sm text-gray-400 mb-8">{p.lastUpdated}</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mt-8">{p.section1Title}</h2>
              <p>{p.section1Content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mt-8">{p.section2Title}</h2>
              <p>{p.section2Content}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                {p.section2List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mt-8">{p.section3Title}</h2>
              <p>{p.section3Content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mt-8">{p.section4Title}</h2>
              <p>{p.section4Content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mt-8">{p.section5Title}</h2>
              <p>{p.section5Content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mt-8">{p.section6Title}</h2>
              <p>{p.section6Content}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                {p.section6List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mt-8">{p.section7Title}</h2>
              <p>
                {p.section7Content}{" "}
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}