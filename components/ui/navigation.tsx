// components/ui/navigation.tsx
"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/lib/language-context";
import { useAuth } from "@/hooks/use-auth";
import { User, LogOut, Home, CreditCard, History, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user, loading: isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // ✅ Main nav items — now shown in mobile menu for all users
  const mainNavItems = [
    { href: "/", label: t.nav.home },
    { href: "/accounts", label: t.nav.accounts },
    { href: "/about", label: t.nav.about },
    
  ];

  // ✅ Auth-specific items — only for signed-in users
  const authNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/topup", label: "Top Up", icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/history", label: "History", icon: <History className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/account", label: "Account", icon: <User className="w-4 h-4 mr-2" /> },
    { href: "https://t.me/JamesGrugeon", label: "DM Admin", icon: <User className="w-4 h-4 mr-2" />, target: "_blank", rel: "noopener noreferrer" },
    { onClick: handleSignOut, label: "Sign Out", icon: <LogOut className="w-4 h-4 mr-2" /> },
  ];

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

          {/* Desktop Main Nav — hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.target}
                rel={item.rel}
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
                {/* Desktop: dropdown menu */}
                <div className="hidden md:block relative">
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

                {/* Mobile: hamburger — shows ALL main + auth links */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-slate-300 hover:text-white"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            ) : (
              // Guest: always show Sign In / Get Started + mobile menu toggle
              <>
                {/* Mobile menu toggle for guests */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-slate-300 hover:text-white"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop guest buttons */}
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

        {/* ✅ Mobile Menu — show for ALL users (guest + auth) */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800 pt-4 pb-4">
            <div className="space-y-3">
              {/* Always show main nav */}
              {mainNavItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="block w-full text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Show auth nav only if signed in */}
              {user && (
                <>
                  <div className="border-t border-slate-800 my-2" />
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

              {/* Guest CTA in mobile menu */}
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