export const checkWin = (board, boardSize, symbol) => {
  if (!board || !symbol) return null;

  // 1. Rows
  for (let r = 0; r < boardSize; r++) {
    let win = true;
    const winningCells = [];
    for (let c = 0; c < boardSize; c++) {
      if (board[r][c] === symbol) {
        winningCells.push({ r, c });
      } else {
        win = false;
        break;
      }
    }
    if (win) return { symbol, line: winningCells, type: 'row', index: r };
  }

  // 2. Columns
  for (let c = 0; c < boardSize; c++) {
    let win = true;
    const winningCells = [];
    for (let r = 0; r < boardSize; r++) {
      if (board[r][c] === symbol) {
        winningCells.push({ r, c });
      } else {
        win = false;
        break;
      }
    }
    if (win) return { symbol, line: winningCells, type: 'col', index: c };
  }

  // 3. Main Diagonal (\)
  let diag1Win = true;
  const diag1Cells = [];
  for (let i = 0; i < boardSize; i++) {
    if (board[i][i] === symbol) {
      diag1Cells.push({ r: i, c: i });
    } else {
      diag1Win = false;
      break;
    }
  }
  if (diag1Win) return { symbol, line: diag1Cells, type: 'diag1' };

  // 4. Anti-Diagonal (/)
  let diag2Win = true;
  const diag2Cells = [];
  for (let i = 0; i < boardSize; i++) {
    const r = i;
    const c = boardSize - 1 - i;
    if (board[r][c] === symbol) {
      diag2Cells.push({ r, c });
    } else {
      diag2Win = false;
      break;
    }
  }
  if (diag2Win) return { symbol, line: diag2Cells, type: 'diag2' };

  return null;
};