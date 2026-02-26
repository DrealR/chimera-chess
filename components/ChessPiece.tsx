import type { PieceType, PieceColor } from '@/lib/types';

type ChessPieceProps = {
  type: PieceType;
  color: PieceColor;
  isSelected?: boolean;
  className?: string;
};

// Colors for each side
const FILLS: Record<PieceColor, string> = { w: '#f0e8d8', b: '#2d2d2d' };
const STROKES: Record<PieceColor, string> = { w: '#997744', b: '#888888' };
const STROKE_W: Record<PieceColor, number> = { w: 1.2, b: 1 };

// Professional Staunton chess piece SVGs in 45x45 viewBox (Cburnett/Wikipedia style, public domain)

function PawnShape() {
  return (
    <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15.41 27.09 11 31.58 11 39.5h23c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
  );
}

function RookShape() {
  return (
    <path d="M9 39h27v-3H9v3zm3.5-7l1.5-2.5h17l1.5 2.5h-20zm-.5-4.5v-4h20v4H12zM14 29.5v-13h17v13H14zm-1.5-14l-.5-4h1v-2h3v2h1v-2h3v2h1v-2h3v2h1v-2h3v2h1l-.5 4h-16z" />
  );
}

function KnightShape() {
  return (
    <>
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
      <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4 -4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" />
      <circle cx="12" cy="25" r="1.5" fill="none" strokeWidth="1" />
    </>
  );
}

function BishopShape() {
  return (
    <>
      <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.46 3-2 3-2z" />
      <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
      <circle cx="22.5" cy="8" r="2.5" />
      <line x1="17.5" y1="26" x2="27.5" y2="26" strokeWidth="1.5" />
      <line x1="22.5" y1="15.5" x2="22.5" y2="20.5" strokeWidth="1.5" />
    </>
  );
}

function QueenShape() {
  return (
    <>
      <path d="M8 12a2 2 0 1 1 4 0 2 2 0 1 1-4 0zm5.5-4.5a2 2 0 1 1 4 0 2 2 0 1 1-4 0zM25 8a2 2 0 1 1 4 0 2 2 0 1 1-4 0zm5.5 4.5a2 2 0 1 1 4 0 2 2 0 1 1-4 0zm-16.5-1a2 2 0 1 1 4 0 2 2 0 1 1-4 0z" />
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15L14 11v14L7 14l2 12z" />
      <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" />
    </>
  );
}

function KingShape() {
  return (
    <>
      <path d="M22.5 11.63V6M20 8h5" strokeWidth="1.5" fill="none" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
      <path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" />
      <path d="M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0" fill="none" />
    </>
  );
}

const SHAPES: Record<PieceType, () => React.JSX.Element> = {
  P: PawnShape,
  R: RookShape,
  N: KnightShape,
  B: BishopShape,
  Q: QueenShape,
  K: KingShape,
};

export default function ChessPiece({ type, color, isSelected, className }: ChessPieceProps) {
  const Shape = SHAPES[type];
  const fill = FILLS[color];
  const stroke = STROKES[color];
  const sw = STROKE_W[color];
  const label = `${color === 'w' ? 'white' : 'black'} ${type}`;

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 45 45"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{
        width: '82%',
        height: '82%',
        filter: isSelected
          ? `drop-shadow(0 4px 6px rgba(0,0,0,0.6))`
          : `drop-shadow(0 2px 3px rgba(0,0,0,0.4))`,
        transform: isSelected ? 'scale(1.12)' : undefined,
        transition: 'transform 120ms ease, filter 120ms ease',
        shapeRendering: 'geometricPrecision',
      }}
    >
      <g
        fill={fill}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <Shape />
      </g>
    </svg>
  );
}

/** Mini piece SVG for captured pieces display */
export function MiniPiece({ type, color }: { type: PieceType; color: PieceColor }) {
  const Shape = SHAPES[type];
  return (
    <svg
      role="img"
      aria-label={`captured ${color === 'w' ? 'white' : 'black'} ${type}`}
      viewBox="0 0 45 45"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: '22px',
        height: '22px',
        opacity: 0.7,
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))',
        shapeRendering: 'geometricPrecision',
      }}
    >
      <g
        fill={FILLS[color]}
        stroke={STROKES[color]}
        strokeWidth={STROKE_W[color]}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <Shape />
      </g>
    </svg>
  );
}
