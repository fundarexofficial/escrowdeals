"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function HistoryPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [purchases, setPurchases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const authRes = await fetch("/api/auth/me")
        if (!authRes.ok) {
          router.push("/signin")
          return
        }
        const userData = await authRes.json()
        setPurchases(userData.purchases || [])
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

  const getStatusText = (status: string) => {
    if (status === "Delivered") return t.dashboard.status.delivered
    if (status === "Processing") return t.dashboard.status.processing
    return t.dashboard.status.pending
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNav activeTab="history" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t.dashboard.history.title}</h1>
          <p className="text-slate-400">{t.dashboard.history.description}</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">{t.dashboard.history.allPurchases}</CardTitle>
            <CardDescription className="text-slate-400">{t.dashboard.history.completeHistory}</CardDescription>
          </CardHeader>
          <CardContent>
            {purchases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">{t.dashboard.history.noPurchases}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase: any) => (
                  <div key={purchase.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-medium">{purchase.title || "Purchase"}</h3>
                        <p className="text-sm text-slate-400">{purchase.platform || "Account"}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(purchase.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${Number(purchase.price).toFixed(2)}</p>
                        <span
                          className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
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

                    {purchase.status === "Delivered" && (
                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-sm text-slate-400 mb-2">{t.dashboard.history.delivered}</p>
                        <p className="text-xs text-slate-500">{t.dashboard.history.checkEmail}</p>
                      </div>
                    )}
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
