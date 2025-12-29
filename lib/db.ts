import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

export const sql = neon(process.env.DATABASE_URL)

// User queries
export async function getUserByEmail(email: string) {
  const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`
  return result[0] || null
}

export async function createUser(email: string, hashedPassword: string) {
  const result = await sql`
    INSERT INTO users (email, password, balance, created_at, updated_at)
    VALUES (${email}, ${hashedPassword}, 0, NOW(), NOW())
    RETURNING id, email, balance, created_at
  `
  return result[0]
}

export async function getUserById(id: string) {
  const result = await sql`SELECT id, email, balance, created_at FROM users WHERE id = ${id} LIMIT 1`
  return result[0] || null
}

export async function updateUserBalance(userId: string, amount: number, operation: "increment" | "decrement") {
  const operator = operation === "increment" ? "+" : "-"
  const result = await sql`
    UPDATE users 
    SET balance = balance ${sql.unsafe(operator)} ${amount}, updated_at = NOW()
    WHERE id = ${userId}
    RETURNING id, email, balance
  `
  return result[0]
}

// Account listing queries
export async function getAccounts(tier?: string | null, platform?: string | null) {
  let query = sql`SELECT * FROM account_listings WHERE 1=1`

  if (tier) {
    query = sql`SELECT * FROM account_listings WHERE tier = ${tier}`
  }

  if (platform && tier) {
    query = sql`SELECT * FROM account_listings WHERE tier = ${tier} AND platform = ${platform}`
  } else if (platform) {
    query = sql`SELECT * FROM account_listings WHERE platform = ${platform}`
  }

  const result = await sql`${query} ORDER BY created_at DESC`
  return result
}

export async function getAccountById(id: string) {
  const result = await sql`SELECT * FROM account_listings WHERE id = ${id} LIMIT 1`
  return result[0] || null
}

// Purchase queries
export async function createPurchase(userId: string, accountId: string, price: number) {
  const result = await sql`
    INSERT INTO purchases (user_id, account_id, price, status, created_at, updated_at)
    VALUES (${userId}, ${accountId}, ${price}, 'Processing', NOW(), NOW())
    RETURNING *
  `
  return result[0]
}

export async function updatePurchaseStatus(purchaseId: string, status: string) {
  const result = await sql`
    UPDATE purchases 
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${purchaseId}
    RETURNING *
  `
  return result[0]
}

export async function getPurchasesByUserId(userId: string) {
  const result = await sql`
    SELECT p.*, a.platform, a.title, a.tier
    FROM purchases p
    LEFT JOIN account_listings a ON p.account_id = a.id
    WHERE p.user_id = ${userId}
    ORDER BY p.created_at DESC
  `
  return result
}

export async function getUserWithRecentPurchases(userId: string) {
  const user = await getUserById(userId)
  if (!user) return null

  const purchases = await sql`
    SELECT * FROM purchases 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 5
  `

  return { ...user, purchases }
}

export async function getUniquePlatforms() {
  const result = await sql`
    SELECT DISTINCT platform FROM account_listings ORDER BY platform ASC
  `
  return result
}

// Top-up queries
export async function createTopUp(
  userId: string,
  amount: number,
  method: string,
  status: string,
  walletAddress?: string,
  referenceId?: string,
  screenshot?: string,
) {
  const result = await sql`
    INSERT INTO top_ups (user_id, amount, method, status, wallet_address, reference_id, screenshot, created_at, updated_at)
    VALUES (${userId}, ${amount}, ${method}, ${status}, ${walletAddress || null}, ${referenceId || null}, ${screenshot || null}, NOW(), NOW())
    RETURNING *
  `
  return result[0]
}
