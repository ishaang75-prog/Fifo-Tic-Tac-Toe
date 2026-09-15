const STATS_KEY = 'fifo_ttt_stats_v1';

const defaultStats = {
  totalMatches: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  currentStreak: 0,
  bestStreak: 0,
  pvpMatches: 0,
  aiMatches: 0,
  favoriteBoard: 3,
  aiDifficultyUsed: { Easy: 0, Medium: 0, Hard: 0 },
  history: []
};

export const getStats = () => {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : defaultStats;
  } catch {
    return defaultStats;
  }
};

export const updateStatsOnGameOver = ({ winner, mode, aiDifficulty, boardSize }) => {
  const current = getStats();
  const next = { ...current };

  next.totalMatches += 1;
  if (mode === 'ai') {
    next.aiMatches += 1;
    if (aiDifficulty) {
      next.aiDifficultyUsed[aiDifficulty] = (next.aiDifficultyUsed[aiDifficulty] || 0) + 1;
    }
    if (winner === 'X') {
      next.wins += 1;
      next.currentStreak += 1;
      if (next.currentStreak > next.bestStreak) {
        next.bestStreak = next.currentStreak;
      }
    } else if (winner === 'O') {
      next.losses += 1;
      next.currentStreak = 0;
    } else {
      next.draws += 1;
    }
  } else {
    next.pvpMatches += 1;
    if (winner === 'X') next.wins += 1;
    else if (winner === 'O') next.losses += 1;
  }

  next.favoriteBoard = boardSize;
  
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage limits
  }

  return next;
};