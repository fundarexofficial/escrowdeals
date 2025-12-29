import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "escrow-deals-secret-key-change-in-production")

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })
}

export async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) return null

  return verifyToken(token.value)
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
