// canvas.js
// Responsável apenas pela exibição da interface usando o frontend

import { ConstrutorDeInterfaceAplicacao } from './framework_dsb/frontend/General_Classes/ConstrutorDeInterfaceAplicacao.js';
import { BarraDeBotoes } from './framework_dsb/frontend/General_Classes/ConstrutorDeBarrasDeBotoes.js';

// Função para criar títulos (equivalente ao que ui_menu.js fazia)
export function criarTitulos() {
    const config = {
        titulo: 'FinCtl',
        descricao: 'Sistema de Controle Financeiro Pessoal',
        icone: './framework_dsb/frontend/Assets/icon_app.svg'
    };
    
    const interfaceApp = new ConstrutorDeInterfaceAplicacao(config);
    interfaceApp.criarTitulosIntegrado();
}

// Função para registrar listeners (placeholder por enquanto)
export function registrarListeners() {
    console.log('Listeners registrados - implementar conforme necessário');
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
        ["Classificação", "Dicas de classificação", "Retornar"],
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
