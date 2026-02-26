// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayPage from './play/page';

afterEach(() => {
  cleanup();
});

describe('play page', () => {
  it('supports selecting a piece, making a move, AI response, and panel toggles', async () => {
    const user = userEvent.setup();
    const { container } = render(<PlayPage />);

    const from = container.querySelector('[data-square="6,4"]') as HTMLElement; // e2
    const to = container.querySelector('[data-square="4,4"]') as HTMLElement; // e4

    await user.click(from);
    expect(to.querySelector('.legal-move-dot')).toBeTruthy();

    await user.click(to);
    expect(screen.getByText(/black to move/i)).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(/white to move/i)).toBeTruthy();
    }, { timeout: 2000 });

    await user.click(screen.getByRole('button', { name: /influence overlay/i }));
    expect(container.querySelectorAll('.influence-glow').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /the cheat code/i }));
    expect(screen.getByText(/what did they just do/i)).toBeTruthy();
  });
});
