import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { createTopUp, updateUserBalance } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")
    const amount = searchParams.get("amount")

    if (!address || !amount) {
      return NextResponse.json({ error: "Address and amount required" }, { status: 400 })
    }

    const response = await fetch(`https://api.tronscan.org/api/account?address=${address}&limit=20`, {
      headers: {
        "TRON-PRO-API-KEY": process.env.TRONSCAN_API_KEY || "",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to verify transaction" }, { status: 500 })
    }

    const data = await response.json()
    const amountNum = Number.parseFloat(amount)

    const topup = await createTopUp(authUser.userId, amountNum, "crypto", "Completed", address)
    await updateUserBalance(authUser.userId, amountNum, "increment")

    return NextResponse.json({
      success: true,
      topup,
      message: "Balance updated successfully",
    })
  } catch (error) {
    console.error("[v0] Crypto check error:", error)
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 })
  }
}
