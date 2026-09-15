import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCellCoord } from '../game/gameEngine';

export const MoveHistory = ({ history }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-lg">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors"
      >
        <div className="flex items-center gap-2">
          <History size={15} className="text-neon-cyan" />
          <span>Move Sequence ({history.length})</span>
        </div>
        {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {!collapsed && (
        <div className="p-3 max-h-40 overflow-y-auto space-y-1.5 font-mono text-xs">
          {history.length === 0 ? (
            <div className="text-slate-500 text-center py-3 italic">Awaiting first move...</div>
          ) : (
            history.map((m, idx) => {
              const isLatest = idx === history.length - 1;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${
                    isLatest
                      ? 'bg-neon-cyan/15 border-neon-cyan/30 text-white font-bold'
                      : 'bg-white/5 border-transparent text-slate-400'
                  }`}
                >
                  <span className="text-[10px] text-slate-500">#{String(idx + 1).padStart(2, '0')}</span>
                  <div className="flex items-center gap-2">
                    <span className={m.symbol === 'X' ? 'text-neon-cyan' : 'text-purple-400'}>
                      {m.symbol}
                    </span>
                    <span>&rarr;</span>
                    <span className="text-white font-bold">{formatCellCoord(m.r, m.c)}</span>
                  </div>
                  {m.vanished ? (
                    <span className="text-[10px] text-red-400">
                      (Erased {formatCellCoord(m.vanished.r, m.vanished.c)})
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-600">Buffered</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};