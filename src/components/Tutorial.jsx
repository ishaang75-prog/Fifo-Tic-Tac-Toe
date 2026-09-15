import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Tutorial = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. PLACE YOUR MARK",
      desc: "Place your X or O on any empty cell, exactly like classic Tic-Tac-Toe.",
      boardPreview: [
        ['X', null, null],
        [null, null, null],
        [null, null, null]
      ]
    },
    {
      title: "2. BUFFER CAP REACHED",
      desc: "Once you hit your maximum piece cap (for example, 3 pieces on a 3x3 board), your oldest mark enters the critical EXPIRING state.",
      boardPreview: [
        ['X', 'O', null],
        [null, 'X', 'O'],
        [null, null, 'X']
      ]
    },
    {
      title: "3. FIFO CYCLE ROTATION",
      desc: "When you place a 4th mark, your 1st mark vanishes automatically! The board continuously shifts without ever getting stuck in an inevitable draw.",
      boardPreview: [
        [null, 'O', null],
        [null, 'X', 'O'],
        ['X', null, 'X']
      ]
    },
    {
      title: "4. REUSING EXPIRING CELLS",
      desc: "You can place your new piece directly onto your own expiring cell, recycling the position in the exact same turn.",
      boardPreview: [
        ['X', null, 'O'],
        [null, 'O', null],
        ['X', null, 'X']
      ]
    },
    {
      title: "5. COMPLETE THE LINE",
      desc: "Occupy an unbroken row, column, or diagonal at the end of your turn to claim victory!",
      boardPreview: [
        ['X', 'X', 'X'],
        ['O', 'O', null],
        [null, null, null]
      ]
    }
  ];

  const current = steps[step];

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <h3 className="text-xl font-extrabold text-white">{current.title}</h3>
        <span className="text-xs font-mono font-bold text-neon-cyan">
          Step {step + 1} of {steps.length}
        </span>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        {current.desc}
      </p>

      <div className="w-48 h-48 mx-auto grid grid-cols-3 gap-2.5 p-3 rounded-2xl glass-panel border border-white/10 mb-8">
        {current.boardPreview.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className="rounded-xl border border-white/10 bg-[#0c0d16] flex items-center justify-center font-mono font-black text-xl text-white"
            >
              {val === 'X' && <span className="text-neon-cyan">X</span>}
              {val === 'O' && <span className="text-purple-400">O</span>}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            soundFx.click();
            setStep(Math.max(0, step - 1));
          }}
          disabled={step === 0}
          className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1 text-slate-300"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? 'w-6 bg-neon-cyan' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            soundFx.click();
            setStep(Math.min(steps.length - 1, step + 1));
          }}
          disabled={step === steps.length - 1}
          className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1 text-slate-300"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};