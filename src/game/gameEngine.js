export const calculatePieceCap = (boardSize) => {
  const min = boardSize;
  const max = Math.floor((boardSize * boardSize) / 2);
  return { min, max, defaultCap: min };
};

export const formatCellCoord = (r, c) => {
  const colName = String.fromCharCode(65 + c);
  return `${colName}${r + 1}`;
};