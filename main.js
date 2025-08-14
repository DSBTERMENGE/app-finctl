// main.js
// Ponto de entrada principal do FinCtl

import {criarTitulos} from './canvas.js';
import {constroiMenus} from './canvas.js';
import {registrarListeners} from './canvas.js';

// Criando o box de títulos
criarTitulos()

// Criando o sistema de Menus
constroiMenus()

// Registrando os listeners de botões
registrarListeners()

window.addEventListener('DOMContentLoaded', () => {
  // Remove lógica do formulário de login por enquanto
  console.log('FinCtl carregado com sucesso!');
});
