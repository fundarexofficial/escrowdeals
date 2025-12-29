"use client"

import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

const reviews = [
  {
    name: "Michael Chen",
    rating: 5,
    text: "Received my Stripe account within 5 minutes. Fully verified and working perfectly. Excellent service!",
    date: "2 days ago",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Professional team, fast delivery. The PayPal account was exactly as described. Highly recommended.",
    date: "1 week ago",
  },
  {
    name: "Ahmed Al-Rashid",
    rating: 5,
    text: "Best escrow service I've used. Secure, transparent, and the Telegram support is very responsive.",
    date: "3 weeks ago",
  },
]

export function TrustpilotWidget() {
  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const review = reviews[currentReview]

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
      <Card className="w-80 border-slate-800 bg-slate-900/95 backdrop-blur-sm shadow-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500" />
            <span className="font-semibold text-white text-sm">Trustpilot</span>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-white text-sm">{review.name}</span>
            <span className="text-xs text-slate-500">{review.date}</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{review.text}</p>
          <div className="flex gap-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-green-500 text-green-500" />
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
