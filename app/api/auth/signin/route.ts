import { type NextRequest, NextResponse } from "next/server"
import { verifyPassword, createToken, setAuthCookie } from "@/lib/auth"
import { getUserByEmail } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await createToken(user.id, user.email)
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, balance: user.balance },
    })
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return NextResponse.json({ error: "Failed to sign in. Please try again." }, { status: 500 })
  }
}
