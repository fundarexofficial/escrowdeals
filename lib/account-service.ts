// lib/account-service.ts
import { getAccounts } from "@/lib/db";

export async function getTopShowcaseAccounts(limit = 4) {
  // You can sort by popularity, recency, or fixed IDs
  const accounts = await getAccounts(); // adjust query if needed
  return accounts
    .filter(acc => acc.in_stock)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}