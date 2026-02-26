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

// SVG piece shapes in a 45x45 viewBox — clean geometric Staunton style
function PawnShape() {
  return (
    <>
      <circle cx="22.5" cy="11.5" r="5" />
      <path d="M18 18.5 Q18 15.5 22.5 15 Q27 15.5 27 18.5 L29 32.5 L16 32.5 Z" />
      <rect x="13" y="33" width="19" height="3.5" rx="1.5" />
    </>
  );
}

function RookShape() {
  return (
    <>
      <path d="M12 8 L12 13 L15 13 L15 8 L18 8 L18 13 L20.5 13 L20.5 8 L24.5 8 L24.5 13 L27 13 L27 8 L30 8 L30 13 L33 13 L33 8 L33 15 L30 17 L30 31 L33 33 L12 33 L15 31 L15 17 L12 15 Z" />
      <rect x="10" y="33.5" width="25" height="3.5" rx="1.5" />
    </>
  );
}

function KnightShape() {
  return (
    <>
      <path d="M15 37 L15 28 C15 23 17 18 20 14 L18 11 C17.5 8.5 19 6 22 5.5 C25 5 29 7 30.5 11 C31.5 14 31 19 30 23 C29.5 26 30 30 30 34 L30 37 Z" />
      <circle cx="21" cy="10" r="1.3" fill={undefined} className="piece-eye" />
      <rect x="13" y="37" width="19" height="3.5" rx="1.5" />
    </>
  );
}

function BishopShape() {
  return (
    <>
      <ellipse cx="22.5" cy="7.5" rx="2.8" ry="3" />
      <path d="M17.5 14 L22.5 10 L27.5 14 L30 33 L15 33 Z" />
      <rect x="20.5" y="14" width="4" height="14" rx="1" className="piece-slit" />
      <rect x="12" y="33.5" width="21" height="3.5" rx="1.5" />
    </>
  );
}

function QueenShape() {
  return (
    <>
      <circle cx="22.5" cy="5.5" r="2.3" />
      <path d="M11 15 L14.5 7 L18.5 14 L22.5 7 L26.5 14 L30.5 7 L34 15 L31 18 L14 18 Z" />
      <path d="M14.5 18.5 L13.5 33 L31.5 33 L30.5 18.5 Z" />
      <rect x="11" y="33.5" width="23" height="3.5" rx="1.5" />
    </>
  );
}

function KingShape() {
  return (
    <>
      {/* Cross */}
      <rect x="20" y="2.5" width="5" height="10" rx="1" />
      <rect x="17.5" y="5" width="10" height="4" rx="1" />
      {/* Body */}
      <path d="M14 14.5 L13.5 33 L31.5 33 L31 14.5 Q22.5 10 14 14.5 Z" />
      {/* Bands */}
      <line x1="14.5" y1="21" x2="30.5" y2="21" strokeWidth="1.5" className="piece-band" />
      <line x1="14" y1="27" x2="31" y2="27" strokeWidth="1.5" className="piece-band" />
      <rect x="11" y="33.5" width="23" height="3.5" rx="1.5" />
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

  return (
    <svg
      viewBox="0 0 45 45"
      className={className}
      style={{
        width: '82%',
        height: '82%',
        filter: isSelected
          ? `drop-shadow(0 4px 6px rgba(0,0,0,0.6))`
          : `drop-shadow(0 2px 3px rgba(0,0,0,0.4))`,
        transform: isSelected ? 'scale(1.12)' : undefined,
        transition: 'transform 120ms ease, filter 120ms ease',
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
      viewBox="0 0 45 45"
      style={{
        width: '22px',
        height: '22px',
        opacity: 0.7,
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))',
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
