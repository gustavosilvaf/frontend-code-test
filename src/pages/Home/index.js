import React from 'react';
import './styles.scss';

import People from '../../Components/People';
import { Menu } from '../../utils/constants';

const Home = () => (
  <div className="Home">
    <h1 className="Home__title">Bem Vindo ao jogo T-Virus</h1>
    <Menu />
    <h2 className="Home__subtitle">Jogadores</h2>
    <People />
  </div>
);

export default Home;
