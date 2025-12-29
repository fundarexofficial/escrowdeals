// hooks/use-auth.ts — FIXED
"use client";

import { useState, useEffect } from "react";

export interface User {
  id: string;           // ← not userId (match your DB/API)
  email: string;
  // add other fields if needed: balance?, name?, etc.
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const userData = await res.json(); // ← { id, email, ... }
        setUser(userData); // ✅ not .user
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleUserChange = () => checkAuth();
    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  return { user, loading };
}