import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // NOTE: When you get your Arkham/DexScreener API keys, you will replace 
    // the mocked array below with a fetch() call to their endpoints.
    // Example: const res = await fetch('https://api.arkhamintelligence.com/flows', { headers: { 'API-Key': process.env.ARKHAM_KEY }});
    
    // Simulating real-time institutional wallet flows
    const smartMoneyFlows = [
      {
        token: 'ONDO',
        accumulator: 'Wintermute Trading',
        net_flow: 14500000,
        volume_24h: 342000000,
        affiliate_link: '/out/trade?token=ONDO',
      },
      {
        token: 'LINK',
        accumulator: 'Jump Trading',
        net_flow: 8200000,
        volume_24h: 185000000,
        affiliate_link: '/out/trade?token=LINK',
      },
      {
        token: 'PENDLE',
        accumulator: 'Arthur Hayes (Wallet)',
        net_flow: 4100000,
        volume_24h: 89000000,
        affiliate_link: '/out/trade?token=PENDLE',
      },
      {
        token: 'FET',
        accumulator: 'DWF Labs',
        net_flow: 2800000,
        volume_24h: 210000000,
        affiliate_link: '/out/trade?token=FET',
      },
      {
        token: 'SOL',
        accumulator: 'a16z Crypto',
        net_flow: -12500000, // Show a distribution/sell-off too
        volume_24h: 1200000000,
        affiliate_link: '/out/trade?token=SOL',
      }
    ];

    // Sort by highest accumulation (Net Flow)
    const sortedData = smartMoneyFlows.sort((a, b) => b.net_flow - a.net_flow);

    // Cache this response on Vercel's Edge network for 60 seconds
    return NextResponse.json({ success: true, data: sortedData }, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate',
      },
    });
    
  } catch (error) {
    console.error('Smart Money Fetch Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to aggregate institutional flows.' },
      { status: 500 }
    );
  }
}