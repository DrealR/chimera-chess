// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SandboxPage from './page';

afterEach(() => {
  cleanup();
});

describe('sandbox page', () => {
  it('supports selecting pieces and placing pieces with the palette tool', async () => {
    const user = userEvent.setup();
    const { container } = render(<SandboxPage />);

    const squares = container.querySelectorAll('[data-square]');
    expect(squares.length).toBe(64);

    const focusSquare = container.querySelector('[data-square="6,4"]') as HTMLElement; // e2 pawn
    expect(focusSquare.getAttribute('data-piece-color')).toBe('w');

    const beforeHighlights = container.querySelectorAll('.influence-glow').length;
    expect(beforeHighlights).toBeGreaterThan(10);

    await user.click(focusSquare);
    const afterSelectHighlights = container.querySelectorAll('.influence-glow').length;
    expect(afterSelectHighlights).toBe(3);

    await user.click(focusSquare);
    const afterDeselectHighlights = container.querySelectorAll('.influence-glow').length;
    expect(afterDeselectHighlights).toBe(beforeHighlights);

    const whiteQueenButton = container.querySelector('button[title="White Q"]') as HTMLElement;
    expect(whiteQueenButton).toBeTruthy();
    await user.click(whiteQueenButton);

    const targetSquare = container.querySelector('[data-square="4,4"]') as HTMLElement; // e4
    expect(targetSquare.getAttribute('data-piece-color')).toBeNull();
    await user.click(targetSquare);
    expect(targetSquare.getAttribute('data-piece-color')).toBe('w');
  });
});
