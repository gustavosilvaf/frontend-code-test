import React from 'react';
import './styles.scss';
import { menuItens } from '../../utils/constants';

const MainMenu = () => (
  <div className="MainMenu">
    <nav className="MainMenu__nav-container">
      {menuItens.map(({ name, link }) => (
        <a data-testid={name} href={link} key={link} className="MainMenu__item">
          {name}
        </a>
      ))}
    </nav>
  </div>
);

export default MainMenu;
