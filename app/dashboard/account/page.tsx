// app/dashboard/account/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, DollarSign } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useAuth } from "@/hooks/use-auth";

export default function AccountPage() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();

  const [localUser, setLocalUser] = useState<any>(null);

  // Sync local user state only when useAuth provides user
  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  if (authLoading && !localUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-400">{t.dashboard.account.loading}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-2">{t.dashboard.account.signInRequired}</h2>
          <p className="text-slate-400 mb-6">{t.dashboard.account.pleaseSignIn}</p>
          <a
            href="/signin"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-colors"
          >
            {t.nav.signIn}
          </a>
        </div>
      </div>
    );
  }

  return (
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
              <a
                href="https://t.me/Fundarex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                {t.dashboard.account.joinTelegram}
              </a>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">{t.dashboard.account.directContact}</p>
              <a
                href="https://t.me/JamesGrugeon"
                target="_blank"
                rel="noopener noreferrer"
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
  );
}