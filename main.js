// main.js
// Ponto de entrada principal do FinCtl

import {criarTitulos} from './canvas.js';
import {constroiMenus} from './canvas.js';
import {registrarListeners} from './canvas.js';

/*
************************************************************
       CONSTRUÇÃO DA INTERFACE (CANVAS)
************************************************************
 */

// Criando o box de títulos
criarTitulos()

// Criando o sistema de Menus
constroiMenus()

// Registrando os listeners de botões
registrarListeners()

/*
************************************************************
       BLOQUEIO DE INTERAÇÃO DURANTE LOGIN
************************************************************
 */

// Função global para bloquear interação
let bloquearInteracao;

window.addEventListener('DOMContentLoaded', () => {
  console.log('FinCtl carregado com sucesso!');
  
  // Define a função de bloqueio
  bloquearInteracao = function(event) {
    const loginForm = document.getElementById('divFormLogin');
    
    // Se o login estiver visível e o clique não for dentro do formulário de login
    if (loginForm && !loginForm.classList.contains('hidden')) {
      if (!loginForm.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        console.log('🚫 Interação bloqueada - faça login primeiro');
        return false;
      }
    }
  };

  // Adiciona o bloqueador para todos os tipos de evento
  document.addEventListener('click', bloquearInteracao, true);
  document.addEventListener('mousedown', bloquearInteracao, true);
  document.addEventListener('mouseup', bloquearInteracao, true);
  document.addEventListener('keydown', bloquearInteracao, true);
  document.addEventListener('keyup', bloquearInteracao, true);
  document.addEventListener('keypress', bloquearInteracao, true);
  
/*
************************************************************
       CONSTRUÇÃO DO FORMULÁRIO DE LOGIN
************************************************************
 */

  // Exibe formulário de login automaticamente (igual ao frontend original)
  setTimeout(() => {
    document.getElementById('divFormLogin').classList.remove('hidden');
    console.log('💡 Formulário de login exibido - digite qualquer usuário/senha');
  }, 1000);
  
  // Configura evento de submit do formulário de login
  document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pega os valores dos campos
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    
    // Validação simples para desenvolvimento
    if (!usuario.trim() || !senha.trim()) {
      alert('Por favor, preencha usuário e senha');
      return;
    }
    
    // Na fase de desenvolvimento, aceita qualquer credencial
    console.log(`✅ Login aceito: ${usuario} (modo desenvolvimento)`);
    alert(`Bem-vindo ao FinCtl, ${usuario}!\n\n(Modo desenvolvimento - qualquer credencial é aceita)`);
    
    // Esconde o formulário de login
    document.getElementById('divFormLogin').classList.add('hidden');
    
    // Remove os bloqueadores de evento agora que o login foi feito
    document.removeEventListener('click', bloquearInteracao, true);
    document.removeEventListener('mousedown', bloquearInteracao, true);
    document.removeEventListener('mouseup', bloquearInteracao, true);
    document.removeEventListener('keydown', bloquearInteracao, true);
    document.removeEventListener('keyup', bloquearInteracao, true);
    document.removeEventListener('keypress', bloquearInteracao, true);
    
    console.log('🎯 Interface FinCtl liberada para uso!');
  });
});
