import { isValidMove, applyMoveWithFIFO } from './fifoLogic';
import { checkWin } from './winDetection';

export const getAIMove = (board, boardSize, pieceCap, aiMoves, humanMoves, difficulty) => {
  const validMoves = [];
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      if (isValidMove(board, boardSize, r, c, aiMoves, pieceCap)) {
        validMoves.push({ r, c });
      }
    }
  }

  if (validMoves.length === 0) return null;

  if (difficulty === 'Easy') {
    if (Math.random() < 0.7) {
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    }
  }

  // 1. Can AI win immediately?
  for (const move of validMoves) {
    const nextState = applyMoveWithFIFO(board, move.r, move.c, 'O', aiMoves, pieceCap);
    if (checkWin(nextState.board, boardSize, 'O')) {
      return move;
    }
  }

  // 2. Can Human win immediately? Block them!
  for (const move of validMoves) {
    if (isValidMove(board, boardSize, move.r, move.c, humanMoves, pieceCap)) {
      const nextHumanState = applyMoveWithFIFO(board, move.r, move.c, 'X', humanMoves, pieceCap);
      if (checkWin(nextHumanState.board, boardSize, 'X')) {
        return move;
      }
    }
  }

  if (difficulty === 'Medium') {
    const center = Math.floor(boardSize / 2);
    if (validMoves.some(m => m.r === center && m.c === center)) {
      return { r: center, c: center };
    }
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  // HARD MODE
  let bestScore = -Infinity;
  let bestMove = validMoves[0];

  for (const move of validMoves) {
    let score = 0;
    const center = Math.floor(boardSize / 2);

    if (move.r === center && move.c === center) score += 6;
    if ((move.r === 0 || move.r === boardSize - 1) && (move.c === 0 || move.c === boardSize - 1)) {
      score += 3;
    }

    const simAi = applyMoveWithFIFO(board, move.r, move.c, 'O', aiMoves, pieceCap);

    if (aiMoves.length >= pieceCap) {
      const expiring = aiMoves[0];
      if (expiring.r === center && expiring.c === center) {
        score -= 2;
      }
    }

    for (let r = 0; r < boardSize; r++) {
      const rowVals = simAi.board[r];
      const aiCount = rowVals.filter(v => v === 'O').length;
      const humanCount = rowVals.filter(v => v === 'X').length;
      if (humanCount === 0 && aiCount > 1) score += aiCount * 2;
    }

    let dangerousMove = false;
    for (let hr = 0; hr < boardSize; hr++) {
      for (let hc = 0; hc < boardSize; hc++) {
        if (isValidMove(simAi.board, boardSize, hr, hc, humanMoves, pieceCap)) {
          const simHuman = applyMoveWithFIFO(simAi.board, hr, hc, 'X', humanMoves, pieceCap);
          if (checkWin(simHuman.board, boardSize, 'X')) {
            dangerousMove = true;
            break;
          }
        }
      }
      if (dangerousMove) break;
    }

    if (dangerousMove) score -= 15;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};