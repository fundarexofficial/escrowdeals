"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="text-2xl font-bold text-white">
            Escrow
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Deals</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <span className="text-gray-500 text-xs">© 2025 escrow deals. All rights reserved.</span>
          </nav>
        </div>
      </div>
    </footer>
  )
}
