// components/ui/navigation.tsx
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/lib/language-context";
import { useAuth } from "@/hooks/use-auth";
import { User, LogOut, Home, CreditCard, History, Menu, X, Wallet } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user, loading: isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  // ✅ Fetch balance on mount if user is signed in
  useEffect(() => {
    if (user) {
      const fetchBalance = async () => {
        try {
          setLoadingBalance(true);
          const res = await fetch("/api/auth/me");
          if (res.ok) {
            const data = await res.json();
            setBalance(data.balance ?? 0);
          } else {
            setBalance(0);
          }
        } catch (err) {
          console.error("Failed to fetch balance:", err);
          setBalance(0);
        } finally {
          setLoadingBalance(false);
        }
      };
      fetchBalance();
    } else {
      setBalance(null);
      setLoadingBalance(false);
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      window.dispatchEvent(new CustomEvent("userChanged"));
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-out error:", error);
      window.location.href = "/";
    }
  };

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const mainNavItems = [
    { href: "/", label: t.nav.home },
    { href: "/accounts", label: t.nav.accounts },
    { href: "/about", label: t.nav.about },
  ];

  const authNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/topup", label: "Top Up", icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/history", label: "History", icon: <History className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/account", label: "Account", icon: <User className="w-4 h-4 mr-2" /> },
    { href: "https://t.me/JamesGrugeon", label: "DM Admin", icon: <User className="w-4 h-4 mr-2" />, target: "_blank", rel: "noopener noreferrer" },
    { onClick: handleSignOut, label: "Sign Out", icon: <LogOut className="w-4 h-4 mr-2" /> },
  ];

  // ✅ Balance display component (reusable)
  const BalanceBadge = ({ showIcon = false }: { showIcon?: boolean }) => (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium whitespace-nowrap">
      {showIcon && <Wallet className="w-3 h-3" />}
      {loadingBalance ? (
        <span className="h-4 w-10 bg-slate-700/50 animate-pulse rounded" />
      ) : balance !== null ? (
        `$${balance.toFixed(2)}`
      ) : (
        "$0.00"
      )}
    </span>
  );

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            Escrow
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Deals
            </span>
          </Link>

          {/* Desktop Main Nav */}
          <div className="hidden md:flex items-center gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {isLoading ? (
              <div className="w-20 h-8 bg-slate-800 rounded animate-pulse" />
            ) : user ? (
              <>
                {/* ✅ Desktop: Show balance next to "Menu" */}
                <div className="hidden md:flex items-center gap-3">
                  <BalanceBadge showIcon />
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Menu
                      <span className="ml-1">▼</span>
                    </Button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-md shadow-lg z-50">
                        <div className="py-1">
                          {/* ✅ Desktop menu: include balance at top */}
                          <div className="px-4 py-2 text-sm font-medium text-cyan-400 flex items-center gap-2">
                            <Wallet className="w-3.5 h-3.5" />
                            Balance: {loadingBalance ? "..." : `$${balance?.toFixed(2) ?? "0.00"}`}
                          </div>
                          <div className="border-t border-slate-800 my-1" />
                          {authNavItems.map((item, idx) => (
                            <React.Fragment key={idx}>
                              {item.onClick ? (
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-none"
                                  onClick={() => {
                                    item.onClick();
                                    setIsMenuOpen(false);
                                  }}
                                >
                                  {item.icon}
                                  {item.label}
                                </Button>
                              ) : (
                                <Link
                                  href={item.href}
                                  target={item.target}
                                  rel={item.rel}
                                  className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {item.icon}
                                  {item.label}
                                </Link>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-slate-300 hover:text-white"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-slate-300 hover:text-white"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/signin">
                    <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                      {t.nav.signIn}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                      {t.nav.getStarted}
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800 pt-4 pb-4">
            <div className="space-y-3">
              {mainNavItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block w-full text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <>
                  <div className="border-t border-slate-800 my-2" />
                  {/* ✅ Mobile menu: show balance prominently */}
                  <div className="px-4 py-2 bg-slate-900/50 rounded-md flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-medium">Your Balance</span>
                    <BalanceBadge />
                  </div>
                  {authNavItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {item.onClick ? (
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2"
                          onClick={() => {
                            item.onClick();
                            setIsMenuOpen(false);
                          }}
                        >
                          {item.icon}
                          {item.label}
                        </Button>
                      ) : (
                        <Link
                          href={item.href}
                          target={item.target}
                          rel={item.rel}
                          className="block w-full text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}

              {!user && (
                <>
                  <div className="border-t border-slate-800 my-2" />
                  <Link
                    href="/signin"
                    className="block w-full text-center text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.nav.signIn}
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full text-center bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.nav.getStarted}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}