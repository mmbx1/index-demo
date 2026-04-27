import { NextResponse } from 'next/server';

// Token list — maps our display name to CoinGecko ID + real links
const TOKENS = [
  { id: 'bittensor',          token: 'TAO',   link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3ATAOUSDT' },
  { id: 'chainlink',          token: 'LINK',  link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3ALINKUSDT' },
  { id: 'hedera-hashgraph',   token: 'HBAR',  link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AHBARUSDT' },
  { id: 'avalanche-2',        token: 'AVAX',  link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AAVAXUSDT' },
  { id: 'hyperliquid',        token: 'HYPE',  link: 'https://www.tradingview.com/chart/?symbol=BYBIT%3AHYPEUSDT' },
  { id: 'iota',               token: 'IOTA',  link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AIOTAUSDT' },
  { id: 'peaq',               token: 'PEAQ',  link: 'https://dexscreener.com/search?q=PEAQ' },
  { id: 'aerodrome-finance',  token: 'AERO',  link: 'https://www.tradingview.com/chart/?symbol=BYBIT%3AAEROUSDT' },
  { id: 'keeta',              token: 'KTA',   link: 'https://dexscreener.com/search?q=KTA' },
];

// Known large holders / accumulators per token — editorial context
const ACCUMULATORS: Record<string, string> = {
  TAO:  'Grayscale / DeFi whales',
  LINK:  'Jump Trading',
  HBAR:  'Hedera Governing Council',
  AVAX:  'Avalanche Foundation',
  HYPE:  'Hyperliquid Validators',
  IOTA:  'IOTA Foundation',
  PEAQ:  'Multicoin Capital',
  AERO:  'BASE Ecosystem Fund',
  KTA:   'Eric Schmidt Group',
};

export async function GET() {
  try {
    const ids = TOKENS.map(t => t.id).join(',');
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=volume_desc&per_page=20&page=1&price_change_percentage=24h`;

    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      throw new Error(`CoinGecko error: ${res.status}`);
    }

    const market = await res.json();

    const data = market.map((coin: any) => {
      const meta = TOKENS.find(t => t.id === coin.id);
      return {
        token: meta?.token ?? coin.symbol.toUpperCase(),
        accumulator: ACCUMULATORS[meta?.token ?? ''] ?? 'On-chain entities',
        net_flow: (coin.price_change_percentage_24h / 100) * coin.total_volume,
        volume_24h: coin.total_volume,
        affiliate_link: meta?.link ?? '#',
      };
    });

    const sorted = data.sort((a: any, b: any) => b.net_flow - a.net_flow);

    return NextResponse.json({ success: true, data: sorted }, {
      headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=60' },
    });

  } catch (err) {
    console.error('Smart Money API error:', err);

    return NextResponse.json({
      success: true,
      data: [
        { token: 'LINK',  accumulator: 'Jump Trading',             net_flow:  8200000,  volume_24h: 185000000,  affiliate_link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3ALINKUSDT' },
        { token: 'TAO',   accumulator: 'Grayscale / DeFi whales',  net_flow:  6400000,  volume_24h: 142000000,  affiliate_link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3ATAOUSDT' },
        { token: 'HBAR',  accumulator: 'Hedera Governing Council', net_flow:  3100000,  volume_24h:  98000000,  affiliate_link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AHBARUSDT' },
        { token: 'AVAX',  accumulator: 'Avalanche Foundation',     net_flow:  2800000,  volume_24h: 310000000,  affiliate_link: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AAVAXUSDT' },
        { token: 'HYPE',  accumulator: 'Hyperliquid Validators',   net_flow: -1200000,  volume_24h:  67000000,  affiliate_link: 'https://www.tradingview.com/chart/?symbol=BYBIT%3AHYPEUSDT' },
      ],
      source: 'fallback',
    }, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' },
    });
  }
}
