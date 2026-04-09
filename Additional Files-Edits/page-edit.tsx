"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, ExternalLink, Menu, Terminal, Zap } from "lucide-react";

// --- 1. THE REFINED COLOR SPECS ---
const THEME = {
  bg: "#030303",
  teal: "#64bdbd",    
  green: "#39FF14",   
  purple: "#650fef",  
  surface: "rgba(10, 10, 10, 0.8)",
  border: "rgba(255, 255, 255, 0.05)"
};

// --- 2. THE PARTICLE ENGINE ---
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const colors = [THEME.teal, THEME.purple];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number; color: string;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    for (let i = 0; i < 65; i++) particles.push(new Particle());

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 189, 189, ${0.1 * (1 - dist / 150)})`; 
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- 3. NAVIGATION ---
const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/40">
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-lg bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${THEME.teal}, ${THEME.purple})` }}>
        <Activity size={18} className="text-white" />
      </div>
      <span className="font-michroma text-sm tracking-widest uppercase text-white">Web3.Lab</span>
    </div>
    
    <div className="hidden md:flex gap-10 items-center">
      {["Projects", "Stack", "Contact"].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="relative text-slate-300 hover:text-white font-rajdhani font-semibold tracking-widest uppercase text-sm group transition-colors">
          {item}
          <span 
            className="absolute -bottom-6 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" 
            style={{ backgroundColor: THEME.teal, boxShadow: `0 0 10px ${THEME.teal}` }}
          />
        </a>
      ))}
      <button 
        className="px-6 py-2 rounded border font-azeret text-xs uppercase font-bold tracking-widest transition-all duration-300 hover:bg-white/5"
        style={{ borderColor: THEME.teal, color: THEME.teal }}
      >
        Connect
      </button>
    </div>
    <Menu className="md:hidden text-white" size={24} />
  </nav>
);

// --- 4. PROJECT CARD ---
const ProjectCard = ({ title, desc, tech, icon: Icon }: any) => (
  <motion.div
    whileHover={{ scale: 1.02, rotateY: 5, rotateX: 2 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
    className="group relative p-8 rounded-2xl border backdrop-blur-xl overflow-hidden cursor-pointer"
  >
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
      style={{ background: `linear-gradient(135deg, ${THEME.teal}, ${THEME.purple})` }}
    />
    
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10" style={{ color: THEME.teal }}>
          <Icon size={24} />
        </div>
        <ExternalLink size={18} className="text-slate-500 group-hover:text-white transition-colors" />
      </div>
      
      <h3 className="font-michroma text-xl text-white mb-4 tracking-tight">{title}</h3>
      <p className="font-rajdhani text-lg text-slate-400 mb-8 leading-relaxed font-light">{desc}</p>
      
      <div className="flex flex-wrap gap-2">
        {tech.map((t: string) => (
          <span key={t} className="px-3 py-1 rounded-full text-[10px] font-azeret border border-white/10 bg-white/5 text-slate-400 uppercase tracking-widest">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- 5. MAIN SHOWROOM ---
export default function Home() {
  const { scrollY } = useScroll();
  
  const yOuter = useTransform(scrollY, [0, 1000], [0, 250]);
  const yMiddle = useTransform(scrollY, [0, 1000], [0, -150]);
  const yInner = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <main className="min-h-screen text-white relative bg-[#030303] selection:bg-[#650fef]/30 overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <ParticleNetwork />
        
        {/* Ring 1: The Massive Purple Outer Ring */}
        <motion.div 
          style={{ 
            y: yOuter, 
            borderColor: `${THEME.purple}60`, 
            boxShadow: `0 0 60px ${THEME.purple}30`, 
            borderWidth: '2px' 
          }} 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border-dashed rounded-full pointer-events-none"
        />
        
        {/* Ring 2: The Sharp Teal Middle Ring */}
        <motion.div 
          style={{ 
            y: yMiddle, 
            borderColor: `${THEME.teal}70`, 
            boxShadow: `0 0 40px ${THEME.teal}30`, 
            borderWidth: '2px' 
          }} 
          animate={{ rotate: -360 }} 
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border-solid rounded-full pointer-events-none"
        />

        {/* Inner Core: Deep Purple Glow (Matches the outer ring, compliments the teal) */}
        <motion.div 
          style={{ y: yInner, backgroundColor: THEME.purple }} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none blur-[130px] opacity-[0.25]"
        />

        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center mt-12">
          {/* Status Label */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 mb-10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: THEME.green, boxShadow: `0 0 12px ${THEME.green}` }} />
            <span className="font-azeret text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
              System Online // Protocol 2.0
            </span>
          </motion.div>

          {/* The Snapping Entrance Text */}
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: "12px", y: 20 }} 
            animate={{ opacity: 1, letterSpacing: "-1px", y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-michroma text-5xl md:text-8xl leading-[1.1] mb-8 uppercase text-white"
          >
            Wealth <br />
            <span className="text-white drop-shadow-[0_0_20px_rgba(100,189,189,0.5)]">
              Redefined
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="font-rajdhani text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 tracking-wide font-light">
            Engineering high-fidelity decentralized interfaces for institutional data systems.
          </motion.p>
        </div>
      </section>

      {/* Project Grid */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-10 h-[1px]" style={{ backgroundColor: THEME.teal }} />
          <h2 className="font-michroma text-xl uppercase tracking-[0.2em] text-white">Project Mainnet</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ProjectCard 
            icon={Activity}
            title="CryptoIndex Live"
            desc="A real-time institutional data engine tracking major sector movements."
            tech={["Next.js", "Framer Motion", "Tailwind"]}
          />
          <ProjectCard 
            icon={Zap}
            title="Protocol Interface"
            desc="Custom Web3 component library designed for rapid dApp deployment."
            tech={["TypeScript", "React", "Obsidian UI"]}
          />
        </div>
      </section>
    </main>
  );
}