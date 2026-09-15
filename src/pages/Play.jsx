import React, { useState, useEffect } from 'react';
import { MatchConfig } from '../components/MatchConfig';
import { GameBoard } from '../components/GameBoard';
import { GameHUD } from '../components/GameHUD';
import { PlayerPanel } from '../components/PlayerPanel';
import { MoveHistory } from '../components/MoveHistory';
import { WinOverlay } from '../components/WinOverlay';
import { createInitialBoard, isValidMove, applyMoveWithFIFO, getOldestPiece } from '../game/fifoLogic';
import { checkWin } from '../game/winDetection';
import { getAIMove } from '../game/ai';
import { updateStatsOnGameOver, getStats } from '../utils/storage';
import { soundFx } from '../utils/audio';

export const Play = ({ onGoHome }) => {
  const [inGame, setInGame] = useState(false);
  const [config, setConfig] = useState({
    boardSize: 3,
    pieceCap: 3,
    mode: 'ai',
    aiDifficulty: 'Medium'
  });

  const [board, setBoard] = useState([]);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [turn, setTurn] = useState('X');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [history, setHistory] = useState([]);
  const [winnerData, setWinnerData] = useState(null);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const initMatch = (newRound = false) => {
    setBoard(createInitialBoard(config.boardSize));
    setXMoves([]);
    setOMoves([]);
    setTurn('X');
    setWinnerData(null);
    setHistory([]);
    setIsAIThinking(false);
    if (!newRound) {
      setRound(1);
      setScore({ X: 0, O: 0 });
    }
  };

  const handleStartMatch = () => {
    initMatch(false);
    setInGame(true);
  };

  const handleCellClick = (r, c) => {
    if (winnerData || isAIThinking) return;
    if (config.mode === 'ai' && turn === 'O') return;

    const currentMoves = turn === 'X' ? xMoves : oMoves;
    if (!isValidMove(board, config.boardSize, r, c, currentMoves, config.pieceCap)) {
      soundFx.invalid();
      return;
    }

    executeMove(r, c, turn);
  };

  const executeMove = (r, c, symbol) => {
    const currentMoves = symbol === 'X' ? xMoves : oMoves;
    const result = applyMoveWithFIFO(board, r, c, symbol, currentMoves, config.pieceCap);

    if (result.pieceVanished) {
      soundFx.vanish();
    } else {
      soundFx.placePiece(symbol === 'X');
    }

    setBoard(result.board);
    if (symbol === 'X') {
      setXMoves(result.moves);
    } else {
      setOMoves(result.moves);
    }

    setHistory(prev => [...prev, {
      symbol,
      r,
      c,
      vanished: result.pieceVanished
    }]);

    const winResult = checkWin(result.board, config.boardSize, symbol);
    if (winResult) {
      setWinnerData(winResult);
      setScore(prev => ({ ...prev, [symbol]: prev[symbol] + 1 }));
      try {
        updateStatsOnGameOver({
          winner: symbol,
          mode: config.mode,
          aiDifficulty: config.aiDifficulty,
          boardSize: config.boardSize
        });
      } catch (e) {
        // storage fallback
      }
      return;
    }

    setTurn(symbol === 'X' ? 'O' : 'X');
  };

  useEffect(() => {
    if (!inGame || winnerData || config.mode !== 'ai' || turn !== 'O') return;

    setIsAIThinking(true);
    const timer = setTimeout(() => {
      const aiChosenMove = getAIMove(
        board,
        config.boardSize,
        config.pieceCap,
        oMoves,
        xMoves,
        config.aiDifficulty
      );

      if (aiChosenMove) {
        executeMove(aiChosenMove.r, aiChosenMove.c, 'O');
      }
      setIsAIThinking(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [turn, inGame, winnerData]);

  if (!inGame) {
    return (
      <div className="py-8 px-4">
        <MatchConfig
          config={config}
          setConfig={setConfig}
          onStartMatch={handleStartMatch}
        />
      </div>
    );
  }

  const currentExpiring = turn === 'X'
    ? getOldestPiece(xMoves, config.pieceCap)
    : getOldestPiece(oMoves, config.pieceCap);

  const opponentExpiring = turn === 'X'
    ? getOldestPiece(oMoves, config.pieceCap)
    : getOldestPiece(xMoves, config.pieceCap);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <GameHUD
        currentTurnSymbol={turn}
        isAIThinking={isAIThinking}
        round={round}
        boardSize={config.boardSize}
        pieceCap={config.pieceCap}
        mode={config.mode}
        difficulty={config.aiDifficulty}
        onResetRound={() => initMatch(true)}
        onChangeConfig={() => setInGame(false)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <PlayerPanel
            symbol="X"
            name="Player 1"
            isAI={false}
            isCurrentTurn={turn === 'X'}
            score={score.X}
            moves={xMoves}
            pieceCap={config.pieceCap}
          />
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col items-center gap-6">
          <GameBoard
            board={board}
            boardSize={config.boardSize}
            onCellClick={handleCellClick}
            disabled={winnerData !== null || isAIThinking}
            activePlayerSymbol={turn}
            currentExpiringPos={currentExpiring}
            opponentExpiringPos={opponentExpiring}
            winningLine={winnerData ? winnerData.line : null}
          />
          <div className="w-full max-w-md">
            <MoveHistory history={history} />
          </div>
        </div>

        <div className="lg:col-span-1 order-3">
          <PlayerPanel
            symbol="O"
            name={config.mode === 'ai' ? 'Sentinel AI' : 'Player 2'}
            isAI={config.mode === 'ai'}
            isCurrentTurn={turn === 'O'}
            score={score.O}
            moves={oMoves}
            pieceCap={config.pieceCap}
          />
        </div>
      </div>

      {winnerData && (
        <WinOverlay
          winnerData={winnerData}
          boardSize={config.boardSize}
          pieceCap={config.pieceCap}
          movesCount={history.length}
          stats={getStats ? getStats() : {}}
          onPlayAgain={() => {
            setRound(r => r + 1);
            initMatch(true);
          }}
          onNewMatch={() => setInGame(false)}
          onGoHome={onGoHome}
        />
      )}
    </div>
  );
};