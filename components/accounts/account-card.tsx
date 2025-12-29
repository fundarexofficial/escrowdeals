"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Account {
  id: string
  platform: string
  tier: string
  price: number
  title: string
  description: string
  features: string[]
  inStock: boolean
}

export function AccountCard({ account }: { account: Account }) {
  const router = useRouter()
  const [purchasing, setPurchasing] = useState(false)

  const handlePurchase = async () => {
    setPurchasing(true)

    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: account.id }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/signin")
          return
        }
        alert(data.error || "Purchase failed")
        return
      }

      alert(data.message || "Purchase successful!")
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("[v0] Purchase error:", error)
      alert("An error occurred")
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <Card
      className={`border-slate-800 bg-slate-900/50 backdrop-blur relative overflow-hidden ${
        account.tier === "Tier2" ? "border-cyan-500/30" : ""
      }`}
    >
      {account.tier === "Tier2" && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            PREMIUM
          </span>
        </div>
      )}

      {!account.inStock && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-400">OUT OF STOCK</span>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-cyan-400 mb-1">{account.platform}</div>
            <CardTitle className="text-xl text-white">{account.title}</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">${account.price}</div>
            <div className="text-xs text-slate-500">{account.tier}</div>
          </div>
        </div>
        <CardDescription className="text-slate-400">{account.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {account.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handlePurchase}
          disabled={purchasing || !account.inStock}
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {purchasing ? "Processing..." : "Purchase Now"}
        </Button>
      </CardContent>
    </Card>
  )
}
