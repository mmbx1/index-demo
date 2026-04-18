import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TOKEN_IDS: Record<string, string> = {
  TAO:  'bittensor',
  LINK: 'chainlink',
  HBAR: 'hedera-hashgraph',
  AVAX: 'avalanche-2',
  HYPE: 'hyperliquid',
  IOTA: 'iota',
  PEAQ: 'peaq',
  AERO: 'aerodrome-finance',
  KTA:  'keeta',
};

export async function GET() {
  try {
    const ids = Object.values(TOKEN_IDS).join(',');
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) throw new Error(`CoinGecko: ${res.status}`);
    const prices = await res.json();

    const priceMap: Record<string, number> = {};
    for (const [token, geckoId] of Object.entries(TOKEN_IDS)) {
      if (prices[geckoId]?.usd) {
        priceMap[token] = prices[geckoId].usd;
      }
    }

    // Update current_price in Supabase for each token
    for (const [token, price] of Object.entries(priceMap)) {
      await supabase
        .from('alpha_calls')
        .update({ current_price: price })
        .eq('token', token);
    }

    return NextResponse.json({ success: true, updated: priceMap });
  } catch (err) {
    console.error('Alpha price sync error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
