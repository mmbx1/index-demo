"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, ShieldCheck, TrendingUp, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";

const THEME = {
  bg: "#030303",
  teal: "#64bdbd",
  purple: "#650fef",
  green: "#39FF14"
};

export default function ProjectDetail() {
  return (
    <main className="min-h-screen bg-[#030303] text-white font-rajdhani pb-20">
      {/* Navigation */}
      <nav className="p-6 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span className="font-michroma text-[10px] uppercase tracking-widest">Back to Portfolio</span>
        </Link>
      </nav>

      {/* Project Hero */}
      <section className="pt-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse shadow-[0_0_10px_#39FF14]" />
          <span className="text-[#39FF14] font-azeret text-[10px] tracking-[0.4em] uppercase">Phase: Infrastructure Planning</span>
        </div>

        <h1 className="font-michroma text-4xl md:text-7xl mb-8 uppercase leading-tight">
          CryptoIndex<span className="text-[#64bdbd]">.Live</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl leading-relaxed mb-12">
          A high-fidelity RWA prediction market protocol utilizing Pyth Network oracles for sub-second institutional settlement.
        </p>
      </section>

      {/* Infrastructure Grid */}
      <section className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {[
          { icon: Zap, title: "Pyth Oracle", desc: "Low-latency data feeds for real-world asset pricing." },
          { icon: ShieldCheck, title: "On-Chain Settlement", desc: "Automated payouts via audited smart contracts." },
          { icon: TrendingUp, title: "Fee Flywheel", desc: "0.5% settlement tax on all prediction pools." }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:border-[#64bdbd]/30 transition-all">
            <item.icon className="text-[#64bdbd] mb-6" size={32} />
            <h3 className="font-michroma text-sm mb-4 uppercase">{item.title}</h3>
            <p className="text-slate-400 font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Revenue Plan Section */}
      <section className="px-6 max-w-6xl mx-auto py-20 border-t border-white/5">
        <h2 className="font-michroma text-2xl mb-12 uppercase tracking-widest">Revenue Infrastructure</h2>
        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-[#64bdbd] font-michroma text-xs mb-4 uppercase tracking-tighter">Prediction Fees</h4>
              <p className="text-slate-300 mb-6">Every successful prediction pool generates a protocol fee. This is the primary driver of income, scaling with volume rather than asset price.</p>
              
              <h4 className="text-[#650fef] font-michroma text-xs mb-4 uppercase tracking-tighter">Data Licensing</h4>
              <p className="text-slate-300">Aggregated RWA index data is exposed via a private API for institutional subscribers.</p>
            </div>
            <div className="flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 p-8 italic text-slate-500 text-center">
              [Data Flow Visualization: RWA -> Oracle -> Settlement -> Fee]
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}