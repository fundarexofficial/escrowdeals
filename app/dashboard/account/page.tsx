"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Calendar, DollarSign } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function AccountPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) {
          router.push("/signin")
          return
        }
        const data = await res.json()
        setUser(data)
      } catch (error) {
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNav activeTab="account" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t.dashboard.account.title}</h1>
          <p className="text-slate-400">{t.dashboard.account.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">{t.dashboard.account.profileInfo}</CardTitle>
              <CardDescription className="text-slate-400">{t.dashboard.account.accountDetails}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t.dashboard.account.email}</p>
                  <p className="text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t.dashboard.account.memberSince}</p>
                  <p className="text-white">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{t.dashboard.account.currentBalance}</p>
                  <p className="text-white font-bold">${Number(user.balance).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">{t.dashboard.account.support}</CardTitle>
              <CardDescription className="text-slate-400">{t.dashboard.account.needHelp}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-2">{t.dashboard.account.tier2Support}</p>
                <a href="https://t.me/Fundarex" target="_self" className="text-cyan-400 hover:text-cyan-300 underline">
                  {t.dashboard.account.joinTelegram}
                </a>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">{t.dashboard.account.directContact}</p>
                <a
                  href="https://t.me/JamesGrugeon"
                  target="_self"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  {t.dashboard.account.telegramAdmin}
                </a>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">{t.dashboard.account.responseTime}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
