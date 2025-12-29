"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const currentCount = Math.floor(progress * end)

      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function StatsSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-slate-900 py-16 md:py-24 border-y border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center space-y-2">
            <CountUp end={7500} suffix="+" />
            <p className="text-slate-400 text-sm md:text-base">{t.stats.accountsDelivered}</p>
            <p className="text-xs text-slate-500">{t.stats.accountsDesc}</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-white">
              <CountUp end={120} suffix="k+" />
            </div>
            <p className="text-slate-400 text-sm md:text-base">{t.stats.fundsReleased}</p>
            <p className="text-xs text-slate-500">{t.stats.fundsDesc}</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-white">
              <CountUp end={500} suffix="k+" />
            </div>
            <p className="text-slate-400 text-sm md:text-base">{t.stats.escrowVolume}</p>
            <p className="text-xs text-slate-500">{t.stats.escrowDesc}</p>
          </div>
          <div className="text-center space-y-2">
            <CountUp end={30} suffix="+" />
            <p className="text-slate-400 text-sm md:text-base">{t.stats.globalReach}</p>
            <p className="text-xs text-slate-500">{t.stats.globalDesc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
