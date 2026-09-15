import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GameCell = ({
  r,
  c,
  value,
  isCurrentExpiring,
  isOpponentExpiring,
  isWinningCell,
  onClick,
  disabled,
  activePlayerSymbol
}) => {
  const [hovered, setHovered] = useState(false);

  let stateBorder = 'border-white/10 hover:border-white/25';
  let bgClass = 'bg-[#0d0e18]/80 hover:bg-[#131524]';

  if (isWinningCell) {
    stateBorder = 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]';
    bgClass = 'bg-yellow-400/20';
  } else if (isCurrentExpiring) {
    stateBorder = 'border-red-500 shadow-[0_0_18px_rgba(239,68,68,0.4)] animate-pulse';
    bgClass = 'bg-red-950/30';
  } else if (isOpponentExpiring) {
    stateBorder = 'border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]';
    bgClass = 'bg-purple-950/20';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center border ${stateBorder} ${bgClass} transition-all duration-200 outline-none select-none`}
    >
      {isCurrentExpiring && (
        <span className="absolute top-1.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-red-500 text-white shadow-sm">
          EXPIRING
        </span>
      )}
      {isOpponentExpiring && !isCurrentExpiring && (
        <span className="absolute top-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-purple-600/80 text-purple-200">
          NEXT OUT
        </span>
      )}

      <AnimatePresence mode="wait">
        {value ? (
          <motion.span
            key={value}
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, filter: 'blur(4px)' }}
            transition={{ type: 'spring', damping: 15, stiffness: 250 }}
            className={`font-black select-none font-mono ${
              value === 'X' ? 'text-neon-cyan' : 'text-purple-400'
            } text-3xl sm:text-5xl lg:text-6xl drop-shadow-[0_0_15px_currentColor]`}
          >
            {value}
          </motion.span>
        ) : hovered && !disabled ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            className={`font-black select-none font-mono text-3xl sm:text-5xl lg:text-6xl ${
              activePlayerSymbol === 'X' ? 'text-neon-cyan' : 'text-purple-400'
            }`}
          >
            {activePlayerSymbol}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
};