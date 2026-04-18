import { NextResponse } from 'next/server';

const DEFILLAMA_YIELDS_API = 'https://yields.llama.fi/pools';

export async function GET() {
  console.log("--> API Hit: Attempting to fetch DefiLlama Yields...");
  
  try {
    const response = await fetch(DEFILLAMA_YIELDS_API, {
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      console.error(`--> DefiLlama Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch yields: ${response.status}`);
    }

    const data = await response.json();
    console.log(`--> Success: Fetched ${data.data.length} pools. Filtering...`);

    const topYields = data.data
      .filter((pool: any) => pool.tvlUsd > 10000000) 
      .sort((a: any, b: any) => b.apy - a.apy) 
      .slice(0, 15) 
      .map((pool: any) => ({
        protocol: pool.project.toUpperCase(),
        chain: pool.chain.toUpperCase(),
        tvl: pool.tvlUsd,
        apy: pool.apy,
        affiliate_link: `/out/stake?protocol=${pool.project}` 
      }));

    return NextResponse.json({ success: true, data: topYields });
    
  } catch (error) {
    console.error('--> Catch Block Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to aggregate yield data.' },
      { status: 500 }
    );
  }
}