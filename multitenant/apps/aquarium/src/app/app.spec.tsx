import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './app';

describe('App', () => {
  it('shows the logged out state', async () => {
    render(<App />);

    expect(await screen.findByText('Not authenticated.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Aquarium' })).toBeTruthy();
  });
});
