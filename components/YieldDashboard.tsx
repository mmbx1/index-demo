"use client";

import React from 'react';
import useSWR from 'swr';
import DataTable, { TableColumn } from './DataTable';
import { Layers } from 'lucide-react';

// SWR Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function YieldDashboard() {
  // Poll the API route we created. SWR handles caching and revalidation automatically.
  const { data, error, isLoading } = useSWR('/api/yields', fetcher, {
    refreshInterval: 60000, // Silently refresh data every 60 seconds
  });

  const columns: TableColumn[] = [
    { header: 'Protocol', accessor: 'protocol' },
    { header: 'Chain', accessor: 'chain' },
    { header: 'TVL (Liquidity)', accessor: 'tvl', isCurrency: true },
    { header: 'Base APY', accessor: 'apy', isPercentage: true },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Layers className="text-green-500 w-5 h-5" />
          <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-widest">
            High-Yield RWA & Stablecoin Pools
          </h2>
        </div>
        
        {/* Live Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {!isLoading && !error && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-gray-500' : error ? 'bg-red-500' : 'bg-green-500'}`}></span>
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            {isLoading ? 'Connecting...' : error ? 'Data Feed Error' : 'Live Feed'}
          </span>
        </div>
      </div>

      {isLoading ? (
        // Sleek Skeleton Loader
        <div className="w-full rounded-xl border border-gray-800 bg-gray-900/20 p-6 h-[400px] flex items-center justify-center animate-pulse">
           <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Establishing secure connection to oracle...</span>
        </div>
      ) : error ? (
        <div className="w-full rounded-xl border border-red-900/50 bg-red-500/5 p-6 text-center">
          <span className="text-sm font-mono text-red-500">Failed to sync with data feed.</span>
        </div>
      ) : (
        <DataTable 
          data={data?.data || []} 
          columns={columns} 
          ctaText="Stake / Earn" 
        />
      )}
    </div>
  );
}