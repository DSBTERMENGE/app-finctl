// canvas.js
// Responsável apenas pela exibição da interface usando o frontend

import { ConstrutorDeInterfaceAplicacao } from '../framework_dsb/frontend/General_Classes/ConstrutorDeInterfaceAplicacao.js';
import { BarraDeBotoes } from '../framework_dsb/frontend/General_Classes/ConstrutorDeBarrasDeBotoes.js';
import { construirFormularioGrupos } from './form_grupos.js';
import { construirFormularioSubgrupos } from './form_subgrupos.js';

// Variável global para controlar formulários ativos
let formularioAtivo = null;

// Função para criar títulos (equivalente ao que ui_menu.js fazia)
export function criarTitulos() {
    const config = {
        titulo: 'FinCtl',
        descricao: 'Controle Financeiro Pessoal',
        icone: './Assets/icon_finctl.svg'
    };
    
    const interfaceApp = new ConstrutorDeInterfaceAplicacao(config);
    interfaceApp.criarTitulosIntegrado();
}

// Função para registrar listeners (implementação dos eventos de navegação)
export function registrarListeners() {
    console.log('Registrando listeners de navegação dos menus...');
    
    // Array com os menus e seus handlers
    const menusComListeners = [
        { id: 'id_menu_principal', handler: handlerMenuPrincipal },
        { id: 'id_menu_cadastro', handler: handlerMenuCadastro },
        { id: 'id_menu_rel_1', handler: handlerMenuRel1 },
        { id: 'id_menu_rel_2', handler: handlerMenuRel2 }
    ];
    
    // Registra os event listeners para cada menu
    menusComListeners.forEach(({ id, handler }) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener('botao-clicado', handler);
            console.log(`✅ Listener registrado para: ${id}`);
        } else {
            console.warn(`⚠️ Menu '${id}' não encontrado no momento do registro do listener.`);
        }
    });
}

// ============= HANDLERS DE EVENTOS DOS MENUS =============

/**
 * Handler do Menu Principal
 */
function handlerMenuPrincipal(e) {
    console.log('🎯 Menu principal:', e.detail.label, e.detail.indice, e.detail.idDiv);

    switch (e.detail.label) {
        case "Sair":
            console.log('🚪 Ação: Sair do FinCtl');
            // Implementar lógica de saída (confirmar, salvar dados, etc.)
            if (confirm('Deseja realmente sair do FinCtl?')) {
                window.close() || (window.location.href = 'about:blank');
            }
            break;
            
        case "Relatórios-2":
            console.log('📊 Navegando para: Relatórios-2');
            alternarMenu('id_menu_principal', 'id_menu_rel_2');
            break;
            
        case "Relatórios-1":
            console.log('📈 Navegando para: Relatórios-1');
            alternarMenu('id_menu_principal', 'id_menu_rel_1');
            break;
            
        case "Cadastro":
            console.log('📝 Navegando para: Cadastro');
            alternarMenu('id_menu_principal', 'id_menu_cadastro');
            break;
            
        case "Reclassificar":
            console.log('🔄 Ação: Reclassificar');
            alert('Funcionalidade "Reclassificar" será implementada em breve!');
            break;
            
        case "Extração de dados":
            console.log('📤 Ação: Extração de dados');
            alert('Funcionalidade "Extração de dados" será implementada em breve!');
            break;
            
        default:
            console.log('❓ Ação não reconhecida:', e.detail.label);
            break;
    }
}

/**
 * Handler do Menu Cadastro
 */
function handlerMenuCadastro(e) {
    console.log('📝 Menu cadastro:', e.detail.label, e.detail.indice, e.detail.idDiv);

    switch (e.detail.label) {
        case "Retornar":
            console.log('🔙 Retornando ao menu principal');
            alternarMenu('id_menu_cadastro', 'id_menu_principal');
            break;
            
        case "Gupos": // TODO: Corrigir para "Grupos"
            console.log('👥 Abrindo formulário de grupos');
            abrirFormularioGrupos();
            break;
            
        case "Subgrupos":
            console.log('🏷️ Ação: Subgrupos');
            abrirFormularioSubgrupos();
            break;
            
        case "Classificação":
            console.log('🏷️ Ação: Classificação');
            alert('Funcionalidade "Classificação" será implementada em breve!');
            break;
            
        case "Dicas de classificação":
            console.log('💡 Ação: Dicas de classificação');
            alert('Funcionalidade "Dicas de classificação" será implementada em breve!');
            break;
            
        default:
            console.log('❓ Ação não reconhecida:', e.detail.label);
            break;
    }
}

/**
 * Handler do Menu Relatórios-1
 */
function handlerMenuRel1(e) {
    console.log('📊 Menu Relatórios-1:', e.detail.label, e.detail.indice, e.detail.idDiv);

    switch (e.detail.label) {
        case "Retornar":
            console.log('🔙 Retornando ao menu principal');
            alternarMenu('id_menu_rel_1', 'id_menu_principal');
            break;
            
        case "Despesas":
            console.log('💰 Ação: Relatório de Despesas');
            alert('Relatório "Despesas" será implementado em breve!');
            break;
            
        case "Despesas recorrentes":
            console.log('🔄 Ação: Despesas recorrentes');
            alert('Relatório "Despesas recorrentes" será implementado em breve!');
            break;
            
        case "RDM":
            console.log('📈 Ação: RDM');
            alert('Relatório "RDM" será implementado em breve!');
            break;
            
        case "RDMCC":
            console.log('📊 Ação: RDMCC');
            alert('Relatório "RDMCC" será implementado em breve!');
            break;
            
        default:
            console.log('❓ Ação não reconhecida:', e.detail.label);
            break;
    }
}

/**
 * Handler do Menu Relatórios-2
 */
function handlerMenuRel2(e) {
    console.log('📈 Menu Relatórios-2:', e.detail.label, e.detail.indice, e.detail.idDiv);

    switch (e.detail.label) {
        case "Retornar":
            console.log('🔙 Retornando ao menu principal');
            alternarMenu('id_menu_rel_2', 'id_menu_principal');
            break;
            
        case "RDMCC ANO":
            console.log('📅 Ação: RDMCC ANO');
            alert('Relatório "RDMCC ANO" será implementado em breve!');
            break;
            
        case "RDMCC 12M":
            console.log('📆 Ação: RDMCC 12M');
            alert('Relatório "RDMCC 12M" será implementado em breve!');
            break;
            
        default:
            console.log('❓ Ação não reconhecida:', e.detail.label);
            break;
    }
}

// ============= FUNÇÕES AUXILIARES PARA FORMULÁRIOS =============

/**
 * Abre o formulário de grupos
 */
function abrirFormularioGrupos() {
    try {
        console.log('🚀 Iniciando formulário de grupos...');
        
        // Limpa a referência anterior já que será substituída
        formularioAtivo = null;
        
        // Cria e exibe o novo formulário
        formularioAtivo = construirFormularioGrupos();
        formularioAtivo.render();
        formularioAtivo.exibir();
        
        console.log('✅ Formulário de grupos aberto com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao abrir formulário de grupos:', error);
        alert('Erro ao abrir formulário de grupos: ' + error.message);
    }
}

/**
 * Abre o formulário de subgrupos
 */
function abrirFormularioSubgrupos() {
    try {
        console.log('🚀 Iniciando formulário de subgrupos...');
        
        // Limpa a referência anterior já que será substituída
        formularioAtivo = null;
        
        // Cria e exibe o novo formulário
        formularioAtivo = construirFormularioSubgrupos();
        formularioAtivo.render();
        formularioAtivo.exibir();
        
        console.log('✅ Formulário de subgrupos aberto com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao abrir formulário de subgrupos:', error);
        alert('Erro ao abrir formulário de subgrupos: ' + error.message);
    }
}

// ============= FUNÇÃO AUXILIAR DE NAVEGAÇÃO =============

/**
 * Alterna entre menus (oculta um e exibe outro)
 * @param {string} menuParaOcultar - ID do menu a ser ocultado
 * @param {string} menuParaExibir - ID do menu a ser exibido
 */
function alternarMenu(menuParaOcultar, menuParaExibir) {
    const elementoOcultar = document.getElementById(menuParaOcultar);
    const elementoExibir = document.getElementById(menuParaExibir);

    if (elementoOcultar) {
        elementoOcultar.style.display = 'none';
        console.log(`✅ Menu ocultado: ${menuParaOcultar}`);
    } else {
        console.warn(`⚠️ Menu não encontrado para ocultar: ${menuParaOcultar}`);
    }

    if (elementoExibir) {
        elementoExibir.style.display = 'flex';
        console.log(`✅ Menu exibido: ${menuParaExibir}`);
    } else {
        console.warn(`⚠️ Menu não encontrado para exibir: ${menuParaExibir}`);
    }
}

//Criando o menu principal e sub menus
export function constroiMenus() {
    // ====================== Menu principal =======================
    const menu_princ = new BarraDeBotoes(
        ["Extração de dados", "Reclassificar", "Cadastro", "Relatórios-1", "Relatórios-2", "Sair"],
        "horizontal",
        "id_menu_principal",
        "cmd"
    );
    menu_princ.renderizar();

    // =============== Criando o sub menu Cadastro ===============
    const menu_cadastro = new BarraDeBotoes(
        ["Gupos", "Subgrupos", "Retornar"],
        "horizontal",
        "id_menu_cadastro",
        "cmd"
    );
    menu_cadastro.renderizar();
    document.getElementById("id_menu_cadastro").style.display = "none";

    // =============== Criando o sub menu Relatórios-1 ===============
    const menu_rel_1 = new BarraDeBotoes(
        ["Despesas", "Despesas recorrentes", "RDM", "RDMCC", "Retornar"],
        "horizontal",
        "id_menu_rel_1",
        "cmd"
    );
    menu_rel_1.renderizar();
    document.getElementById("id_menu_rel_1").style.display = "none";

    // =============== Criando o sub menu Relatórios-2 ===============
    const menu_rel_2 = new BarraDeBotoes(
        ["RDMCC ANO", "RDMCC 12M", "Retornar"],
        "horizontal",
        "id_menu_rel_2",
        "cmd"
    );
    menu_rel_2.renderizar();
    document.getElementById("id_menu_rel_2").style.display = "none";
}
