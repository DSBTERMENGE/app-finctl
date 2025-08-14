// ========================================
// CONFIGURAÇÃO DE AMBIENTE
// ========================================
const USAR_NPM = false; // true = npm, false = pasta local

// Definir caminho do framework baseado na configuração
const FRAMEWORK_PATH = USAR_NPM 
    ? './node_modules/@dsb/framework-ui/'
    : '../framework-frontend/';

// ========================================
// FUNÇÃO PARA CARREGAR CSS DO FRAMEWORK
// ========================================
function carregarEstilosFramework() {
    const estilos = [
        'style.css',
        'style-botoes.css', 
        'style-formularios.css',
        'style-formTabelas.css',
        'style-selects.css'
    ];
    
    estilos.forEach(arquivo => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${FRAMEWORK_PATH}${arquivo}`;
        document.head.appendChild(link);
    });
}

// ========================================
// IMPORTS DINÂMICOS DO FRAMEWORK
// ========================================
// Carregar estilos primeiro
carregarEstilosFramework();

// Importando a classe principal do framework
import { InterfaceAplicacao } from `${FRAMEWORK_PATH}InterfaceAplicacao.js`;

// ========================================
// CONFIGURAÇÃO DA APLICAÇÃO FINCTL
// ========================================

// Configuração dos menus da aplicação
const configMenus = [
    {
        id: "menu_principal",
        principal: true,
        orientacao: "horizontal",
        botoes: ["Contas", "Categorias", "Transações", "Relatórios", "Configurações", "Sair"]
    },
    {
        id: "menu_relatorios", 
        principal: false,
        orientacao: "horizontal",
        botoes: ["Despesas Mensais", "Receitas", "Balanço", "Gráficos", "Retornar"]
    }
];

// Handlers para os cliques dos botões
const handlers = {
    // Menu principal
    contas: (interfaceApp, detalhe) => {
        console.log('Abrindo gestão de contas...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Gestão de Contas</h2><p>Formulário de contas será implementado aqui.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 50, y: 50});
    },
    
    categorias: (interfaceApp, detalhe) => {
        console.log('Abrindo categorias...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Categorias</h2><p>Gestão de categorias de receitas e despesas.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 100, y: 100});
    },
    
    transacoes: (interfaceApp, detalhe) => {
        console.log('Abrindo transações...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Transações</h2><p>Lançamento e gestão de transações financeiras.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 150, y: 150});
    },
    
    relatorios: (interfaceApp, detalhe) => {
        console.log('Abrindo menu de relatórios...');
        interfaceApp.exibirMenu('menu_relatorios');
    },
    
    configuracoes: (interfaceApp, detalhe) => {
        console.log('Abrindo configurações...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Configurações</h2><p>Configurações gerais da aplicação.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 200, y: 50});
    },
    
    sair: (interfaceApp, detalhe) => {
        if (confirm('Deseja realmente sair da aplicação?')) {
            console.log('Saindo da aplicação...');
            interfaceApp.limparCanvas();
            const msgDiv = document.createElement('div');
            msgDiv.innerHTML = '<h2>Até logo!</h2><p>Obrigado por usar o FinCtl.</p>';
            msgDiv.style.cssText = 'background: #e74c3c; color: white; padding: 20px; border-radius: 8px; text-align: center;';
            interfaceApp.adicionarFormulario(msgDiv, {x: 300, y: 200});
        }
    },
    
    // Menu relatórios
    despesasmensais: (interfaceApp, detalhe) => {
        console.log('Carregando relatório de despesas mensais...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Despesas Mensais</h2><p>Relatório detalhado das despesas do mês.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 50, y: 50});
    },
    
    receitas: (interfaceApp, detalhe) => {
        console.log('Carregando relatório de receitas...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Receitas</h2><p>Relatório de todas as receitas registradas.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 100, y: 100});
    },
    
    balanco: (interfaceApp, detalhe) => {
        console.log('Carregando balanço...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Balanço</h2><p>Balanço financeiro - receitas vs despesas.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 150, y: 150});
    },
    
    graficos: (interfaceApp, detalhe) => {
        console.log('Carregando gráficos...');
        interfaceApp.limparCanvas();
        
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Gráficos</h2><p>Visualizações gráficas dos dados financeiros.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        
        interfaceApp.adicionarFormulario(msgDiv, {x: 200, y: 50});
    },
    
    retornar: (interfaceApp, detalhe) => {
        console.log('Retornando ao menu principal...');
        interfaceApp.voltarMenuPrincipal();
        interfaceApp.limparCanvas();
    }
};

// Configuração completa da aplicação
const configApp = {
    titulo: "FinCtl",
    descricao: "Sistema de Controle Financeiro Pessoal",
    versao: "1.0.0",
    icone: `${FRAMEWORK_PATH}Assets/icon_app.svg`,
    menus: configMenus,
    handlers: handlers
};

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando FinCtl...');
    console.log(`Modo: ${USAR_NPM ? 'NPM' : 'Local'} - Framework Path: ${FRAMEWORK_PATH}`);
    
    try {
        const app = new InterfaceAplicacao(configApp);
        app.inicializar();
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        console.log('Verifique se o framework está disponível no caminho:', FRAMEWORK_PATH);
    }
});
