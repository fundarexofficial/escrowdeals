import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getAccountById, getUserById, createPurchase, updateUserBalance, updatePurchaseStatus } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { accountId } = await request.json()

    if (!accountId) {
      return NextResponse.json({ error: "Account ID required" }, { status: 400 })
    }

    const account = await getAccountById(accountId)

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    if (!account.in_stock) {
      return NextResponse.json({ error: "Account out of stock" }, { status: 400 })
    }

    const user = await getUserById(authUser.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.balance < account.price) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    const purchase = await createPurchase(user.id, account.id, account.price)
    await updateUserBalance(user.id, account.price, "decrement")

    console.log(
      `[v0] Purchase queued for delivery: ${purchase.id} - ${account.platform} ${account.title} for user ${user.email}`,
    )

    const deliveryTime = Math.floor(Math.random() * 9000) + 1000
    setTimeout(async () => {
      await updatePurchaseStatus(purchase.id, "Delivered")
      console.log(`[v0] Purchase delivered: ${purchase.id}`)
    }, deliveryTime)

    return NextResponse.json({
      success: true,
      purchase,
      message: "Purchase successful! Delivery in 1-10 minutes.",
    })
  } catch (error) {
    console.error("[v0] Purchase error:", error)
    return NextResponse.json({ error: "Purchase failed. Please try again." }, { status: 500 })
  }
}
