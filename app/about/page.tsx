// app/about/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Users, Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
  const { t } = useLanguage();
  const about = t.about;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{about.title}</h1>
          <p className="text-xl text-slate-400">{about.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{about.secure.title}</h3>
              <p className="text-slate-400">{about.secure.content}</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{about.fastDelivery.title}</h3>
              <p className="text-slate-400">{about.fastDelivery.content}</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{about.happyCustomers.title}</h3>
              <p className="text-slate-400">{about.happyCustomers.content}</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{about.globalReach.title}</h3>
              <p className="text-slate-400">{about.globalReach.content}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{about.mission.title}</h2>
            {about.mission.content.split("\n").map((paragraph: string, idx: number) => (
              <p
                key={idx}
                className={`text-slate-300 leading-relaxed ${idx === 0 ? "mb-4" : ""}`}
              >
                {paragraph.trim()}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}