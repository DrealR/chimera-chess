// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CSBridgePage from './cs-bridge/page';
import { CS_BRIDGE_PHASES, CS_BRIDGE_QUICK_REFERENCE } from '@/lib/csBridge';

afterEach(() => {
  cleanup();
});

describe('cs bridge page', () => {
  it('contains complete 50-week CS bridge data across 9 phases', () => {
    expect(CS_BRIDGE_QUICK_REFERENCE).toHaveLength(50);
    expect(CS_BRIDGE_PHASES).toHaveLength(9);

    const totalWeeks = CS_BRIDGE_PHASES.reduce((sum, phase) => sum + phase.weeks.length, 0);
    expect(totalWeeks).toBe(50);

    for (const week of CS_BRIDGE_PHASES.flatMap((phase) => phase.weeks)) {
      expect(week.csConcept.trim().length).toBeGreaterThan(0);
      expect(week.howItConnects.trim().length).toBeGreaterThan(0);
      expect(week.discussionQuestion.trim().length).toBeGreaterThan(0);
    }
  });

  it('renders quick reference table and expandable week details', async () => {
    const user = userEvent.setup();
    const { container } = render(<CSBridgePage />);

    expect(screen.getByText(/computer science bridge/i)).toBeTruthy();
    expect(container.querySelectorAll('tbody tr').length).toBe(50);

    await user.click(screen.getByRole('button', { name: /the board & squares/i }));

    expect(screen.getByText(/how it connects/i)).toBeTruthy();
    expect(screen.getByText(/discussion question/i)).toBeTruthy();
    expect(screen.getByText(/mini-activity/i)).toBeTruthy();
    expect(screen.getByText(/if the school was a chessboard/i)).toBeTruthy();
  });
});
