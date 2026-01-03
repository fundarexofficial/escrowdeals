// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accountId, email } = await request.json();

    // ✅ Minimal validation (just for UX)
    if (!accountId || typeof accountId !== "string") {
      return NextResponse.json({ error: "Invalid account ID" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 🎯 Mock success — no DB, no Redis, no error
    console.log(`[MOCK WAITLIST] ${email} joined for account ${accountId}`);

    return NextResponse.json({
      success: true,
      message: "You've been added to the waitlist. We'll notify you when this account is back in stock.",
      added: true,
    });
  } catch (error) {
    // This should never happen now — but keep safety
    console.error("[WAITLIST_MOCK_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to join waitlist. Please try again." },
      { status: 500 }
    );
  }
}