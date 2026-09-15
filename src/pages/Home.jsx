import React from 'react';
import { Hero } from '../components/Hero';
import { Layers, Cpu, Users, RotateCcw, BarChart3, Smartphone } from 'lucide-react';

export const Home = ({ setActivePage }) => {
  const features = [
    { icon: RotateCcw, title: "FIFO Strategy", desc: "No permanent board states. Old pieces disappear when the queue capacity overflows." },
    { icon: Layers, title: "Dynamic Boards", desc: "Play across 3×3, 4×4, and 5×5 grids with customizable queue capacities." },
    { icon: Cpu, title: "Tactical AI", desc: "Three difficulty modes: casual mistakes up to lookahead FIFO evaluation." },
    { icon: Users, title: "PvP Local Match", desc: "Pass and play with local 2-player support on mobile or desktop." },
    { icon: BarChart3, title: "Persistent Stats", desc: "Keep track of win streaks, historical records, and win rates using local storage." },
    { icon: Smartphone, title: "Ultra Responsive", desc: "Custom designed to give an app-like feeling across phones, tablets, and ultrawides." }
  ];

  return (
    <div className="w-full space-y-16 pb-12">
      <Hero 
        onPlayClick={() => setActivePage('play')} 
        onHowToPlayClick={() => setActivePage('how-to-play')} 
      />

      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-white">SYSTEM CAPABILITIES</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Designed for speed, tactical memory, and deep competitive play</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-neon-cyan/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan mb-4 group-hover:scale-110 group-hover:bg-neon-cyan/15 transition-all">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};