import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Organizations } from './orgs';

const orgsApi = {
  getMyOrganizations: async () => ({
    'id-newyork': {
      name: 'newyork',
      displayName: 'New York',
      roles: ['zoo', 'aquarium'],
    },
    'id-california': {
      name: 'california',
      displayName: 'California',
      roles: ['zoo'],
    },
  }),
};

describe('Organizations', () => {
  it('shows which organizations give access to the app', async () => {
    render(<Organizations orgsApi={orgsApi} appRole="aquarium" />);

    const california = await screen.findByRole('listitem', {
      name: 'California',
    });
    expect(within(california).getByText('No access to aquarium')).toBeTruthy();

    const newYork = screen.getByRole('listitem', { name: 'New York' });
    expect(within(newYork).getByText('Access to aquarium')).toBeTruthy();
    expect(within(newYork).getByText('zoo')).toBeTruthy();
  });
});
