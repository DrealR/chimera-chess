import type { BoardState, Piece } from './types';
import { createEmptyBoard } from './types';

function p(color: 'w' | 'b', type: Piece['type']): Piece {
  return { type, color };
}

export type Preset = {
  name: string;
  description: string;
  board: BoardState;
};

const N = null;

export const PRESETS: Preset[] = [
  {
    name: 'Starting Position',
    description: 'Standard chess setup — two armies ready to breathe',
    board: [
      [p('b','R'),p('b','N'),p('b','B'),p('b','Q'),p('b','K'),p('b','B'),p('b','N'),p('b','R')],
      [p('b','P'),p('b','P'),p('b','P'),p('b','P'),p('b','P'),p('b','P'),p('b','P'),p('b','P')],
      [N,N,N,N,N,N,N,N],
      [N,N,N,N,N,N,N,N],
      [N,N,N,N,N,N,N,N],
      [N,N,N,N,N,N,N,N],
      [p('w','P'),p('w','P'),p('w','P'),p('w','P'),p('w','P'),p('w','P'),p('w','P'),p('w','P')],
      [p('w','R'),p('w','N'),p('w','B'),p('w','Q'),p('w','K'),p('w','B'),p('w','N'),p('w','R')],
    ],
  },
  {
    name: 'Empty Board',
    description: 'A blank canvas — place your pieces',
    board: createEmptyBoard(),
  },
  {
    name: 'Knight Vortex',
    description: 'One knight in the center — see the 8-point teleportation pattern',
    board: (() => {
      const b = createEmptyBoard();
      b[3][3] = p('w', 'N'); // d5
      return b;
    })(),
  },
  {
    name: 'Bishop Pair',
    description: 'Two bishops — arteries and veins covering the full circulatory system',
    board: (() => {
      const b = createEmptyBoard();
      b[4][2] = p('w', 'B'); // c4 — light square
      b[4][5] = p('w', 'B'); // f4 — dark square
      return b;
    })(),
  },
  {
    name: 'Queen Power',
    description: 'The apex muscle — maximum reach from the center',
    board: (() => {
      const b = createEmptyBoard();
      b[3][3] = p('w', 'Q'); // d5
      return b;
    })(),
  },
  {
    name: 'Rook Highways',
    description: 'Two rooks on open files — the skeletal structure',
    board: (() => {
      const b = createEmptyBoard();
      b[7][3] = p('w', 'R'); // d1
      b[7][4] = p('w', 'R'); // e1
      return b;
    })(),
  },
  {
    name: 'Two Hurricanes',
    description: 'Mid-game collision — two organisms crashing into each other',
    board: [
      [p('b','R'),N,N,p('b','Q'),N,p('b','R'),p('b','K'),N],
      [p('b','P'),p('b','P'),p('b','P'),N,N,p('b','P'),p('b','P'),p('b','P')],
      [N,N,p('b','N'),p('b','B'),N,p('b','N'),N,N],
      [N,N,N,p('b','P'),p('b','P'),N,N,N],
      [N,N,N,p('w','P'),p('w','P'),N,N,N],
      [N,N,p('w','N'),p('w','B'),N,p('w','N'),N,N],
      [p('w','P'),p('w','P'),p('w','P'),N,N,p('w','P'),p('w','P'),p('w','P')],
      [p('w','R'),N,N,p('w','Q'),N,p('w','R'),p('w','K'),N],
    ],
  },
];
