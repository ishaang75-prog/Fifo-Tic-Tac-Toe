import React from 'react';
import { GameCell } from './GameCell';

export const GameBoard = ({
  board,
  boardSize,
  onCellClick,
  disabled,
  activePlayerSymbol,
  currentExpiringPos,
  opponentExpiringPos,
  winningLine
}) => {
  const isCellWinning = (r, c) => {
    if (!winningLine) return false;
    return winningLine.some(pos => pos.r === r && pos.c === c);
  };

  const isCellCurrentExpiring = (r, c) => {
    return currentExpiringPos && currentExpiringPos.r === r && currentExpiringPos.c === c;
  };

  const isCellOpponentExpiring = (r, c) => {
    return opponentExpiringPos && opponentExpiringPos.r === r && opponentExpiringPos.c === c;
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`
  };

  return (
    <div className="w-full max-w-[480px] aspect-square mx-auto glass-panel p-3.5 sm:p-5 rounded-3xl border border-white/10 shadow-2xl relative">
      <div className="grid gap-2.5 sm:gap-3 w-full h-full" style={gridStyle}>
        {board.map((row, r) =>
          row.map((val, c) => (
            <GameCell
              key={`${r}-${c}`}
              r={r}
              c={c}
              value={val}
              disabled={disabled}
              activePlayerSymbol={activePlayerSymbol}
              isWinningCell={isCellWinning(r, c)}
              isCurrentExpiring={isCellCurrentExpiring(r, c)}
              isOpponentExpiring={isCellOpponentExpiring(r, c)}
              onClick={() => onCellClick(r, c)}
            />
          ))
        )}
      </div>
    </div>
  );
};