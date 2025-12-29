"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, CreditCard, History, User, LogOut } from "lucide-react"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/lib/language-context"

export function DashboardNav({ activeTab }: { activeTab: string }) {
  const router = useRouter()
  const { t } = useLanguage()

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Escrow
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Deals</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              size="sm"
              className={
                activeTab === "overview"
                  ? "bg-cyan-600 hover:bg-cyan-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }
              asChild
            >
              <Link href="/dashboard">
                <Home className="w-4 h-4 mr-2" />
                {t.dashboard.nav.overview}
              </Link>
            </Button>
            <Button
              variant={activeTab === "topup" ? "default" : "ghost"}
              size="sm"
              className={
                activeTab === "topup"
                  ? "bg-cyan-600 hover:bg-cyan-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }
              asChild
            >
              <Link href="/dashboard/topup">
                <CreditCard className="w-4 h-4 mr-2" />
                {t.dashboard.nav.topUp}
              </Link>
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              size="sm"
              className={
                activeTab === "history"
                  ? "bg-cyan-600 hover:bg-cyan-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }
              asChild
            >
              <Link href="/dashboard/history">
                <History className="w-4 h-4 mr-2" />
                {t.dashboard.nav.history}
              </Link>
            </Button>
            <Button
              variant={activeTab === "account" ? "default" : "ghost"}
              size="sm"
              className={
                activeTab === "account"
                  ? "bg-cyan-600 hover:bg-cyan-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }
              asChild
            >
              <Link href="/dashboard/account">
                <User className="w-4 h-4 mr-2" />
                {t.dashboard.nav.account}
              </Link>
            </Button>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.dashboard.nav.signOut}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
