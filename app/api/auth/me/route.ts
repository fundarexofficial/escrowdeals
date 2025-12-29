import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getUserWithRecentPurchases } from "@/lib/db"

export async function GET() {
  try {
    const authUser = await getAuthUser()

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getUserWithRecentPurchases(authUser.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("[v0] Get user error:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}
