// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayPage from './play/page';

function zoneCounts(container: HTMLElement) {
  const glows = container.querySelectorAll('.influence-glow');
  let blue = 0;
  let red = 0;
  let green = 0;
  let purple = 0;

  glows.forEach((node) => {
    const bg = (node as HTMLElement).style.background;
    if (bg.includes('rgba(100,160,240')) blue++;
    else if (bg.includes('rgba(220,90,90')) red++;
    else if (bg.includes('rgba(80,180,100')) green++;
    else if (bg.includes('rgba(160,120,200')) purple++;
  });

  return { total: glows.length, blue, red, green, purple };
}

afterEach(() => {
  cleanup();
});

describe('play page', () => {
  it('supports selecting a piece, making a move, AI response, and panel toggles', async () => {
    const user = userEvent.setup();
    const { container } = render(<PlayPage />);

    const grid = container.querySelector('.grid.grid-cols-8.aspect-square');
    const squares = container.querySelectorAll('[data-square]');
    expect(grid).toBeTruthy();
    expect(squares.length).toBe(64);
    for (const square of squares) {
      expect(square.className).toContain('square-depth');
      expect(square.className.includes('square-light') || square.className.includes('square-dark')).toBe(true);
    }

    // Influence is ON by default with legend and four zones available.
    expect(screen.getAllByText(/your territory/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/opponent/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/safe passage/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/contested/i).length).toBeGreaterThan(0);
    const openingZones = zoneCounts(container);
    expect(openingZones.total).toBeGreaterThan(0);
    expect(openingZones.green).toBeGreaterThan(0);
    expect(openingZones.blue + openingZones.red + openingZones.purple).toBeGreaterThan(0);

    const from = container.querySelector('[data-square="6,4"]') as HTMLElement; // e2
    const to = container.querySelector('[data-square="4,4"]') as HTMLElement; // e4

    await user.click(from);
    expect(container.querySelector('.selected-glow')).toBeTruthy();
    expect(to.querySelector('.legal-move-dot')).toBeTruthy();

    await user.click(to);
    expect(screen.getByText(/black to move/i)).toBeTruthy();

    const afterPlayerMoveZones = zoneCounts(container);
    expect(JSON.stringify(afterPlayerMoveZones)).not.toBe(JSON.stringify(openingZones));

    await waitFor(() => {
      expect(screen.getByText(/white to move/i)).toBeTruthy();
    }, { timeout: 3000 });
    const afterAiMoveZones = zoneCounts(container);
    expect(JSON.stringify(afterAiMoveZones)).not.toBe(JSON.stringify(afterPlayerMoveZones));

    // Click to turn OFF
    await user.click(screen.getByRole('button', { name: /influence/i }));
    expect(container.querySelectorAll('.influence-glow').length).toBe(0);
    expect(screen.queryByText(/safe passage/i)).toBeFalsy();

    // Difficulty defaults to medium and can be changed.
    const medium = screen.getByRole('button', { name: /^medium$/i });
    const hard = screen.getByRole('button', { name: /^hard$/i });
    expect(medium.getAttribute('aria-pressed')).toBe('true');
    expect(hard.getAttribute('aria-pressed')).toBe('false');
    await user.click(hard);
    expect(hard.getAttribute('aria-pressed')).toBe('true');
    expect(medium.getAttribute('aria-pressed')).toBe('false');

    await user.click(screen.getByRole('button', { name: /cheat code/i }));
    expect(screen.getByText(/look/i)).toBeTruthy();
  });
});
