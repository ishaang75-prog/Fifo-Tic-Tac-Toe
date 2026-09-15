import React from 'react';
import { Play, Users, Bot, Zap, Shield, Sparkles } from 'lucide-react';
import { calculatePieceCap } from '../game/gameEngine';
import { soundFx } from '../utils/audio';

export const MatchConfig = ({ config, setConfig, onStartMatch }) => {
  const { min, max } = calculatePieceCap(config.boardSize);

  const handleSizeChange = (size) => {
    soundFx.click();
    const newCapRange = calculatePieceCap(size);
    setConfig(prev => ({
      ...prev,
      boardSize: size,
      pieceCap: Math.min(Math.max(prev.pieceCap, newCapRange.min), newCapRange.max)
    }));
  };

  const handleModeChange = (mode) => {
    soundFx.click();
    setConfig(prev => ({ ...prev, mode }));
  };

  const handleDiffChange = (aiDifficulty) => {
    soundFx.click();
    setConfig(prev => ({ ...prev, aiDifficulty }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-cyan/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-white">MATCH CONFIGURATION</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Configure your grid dimensions, FIFO buffer size, and opponent profile</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
            Board Dimension
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[3, 4, 5].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeChange(size)}
                className={`py-3.5 px-4 rounded-2xl border text-sm font-bold tracking-wide transition-all ${
                  config.boardSize === size
                    ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                    : 'glass-panel border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {size} × {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              FIFO Piece Buffer (Queue Cap)
            </label>
            <span className="text-xs font-extrabold text-neon-cyan bg-neon-cyan/10 px-2.5 py-1 rounded-lg border border-neon-cyan/20">
              {config.pieceCap} Pieces
            </span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={config.pieceCap}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setConfig(prev => ({ ...prev, pieceCap: val }));
            }}
            className="w-full accent-neon-cyan cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
            <span>Min ({min})</span>
            <span>Max ({max})</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
            Game Mode
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleModeChange('pvp')}
              className={`py-3.5 px-4 rounded-2xl border flex items-center justify-center gap-2.5 text-sm font-bold tracking-wide transition-all ${
                config.mode === 'pvp'
                  ? 'bg-purple-600/25 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(157,78,221,0.25)]'
                  : 'glass-panel border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <Users size={18} />
              Pass & Play
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('ai')}
              className={`py-3.5 px-4 rounded-2xl border flex items-center justify-center gap-2.5 text-sm font-bold tracking-wide transition-all ${
                config.mode === 'ai'
                  ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                  : 'glass-panel border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <Bot size={18} />
              Vs AI
            </button>
          </div>
        </div>

        {config.mode === 'ai' && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              AI Strategy Core
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { level: 'Easy', icon: Shield },
                { level: 'Medium', icon: Zap },
                { level: 'Hard', icon: Sparkles },
              ].map(({ level, icon: Icon }) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleDiffChange(level)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    config.aiDifficulty === level
                      ? 'bg-white/10 border-neon-cyan text-white shadow-md'
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            soundFx.click();
            onStartMatch();
          }}
          className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-neon-cyan via-purple-600 to-neon-pink hover:opacity-95 active:scale-[0.99] transition-all shadow-[0_0_30px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2.5 text-black"
        >
          <Play size={18} fill="black" />
          Engage Match
        </button>
      </div>
    </div>
  );
};