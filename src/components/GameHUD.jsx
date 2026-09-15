import React from 'react';
import { RotateCcw, SlidersHorizontal, Loader2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const GameHUD = ({
  currentTurnSymbol,
  isAIThinking,
  round,
  boardSize,
  pieceCap,
  mode,
  difficulty,
  onResetRound,
  onChangeConfig
}) => {
  return (
    <div className="w-full glass-panel p-3.5 sm:p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">TURN</span>
          {isAIThinking ? (
            <div className="flex items-center gap-1.5 text-xs text-purple-400 font-bold font-mono">
              <Loader2 size={14} className="animate-spin" />
              <span>AI CALC...</span>
            </div>
          ) : (
            <span
              className={`text-sm font-black font-mono ${
                currentTurnSymbol === 'X' ? 'text-neon-cyan' : 'text-purple-400'
              }`}
            >
              PLAYER {currentTurnSymbol}
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/5">
            Round {round}
          </span>
          <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/5">
            {boardSize}×{boardSize} &bull; Cap {pieceCap}
          </span>
          {mode === 'ai' && (
            <span className="px-2 py-1 bg-purple-950/40 text-purple-300 rounded-lg border border-purple-500/20 font-sans">
              AI: {difficulty}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            soundFx.click();
            onResetRound();
          }}
          title="Restart Current Round"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all"
        >
          <RotateCcw size={14} />
          <span className="hidden xs:inline">Reset</span>
        </button>

        <button
          onClick={() => {
            soundFx.click();
            onChangeConfig();
          }}
          title="Change Match Settings"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all"
        >
          <SlidersHorizontal size={14} />
          <span className="hidden xs:inline">Config</span>
        </button>
      </div>
    </div>
  );
};