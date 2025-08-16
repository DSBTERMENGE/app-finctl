import FormComum from "../framework_dsb/frontend/General_Classes/ConstrutorDeForms.js";

/*
************************************************************
       FORMULÁRIO DE GRUPOS FINANCEIROS - FINCTL
************************************************************
 * 📋 FORM_GRUPOS.JS - FinCtl
 * 
 * RESPONSABILIDADES:
 * - Formulário para cadastro de grupos de classificação de despesas
 * - Estrutura simples: apenas grupo + descrição
 * - 1º nível de classificação hierárquica
 * - Usando a arquitetura de formulários do framework DSB
 * 
 * ARQUITETURA:
 * ├── 1. CONSTRUÇÃO DO FORMULÁRIO
 * ├── 2. SISTEMA DE EVENTOS  
 * ├── 3. HANDLERS ESPECÍFICOS
 * ├── 4. FUNÇÕES AUXILIARES
 * ├── 5. VALIDAÇÕES
 * └── 6. SIMULAÇÕES DE DADOS
 */

// ============= 1. CONSTRUÇÃO DO FORMULÁRIO =============

/**
 * 🏗️ FUNÇÃO PRINCIPAL: Constrói o formulário de grupos
 * @returns {FormComum} Instância do formulário configurado
 */
export function construirFormularioGrupos() {
    const formGrupos = new FormComum(
        'Cadastro de Grupos',
        '1º nível de classificação',
        ['input', 'textarea'],
        ['Grupo', 'Descrição'],
        ['grupo', 'descricao'],
        ['texto', 'texto'],
        [
            {linha: 0, coluna: 0}, // Grupo
            {linha: 1, coluna: 0}  // Descrição
        ],
        ['H', 'V'], // Orientação
        [25, 28], // Larguras em rem
        {x: 3, y: 5}, // Posição no canvas
        {
            grupoBotoes: ['S', 'S', 'S'], // Encerrar + Navegação + CRUD
            selects: {
                labels: ['Grupos'],
                campos: ['grupo_nav'],
                larguras: ['300px'],
                arranjo: 'linha'
            }
        }
    );

    // Configura eventos específicos do formulário de grupos
    configurarEventosGrupos();

    // Popula select de navegação com grupos disponíveis
    setTimeout(() => {
        popularSelectNavegacaoGrupos(formGrupos);
    }, 100);

    return formGrupos;
}

// ============= 2. SISTEMA DE EVENTOS =============

/**
 * 🎯 CONFIGURAÇÃO PRINCIPAL: Eventos customizados específicos para grupos
 * Segue o padrão do framework mas com lógica específica do FinCtl
 */
function configurarEventosGrupos() {
    console.log('🔧 DEBUG: configurarEventosGrupos() chamada!'); // DEBUG
    const divRodape = document.getElementById('divRodape');
    console.log('🔧 DEBUG: divRodape encontrado:', divRodape); // DEBUG
    if (divRodape) {
        divRodape.addEventListener('formulario-acao', function(event) {
            console.log('🔧 DEBUG: Evento formulario-acao capturado!', event.detail); // DEBUG
            const { acao, instancia, dados } = event.detail;
            
            console.log(`📋 form_grupos.js: Evento formulario-acao.${acao} capturado`);
            
            // Roteamento das ações específicas para grupos
            switch(acao) {
                case 'encerrar':
                    encerrarFormularioGrupos(instancia, dados);
                    break;
                case 'primeiro':
                    navegarGrupos('primeiro', instancia);
                    break;
                case 'anterior':
                    navegarGrupos('anterior', instancia);
                    break;
                case 'proximo':
                    navegarGrupos('proximo', instancia);
                    break;
                case 'ultimo':
                    navegarGrupos('ultimo', instancia);
                    break;
                case 'novo':
                    novoGrupo(instancia);
                    break;
                case 'editar':
                    editarGrupo(instancia, dados);
                    break;
                case 'excluir':
                    excluirGrupo(instancia, dados);
                    break;
                case 'salvar':
                    salvarGrupo(instancia, dados);
                    break;
                default:
                    console.warn(`Ação '${acao}' não reconhecida em form_grupos.js`);
            }
        });
        
        console.log('✅ form_grupos.js: Listener configurado no divRodape');
    } else {
        console.error('❌ form_grupos.js: divRodape não encontrado');
    }
}

// ============= 3. HANDLERS ESPECÍFICOS =============

// ============= 3. HANDLERS ESPECÍFICOS =============

/**
 * 🚪 HANDLER: Encerrar formulário de grupos
 */
async function encerrarFormularioGrupos(instancia, dados) {
    console.log('🏁 Encerrando formulário de grupos');
    
    // Verificar se há alterações não salvas
    if (temAlteracoesPendentes(instancia)) {
        if (confirm('Há alterações não salvas. Deseja realmente sair?')) {
            // Adiciona a classe hidden para ocultar o formulário
            if (instancia.divContainer) {
                instancia.divContainer.classList.add('hidden');
            }
        }
    } else {
        // Adiciona a classe hidden para ocultar o formulário
        if (instancia.divContainer) {
            instancia.divContainer.classList.add('hidden');
        }
    }
}

/**
 * ⏭️ HANDLER: Navegação entre registros de grupos
 */
async function navegarGrupos(direcao, instancia) {
    console.log(`🔄 Navegando para ${direcao} grupo`);
    
    try {
        const grupo = await buscarGrupoPor(direcao);
        if (grupo) {
            preencherFormularioGrupo(instancia, grupo);
        } else {
            console.log(`Nenhum grupo encontrado na direção: ${direcao}`);
        }
    } catch (error) {
        console.error('Erro na navegação:', error);
        alert('Erro ao navegar entre grupos: ' + error.message);
    }
}

/**
 * 🆕 HANDLER: Criar novo grupo
 */
async function novoGrupo(instancia) {
    console.log('🆕 Criando novo grupo de classificação');
    
    // Limpa formulário - pronto para nova entrada
    instancia.limparCampos();
    
    // Foca no campo grupo para facilitar entrada
    setTimeout(() => {
        const campoGrupo = instancia.form.querySelector('#grupo');
        if (campoGrupo) {
            campoGrupo.focus();
        }
    }, 100);
}

/**
 * ✏️ HANDLER: Habilitar edição do grupo
 */
async function editarGrupo(instancia, dados) {
    console.log('✏️ Modo edição ativado para grupo');
    // A classe já habilita os campos automaticamente
    // Aqui podemos adicionar validações específicas se necessário
}

/**
 * 🗑️ HANDLER: Excluir grupo
 */
async function excluirGrupo(instancia, dados) {
    console.log('🗑️ Excluindo grupo:', dados);
    
    // Verificação básica
    if (!dados.grupo || dados.grupo.trim() === '') {
        alert('Selecione um grupo para excluir');
        return;
    }
    
    try {
        // Verifica se o grupo tem subgrupos ou transações vinculadas
        const temVinculacoes = await verificarVinculacoesGrupo(dados.grupo);
        if (temVinculacoes) {
            alert('Este grupo possui subgrupos ou transações vinculadas e não pode ser excluído');
            return;
        }
        
        if (confirm(`Deseja realmente excluir o grupo "${dados.grupo}"?`)) {
            const resultado = await excluirGrupoBanco(dados.grupo);
            
            if (resultado.sucesso) {
                alert('Grupo excluído com sucesso!');
                instancia.limparCampos();
                // Navegar para próximo registro ou limpar
                await navegarGrupos('proximo', instancia);
            } else {
                alert('Erro ao excluir grupo: ' + resultado.erro);
            }
        }
    } catch (error) {
        console.error('Erro na exclusão:', error);
        alert('Erro na exclusão: ' + error.message);
    }
}

/**
 * 💾 HANDLER: Salvar grupo
 */
async function salvarGrupo(instancia, dados) {
    console.log('💾 Salvando grupo:', dados);
    
    // Validações específicas para grupos
    if (!validarDadosGrupo(dados)) {
        return;
    }
    
    try {
        // Verifica se é criação ou atualização (baseado na existência do nome)
        const isEdicao = dados.grupo && await grupoExiste(dados.grupo);
        
        const resultado = isEdicao 
            ? await atualizarGrupo(dados) 
            : await criarGrupo(dados);
        
        if (resultado.sucesso) {
            alert(`Grupo ${isEdicao ? 'atualizado' : 'criado'} com sucesso!`);
            
            // Se era novo registro, mantém os dados no formulário
            if (!isEdicao) {
                console.log('✅ Novo grupo criado:', dados.grupo);
            }
        } else {
            alert('Erro ao salvar grupo: ' + resultado.erro);
        }
    } catch (error) {
        console.error('Erro no salvamento:', error);
        alert('Erro no salvamento: ' + error.message);
    }
}

// ============= 4. FUNÇÕES AUXILIARES =============

/**
 * � POPULAÇÃO: Select de navegação com grupos disponíveis
 */
async function popularSelectNavegacaoGrupos(instanciaForm) {
    try {
        console.log('🔄 Populando select de navegação de grupos...');
        
        // Obtém todos os grupos disponíveis
        const grupos = await obterTodosGrupos();
        
        if (instanciaForm.objSelect && grupos.length > 0) {
            // Formata os dados para a select
            const opcoes = grupos.map(grupo => ({
                value: grupo.id,
                text: grupo.nome
            }));
            
            // Adiciona opção padrão
            opcoes.unshift({ value: '', text: '-- Selecione um grupo --' });
            
            // Popula a select
            instanciaForm.objSelect.popularSelect('grupo_nav', opcoes);
            
            console.log(`✅ Select populada com ${grupos.length} grupos`);
        } else {
            console.warn('⚠️ Nenhum grupo encontrado ou objSelect não disponível');
        }
        
    } catch (error) {
        console.error('❌ Erro ao popular select de navegação:', error);
    }
}

/**
 * �🔍 BUSCA: Grupo por direção de navegação
 */
async function buscarGrupoPor(direcao) {
    console.log(`🔍 Buscando grupo: ${direcao}`);
    
    // Simula busca no banco - IMPLEMENTAR com API real
    const grupos = await obterTodosGrupos();
    
    switch(direcao) {
        case 'primeiro':
            return grupos.length > 0 ? grupos[0] : null;
        case 'ultimo':
            return grupos.length > 0 ? grupos[grupos.length - 1] : null;
        case 'anterior':
        case 'proximo':
            // Implementar lógica de navegação baseada no registro atual
            return grupos.length > 0 ? grupos[0] : null;
        default:
            return null;
    }
}

/**
 * 📝 PREENCHIMENTO: Formulário com dados do grupo
 */
function preencherFormularioGrupo(instancia, grupo) {
    const form = instancia.form;
    
    // Preenche campos simplificados
    if (form.querySelector('#grupo')) form.querySelector('#grupo').value = grupo.grupo || '';
    if (form.querySelector('#descricao')) form.querySelector('#descricao').value = grupo.descricao || '';
    
    console.log('✅ Formulário preenchido com dados do grupo:', grupo.grupo);
}

/**
 * 🔍 VERIFICAÇÃO: Alterações pendentes
 */
function temAlteracoesPendentes(instancia) {
    // Implementar lógica para detectar alterações não salvas
    // Por enquanto retorna false
    return false;
}

// ============= 5. VALIDAÇÕES =============

/**
 * ✅ VALIDAÇÃO: Dados do grupo
 */
function validarDadosGrupo(dados) {
    // Validações obrigatórias para classificação de despesas
    if (!dados.grupo || dados.grupo.trim() === '') {
        alert('Nome do grupo é obrigatório');
        return false;
    }
    
    if (!dados.descricao || dados.descricao.trim() === '') {
        alert('Descrição do grupo é obrigatória');
        return false;
    }
    
    // Verifica se o nome do grupo é muito curto
    if (dados.grupo.trim().length < 2) {
        alert('Nome do grupo deve ter pelo menos 2 caracteres');
        return false;
    }
    
    return true;
}

/**
 * 📧 VALIDAÇÃO: Formato de email (auxiliar)
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============= 6. SIMULAÇÕES DE DADOS =============

/**
 * 📊 DADOS DE TESTE: Obter todos os grupos
 */
async function obterTodosGrupos() {
    console.log('📊 Buscando todos os grupos de classificação');
    // Simula dados do banco - grupos de classificação de despesas
    return Promise.resolve([
        {
            grupo: 'Alimentação',
            descricao: 'Despesas com alimentação em geral: supermercados, restaurantes, delivery'
        },
        {
            grupo: 'Transporte',
            descricao: 'Gastos com locomoção: combustível, transporte público, aplicativos'
        },
        {
            grupo: 'Moradia',
            descricao: 'Custos relacionados à habitação: aluguel, financiamento, manutenção'
        },
        {
            grupo: 'Saúde',
            descricao: 'Despesas médicas e de bem-estar: consultas, exames, medicamentos'
        }
    ]);
}

// ============= OPERAÇÕES DO BANCO =============

/**
 * 🔍 Buscar grupo por nome
 */
async function buscarGrupoPorNome(nomeGrupo) {
    console.log('🔍 Buscando grupo por nome:', nomeGrupo);
    const grupos = await obterTodosGrupos();
    return grupos.find(g => g.grupo === nomeGrupo) || null;
}

/**
 * ✅ Verificar se grupo existe
 */
async function grupoExiste(nomeGrupo) {
    const grupo = await buscarGrupoPorNome(nomeGrupo);
    return grupo !== null;
}

/**
 * 🔗 Verificar vinculações do grupo
 */
async function verificarVinculacoesGrupo(nomeGrupo) {
    console.log('🔗 Verificando subgrupos e transações vinculadas ao grupo:', nomeGrupo);
    // Simula verificação - implementar consulta real
    return Promise.resolve(false);
}

/**
 * 💾 Criar grupo no banco
 */
async function criarGrupo(dados) {
    console.log('💾 Criando grupo de classificação:', dados);
    // Simula criação - implementar API real
    return Promise.resolve({
        sucesso: true,
        grupo: dados.grupo,
        mensagem: 'Grupo de classificação criado com sucesso'
    });
}

/**
 * 📝 Atualizar grupo no banco
 */
async function atualizarGrupo(dados) {
    console.log('📝 Atualizando grupo de classificação:', dados);
    // Simula atualização - implementar API real
    return Promise.resolve({
        sucesso: true,
        mensagem: 'Grupo de classificação atualizado com sucesso'
    });
}

/**
 * 🗑️ Excluir grupo do banco
 */
async function excluirGrupoBanco(nomeGrupo) {
    console.log('🗑️ Excluindo grupo do banco:', nomeGrupo);
    return Promise.resolve({
        sucesso: true,
        mensagem: 'Grupo de classificação excluído com sucesso'
    });
}
