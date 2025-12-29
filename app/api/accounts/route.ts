import { type NextRequest, NextResponse } from "next/server"
import { getAccounts } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tier = searchParams.get("tier")
    const platform = searchParams.get("platform")

    const accounts = await getAccounts(tier, platform)

    return NextResponse.json({ accounts })
  } catch (error) {
    console.error("[v0] Get accounts error:", error)
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 })
  }
}
