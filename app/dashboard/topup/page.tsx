"use client"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { TopUpModal } from "@/components/dashboard/topup-modal"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function TopUpPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNav activeTab="topup" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t.dashboard.topup.title}</h1>
          <p className="text-slate-400">{t.dashboard.topup.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur cursor-pointer hover:border-cyan-500/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-white">{t.dashboard.topup.autoCrypto}</CardTitle>
                  <CardDescription className="text-slate-400">{t.dashboard.topup.instantVerification}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">{t.dashboard.topup.autoCryptoDesc}</p>
              <Button
                onClick={() => setModalOpen(true)}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
              >
                {t.dashboard.topup.topUpWithCrypto}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur cursor-pointer hover:border-cyan-500/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <CardTitle className="text-white">{t.dashboard.topup.manualTransfer}</CardTitle>
                  <CardDescription className="text-slate-400">{t.dashboard.topup.bankOrEWallet}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">{t.dashboard.topup.manualTransferDesc}</p>
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="w-full border-slate-700 text-white hover:bg-slate-800"
              >
                {t.dashboard.topup.submitManualRequest}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <TopUpModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
