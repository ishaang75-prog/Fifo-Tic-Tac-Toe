import React from 'react';
import { User, Bot, AlertCircle } from 'lucide-react';

export const PlayerPanel = ({
  symbol,
  name,
  isAI,
  isCurrentTurn,
  score,
  moves,
  pieceCap,
}) => {
  const isExpiringSoon = moves.length >= pieceCap;
  const oldestPos = isExpiringSoon ? moves[0] : null;

  return (
    <div
      className={`relative w-full rounded-2xl p-4 transition-all duration-300 ${
        isCurrentTurn
          ? 'glass-panel-glow border-neon-cyan/40 scale-[1.02]'
          : 'glass-panel border-white/10 opacity-75'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl border ${
              symbol === 'X'
                ? 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30'
                : 'bg-purple-600/20 text-purple-300 border-purple-500/30'
            }`}
          >
            {symbol}
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wide text-white flex items-center gap-1.5">
              {name}
              {isAI ? <Bot size={14} className="text-purple-400" /> : <User size={14} className="text-neon-cyan" />}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Score: <span className="text-white font-bold">{score}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Queue</div>
          <div className="text-sm font-black font-mono">
            <span className={moves.length >= pieceCap ? 'text-red-400' : 'text-white'}>
              {moves.length}
            </span>
            <span className="text-slate-600"> / </span>
            <span className="text-slate-400">{pieceCap}</span>
          </div>
        </div>
      </div>

      {isExpiringSoon && oldestPos && (
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-2 text-[11px] text-red-400 font-mono font-medium">
          <AlertCircle size={14} className="animate-pulse flex-shrink-0" />
          <span>
            Expiring next: <strong className="text-white">({oldestPos.r + 1}, {oldestPos.c + 1})</strong>
          </span>
        </div>
      )}
    </div>
  );
};