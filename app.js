// Importando as classes do framework
import { BarraDeBotoes } from './node_modules/@dsb/framework-ui/General_Classes/ConstrutorDeBarrasDeBotoes.js';
import { CriarTitulos } from './node_modules/@dsb/framework-ui/General_Classes/ConstrutorDeTitulos.js';

// Classe principal da aplicação FinCtl
class FinCtlApp {
    constructor() {
        this.menuAtual = 'principal';
        this.canvas = null;
    }

    inicializar() {
        console.log('Inicializando FinCtl...');
        
        // Criar estrutura básica da página
        this.criarEstrutura();
        
        // Criar título
        this.criarTitulo();
        
        // Criar menu principal
        this.criarMenuPrincipal();
        
        // Configurar canvas para formulários
        this.configurarCanvas();
        
        // Adicionar informações no rodapé
        this.configurarRodape();
    }
    
    criarEstrutura() {
        // Criar estrutura básica se não existir
        if (!document.getElementById('cabecalho')) {
            const body = document.body;
            body.innerHTML = `
                <div id="cabecalho" class="cabecalho"></div>
                <div id="corpo" class="corpo"></div>
                <div id="rodape" class="rodape"></div>
            `;
        }
    }
    
    criarTitulo() {
        const titulo = new CriarTitulos(
            "FinCtl", 
            "Sistema de Controle Financeiro Pessoal",
            "node_modules/@dsb/framework-ui/Assets/icon_app.svg"
        );
        titulo.renderizar();
    }
    
    criarMenuPrincipal() {
        const menuPrincipal = new BarraDeBotoes(
            ["Contas", "Categorias", "Transações", "Relatórios", "Configurações", "Sair"],
            "horizontal",
            "menu_principal",
            "finctl"
        );
        menuPrincipal.renderizar();
        
        // Registrar eventos do menu principal
        this.registrarEventosMenuPrincipal();
    }
    
    criarMenuRelatorios() {
        // Limpar menu anterior
        const menuContainer = document.getElementById('menu_principal');
        if (menuContainer) {
            menuContainer.innerHTML = '';
        }
        
        const menuRelatorios = new BarraDeBotoes(
            ["Despesas Mensais", "Receitas", "Balanço", "Gráficos", "Retornar"],
            "horizontal",
            "menu_relatorios",
            "finctl"
        );
        menuRelatorios.renderizar();
        
        // Registrar eventos do menu relatórios
        this.registrarEventosMenuRelatorios();
    }
    
    configurarCanvas() {
        // Criar área para formulários se não existir
        let canvas = document.getElementById('canvas_formularios');
        if (!canvas) {
            canvas = document.createElement('div');
            canvas.id = 'canvas_formularios';
            canvas.style.cssText = `
                position: relative;
                width: 100%;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
            `;
            
            const corpo = document.getElementById('corpo');
            if (corpo) {
                corpo.appendChild(canvas);
            }
        }
        this.canvas = canvas;
    }
    
    limparCanvas() {
        if (this.canvas) {
            this.canvas.innerHTML = '';
        }
    }
    
    adicionarFormulario(elemento, posicao = {x: 50, y: 50}) {
        if (this.canvas) {
            elemento.style.position = 'absolute';
            elemento.style.left = posicao.x + 'px';
            elemento.style.top = posicao.y + 'px';
            this.canvas.appendChild(elemento);
        }
    }
    
    registrarEventosMenuPrincipal() {
        // Aguardar um pouco para os elementos serem criados
        setTimeout(() => {
            const botoes = document.querySelectorAll('#menu_principal button');
            botoes.forEach((botao, index) => {
                botao.addEventListener('click', () => {
                    const texto = botao.textContent.toLowerCase().replace(/\s+/g, '');
                    this.handleMenuPrincipal(texto);
                });
            });
        }, 100);
    }
    
    registrarEventosMenuRelatorios() {
        setTimeout(() => {
            const botoes = document.querySelectorAll('#menu_relatorios button');
            botoes.forEach((botao, index) => {
                botao.addEventListener('click', () => {
                    const texto = botao.textContent.toLowerCase().replace(/\s+/g, '');
                    this.handleMenuRelatorios(texto);
                });
            });
        }, 100);
    }
    
    handleMenuPrincipal(opcao) {
        console.log('Clicou em:', opcao);
        this.limparCanvas();
        
        switch(opcao) {
            case 'contas':
                this.mostrarContas();
                break;
            case 'categorias':
                this.mostrarCategorias();
                break;
            case 'transações':
            case 'transacoes':
                this.mostrarTransacoes();
                break;
            case 'relatórios':
            case 'relatorios':
                this.criarMenuRelatorios();
                break;
            case 'configurações':
            case 'configuracoes':
                this.mostrarConfiguracoes();
                break;
            case 'sair':
                this.sair();
                break;
        }
    }
    
    handleMenuRelatorios(opcao) {
        console.log('Clicou em relatório:', opcao);
        this.limparCanvas();
        
        switch(opcao) {
            case 'despesasmensais':
                this.mostrarDespesasMensais();
                break;
            case 'receitas':
                this.mostrarReceitas();
                break;
            case 'balanço':
            case 'balanco':
                this.mostrarBalanco();
                break;
            case 'gráficos':
            case 'graficos':
                this.mostrarGraficos();
                break;
            case 'retornar':
                this.voltarMenuPrincipal();
                break;
        }
    }
    
    voltarMenuPrincipal() {
        // Recriar menu principal
        const menuContainer = document.getElementById('menu_relatorios');
        if (menuContainer) {
            menuContainer.innerHTML = '';
            menuContainer.id = 'menu_principal';
        }
        this.criarMenuPrincipal();
        this.limparCanvas();
    }
    
    mostrarContas() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Gestão de Contas</h2><p>Formulário de contas será implementado aqui.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 50, y: 50});
    }
    
    mostrarCategorias() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Categorias</h2><p>Gestão de categorias de receitas e despesas.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 100, y: 100});
    }
    
    mostrarTransacoes() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Transações</h2><p>Lançamento e gestão de transações financeiras.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 150, y: 150});
    }
    
    mostrarConfiguracoes() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Configurações</h2><p>Configurações gerais da aplicação.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 200, y: 50});
    }
    
    mostrarDespesasMensais() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Despesas Mensais</h2><p>Relatório detalhado das despesas do mês.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 50, y: 50});
    }
    
    mostrarReceitas() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Receitas</h2><p>Relatório de todas as receitas registradas.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 100, y: 100});
    }
    
    mostrarBalanco() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Balanço</h2><p>Balanço financeiro - receitas vs despesas.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 150, y: 150});
    }
    
    mostrarGraficos() {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = '<h2>Gráficos</h2><p>Visualizações gráficas dos dados financeiros.</p>';
        msgDiv.style.cssText = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
        this.adicionarFormulario(msgDiv, {x: 200, y: 50});
    }
    
    sair() {
        if (confirm('Deseja realmente sair da aplicação?')) {
            console.log('Saindo da aplicação...');
            this.limparCanvas();
            const msgDiv = document.createElement('div');
            msgDiv.innerHTML = '<h2>Até logo!</h2><p>Obrigado por usar o FinCtl.</p>';
            msgDiv.style.cssText = 'background: #e74c3c; color: white; padding: 20px; border-radius: 8px; text-align: center;';
            this.adicionarFormulario(msgDiv, {x: 300, y: 200});
        }
    }
    
    configurarRodape() {
        setTimeout(() => {
            const rodape = document.getElementById('rodape');
            if (rodape) {
                rodape.innerHTML = `<p>FinCtl v1.0.0 - Sistema de Controle Financeiro | Framework DSB</p>`;
            }
        }, 100);
    }
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    const app = new FinCtlApp();
    app.inicializar();
});
