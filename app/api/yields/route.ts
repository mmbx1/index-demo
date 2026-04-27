import { NextResponse } from 'next/server';

const DEFILLAMA_YIELDS_API = 'https://yields.llama.fi/pools';

// Map protocol names to their actual URLs
const PROTOCOL_LINKS: Record<string, string> = {
  'aave-v3':       'https://app.aave.com/',
  'aave-v2':       'https://app.aave.com/',
  'lido':          'https://lido.fi/',
  'compound-v3':   'https://app.compound.finance/',
  'compound-v2':   'https://app.compound.finance/',
  'makerdao':      'https://app.spark.fi/',
  'spark':         'https://app.spark.fi/',
  'rocket-pool':   'https://rocketpool.net/',
  'convex-finance':'https://www.convexfinance.com/',
  'curve-dex':     'https://curve.fi/',
  'yearn-finance': 'https://yearn.fi/',
  'morpho':        'https://app.morpho.org/',
  'ethena':        'https://app.ethena.fi/',
  'pendle':        'https://app.pendle.finance/',
  'eigenlayer':    'https://app.eigenlayer.xyz/',
  'jito':          'https://www.jito.network/',
  'marinade-finance': 'https://marinade.finance/',
  'aerodrome-v2':  'https://aerodrome.finance/',
  'aerodrome':     'https://aerodrome.finance/',
  'fluid-dex':     'https://fluid.instadapp.io/',
  'sky':           'https://app.sky.money/',
  'uniswap-v3':    'https://app.uniswap.org/',
};

export async function GET() {
  try {
    const response = await fetch(DEFILLAMA_YIELDS_API, {
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch yields: ${response.status}`);
    }

    const data = await response.json();

    const topYields = data.data
      .filter((pool: any) => pool.tvlUsd > 10000000) 
      .sort((a: any, b: any) => b.apy - a.apy) 
      .slice(0, 15) 
      .map((pool: any) => ({
        protocol: pool.project.toUpperCase(),
        chain: pool.chain.toUpperCase(),
        tvl: pool.tvlUsd,
        apy: pool.apy,
        affiliate_link: PROTOCOL_LINKS[pool.project] || `https://defillama.com/protocol/${pool.project}`,
      }));

    return NextResponse.json({ success: true, data: topYields });
    
  } catch (error) {
    console.error('Yields API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to aggregate yield data.' },
      { status: 500 }
    );
  }
}
