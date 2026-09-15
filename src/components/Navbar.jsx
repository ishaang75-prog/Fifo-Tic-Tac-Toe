import React, { useState } from 'react';
import { Gamepad2, Volume2, VolumeX, Menu, X, Trophy, BookOpen, Info, Play } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Navbar = ({ activePage, setActivePage, soundEnabled, setSoundEnabled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setMuted(!next);
    if (next) soundFx.click();
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Gamepad2 },
    { id: 'play', label: 'Play', icon: Play },
    { id: 'how-to-play', label: 'How to Play', icon: BookOpen },
    { id: 'stats', label: 'Stats', icon: Trophy },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          onClick={() => { setActivePage('home'); soundFx.click(); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan via-purple-600 to-neon-pink p-0.5 shadow-lg shadow-neon-cyan/20 group-hover:shadow-neon-cyan/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center">
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-lg">
                F
              </span>
            </div>
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-base lg:text-lg flex items-center gap-1.5">
              <span className="text-white">FIFO</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-purple-400">TIC-TAC-TOE</span>
            </div>
            <div className="text-[10px] tracking-widest text-slate-400 uppercase -mt-0.5">Strategy Protocol</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); soundFx.click(); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive 
                    ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,242,254,0.15)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="p-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
          >
            {soundEnabled ? <Volume2 size={18} className="text-neon-cyan" /> : <VolumeX size={18} className="text-slate-500" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { 
                  setActivePage(item.id); 
                  setMobileMenuOpen(false); 
                  soundFx.click(); 
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};