import React from 'react';
import { render } from '@testing-library/react';
import MainMenu from '.';
import { menuItens } from '../../utils/constants';

describe('Main Menu component', () => {
  it('it should be possible to see all menu options', () => {
    const { getByTestId } = render(<MainMenu />);

    menuItens.forEach((element) => {
      expect(!!getByTestId(element.name)).toBe(true);
    });
  });
});
