"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Head of Payments",
      company: "FinTech Solutions Inc.",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      quote: "EscrowDeals helped us scale our payment processing infrastructure overnight. Their enterprise-grade accounts and 24/7 support gave us the reliability we needed during our growth phase.",
      verified: true
    },
    {
      name: "Marcus Rodriguez",
      title: "CTO",
      company: "Global Commerce Ltd.",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      quote: "The escrow protection gave us complete peace of mind. We processed over $2M in transactions without a single issue. Their compliance standards exceed industry requirements.",
      verified: true
    },
    {
      name: "Jennifer Park",
      title: "Finance Director",
      company: "E-commerce Plus",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      quote: "Outstanding service for international payments. We needed accounts in 5 different countries, and they delivered everything within 48 hours with full local compliance.",
      verified: true
    },
    {
      name: "David Thompson",
      title: "Operations Manager",
      company: "Payment Gateway Pro",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      quote: "Their instant delivery and zero-fraud guarantee transformed our operations. We went from 2-week waits to same-day account provisioning. Game-changing for our business.",
      verified: true
    },
    {
      name: "Lisa Wang",
      title: "VP of Finance",
      company: "TechStart Payments",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      quote: "The security features and escrow protection are unparalleled. We've never felt more confident processing high-value transactions. Their support team is exceptional.",
      verified: true
    },
    {
      name: "Robert Kim",
      title: "CEO",
      company: "Digital Finance Co.",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      quote: "From setup to integration, everything was seamless. Their API documentation and technical support made the entire process effortless. Highly recommend for any fintech company.",
      verified: true
    }
  ]

  return (
    <section className="py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-balance">
            Trusted by Finance Leaders Worldwide
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            See what finance professionals and payment companies say about our escrow services and account solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-slate-800 bg-slate-900/50 backdrop-blur hover:bg-slate-800/50 transition-colors">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-cyan-400 mb-4 opacity-60" />
                <p className="text-slate-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-cyan-500/20 text-cyan-400">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                      {testimonial.verified && (
                        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs">{testimonial.title}</p>
                    <p className="text-cyan-400 text-xs font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <p className="text-slate-400 text-sm">Finance Companies Served</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">$50M+</div>
              <p className="text-slate-400 text-sm">Transactions Protected</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <p className="text-slate-400 text-sm">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <p className="text-slate-400 text-sm">Expert Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
