import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { createTopUp } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, method, referenceId, screenshot } = await request.json()

    if (!amount || !method) {
      return NextResponse.json({ error: "Amount and method required" }, { status: 400 })
    }

    const topup = await createTopUp(
      authUser.userId,
      Number.parseFloat(amount),
      method,
      "Pending",
      undefined,
      referenceId,
      screenshot,
    )

    return NextResponse.json({
      success: true,
      topup,
      message: "Top-up request submitted. Awaiting admin approval.",
    })
  } catch (error) {
    console.error("[v0] Manual topup error:", error)
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
  }
}
