import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0b12] py-8 px-4 text-center text-xs text-slate-500 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <Cpu size={16} className="text-neon-cyan" />
          <span>FIFO Tic-Tac-Toe &bull; Modern Web Port</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <ShieldCheck size={14} className="text-purple-400" />
            100% Client-Side Simulation
          </span>
          <span>Zero Server Latency</span>
        </div>
      </div>
    </footer>
  );
};