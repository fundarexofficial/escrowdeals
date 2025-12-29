"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, ShoppingCart, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function DashboardPage() {
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

  const purchases = user.purchases || []
  const pendingPurchases = purchases.filter((p: any) => p.status === "Pending" || p.status === "Processing").length

  const getStatusText = (status: string) => {
    if (status === "Delivered") return t.dashboard.status.delivered
    if (status === "Processing") return t.dashboard.status.processing
    return t.dashboard.status.pending
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNav activeTab="overview" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t.dashboard.overview.welcomeBack}</h1>
          <p className="text-slate-400">{user.email}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">{t.dashboard.overview.balance}</CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">${user.balance.toFixed(2)}</div>
              <Link href="/dashboard/topup">
                <Button size="sm" className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                  {t.dashboard.overview.topUpButton}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {t.dashboard.overview.totalPurchases}
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{purchases.length}</div>
              <p className="text-xs text-slate-500 mt-2">{t.dashboard.overview.allTimePurchases}</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {t.dashboard.overview.pendingDeliveries}
              </CardTitle>
              <Clock className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{pendingPurchases}</div>
              <p className="text-xs text-slate-500 mt-2">{t.dashboard.overview.averageTime}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">{t.dashboard.overview.recentPurchases}</CardTitle>
            <CardDescription className="text-slate-400">{t.dashboard.overview.latestPurchases}</CardDescription>
          </CardHeader>
          <CardContent>
            {purchases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-4">{t.dashboard.overview.noPurchases}</p>
                <Link href="/accounts">
                  <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                    {t.dashboard.overview.browseAccounts}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {purchases.map((purchase: any) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {t.dashboard.overview.purchaseId}
                        {purchase.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-slate-400">{new Date(purchase.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${Number(purchase.price).toFixed(2)}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          purchase.status === "Delivered"
                            ? "bg-green-500/20 text-green-400"
                            : purchase.status === "Processing"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-slate-500/20 text-slate-400"
                        }`}
                      >
                        {getStatusText(purchase.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
