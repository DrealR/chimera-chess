'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { ViewMode } from '@/lib/types';
import { calculateInfluence } from '@/lib/engine';
import {
  createInitialGame,
  getLegalMovesFrom,
  makeMove,
  moveToNotation,
  getRandomMove,
  isInCheck,
} from '@/lib/chess';
import type { GameState, Move } from '@/lib/chess';
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
  const aiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    // Find current player's king
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) {
        const p = game.board[r][c];
        if (p && p.type === 'K' && p.color === game.turn) return [r, c] as [number, number];
      }
    return null;
  }, [game]);

  const gameOver = game.status === 'checkmate' || game.status === 'stalemate';

  // AI plays for black
  useEffect(() => {
    if (game.turn === 'b' && !gameOver) {
      aiTimeout.current = setTimeout(() => {
        const aiMove = getRandomMove(game);
        if (aiMove) {
          const notation = moveToNotation(game, aiMove);
          const nextGame = makeMove(game, aiMove);
          setHistory((prev) => [...prev, { state: game, notation }]);
          setGame(nextGame);
          setSelected(null);
        }
      }, 400);
    }
    return () => {
      if (aiTimeout.current) clearTimeout(aiTimeout.current);
    };
  }, [game, gameOver]);

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (gameOver) return;
      if (game.turn !== 'w') return; // Wait for AI

      const piece = game.board[row][col];

      // If a piece is selected and this is a legal move destination
      if (selected) {
        const move = legalMovesForSelected.find(
          (m) => m.to[0] === row && m.to[1] === col,
        );
        if (move) {
          // Auto-queen for pawn promotion (v1)
          const actualMove = move.promotion ? { ...move, promotion: 'Q' as const } : move;
          const notation = moveToNotation(game, actualMove);
          const nextGame = makeMove(game, actualMove);
          setHistory((prev) => [...prev, { state: game, notation }]);
          setGame(nextGame);
          setSelected(null);
          return;
        }
      }

      // Select a white piece
      if (piece && piece.color === 'w') {
        if (selected && selected[0] === row && selected[1] === col) {
          setSelected(null); // Deselect
        } else {
          setSelected([row, col]);
        }
      } else {
        setSelected(null);
      }
    },
    [game, selected, legalMovesForSelected, gameOver],
  );

  const handleNewGame = useCallback(() => {
    if (aiTimeout.current) clearTimeout(aiTimeout.current);
    setGame(createInitialGame());
    setSelected(null);
    setHistory([]);
  }, []);

  const handleResign = useCallback(() => {
    if (aiTimeout.current) clearTimeout(aiTimeout.current);
    setGame((prev) => ({ ...prev, status: 'checkmate' }));
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#e8e4df' }}>
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
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
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:min-w-[240px] lg:max-w-[320px]">
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
      </div>
    </main>
  );
}
