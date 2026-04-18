"use client";

import React from 'react';
import useSWR from 'swr';
import DataTable, { TableColumn } from './DataTable';
import { Radar } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SmartMoneyDashboard() {
  const { data, error, isLoading } = useSWR('/api/smart-money', fetcher, {
    refreshInterval: 30000,
  });

  const columns: TableColumn[] = [
    { header: 'Token Asset', accessor: 'token' },
    { header: 'Top Accumulating Entity', accessor: 'accumulator' },
    { header: '24h Net Flow', accessor: 'net_flow', isCurrency: true },
    { header: '24h Total Volume', accessor: 'volume_24h', isCurrency: true },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Radar className="text-green-500 w-5 h-5" />
          <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-widest">
            Institutional Order Flows (24H)
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {!isLoading && !error && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-gray-500' : error ? 'bg-red-500' : 'bg-green-500'}`} />
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            Arkham Node Sync
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="glass-card w-full p-6 h-[300px] flex items-center justify-center animate-pulse">
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Scanning whale wallets...</span>
        </div>
      ) : error ? (
        <div className="w-full rounded-xl border border-red-900/50 bg-red-500/5 p-6 text-center">
          <span className="text-sm font-mono text-red-500">Failed to connect to flow radar.</span>
        </div>
      ) : (
        <DataTable data={data?.data || []} columns={columns} ctaText="Trade Alongside" />
      )}
    </div>
  );
}
