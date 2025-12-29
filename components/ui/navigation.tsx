"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { User, LogOut, Home, CreditCard, History } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()

    // Listen for storage events to update user state when signed in from another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userChanged") {
        fetchUser()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for same-tab updates
    const handleUserChange = () => {
      fetchUser()
    }

    window.addEventListener("userChanged", handleUserChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("userChanged", handleUserChange)
    }
  }, [])

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" })
    setUser(null)
    window.location.href = "/"
  }

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Escrow
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Deals</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm ${pathname === "/" ? "text-cyan-400" : "text-slate-300 hover:text-white"} transition-colors`}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/accounts"
              className={`text-sm ${pathname === "/accounts" ? "text-cyan-400" : "text-slate-300 hover:text-white"} transition-colors`}
            >
              {t.nav.accounts}
            </Link>
            <Link
              href="/about"
              className={`text-sm ${pathname === "/about" ? "text-cyan-400" : "text-slate-300 hover:text-white"} transition-colors`}
            >
              {t.nav.about}
            </Link>
            <Link
              href="https://t.me/JamesGrugeon"
              target="_self"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {!isLoading && (
              <>
                {user ? (
                  // Authenticated user menu
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/topup">
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Top Up
                      </Button>
                    </Link>
                    <Link href="/dashboard/history">
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                        <History className="w-4 h-4 mr-2" />
                        History
                      </Button>
                    </Link>
                    <Link href="/dashboard/account">
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                        <User className="w-4 h-4 mr-2" />
                        Account
                      </Button>
                    </Link>
                    <Link href="https://t.me/JamesGrugeon" target="_blank">
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                        DM Admin
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  // Guest user buttons
                  <>
                    <Link href="/signin">
                      <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                        {t.nav.signIn}
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                        {t.nav.getStarted}
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
