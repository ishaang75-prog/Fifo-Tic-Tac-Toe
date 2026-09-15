import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { soundFx } from '../utils/audio';

export const Hero = ({ onPlayClick, onHowToPlayClick }) => {
  const [board, setBoard] = useState([
    ['X', null, 'O'],
    [null, 'X', null],
    ['O', null, null]
  ]);

  useEffect(() => {
    const cycleMoves = [
      { r: 2, c: 2, sym: 'X' },
      { r: 1, c: 0, sym: 'O' },
      { r: 0, c: 1, sym: 'X' },
      { r: 2, c: 0, sym: 'O' }
    ];

    let moveIdx = 0;
    const interval = setInterval(() => {
      const nextMove = cycleMoves[moveIdx % cycleMoves.length];
      setBoard(prev => {
        const copy = prev.map(r => [...r]);
        copy[nextMove.r][nextMove.c] = nextMove.sym;
        return copy;
      });
      moveIdx++;
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-12 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} />
            Non-Deterministic Board Mechanics
          </div>
          
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.1]">
            THE BOARD FORGETS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-purple-400 to-neon-pink">
              YOU DON'T.
            </span>
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-slate-400 text-sm sm:text-base leading-relaxed">
            Classic Tic-Tac-Toe reimagined with First-In First-Out strategy. Pieces expire as your capacity is reached—no permanent draws, pure memory control, and infinite dynamic reversals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => {
                soundFx.click();
                onPlayClick();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-neon-cyan via-purple-600 to-neon-pink text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2"
            >
              <Play size={16} fill="black" />
              Play Now
            </button>
            <button
              onClick={() => {
                soundFx.click();
                onHowToPlayClick();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider glass-panel hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={16} />
              Read Codex
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm sm:max-w-md mx-auto">
          <div className="relative p-6 glass-panel-glow rounded-3xl border border-neon-cyan/30">
            <div className="absolute top-3 left-4 text-[10px] font-mono text-neon-cyan tracking-widest uppercase">
              // FIFO ROTATION BUFFER DEMO
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-4 aspect-square">
              {board.map((row, r) =>
                row.map((val, c) => (
                  <div
                    key={`${r}-${c}`}
                    className="rounded-2xl border border-white/10 bg-[#0d0f19] flex items-center justify-center text-3xl font-black font-mono"
                  >
                    {val && (
                      <motion.span
                        key={`${r}-${c}-${val}`}
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={val === 'X' ? 'text-neon-cyan' : 'text-purple-400'}
                      >
                        {val}
                      </motion.span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};