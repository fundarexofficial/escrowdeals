-- Seed account listings with realistic data

-- Updated to use lowercase table name and snake_case column names
INSERT INTO account_listings (platform, tier, price, title, description, features, in_stock)
VALUES
  ('Stripe', 'Standard', 2500, 'Verified Stripe Account - US Based', 'Fully verified Stripe account ready for immediate use', ARRAY['Instant Payouts Enabled', 'No Transaction Limits', 'Full API Access', 'Payment Gateway Ready', 'Clean History'], true),
  ('Stripe', 'Premium', 4500, 'Premium Stripe Account - High Volume', 'Premium Stripe account with enhanced features', ARRAY['Priority Support', 'Higher Transaction Limits', 'Advanced Fraud Protection', 'Multi-Currency Support', 'Dedicated Account Manager'], true),
  ('PayPal', 'Standard', 1800, 'Verified PayPal Business Account', 'Business verified PayPal account with full features', ARRAY['Business Verified', 'No Withdrawal Limits', 'Buyer Protection', 'Invoice Tools', 'Mobile App Access'], true),
  ('PayPal', 'Premium', 3200, 'Premium PayPal Account - Unlimited', 'Premium PayPal account with unlimited features', ARRAY['Unlimited Transactions', 'Priority Customer Service', 'Multi-User Access', 'Advanced Reporting', 'Chargeback Protection'], true),
  ('Shopify', 'Standard', 2200, 'Shopify Store Account - Ready to Launch', 'Pre-configured Shopify store ready for products', ARRAY['Theme Installed', 'Payment Gateway Setup', 'SSL Certificate', 'Basic Apps Installed', '30 Days Support'], true),
  ('Shopify', 'Premium', 4000, 'Premium Shopify Store - Fully Optimized', 'Fully optimized Shopify store with premium features', ARRAY['Premium Theme Worth $350', 'Advanced Apps Bundle', 'SEO Optimized', 'Professional Logo Design', '90 Days Premium Support'], true),
  ('Amazon', 'Standard', 3500, 'Amazon Seller Account - Professional', 'Professional Amazon seller account verified', ARRAY['Professional Plan Active', 'Brand Registry Eligible', 'FBA Access', 'Advertising Access', 'Clean Metrics'], true),
  ('eBay', 'Standard', 1500, 'eBay Business Account - Top Rated', 'Top rated eBay business seller account', ARRAY['Top Rated Seller Status', '500+ Positive Feedback', 'Store Subscription', 'Promoted Listings', 'International Shipping'], true);
