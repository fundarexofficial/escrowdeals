import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/db"
import { hashPassword, createToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)
    const user = await createUser(email, hashedPassword)

    // Create token and set cookie
    const token = await createToken(user.id, user.email)
    await setAuthCookie(token)

    return NextResponse.json(
      {
        success: true,
        user: { id: user.id, email: user.email, balance: user.balance },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 })
  }
}
