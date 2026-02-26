// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurriculumPage from './curriculum/page';
import { PHASES } from '../lib/curriculum';

afterEach(() => {
  cleanup();
});

describe('curriculum page', () => {
  it('phase 1 has all four layers for each week in data', () => {
    const phaseOne = PHASES[0];
    expect(phaseOne.name.toLowerCase()).toContain('phase 1');

    for (const week of phaseOne.weeks) {
      expect(week.chess.trim().length).toBeGreaterThan(0);
      expect(week.chimera.trim().length).toBeGreaterThan(0);
      expect(week.cs.trim().length).toBeGreaterThan(0);
      expect(week.creatureCheck?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it('renders phase 1 week details with all four sections', async () => {
    const user = userEvent.setup();
    render(<CurriculumPage />);

    await user.click(screen.getByRole('button', { name: /the board & squares/i }));

    expect(screen.getAllByText(/chess/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/chimera/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/cs bridge/i).length).toBeGreaterThan(0);
  });
});
