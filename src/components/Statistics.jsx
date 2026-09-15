import React from 'react';
import { Trophy, Flame, Target, Cpu, Users } from 'lucide-react';
import { getStats } from '../utils/storage';

export const Statistics = () => {
  const stats = getStats();
  const winRate = stats.totalMatches > 0 ? Math.round((stats.wins / stats.totalMatches) * 100) : 0;

  const statCards = [
    { label: 'Total Matches', val: stats.totalMatches, icon: Target, col: 'text-neon-cyan' },
    { label: 'Total Victories', val: stats.wins, icon: Trophy, col: 'text-yellow-400' },
    { label: 'Win Ratio', val: `${winRate}%`, icon: Target, col: 'text-green-400' },
    { label: 'Current Streak', val: stats.currentStreak, icon: Flame, col: 'text-neon-pink' },
    { label: 'Best Streak', val: stats.bestStreak, icon: Flame, col: 'text-purple-400' },
    { label: 'AI Matches', val: stats.aiMatches, icon: Cpu, col: 'text-blue-400' },
    { label: 'PvP Matches', val: stats.pvpMatches, icon: Users, col: 'text-slate-300' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-black tracking-wider text-white">TACTICAL STATS</h2>
        <p className="text-xs text-slate-400 mt-1">Stored locally in your browser session</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{card.label}</span>
                <Icon size={16} className={card.col} />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {card.val}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};