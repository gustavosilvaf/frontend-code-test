import React from 'react';

import MainMenu from '../Components/MainMenu';

export const Menu = () => <MainMenu />;

export const menuItens = [
  {
    name: 'Início',
    link: '/',
  },
  {
    name: 'Cadastrar Jogador',
    link: '/register-player',
  },
  {
    name: 'Atualizar Localização',
    link: 'update',
  },
  {
    name: 'Sinalizar infectado',
    link: 'flag',
  },
];

export const center = {
  lat: -25.3935,
  lng: -51.4562,
  zoom: 12,
};

export const baseUrl = 'http://zssn-backend-example.herokuapp.com/api/';
