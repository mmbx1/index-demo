"use client";

import React from 'react';
import useSWR from 'swr';
import { Crosshair, ArrowUpRight, ArrowDownRight, ExternalLink, Skull } from 'lucide-react';
import { supabase } from '../lib/supabase';

// TradingView links per token
const TV_LINKS: Record<string, string> = {
  TAO:  'https://www.tradingview.com/chart/?symbol=BINANCE%3ATAOUSDT',
  LINK: 'https://www.tradingview.com/chart/?symbol=BINANCE%3ALINKUSDT',
  HBAR: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AHBARUSDT',
  AVAX: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AAVAXUSDT',
  HYPE: 'https://www.tradingview.com/chart/?symbol=BYBIT%3AHYPEUSDT',
  IOTA: 'https://www.tradingview.com/chart/?symbol=BINANCE%3AIOTAUSDT',
  PEAQ: 'https://www.tradingview.com/chart/?symbol=BYBIT%3APEAQUSDT',
  AERO: 'https://www.tradingview.com/chart/?symbol=BYBIT%3AAEROUSDT',
  KTA:  'https://www.tradingview.com/chart/?symbol=BYBIT%3AKTAUSDT',
};

const fetchAlphaCalls = async () => {
  const { data, error } = await supabase
    .from('alpha_calls')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export default function AlphaDashboard() {
  const { data: alphaData, error, isLoading } = useSWR('alpha_calls', fetchAlphaCalls, {
    refreshInterval: 60000,
  });

  const topCalls = alphaData?.filter((d: any) => d.status === 'WIN') || [];
  const rektCalls = alphaData?.filter((d: any) => d.status === 'LOSS') || [];

  const CallCard = ({ data, isWin }: { data: any, isWin: boolean }) => (
    <div className={`glass-card relative flex items-center justify-between p-3 transition-all hover:-translate-y-0.5 ${isWin ? 'hover:border-green-500/50' : 'hover:border-red-500/50'}`}>
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{data.influencer}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-white font-mono">{data.token}</span>
          <span className="text-[10px] text-gray-600 font-mono">Entry: ${Number(data.call_price).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className={`block text-sm font-mono ${isWin ? 'text-green-500' : 'text-red-500'}`}>
            {isWin ? '+' : ''}{Number(data.roi).toFixed(2)}%
          </span>
          <span className="text-[10px] text-gray-600 font-mono">Now: ${Number(data.current_price).toFixed(2)}</span>
        </div>
        
        <a href={TV_LINKS[data.token] || data.affiliate_link} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all duration-200 ${
            isWin 
              ? 'border-green-500/50 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
              : 'border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]'
          }`}>
          Chart <ExternalLink className="ml-1.5 h-2.5 w-2.5" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Crosshair className="text-gray-400 w-5 h-5" />
          <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-widest">
            Influencer Alpha Index
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {!isLoading && !error && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-gray-500' : error ? 'bg-red-500' : 'bg-green-500'}`} />
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            {isLoading ? 'Querying...' : error ? 'DB Connection Failed' : 'Supabase Live'}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="glass-card w-full p-6 h-[300px] flex items-center justify-center animate-pulse">
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Fetching on-chain verifiable calls...</span>
        </div>
      ) : error ? (
        <div className="w-full rounded-xl border border-red-900/50 bg-red-500/5 p-6 text-center">
          <span className="text-sm font-mono text-red-500">Failed to pull database records. Check Supabase RLS policies.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-900 pb-2">
              <ArrowUpRight className="text-green-500 w-4 h-4" />
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Verified Alphas</h3>
            </div>
            {topCalls.length > 0 ? (
              topCalls.map((call: any) => <CallCard key={call.id} data={call} isWin={true} />)
            ) : (
              <p className="text-xs font-mono text-gray-600 py-4">No winning calls tracked yet.</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-900 pb-2">
              <Skull className="text-red-500 w-4 h-4" />
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Counter-Trade Opportunities</h3>
            </div>
            {rektCalls.length > 0 ? (
              rektCalls.map((call: any) => <CallCard key={call.id} data={call} isWin={false} />)
            ) : (
              <p className="text-xs font-mono text-gray-600 py-4">No liquidated calls tracked yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
