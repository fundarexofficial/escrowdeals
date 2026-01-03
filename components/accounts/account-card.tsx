"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Bell, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

// Lightweight toast (no external dep)
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-teal-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-xs">
        <Bell className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1 text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface Account {
  id: string;
  platform: string;
  tier: string;
  price: number;
  title: string;
  description: string;
  features: string[];
  inStock: boolean;
}

export function AccountCard({ account }: { account: Account }) {
  const router = useRouter();
  const [purchasing, setPurchasing] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Use your existing useAuth hook
const { user, loading: authLoading } = useAuth();
useEffect(() => {
  if (user) {
    setUserEmail(user.email);
  } else {
    setUserEmail(null);
  }
}, [user]);

  const closeToast = () => setToast(null);

  const handlePurchase = async () => {
    if (!account.inStock) return;
    setPurchasing(true);
    setError(null);
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: account.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/signin");
          return;
        }
        setError(data.error || "Purchase failed");
        return;
      }

      setToast("Purchase successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error("[Purchase] Error:", error);
      setError("An error occurred during purchase.");
    } finally {
      setPurchasing(false);
    }
  };

  const handleNotify = useCallback(async () => {
    if (account.inStock || !userEmail) return;

    setNotifying(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: account.id, email: userEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setShowModal(false);
      setToast("You've been added to the waitlist. We'll notify you when available.");
    } catch (e: any) {
      console.error("[Waitlist] Error:", e);
      setError(e.message || "Failed to join waitlist. Please try again.");
    } finally {
      setNotifying(false);
    }
  }, [account.id, account.inStock, userEmail]);

  // Modal keyboard handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  // Fallback email for demo (remove in prod or use real auth)
  const displayEmail = userEmail || "your-email@example.com";

  return (
    <>
      {/* Toast notifications */}
      {toast && <Toast message={toast} onClose={closeToast} />}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-rose-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-xs">
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-2 hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Waitlist Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Join Waitlist</h3>
              <p className="text-slate-300 mb-2">
                Get notified when <span className="font-semibold text-amber-400">{account.platform}</span> accounts are back in stock.
              </p>
              <p className="text-slate-400 text-sm mb-4">
                Notification will be sent to:  
                <br />
                <code className="font-mono text-slate-200 bg-slate-900/50 px-2 py-1 rounded">
                  {displayEmail}
                </code>
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNotify}
                  disabled={notifying}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  {notifying ? "Adding..." : "Join Waitlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card
        className={`relative overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900/60 backdrop-blur-sm ${
          account.inStock
            ? "hover:ring-1 hover:ring-teal-500/30 transition-all duration-300"
            : "opacity-90"
        }`}
      >
        {/* Trust badge — bottom-right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-slate-500">
          <span className="text-cyan-400">ⓘ</span>
          {account.inStock ? (
            <span className="text-teal-400">Verified by JamesGrugeon</span>
          ) : (
            <span className="text-amber-400">Out of Stock</span>
          )}
        </div>

        <CardContent className="p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
            {/* Details */}
            <div className="flex-grow min-w-0 w-full lg:w-auto">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="text-sm font-medium text-cyan-400">{account.platform}</span>
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                  {account.tier}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 truncate">{account.title}</h3>
              <p className="text-slate-400 text-sm mb-3 line-clamp-2">{account.description}</p>

              <ul className="space-y-1.5 mb-4 lg:mb-0">
                {account.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col items-end w-full lg:w-48 flex-shrink-0 lg:items-end">
              <div className="text-right mb-2 w-full lg:w-auto">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                  ${account.price}
                </div>
              </div>

              {account.inStock ? (
                <Button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium px-4 py-2.5 h-auto text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  {purchasing ? "Processing..." : "Purchase Now"}
                </Button>
              ) : (
                <Button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium px-4 py-2.5 h-auto text-sm shadow-md"
                >
                  <Bell className="w-4 h-4 mr-1.5" />
                  Notify When Available
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
