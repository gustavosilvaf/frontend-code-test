import React from 'react';
import './styles.scss';

const Player = ({ name, age, infected }) => (
  <div className="Player">
    <h4 className="Player__name">{name}</h4>
    <p className="Player__age">
      Idade: <span>{age}</span> anos
    </p>
    <p className={`Player__infected--${infected}`}>
      {infected ? 'Infectado' : 'Não infectado'}
    </p>
  </div>
);

export default Player;
