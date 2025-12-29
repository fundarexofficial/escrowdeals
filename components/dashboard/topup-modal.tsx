"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

const WALLET_POOL = ["TWTjkNUbAw8ZhBSg3Kh8Em9ZpW874xDMNN", "TAdj6jAEpC1wDGHbFniXaGsJcXc976MD13"]

export function TopUpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedWallet] = useState(() => WALLET_POOL[Math.floor(Math.random() * WALLET_POOL.length)])
  const [copied, setCopied] = useState(false)
  const [cryptoAmount, setCryptoAmount] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [manualAmount, setManualAmount] = useState("")
  const [manualMethod, setManualMethod] = useState("Wise")
  const [referenceId, setReferenceId] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const copyWallet = () => {
    navigator.clipboard.writeText(selectedWallet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCryptoVerify = async () => {
    if (!cryptoAmount) return

    setVerifying(true)
    try {
      const res = await fetch(`/api/topup/crypto/check?address=${selectedWallet}&amount=${cryptoAmount}`)
      const data = await res.json()

      if (data.success) {
        alert("Balance updated successfully!")
        onClose()
        router.refresh()
      } else {
        alert(data.error || "Verification failed")
      }
    } catch (error) {
      console.error("Crypto verify error:", error)
      alert("An error occurred")
    } finally {
      setVerifying(false)
    }
  }

  const handleManualSubmit = async () => {
    if (!manualAmount || !manualMethod) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/topup/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: manualAmount,
          method: manualMethod,
          referenceId,
        }),
      })

      const data = await res.json()

      if (data.success) {
        alert("Top-up request submitted! Admin will review shortly.")
        onClose()
        router.refresh()
      } else {
        alert(data.error || "Submission failed")
      }
    } catch (error) {
      console.error("Manual submit error:", error)
      alert("An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.dashboard.topup.modalTitle}</DialogTitle>
          <DialogDescription className="text-slate-400">{t.dashboard.topup.modalDescription}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="crypto" className="data-[state=active]:bg-cyan-600">
              {t.dashboard.topup.autoCryptoTab}
            </TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:bg-cyan-600">
              {t.dashboard.topup.manualTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crypto" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-slate-200">{t.dashboard.topup.walletAddress}</Label>
              <div className="flex gap-2">
                <Input
                  value={selectedWallet}
                  readOnly
                  className="bg-slate-800 border-slate-700 text-white font-mono text-sm"
                />
                <Button
                  onClick={copyWallet}
                  variant="outline"
                  className="border-slate-700 hover:bg-slate-800 shrink-0 bg-transparent"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-slate-500">{t.dashboard.topup.sendUsdt}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">{t.dashboard.topup.amount}</Label>
              <Input
                type="number"
                placeholder="100"
                value={cryptoAmount}
                onChange={(e) => setCryptoAmount(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <Button
              onClick={handleCryptoVerify}
              disabled={!cryptoAmount || verifying}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            >
              {verifying ? t.dashboard.topup.verifying : t.dashboard.topup.verifyTransaction}
            </Button>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-slate-200">{t.dashboard.topup.amountUsd}</Label>
              <Input
                type="number"
                placeholder="100"
                value={manualAmount}
                onChange={(e) => setManualAmount(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">{t.dashboard.topup.paymentMethod}</Label>
              <select
                value={manualMethod}
                onChange={(e) => setManualMethod(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2"
              >
                <option value="Wise">Wise</option>
                <option value="Payoneer">Payoneer</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">{t.dashboard.topup.referenceId}</Label>
              <Input
                placeholder={t.dashboard.topup.transactionReference}
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2">
              <p className="text-sm text-slate-300 font-medium">{t.dashboard.topup.contactAdmin}</p>
              <a
                href="https://t.me/JamesGrugeon"
                target="_self"
                className="text-cyan-400 hover:text-cyan-300 text-sm underline"
              >
                @JamesGrugeon on Telegram
              </a>
            </div>

            <Button
              onClick={handleManualSubmit}
              disabled={!manualAmount || submitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            >
              {submitting ? t.dashboard.topup.submitting : t.dashboard.topup.submitRequest}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
