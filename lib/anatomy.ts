import type { PieceType } from './types';

export type AnatomyEntry = {
  piece: PieceType;
  name: string;
  bioEquivalent: string;
  csEquivalent: string;
  value: string;
  strengths: string[];
  weaknesses: string[];
  insight: string;
  proTip: string;
};

export const ANATOMY: AnatomyEntry[] = [
  {
    piece: 'P',
    name: 'The Pawn — Stem Cell',
    bioEquivalent: 'Stem Cell',
    csEquivalent: 'Variable (can become any type)',
    value: '1 point',
    strengths: [
      'Can promote to any piece',
      'Chains protect each other',
      'Controls key diagonal squares',
      'Passed pawns are devastating in endgames',
    ],
    weaknesses: [
      'Can only move forward',
      'Backward pawns are permanent weaknesses',
      'Isolated pawns need constant protection',
    ],
    insight: 'The pawn is the soul of chess. Every pawn move permanently changes the landscape. Like a stem cell, a pawn\'s potential is its greatest strength.',
    proTip: 'Think three times before moving a pawn. You can never take it back.',
  },
  {
    piece: 'N',
    name: 'The Knight — Nervous System',
    bioEquivalent: 'Nervous System',
    csEquivalent: 'Recursion (non-linear paths)',
    value: '3 points',
    strengths: [
      'Jumps over pieces — cannot be blocked',
      'Forks multiple pieces at once',
      'Excels in closed positions',
      'Outposts deep in enemy territory are devastating',
    ],
    weaknesses: [
      'Slow — needs many moves to cross the board',
      'Weak in open positions with long diagonals',
      'Edge = dead: loses control on the rim',
    ],
    insight: 'The knight thinks differently. Like your nervous system, it sends signals in unexpected directions. A knight on the rim is dim — but a knight in the center is a vortex of power.',
    proTip: 'Plant knights on outposts (squares enemy pawns can never attack). They become permanent thorns.',
  },
  {
    piece: 'B',
    name: 'The Bishop — Circulatory System',
    bioEquivalent: 'Circulatory System',
    csEquivalent: 'Graph Traversal (diagonal paths)',
    value: '3 points',
    strengths: [
      'Long-range diagonal control',
      'Bishop pair dominates open positions',
      'Can pin pieces against the king',
      'X-rays through the position',
    ],
    weaknesses: [
      'Only covers half the squares (one color)',
      'Blocked by own pawns on its color',
      'Weak in closed positions',
    ],
    insight: 'The bishop flows like blood through arteries — long diagonal highways. Two bishops together see EVERY square, creating a circulatory system that reaches everywhere.',
    proTip: 'Keep your pawns off your bishop\'s color. Give your circulatory system room to flow.',
  },
  {
    piece: 'R',
    name: 'The Rook — Skeletal System',
    bioEquivalent: 'Skeletal System',
    csEquivalent: 'Stack/Queue (straight-line processing)',
    value: '5 points',
    strengths: [
      'Dominates open files and ranks',
      'Doubled rooks are a battering ram',
      'Controls the 7th rank (cuts off the king)',
      'Essential in endgames',
    ],
    weaknesses: [
      'Needs open lines to be effective',
      'Slow to develop (starts in corners)',
      'Vulnerable on half-open files',
    ],
    insight: 'The rook is your skeleton — the structural foundation. Like bones creating the frame for muscles, rooks on open files create the frame for your attack.',
    proTip: 'Put rooks on open files and the 7th rank. Two connected rooks on the 7th rank is often checkmate material.',
  },
  {
    piece: 'Q',
    name: 'The Queen — Apex Muscle',
    bioEquivalent: 'Apex Predator Muscle',
    csEquivalent: 'Polymorphism (moves like rook + bishop)',
    value: '9 points',
    strengths: [
      'Most powerful piece on the board',
      'Combines rook and bishop movement',
      'Can attack from any direction',
      'Creates multiple threats simultaneously',
    ],
    weaknesses: [
      'High value makes it a target',
      'Can be harassed by minor pieces',
      'Bringing it out early is dangerous',
      'Trading queens often helps the defender',
    ],
    insight: 'The queen is the apex muscle — the most powerful organ. But the strongest muscle is also the biggest target. Your opponent will try to exhaust it, chase it, trade it away.',
    proTip: 'Don\'t bring the queen out too early. Let the minor pieces do the grunt work first.',
  },
  {
    piece: 'K',
    name: 'The King — DNA',
    bioEquivalent: 'DNA / Nucleus',
    csEquivalent: 'Main Thread (if it crashes, game over)',
    value: 'Infinite',
    strengths: [
      'Becomes active in the endgame',
      'Can help escort passed pawns',
      'Opposition (face-off) is a key endgame technique',
      'Can never be captured — only checkmated',
    ],
    weaknesses: [
      'Must be protected at all costs in middlegame',
      'Slow mover — one square at a time',
      'Vulnerable to checks from all angles',
    ],
    insight: 'The king is your DNA. If it dies, nothing else matters. In the middlegame, hide it. In the endgame, unleash it. The king is a strong piece when it doesn\'t have to hide.',
    proTip: 'Castle early to protect your DNA. But in the endgame, march the king toward the center — it becomes a fighting piece.',
  },
];
