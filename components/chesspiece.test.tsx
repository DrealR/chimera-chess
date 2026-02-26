// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import ChessPiece, { MiniPiece } from './ChessPiece';
import type { PieceColor, PieceType } from '@/lib/types';

const TYPES: PieceType[] = ['K', 'Q', 'R', 'B', 'N', 'P'];
const COLORS: PieceColor[] = ['w', 'b'];

afterEach(() => {
  cleanup();
});

describe('ChessPiece SVG', () => {
  it('renders all six piece types for both colors with a fixed viewBox', () => {
    render(
      <div>
        {COLORS.flatMap((color) =>
          TYPES.map((type) => (
            <ChessPiece key={`${color}-${type}`} type={type} color={color} />
          )),
        )}
      </div>,
    );

    const svgs = screen.getAllByRole('img');
    expect(svgs).toHaveLength(12);
    for (const svg of svgs) {
      expect(svg.getAttribute('viewBox')).toBe('0 0 45 45');
    }
  });

  it('adds selected visual emphasis and renders mini captured pieces', () => {
    render(
      <div>
        <ChessPiece type="Q" color="w" isSelected />
        <MiniPiece type="N" color="b" />
      </div>,
    );

    const selected = screen.getByRole('img', { name: /white q/i }) as HTMLElement;
    expect(selected.style.transform).toContain('scale(1.12)');

    const mini = screen.getByRole('img', { name: /captured black n/i });
    expect(mini.getAttribute('viewBox')).toBe('0 0 45 45');
  });
});
