import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-white tracking-wider">ABOUT THE PROTOCOL</h2>
        <p className="text-xs text-slate-400 mt-1">A departure from solved classic grids</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-sm text-slate-300 leading-relaxed">
        <div>
          <h3 className="text-lg font-bold text-neon-cyan mb-2">What is FIFO Tic-Tac-Toe?</h3>
          <p>
            Standard Tic-Tac-Toe is mathematically solved: two competent players will inevitably end in a draw. FIFO Tic-Tac-Toe breaks this limitation by enforcing a strict piece buffer queue.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-purple-400 mb-2">Why FIFO?</h3>
          <p>
            By constraining piece capacity to the board dimension, your first move expires the moment your buffer reaches capacity. The game cannot end in a stalemate. Every move requires you to evaluate not only the immediate cell you claim, but which past asset will be erased from the grid.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Cpu size={14} className="text-neon-cyan" />
            Built with React & Vite
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-purple-400" />
            Pure Client-Side Architecture
          </span>
        </div>
      </div>
    </div>
  );
};