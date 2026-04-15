"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Menu, X, ExternalLink, Newspaper } from "lucide-react";
import YieldDashboard from "@/components/YieldDashboard";
import SmartMoneyDashboard from "@/components/SmartMoneyDashboard";
import AlphaDashboard from "@/components/AlphaDashboard";

// --- 1. COMPONENT DEFINITIONS ---
interface HoloCardProps {
  title: string;
  value: string;
  trend: string;
}

function HoloCard({ title, value, trend }: HoloCardProps) {
  const isPositive = trend.startsWith('+');
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative p-6 rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800 shadow-xl group cursor-pointer transition-colors hover:bg-gray-900"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 ring-1 ring-inset ring-green-500/20 transition-opacity duration-500 ease-in-out pointer-events-none rounded-xl" />

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-sans">{title}</h3>
        <p className="text-3xl font-medium text-white font-mono tracking-tight">{value}</p>
        <p className={`text-sm font-mono mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </p>
      </div>
    </motion.div>
  );
}

// --- 2. CONTENT DATABASE ---
const INSIGHTS_DATA = [
  {
    category: "Institutional",
    title: "BlackRock's BUIDL Fund Crosses $300M",
    source: "Bloomberg",
    date: "24h ago",
    link: "#",
  },
  {
    category: "RWA",
    title: "Real Estate Tokenization Protocol Surges 40%",
    source: "CoinDesk",
    date: "2 days ago",
    link: "#",
  },
  {
    category: "Prediction Markets",
    title: "Election Betting Volume Hits All-Time High",
    source: "Reuters",
    date: "3 days ago",
    link: "#",
  }
];

const INDEX_TRACKERS = [
  { title: "RWA Sector TVL", value: "$4.28B", trend: "+12.4%" },
  { title: "AI Compute", value: "$8.91B", trend: "+5.2%" },
  { title: "Prediction Mkts", value: "$940M", trend: "-2.8%" }
];

// --- 3. PARTICLE FIELD COMPONENT (Elite Institutional Refactor) ---
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    // PREMIUM PALETTE: Titanium White, Slate 400, Slate 600. Zero neon.
    const colors = [
      "rgba(255, 255, 255, 0.9)", 
      "rgba(148, 163, 184, 0.6)", 
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
        // SLOWED DOWN: Movement is now a deliberate, premium glide
        this.vx = (Math.random() - 0.5) * 0.15; 
        this.vy = (Math.random() - 0.5) * 0.15;
        // VARYING SIZES: From tiny specs to distinct anchor nodes
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

    // REDUCED DENSITY: Less clutter, more focus on the data
    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // INCREASED DISTANCE: Creates larger, more elegant geometric webs
          if (dist < 180) {
            ctx.beginPath();
            // CRISP LINES: Stark white with fading opacity, highly visible against black
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

// --- 4. MAIN PAGE COMPONENT (With Elite Boot Sequence) ---
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState("INITIALIZING SECURE CONNECTION...");

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // Master Boot Sequence Logic
  useEffect(() => {
    // Stage 1: Initializing
    const t1 = setTimeout(() => setBootText("SYNCING ORACLE NODES..."), 600);
    // Stage 2: Data Fetching
    const t2 = setTimeout(() => setBootText("DECRYPTING INSTITUTIONAL FLOWS..."), 1200);
    // Stage 3: System Ready (Lifts the veil)
    const t3 = setTimeout(() => setIsBooting(false), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden font-sans selection:bg-green-500/30 selection:text-white">
      
      {/* THE BOOT SCREEN OVERLAY */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Spinning Loader */}
              <div className="relative flex items-center justify-center w-16 h-16">
                <div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-r-2 border-gray-600 rounded-full animate-spin border-dashed duration-75"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_#22c55e]"></div>
              </div>
              
              {/* Dynamic Terminal Text */}
              <motion.div 
                key={bootText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono tracking-[0.3em] text-green-500 uppercase flex items-center gap-2"
              >
                {bootText} <span className="w-2 h-4 bg-green-500 animate-pulse"></span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800 h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="font-sans font-bold text-lg tracking-tight text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-sm shadow-[0_0_8px_#22c55e]"></div>
          CryptoIndex<span className="text-gray-500">.Live</span>
        </div>
        
        <div className="hidden md:flex gap-8">
          {['Markets', 'Influencer Alpha', 'RWA Yields'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="relative text-sm text-gray-400 hover:text-white font-medium transition-colors group py-5">
              {item}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center shadow-[0_0_8px_#22c55e]" />
            </a>
          ))}
        </div>

        <a href="#newsletter" className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-md bg-green-500/10 border border-green-500/50 text-green-500 text-xs font-semibold uppercase tracking-wider hover:bg-green-500 hover:text-black transition-all duration-200">
          Terminal Access
        </a>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-400 hover:text-white">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 bg-black overflow-hidden">
        {/* Only render the canvas and heavy animations AFTER boot sequence starts lifting */}
        {!isBooting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <ParticleField />
            
            <motion.div style={{ y: y1 }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-green-500/20 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.05)] pointer-events-none" />
            <motion.div style={{ y: y2 }} animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full pointer-events-none" />
          </motion.div>
        )}

        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center mt-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-xs font-medium tracking-widest text-green-400 uppercase">Live Market Data</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-tight mb-6">
            Follow the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Smart Money.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-lg text-gray-300 max-w-2xl mb-10 tracking-wide leading-relaxed font-light">
            We aggregate institutional order flows, track high-yield Real World Assets, and verify influencer win-rates in real time. The ultimate decentralized terminal.
          </motion.p>
        </div>
      </section>

      {/* --- The Smart Money Engine --- */}
      <section id="markets" className="relative py-16 px-6 lg:px-12 bg-black z-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <SmartMoneyDashboard />
        </div>
      </section>

      {/* --- NEW: The Influencer Alpha Index --- */}
      <section id="influencer-alpha" className="relative py-16 px-6 lg:px-12 bg-[#050505] z-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <AlphaDashboard />
        </div>
      </section>

      {/* --- The Whale Trap (Yield Engine) --- */}
      <section id="rwa-yields" className="relative py-16 px-6 lg:px-12 bg-black z-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <YieldDashboard />
        </div>
      </section>
    </div>
  );
}