-- ============================================================
-- CryptoIndex.live — alpha_calls seed data
-- Run this in Supabase SQL Editor to populate the table
-- ============================================================

-- Step 1: Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS alpha_calls (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    timestamptz DEFAULT now(),
  influencer    text NOT NULL,
  token         text NOT NULL,
  call_price    numeric NOT NULL,
  current_price numeric NOT NULL,
  roi           numeric GENERATED ALWAYS AS (
                  ROUND(((current_price - call_price) / call_price) * 100, 2)
                ) STORED,
  status        text GENERATED ALWAYS AS (
                  CASE WHEN current_price >= call_price THEN 'WIN' ELSE 'LOSS' END
                ) STORED,
  affiliate_link text,
  notes         text
);

-- Step 2: Enable RLS but allow public reads
ALTER TABLE alpha_calls ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read" ON alpha_calls;
CREATE POLICY "Allow public read" ON alpha_calls
  FOR SELECT USING (true);

-- Step 3: Seed with realistic data
INSERT INTO alpha_calls (influencer, token, call_price, current_price, affiliate_link, notes) VALUES
  ('Hsaka Trades',      'TAO',  285.00, 410.00, '/out/trade?token=TAO',  'Called at cycle bottom, thesis: decentralized AI'),
  ('Hsaka Trades',      'HBAR', 0.062,  0.19,   '/out/trade?token=HBAR', 'Enterprise hashgraph play'),
  ('Route 2 FI',        'LINK', 11.20,  18.40,  '/out/trade?token=LINK', 'CCIP expansion catalyst'),
  ('Route 2 FI',        'AVAX', 22.50,  38.70,  '/out/trade?token=AVAX', 'Subnet thesis'),
  ('Ansem',             'HYPE', 8.40,   24.10,  '/out/trade?token=HYPE', 'DEX perpetuals volume explosion'),
  ('Ansem',             'AERO', 0.82,   1.64,   '/out/trade?token=AERO', 'Base ecosystem flywheel'),
  ('Pentoshi',          'IOTA', 0.18,   0.31,   '/out/trade?token=IOTA', 'IoT machine economy narrative'),
  ('Pentoshi',          'KTA',  0.24,   0.17,   '/out/trade?token=KTA',  'Early entry, banking license risk'),
  ('The DeFi Edge',     'PEAQ', 0.44,   0.31,   '/out/trade?token=PEAQ', 'DePIN play, early'),
  ('The DeFi Edge',     'TAO',  310.00, 410.00, '/out/trade?token=TAO',  'AI subnet growth'),
  ('Miles Deutscher',   'AVAX', 19.80,  38.70,  '/out/trade?token=AVAX', 'Q1 breakout call'),
  ('Miles Deutscher',   'LINK', 9.40,   18.40,  '/out/trade?token=LINK', 'Oracle narrative leader');

-- Step 4: Verify
SELECT influencer, token, call_price, current_price, roi, status FROM alpha_calls ORDER BY roi DESC;
