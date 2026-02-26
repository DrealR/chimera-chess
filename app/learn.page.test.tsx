// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LearnPage from './learn/page';

afterEach(() => {
  cleanup();
});

describe('learn page', () => {
  it('renders all six tabs', () => {
    render(<LearnPage />);

    expect(screen.getByRole('button', { name: /the world/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /your squad/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /the battle/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /superpowers/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /the cheat code/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /boss levels/i })).toBeTruthy();
  });

  it('switches tabs and expands section cards', async () => {
    const user = userEvent.setup();
    render(<LearnPage />);

    const squadTab = screen.getAllByRole('button', { name: /your squad/i })[0];
    await user.click(squadTab);
    expect(screen.getByText(/meet your creature/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /the pawn/i }));
    expect(screen.getByText(/how it moves/i)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /superpowers/i }));
    await user.click(screen.getByRole('button', { name: /water bear power/i }));
    expect(screen.getByText(/in nature/i)).toBeTruthy();
  });
});
