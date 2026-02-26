'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { calculateInfluence } from '@/lib/engine';
import {
  createInitialGame,
  getLegalMovesFrom,
  makeMove,
  moveToNotation,
  getRandomMove,
} from '@/lib/chess';
import type { GameState } from '@/lib/chess';
import Board from '@/components/Board';
import GamePanel from '@/components/GamePanel';

function createEmptyInfluence() {
  const grid = () => Array.from({ length: 8 }, () => Array<number>(8).fill(0));
  return { white: grid(), black: grid() };
}

export default function PlayPage() {
  const [game, setGame] = useState<GameState>(() => createInitialGame());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [showInfluence, setShowInfluence] = useState(false);
  const [showProtocol, setShowProtocol] = useState(false);
  const [history, setHistory] = useState<{ state: GameState; notation: string }[]>([]);
  const [flashSquare, setFlashSquare] = useState<[number, number] | null>(null);
  const aiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const influence = useMemo(
    () => (showInfluence ? calculateInfluence(game.board) : createEmptyInfluence()),
    [game.board, showInfluence],
  );

  const legalMovesForSelected = useMemo(() => {
    if (!selected) return [];
    return getLegalMovesFrom(game, selected[0], selected[1]);
  }, [game, selected]);

  const legalMoveSet = useMemo(() => {
    return new Set(legalMovesForSelected.map((m) => `${m.to[0]},${m.to[1]}`));
  }, [legalMovesForSelected]);

  const lastMove = useMemo(() => {
    if (game.moves.length === 0) return undefined;
    const last = game.moves[game.moves.length - 1];
    return { from: last.from, to: last.to };
  }, [game.moves]);

  const checkSquare = useMemo(() => {
    if (game.status !== 'check' && game.status !== 'checkmate') return null;
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) {
        const p = game.board[r][c];
        if (p && p.type === 'K' && p.color === game.turn) return [r, c] as [number, number];
      }
    return null;
  }, [game]);

  const gameOver = game.status === 'checkmate' || game.status === 'stalemate';

  const getCaptureSquare = useCallback((move: { from: [number, number]; to: [number, number]; enPassant?: boolean }) => {
    if (move.enPassant) {
      return [move.from[0], move.to[1]] as [number, number];
    }
    return game.board[move.to[0]][move.to[1]] ? ([move.to[0], move.to[1]] as [number, number]) : null;
  }, [game.board]);

  // Trigger a capture flash effect
  const triggerFlash = useCallback((square: [number, number]) => {
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    setFlashSquare(square);
    flashTimeout.current = setTimeout(() => setFlashSquare(null), 400);
  }, []);

  // AI plays for black
  useEffect(() => {
    if (game.turn === 'b' && !gameOver) {
      aiTimeout.current = setTimeout(() => {
        const aiMove = getRandomMove(game);
        if (aiMove) {
          const notation = moveToNotation(game, aiMove);
          const captureSquare = getCaptureSquare(aiMove);
          const nextGame = makeMove(game, aiMove);
          setHistory((prev) => [...prev, { state: game, notation }]);
          setGame(nextGame);
          setSelected(null);
          if (captureSquare) triggerFlash(captureSquare);
        }
      }, 400);
    }
    return () => {
      if (aiTimeout.current) clearTimeout(aiTimeout.current);
    };
  }, [game, gameOver, triggerFlash, getCaptureSquare]);

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (gameOver) return;
      if (game.turn !== 'w') return;

      const piece = game.board[row][col];

      if (selected) {
        const move = legalMovesForSelected.find(
          (m) => m.to[0] === row && m.to[1] === col,
        );
        if (move) {
          const actualMove = move.promotion ? { ...move, promotion: 'Q' as const } : move;
          const notation = moveToNotation(game, actualMove);
          const captureSquare = getCaptureSquare(actualMove);
          const nextGame = makeMove(game, actualMove);
          setHistory((prev) => [...prev, { state: game, notation }]);
          setGame(nextGame);
          setSelected(null);
          if (captureSquare) triggerFlash(captureSquare);
          return;
        }
      }

      if (piece && piece.color === 'w') {
        if (selected && selected[0] === row && selected[1] === col) {
          setSelected(null);
        } else {
          setSelected([row, col]);
        }
      } else {
        setSelected(null);
      }
    },
    [game, selected, legalMovesForSelected, gameOver, triggerFlash, getCaptureSquare],
  );

  const handleNewGame = useCallback(() => {
    if (aiTimeout.current) clearTimeout(aiTimeout.current);
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    setGame(createInitialGame());
    setSelected(null);
    setHistory([]);
    setFlashSquare(null);
  }, []);

  const handleResign = useCallback(() => {
    if (aiTimeout.current) clearTimeout(aiTimeout.current);
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    setGame((prev) => ({ ...prev, status: 'checkmate' }));
    setFlashSquare(null);
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#e8e4df' }}>
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Board */}
          <div className="flex-shrink-0 w-full max-w-[560px] mx-auto lg:mx-0">
            <Board
              board={game.board}
              influence={influence}
              viewMode={showInfluence ? 'both' : 'both'}
              highlightedSquares={null}
              highlightedPiecePos={null}
              showLabels={true}
              onSquareClick={handleSquareClick}
              activeTool={false}
              legalMoves={legalMoveSet.size > 0 ? legalMoveSet : undefined}
              lastMove={lastMove}
              checkSquare={checkSquare}
              selectedSquare={selected}
              flashSquare={flashSquare}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:min-w-[260px] lg:max-w-[320px]">
            <GamePanel
              game={game}
              history={history}
              showInfluence={showInfluence}
              onToggleInfluence={() => setShowInfluence((p) => !p)}
              showProtocol={showProtocol}
              onToggleProtocol={() => setShowProtocol((p) => !p)}
              onNewGame={handleNewGame}
              onResign={handleResign}
            />
          </div>
        </div>

        {/* Checkmate / Stalemate overlay */}
        {gameOver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className="checkmate-overlay glass-panel p-8 text-center max-w-md mx-4">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: game.status === 'checkmate' ? '#f0a050' : '#888' }}
              >
                {game.status === 'checkmate' ? 'Checkmate' : 'Stalemate'}
              </div>
              <div className="text-sm mb-6" style={{ color: '#aaa' }}>
                {game.status === 'checkmate'
                  ? game.turn === 'w'
                    ? 'Black wins the game!'
                    : 'White wins the game!'
                  : 'The game is a draw.'}
              </div>
              <button
                className="px-6 py-3 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor: 'rgba(80,200,120,0.15)',
                  color: '#50c878',
                  border: '1px solid rgba(80,200,120,0.2)',
                }}
                onClick={handleNewGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
