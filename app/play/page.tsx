'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { calculateInfluence } from '@/lib/engine';
import {
  createInitialGame,
  getLegalMovesFrom,
  makeMove,
  moveToNotation,
} from '@/lib/chess';
import { getBestMove, type Difficulty } from '@/lib/ai';
import type { GameState } from '@/lib/chess';
import Board from '@/components/Board';
import GamePanel from '@/components/GamePanel';

export default function PlayPage() {
  const [game, setGame] = useState<GameState>(() => createInitialGame());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [showInfluence, setShowInfluence] = useState(true);
  const [showProtocol, setShowProtocol] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [history, setHistory] = useState<{ state: GameState; notation: string }[]>([]);
  const [flashSquare, setFlashSquare] = useState<[number, number] | null>(null);
  const aiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const influence = useMemo(() => calculateInfluence(game.board), [game.board]);

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

  const triggerFlash = useCallback((square: [number, number]) => {
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    setFlashSquare(square);
    flashTimeout.current = setTimeout(() => setFlashSquare(null), 400);
  }, []);

  useEffect(() => {
    if (game.turn === 'b' && !gameOver) {
      aiTimeout.current = setTimeout(() => {
        const aiMove = getBestMove(game, difficulty);
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
  }, [game, gameOver, difficulty, triggerFlash, getCaptureSquare]);

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
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Board — hero, takes most of the space */}
          <div className="flex-1 w-full max-w-[600px] mx-auto lg:mx-0">
            <Board
              board={game.board}
              influence={influence}
              viewMode="both"
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
              showInfluence={showInfluence}
            />
          </div>

          {/* Panel — thin, secondary */}
          <div className="w-full lg:w-[200px] lg:flex-shrink-0">
            <GamePanel
              game={game}
              history={history}
              showInfluence={showInfluence}
              onToggleInfluence={() => setShowInfluence((p) => !p)}
              showProtocol={showProtocol}
              onToggleProtocol={() => setShowProtocol((p) => !p)}
              onNewGame={handleNewGame}
              onResign={handleResign}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
            />
          </div>
        </div>

        {/* Checkmate / Stalemate overlay */}
        {gameOver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="checkmate-overlay text-center px-8">
              <div
                className="text-4xl font-bold tracking-tight mb-3"
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  color: '#e8e4df',
                }}
              >
                {game.status === 'checkmate' ? 'Checkmate' : 'Stalemate'}
              </div>
              <div className="text-sm mb-10" style={{ color: '#666' }}>
                {game.status === 'checkmate'
                  ? game.turn === 'w'
                    ? 'Black wins'
                    : 'White wins'
                  : 'Draw'}
              </div>
              <button
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: '#c8956c' }}
                onClick={handleNewGame}
              >
                Play again
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
