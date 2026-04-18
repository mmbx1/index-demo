"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, Shield } from "lucide-react";
import YieldDashboard from "@/components/YieldDashboard";
import SmartMoneyDashboard from "@/components/SmartMoneyDashboard";
import AlphaDashboard from "@/components/AlphaDashboard";

// --- PARTICLE FIELD (Original palette — white, slate, subtle) ---
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    const colors = [
      "rgba(255, 255, 255, 0.9)",
      "rgba(148, 163, 184, 0.6)",
      "rgba(34, 197, 94, 0.4)",
      "rgba(71, 85, 105, 0.3)"
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number; color: string;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 2.5 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * (1 - dist / 180)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full block z-0 pointer-events-none opacity-80" />;
};

// --- MAIN PAGE ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState("INITIALIZING SECURE CONNECTION...");

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    const t1 = setTimeout(() => setBootText("SYNCING ORACLE NODES..."), 600);
    const t2 = setTimeout(() => setBootText("DECRYPTING INSTITUTIONAL FLOWS..."), 1200);
    const t3 = setTimeout(() => setIsBooting(false), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden" style={{ fontFamily: 'var(--font-sora, Sora, sans-serif)' }}>

      {/* BOOT SCREEN */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center w-16 h-16">
                <div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin" />
                <div className="absolute inset-2 border-r-2 border-gray-600 rounded-full animate-spin border-dashed" style={{ animationDuration: '3s' }} />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 15px #22c55e' }} />
              </div>
              <motion.div 
                key={bootText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs tracking-[0.3em] text-green-500 uppercase flex items-center gap-2"
                style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono, monospace)' }}
              >
                {bootText} <span className="w-2 h-4 bg-green-500 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800 h-16 flex items-center justify-between px-6 lg:px-12">
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-sm" style={{ boxShadow: '0 0 8px #22c55e' }} />
          <span className="font-bold text-lg tracking-tight text-white">
            CryptoIndex<span className="text-gray-500">.Live</span>
          </span>
        </div>

        <div className="hidden md:flex gap-8">
          {['Markets', 'Influencer Alpha', 'RWA Yields'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
              className="relative text-sm text-gray-400 hover:text-white font-medium transition-colors group py-5">
              {item}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" 
                style={{ boxShadow: '0 0 8px #22c55e' }} />
            </a>
          ))}
        </div>

        {/* Under Construction Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/30">
          <span className="w-[5px] h-[5px] rounded-full bg-green-500" style={{ boxShadow: '0 0 6px #22c55e', animation: 'pulse-green 2s infinite' }} />
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-green-500"
            style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}>
            Platform in Development
          </span>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-400 hover:text-white">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 p-6 md:hidden flex flex-col gap-4 bg-black/95 backdrop-blur-xl border-b border-gray-800">
            {['Markets', 'Influencer Alpha', 'RWA Yields'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-gray-400 font-medium py-2">
                {item}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
              <span className="w-[5px] h-[5px] rounded-full bg-green-500" style={{ animation: 'pulse-green 2s infinite' }} />
              <span className="text-[10px] tracking-[0.12em] uppercase text-green-500" style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}>
                Platform in Development
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 bg-black overflow-hidden">
        {!isBooting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <ParticleField />
            <motion.div style={{ y: y1, boxShadow: '0 0 30px rgba(34,197,94,0.05)' }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-green-500/20 rounded-full pointer-events-none" />
            <motion.div style={{ y: y2 }} animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full pointer-events-none" />
          </motion.div>
        )}

        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center mt-8">
          {/* Under Construction Banner */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/20 mb-4 backdrop-blur-md">
            <Shield className="w-3 h-3 text-green-500" />
            <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-green-400"
              style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}>
              Early Access Preview — Full Platform Launching Soon
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: '0 0 8px #22c55e' }} />
            <span className="text-xs font-medium tracking-widest text-green-400 uppercase"
              style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}>
              Live Market Data
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-tight mb-6">
            Follow the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Smart Money.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-lg text-gray-300 max-w-2xl mb-10 tracking-wide leading-relaxed font-light">
            We aggregate institutional order flows, track high-yield Real World Assets, and verify influencer win-rates in real time. The ultimate decentralized terminal.
          </motion.p>

          {/* Hero Stats */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="flex items-center gap-8 md:gap-12">
            {[
              { value: '24/7', label: 'Live Data Feeds' },
              { value: 'AI', label: 'Powered Analysis' },
              { value: '100+', label: 'Projects Scored' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-px h-10 bg-gray-800" />}
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}>{stat.value}</div>
                  <div className="text-[10px] tracking-[0.1em] uppercase mt-1 text-gray-500">{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SMART MONEY SECTION */}
      <section id="markets" className="relative py-16 px-6 lg:px-12 bg-black z-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <SmartMoneyDashboard />
        </div>
      </section>

      {/* INFLUENCER ALPHA SECTION */}
      <section id="influencer-alpha" className="relative py-16 px-6 lg:px-12 bg-[#050505] z-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <AlphaDashboard />
        </div>
      </section>

      {/* YIELD SECTION */}
      <section id="rwa-yields" className="relative py-16 px-6 lg:px-12 bg-black z-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <YieldDashboard />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 text-center border-t border-gray-900">
        <div className="max-w-md mx-auto">
          <div className="w-48 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)' }} />
          <p className="text-xs leading-relaxed text-gray-600">
            CryptoIndex.live is currently in active development. Data shown may be simulated during the preview period. Not financial advice.
          </p>
          <p className="text-[10px] mt-4 text-gray-700">
            © 2026 CryptoIndex.live — All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}