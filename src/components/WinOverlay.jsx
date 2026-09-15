import React, { useEffect } from 'react';
import { Trophy, RotateCcw, SlidersHorizontal, Home, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export const WinOverlay = ({
  winnerData,
  boardSize = 3,
  pieceCap = 3,
  movesCount = 0,
  onPlayAgain,
  onNewMatch,
  onGoHome,
  stats
}) => {
  const winner = winnerData?.symbol || 'X';

  useEffect(() => {
    try {
      soundFx.win();
    } catch (e) {
      // Audio fallback
    }

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Canvas fallback
    }
  }, []);

  const formatCoord = (r, c) => {
    const colName = String.fromCharCode(65 + c);
    return `${colName}${r + 1}`;
  };

  const getWinDescription = () => {
    if (!winnerData) return 'Complete Line Connected';
    switch (winnerData.type) {
      case 'row':
        return `Horizontal Row ${(winnerData.index ?? 0) + 1}`;
      case 'col':
        return `Vertical Column ${String.fromCharCode(65 + (winnerData.index ?? 0))}`;
      case 'diag1':
        return 'Main Diagonal (Top-Left ➔ Bottom-Right)';
      case 'diag2':
        return 'Anti-Diagonal (Top-Right ➔ Bottom-Left)';
      default:
        return 'Aligned Pattern';
    }
  };

  const isWinningCell = (r, c) => {
    if (!winnerData?.line) return false;
    return winnerData.line.some(cell => cell.r === r && cell.c === c);
  };

  const formattedLine = Array.isArray(winnerData?.line)
    ? winnerData.line.map(pt => formatCoord(pt.r, pt.c)).join(' ➔ ')
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md glass-panel-glow rounded-3xl p-6 text-center border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-neon-cyan/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

        {/* Victory Header Badge */}
        <div className="w-14 h-14 rounded-2xl mx-auto mb-3 bg-gradient-to-tr from-yellow-500 to-amber-300 p-0.5 shadow-lg shadow-yellow-500/30">
          <div className="w-full h-full bg-[#0e101a] rounded-[14px] flex items-center justify-center text-yellow-400">
            <Trophy size={28} />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase">VICTORY</h2>
        <div className="mt-1 text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-purple-400">
          PLAYER {winner} CONQUERED THE PROTOCOL
        </div>

        {/* Dynamic Pattern Board Preview */}
        <div className="my-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-neon-cyan uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Winning Pattern</span>
            </div>
            <span className="font-mono text-yellow-400 font-bold text-[11px]">{getWinDescription()}</span>
          </div>

          {/* Interactive Pattern Grid */}
          <div 
            className="grid gap-1.5 w-36 h-36 mx-auto p-2 bg-[#090a12] rounded-xl border border-white/10"
            style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: boardSize }).map((_, r) =>
              Array.from({ length: boardSize }).map((_, c) => {
                const won = isWinningCell(r, c);
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`rounded-lg flex items-center justify-center font-mono font-black text-sm transition-all duration-300 ${
                      won
                        ? 'bg-yellow-400/25 border border-yellow-400 text-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.6)] scale-105'
                        : 'bg-white/5 border border-white/5 text-slate-700'
                    }`}
                  >
                    {won ? winner : '·'}
                  </div>
                );
              })
            )}
          </div>

          {/* Connected Coordinates Chain */}
          {formattedLine && (
            <div className="text-[11px] font-mono text-slate-300 bg-black/40 py-1.5 px-2 rounded-lg border border-white/5 flex items-center justify-center gap-2">
              <span className="text-slate-500">Vector:</span>
              <span className="text-yellow-400 font-bold">{formattedLine}</span>
            </div>
          )}

          {/* Match Telemetry */}
          <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] text-slate-400 font-mono text-center">
            <div>
              <span className="text-slate-500 block uppercase text-[9px]">Grid</span>
              <strong className="text-white">{boardSize}×{boardSize}</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[9px]">Capacity</span>
              <strong className="text-white">{pieceCap}</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[9px]">Turns</span>
              <strong className="text-white">{movesCount}</strong>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2">
          <button
            onClick={() => {
              soundFx.click();
              if (onPlayAgain) onPlayAgain();
            }}
            className="w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-neon-cyan to-purple-600 text-black shadow-lg shadow-neon-cyan/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={15} />
            Rematch (Play Again)
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                soundFx.click();
                if (onNewMatch) onNewMatch();
              }}
              className="py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal size={14} />
              Reconfigure
            </button>
            <button
              onClick={() => {
                soundFx.click();
                if (onGoHome) onGoHome();
              }}
              className="py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Home size={14} />
              Exit Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};