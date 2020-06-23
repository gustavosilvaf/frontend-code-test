import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Player from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Player render component', () => {
  const infectedPlayer = {
    name: 'teste',
    age: '18',
    infected: true,
  };

  const noInfectedPlayer = {
    name: 'teste',
    age: '18',
    infected: false,
  };

  it('it should be possible to see the name, age and who is infected', () => {
    const { getByText } = render(
      <Player
        name={infectedPlayer.name}
        age={infectedPlayer.age}
        infected={infectedPlayer.infected}
      />
    );

    expect(getByText('Infectado')).toBeInTheDocument();
    expect(getByText(infectedPlayer.name)).toBeInTheDocument();
    expect(getByText(infectedPlayer.age)).toBeInTheDocument();
  });

  it('it should be possible to see the name, age and who is not infected', () => {
    const { getByText } = render(
      <Player
        name={noInfectedPlayer.name}
        age={noInfectedPlayer.age}
        infected={noInfectedPlayer.infected}
      />
    );

    expect(getByText('Não infectado')).toBeInTheDocument();
    expect(getByText(infectedPlayer.name)).toBeInTheDocument();
    expect(getByText(infectedPlayer.age)).toBeInTheDocument();
  });
});
