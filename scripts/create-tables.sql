-- This script creates the necessary tables and indexes
-- Run via the SQL executor in v0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Updated to use lowercase table names and snake_case column names
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  balance DOUBLE PRECISION DEFAULT 0,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create account_listings table
CREATE TABLE IF NOT EXISTS account_listings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  platform TEXT NOT NULL,
  tier TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  price DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES account_listings(id) ON DELETE CASCADE
);

-- Create top_ups table
CREATE TABLE IF NOT EXISTS top_ups (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT NOT NULL,
  amount DOUBLE PRECISION NOT NULL,
  method TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  wallet_address TEXT,
  reference_id TEXT,
  screenshot TEXT,
  created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS account_listings_tier_platform_idx ON account_listings(tier, platform);
CREATE INDEX IF NOT EXISTS purchases_user_id_status_idx ON purchases(user_id, status);
CREATE INDEX IF NOT EXISTS top_ups_user_id_status_idx ON top_ups(user_id, status);
