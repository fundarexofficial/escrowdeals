const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

// Read DATABASE_URL from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const databaseUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
if (!databaseUrlMatch) {
  throw new Error("DATABASE_URL not found in .env.local");
}
const DATABASE_URL = databaseUrlMatch[1];

const sql = neon(DATABASE_URL);

async function seed() {
  try {
    console.log("Seeding accounts...");

    // Read the SQL file
    const sqlPath = path.join(__dirname, "seed-accounts.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Split into individual statements (basic split by semicolon, but handle DO $$ blocks)
    // For simplicity, since it's one big DO block, just execute it
    await sql.unsafe(sqlContent);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    process.exit(0);
  }
}

seed();
