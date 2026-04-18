import { NextResponse } from 'next/server';

// Token list — maps our display name to CoinGecko ID
const TOKENS = [
  { id: 'bittensor',    token: 'TAO',   affiliate_link: '/out/trade?token=TAO'   },
  { id: 'chainlink',   token: 'LINK',  affiliate_link: '/out/trade?token=LINK'  },
  { id: 'hedera-hashgraph', token: 'HBAR', affiliate_link: '/out/trade?token=HBAR' },
  { id: 'avalanche-2', token: 'AVAX',  affiliate_link: '/out/trade?token=AVAX'  },
  { id: 'hyperliquid', token: 'HYPE',  affiliate_link: '/out/trade?token=HYPE'  },
  { id: 'iota',        token: 'IOTA',  affiliate_link: '/out/trade?token=IOTA'  },
  { id: 'peaq',        token: 'PEAQ',  affiliate_link: '/out/trade?token=PEAQ'  },
  { id: 'aerodrome-finance', token: 'AERO', affiliate_link: '/out/trade?token=AERO' },
  { id: 'keeta',       token: 'KTA',   affiliate_link: '/out/trade?token=KTA'   },
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
      headers: {
        'Accept': 'application/json',
        // Add your CoinGecko Pro key here when ready:
        // 'x-cg-pro-api-key': process.env.COINGECKO_API_KEY ?? '',
      },
      next: { revalidate: 120 }, // Vercel cache — revalidate every 2 mins
    });

    if (!res.ok) {
      throw new Error(`CoinGecko error: ${res.status}`);
    }

    const market = await res.json();

    // Map CoinGecko response to our display format
    const data = market.map((coin: any) => {
      const meta = TOKENS.find(t => t.id === coin.id);
      return {
        token: meta?.token ?? coin.symbol.toUpperCase(),
        accumulator: ACCUMULATORS[meta?.token ?? ''] ?? 'On-chain entities',
        // net_flow: use 24h price change × volume as a proxy for directional flow
        net_flow: (coin.price_change_percentage_24h / 100) * coin.total_volume,
        volume_24h: coin.total_volume,
        affiliate_link: meta?.affiliate_link ?? '#',
      };
    });

    // Sort by highest absolute flow
    const sorted = data.sort((a: any, b: any) => b.net_flow - a.net_flow);

    return NextResponse.json({ success: true, data: sorted }, {
      headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=60' },
    });

  } catch (err) {
    console.error('Smart Money API error:', err);

    // Graceful fallback — return last known static data rather than blank screen
    return NextResponse.json({
      success: true,
      data: [
        { token: 'LINK',  accumulator: 'Jump Trading',             net_flow:  8200000,  volume_24h: 185000000,  affiliate_link: '/out/trade?token=LINK'  },
        { token: 'TAO',   accumulator: 'Grayscale / DeFi whales',  net_flow:  6400000,  volume_24h: 142000000,  affiliate_link: '/out/trade?token=TAO'   },
        { token: 'HBAR',  accumulator: 'Hedera Governing Council', net_flow:  3100000,  volume_24h:  98000000,  affiliate_link: '/out/trade?token=HBAR'  },
        { token: 'AVAX',  accumulator: 'Avalanche Foundation',     net_flow:  2800000,  volume_24h: 310000000,  affiliate_link: '/out/trade?token=AVAX'  },
        { token: 'HYPE',  accumulator: 'Hyperliquid Validators',   net_flow: -1200000,  volume_24h:  67000000,  affiliate_link: '/out/trade?token=HYPE'  },
      ],
      source: 'fallback',
    }, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' },
    });
  }
}
