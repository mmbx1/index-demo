"use client"; // Required for Framer Motion in Next.js App Router

import { motion } from "framer-motion";

interface HoloCardProps {
  title: string;
  value: string;
  trend: string;
}

export default function HoloCard({ title, value, trend }: HoloCardProps) {
  return (
    <motion.div
      // Framer Motion Hover Effects
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      // Tailwind Glassmorphism & Holographic Styling
      className="relative p-6 rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 bg-gradient-to-br from-white/5 to-white/0 shadow-xl group cursor-pointer"
    >
      {/* Holographic Glare Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-blue-400 to-purple-500 transition-opacity duration-500 ease-in-out pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className={`text-sm font-semibold ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </p>
      </div>
    </motion.div>
  );
}