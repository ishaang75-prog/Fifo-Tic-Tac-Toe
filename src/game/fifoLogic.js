export const createInitialBoard = (size) => {
  return Array.from({ length: size }, () => Array(size).fill(null));
};

export const getOldestPiece = (playerMoves, pieceCap) => {
  if (playerMoves.length >= pieceCap) {
    return playerMoves[0];
  }
  return null;
};

export const isValidMove = (board, boardSize, r, c, playerMoves, pieceCap) => {
  if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) {
    return false;
  }
  const currentVal = board[r][c];
  if (!currentVal) return true;

  const oldest = getOldestPiece(playerMoves, pieceCap);
  if (oldest && oldest.r === r && oldest.c === c) {
    return true;
  }
  return false;
};

export const applyMoveWithFIFO = (board, r, c, symbol, playerMoves, pieceCap) => {
  const newBoard = board.map(row => [...row]);
  const newMoves = [...playerMoves];
  let pieceVanished = null;

  if (newMoves.length >= pieceCap) {
    const oldest = newMoves.shift();
    newBoard[oldest.r][oldest.c] = null;
    pieceVanished = oldest;
  }

  newBoard[r][c] = symbol;
  newMoves.push({ r, c });

  return {
    board: newBoard,
    moves: newMoves,
    pieceVanished
  };
};