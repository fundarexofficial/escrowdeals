-- Idempotent account seeding: safe for re-runs
-- Uses INSERT ... ON CONFLICT DO NOTHING to avoid duplicates

-- Helper: Create accounts only if not exists (by platform + tier + price)
DO $$
BEGIN
  -- Stripe
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Stripe', 'Tier1', 2500, 'Verified Stripe Account - US Based', 'Fully verified Stripe account ready for immediate use', ARRAY['Instant Payouts Enabled', 'No Transaction Limits', 'Full API Access', 'Payment Gateway Ready', 'Clean History'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Stripe', 'Tier2', 4500, 'Premium Stripe Account - High Volume', 'Premium Stripe account with enhanced features', ARRAY['Priority Support', 'Higher Transaction Limits', 'Advanced Fraud Protection', 'Multi-Currency Support', 'Dedicated Account Manager'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- PayPal
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('PayPal', 'Tier1', 1800, 'Verified PayPal Business Account', 'Business verified PayPal account with full features', ARRAY['Business Verified', 'No Withdrawal Limits', 'Buyer Protection', 'Invoice Tools', 'Mobile App Access'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('PayPal', 'Tier2', 3200, 'Premium PayPal Account - Unlimited', 'Premium PayPal account with unlimited features', ARRAY['Unlimited Transactions', 'Priority Customer Service', 'Multi-User Access', 'Advanced Reporting', 'Chargeback Protection'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Shopify
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Shopify', 'Tier1', 2200, 'Shopify Store Account - Ready to Launch', 'Pre-configured Shopify store ready for products', ARRAY['Theme Installed', 'Payment Gateway Setup', 'SSL Certificate', 'Basic Apps Installed', '30 Days Support'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Shopify', 'Tier2', 4000, 'Premium Shopify Store - Fully Optimized', 'Fully optimized Shopify store with premium features', ARRAY['Premium Theme Worth $350', 'Advanced Apps Bundle', 'SEO Optimized', 'Professional Logo Design', '90 Days Premium Support'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Amazon
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Amazon', 'Tier1', 3500, 'Amazon Seller Account - Professional', 'Professional Amazon seller account verified', ARRAY['Professional Plan Active', 'Brand Registry Eligible', 'FBA Access', 'Advertising Access', 'Clean Metrics'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- eBay
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('eBay', 'Tier1', 1500, 'eBay Business Account - Top Rated', 'Top rated eBay business seller account', ARRAY['Top Rated Seller Status', '500+ Positive Feedback', 'Store Subscription', 'Promoted Listings', 'International Shipping'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- SumUp (OOS)
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('SumUp', 'Tier1', 1700, 'SumUp Merchant Account - EU', 'EU-based SumUp account with card reader', ARRAY['Card Reader Included', 'Contactless Payments', 'Mobile App', 'No Monthly Fee'], false)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('SumUp', 'Tier2', 3100, 'SumUp Pro Account - Multi-Location', 'Premium SumUp with multi-location support', ARRAY['Unlimited Locations', 'Advanced Analytics', 'Team Management', 'Priority Support'], false)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- N26 (OOS)
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('N26', 'Tier1', 2000, 'N26 Business Account - EU', 'Verified N26 Business account', ARRAY['SEPA Transfers', 'Virtual Cards', 'Expense Management', 'API Access'], false)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Binance
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Binance', 'Tier1', 2800, 'Binance Verified Account - Tier 2', 'Fully KYC verified Binance account', ARRAY['Withdrawal Enabled', 'API Trading', 'Margin Access', 'Clean Activity'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Binance', 'Tier2', 5200, 'Binance Premium Account - Institutional', 'Institutional-grade Binance account', ARRAY['High Limits', 'OTC Desk Access', 'Dedicated Manager', 'Priority Support'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Mercury
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Mercury', 'Tier1', 3300, 'Mercury Business Account - US', 'US-based Mercury banking account', ARRAY['FDIC Insured', 'Debit Cards', 'Team Access', 'Integrations'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Revolut
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Revolut', 'Tier1', 1900, 'Revolut Business Account - Standard', 'Verified Revolut Business account', ARRAY['Multi-Currency', 'Expense Cards', 'Invoicing', 'API Access'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Revolut', 'Tier2', 3700, 'Revolut Premium - Metal Plan', 'Revolut Metal with premium benefits', ARRAY['Metal Card', 'Higher Limits', 'Priority Support', 'Travel Insurance'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Additional listings for requested platforms

  -- SumUp additional listings
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('SumUp', 'Tier1', 1750, 'SumUp Restaurant Account - EU', 'SumUp account optimized for restaurants', ARRAY['Restaurant Mode', 'Table Management', 'Order Integration', 'Staff Accounts'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('SumUp', 'Tier2', 3200, 'SumUp Enterprise - Multi-Device', 'Enterprise SumUp with advanced features', ARRAY['Unlimited Devices', 'Advanced Analytics', 'Custom Integrations', 'Dedicated Support'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- N26 additional listings
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('N26', 'Tier1', 2100, 'N26 Smart Account - EU', 'N26 Smart with advanced features', ARRAY['Cashback Rewards', 'Spaces for Saving', 'Statistics Dashboard', 'Apple Pay/Google Pay'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('N26', 'Tier2', 3600, 'N26 You - Premium Banking', 'N26 You with premium banking features', ARRAY['Premium Support', 'Higher Cashback', 'Exclusive Offers', 'Travel Benefits'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Binance additional listings
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Binance', 'Tier1', 2900, 'Binance Pro Account - Advanced Trading', 'Advanced trading account with pro features', ARRAY['Advanced Charts', 'Portfolio Tracker', 'Margin Trading', 'API Keys Ready'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Binance', 'Tier2', 5300, 'Binance Institutional - High Volume', 'Institutional account for high-volume trading', ARRAY['Institutional Support', 'Custom Solutions', 'Priority Execution', 'Dedicated Manager'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Mercury additional listings
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Mercury', 'Tier1', 3400, 'Mercury Startup Account - US', 'Mercury account designed for startups', ARRAY['Startup Perks', 'Investor Updates', 'Team Management', 'Accounting Integrations'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Mercury', 'Tier2', 4800, 'Mercury Enterprise - Advanced Banking', 'Enterprise Mercury with advanced banking', ARRAY['Multi-Entity Support', 'Custom Workflows', 'Priority Banking', 'Dedicated Advisor'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Revolut additional listings
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Revolut', 'Tier1', 1950, 'Revolut Freelancer Account', 'Optimized for freelancers and contractors', ARRAY['Invoice Generation', 'Expense Tracking', 'Tax Reports', 'Client Management'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Revolut', 'Tier2', 3800, 'Revolut Ultra - Luxury Banking', 'Ultra premium with luxury benefits', ARRAY['Ultra Lounge Access', 'Concierge Service', 'Luxury Insurance', 'Exclusive Rewards'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  -- Additional high-demand accounts
  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Stripe', 'Tier1', 2700, 'Stripe EU Account - Fast Payouts', 'EU Stripe with 2-day payouts', ARRAY['EU Entity', 'SEPA Instant', 'VAT Handling', 'Multi-Language'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('Shopify', 'Tier1', 2400, 'Shopify Dropshipping Store', 'Pre-built dropshipping store', ARRAY['Oberlo Setup', '10 Products Loaded', 'Theme Customized', '30-Day Support'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;

  INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock) VALUES
    ('PayPal', 'Tier1', 2000, 'PayPal EU Account - Verified', 'EU PayPal with local bank', ARRAY['SEPA Link', 'Multi-Currency', 'Invoicing', 'Mobile SDK'], true)
  ON CONFLICT (platform, tier, price) DO NOTHING;
END $$;
