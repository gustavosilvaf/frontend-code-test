import React from 'react';
import { render, waitFor } from '@testing-library/react';
import People from './index';
import { loadPeople } from '../../services/Users';

describe('People render component', () => {
  it('it should be possible to see all players', async () => {
    const people = await loadPeople();
    const { getByTestId } = render(<People />);
    people.forEach(async (element) => {
      await waitFor(() =>
        expect(getByTestId(element.location)).toHavebeenCalledTimes(1)
      );
    });
  });
});
