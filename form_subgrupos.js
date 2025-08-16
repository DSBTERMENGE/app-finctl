import FormComum from "../framework_dsb/frontend/General_Classes/ConstrutorDeForms.js";

/*
************************************************************
       FORMULÁRIO DE SUBGRUPOS FINANCEIROS - FINCTL
************************************************************
 * 📋 FORM_SUBGRUPOS.JS - FinCtl
 * 
 * RESPONSABILIDADES:
 * - Formulário para cadastro de subgrupos de classificação de despesas
 * - Estrutura hierárquica: select grupo + subgrupo + descrições
 * - 2º nível de classificação hierárquica
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
 * 🏗️ FUNÇÃO PRINCIPAL: Constrói o formulário de subgrupos
 * @returns {FormComum} Instância do formulário configurado
 */
export function construirFormularioSubgrupos() {
    const formSubgrupos = new FormComum(
        'Cadastro de Subgrupos',
        '2º nível de classificação',
        ['input', 'textarea', 'textarea'],
        ['Subgrupo', 'Descrição', 'Dicas de Classificação'],
        ['subgrupo', 'descricao_subGrp', 'Dicas_classif'],
        ['texto', 'texto', 'texto'],
        [
            {linha: 0, coluna: 0}, // Subgrupo (input)
            {linha: 1, coluna: 0}, // Descrição (textarea)
            {linha: 2, coluna: 0}  // Dicas de Classificação (textarea)
        ],
        ['H', 'V', 'V'], // Orientação
        [28, 35, 35], // Larguras em rem
        {x: 3, y: 5}, // Posição no canvas
        {
            grupoBotoes: ['S', 'S', 'S'], // Encerrar + Navegação + CRUD
            selects: {
                labels: ['Grupo'],
                campos: ['grupo'],
                larguras: ['250px'],
                arranjo: 'linha'
            }
        }
    );

    // Configura eventos específicos do formulário de subgrupos
    configurarEventosSubgrupos();

    // Popula select com grupos disponíveis
    setTimeout(() => {
        popularSelectGrupos(formSubgrupos);
    }, 100);

    return formSubgrupos;
}

// ============= 2. SISTEMA DE EVENTOS =============

/**
 * 🎯 CONFIGURAÇÃO PRINCIPAL: Eventos customizados específicos para subgrupos
 * Segue o padrão do framework mas com lógica específica do FinCtl
 */
function configurarEventosSubgrupos() {
    console.log('🔧 DEBUG SUBGRUPOS: configurarEventosSubgrupos() chamada!'); // DEBUG
    const divRodape = document.getElementById('divRodape');
    console.log('🔧 DEBUG SUBGRUPOS: divRodape encontrado:', divRodape); // DEBUG
    if (divRodape) {
        divRodape.addEventListener('formulario-acao', function(event) {
            console.log('🔧 DEBUG SUBGRUPOS: Evento formulario-acao capturado!', event.detail); // DEBUG
            const { acao, instancia, dados } = event.detail;
            
            console.log(`📋 form_subgrupos.js: Evento formulario-acao.${acao} capturado`);
            
            // Roteamento das ações específicas para subgrupos
            switch(acao) {
                case 'encerrar':
                    encerrarFormularioSubgrupos(instancia, dados);
                    break;
                case 'primeiro':
                    navegarSubgrupos('primeiro', instancia);
                    break;
                case 'anterior':
                    navegarSubgrupos('anterior', instancia);
                    break;
                case 'proximo':
                    navegarSubgrupos('proximo', instancia);
                    break;
                case 'ultimo':
                    navegarSubgrupos('ultimo', instancia);
                    break;
                case 'novo':
                    novoSubgrupo(instancia);
                    break;
                case 'editar':
                    editarSubgrupo(instancia, dados);
                    break;
                case 'excluir':
                    excluirSubgrupo(instancia, dados);
                    break;
                case 'salvar':
                    salvarSubgrupo(instancia, dados);
                    break;
                default:
                    console.warn(`Ação '${acao}' não reconhecida em form_subgrupos.js`);
            }
        });
        
        console.log('✅ form_subgrupos.js: Listener configurado no divRodape');
    } else {
        console.error('❌ form_subgrupos.js: divRodape não encontrado');
    }
}

// ============= 3. HANDLERS ESPECÍFICOS =============

/**
 * 🚪 HANDLER: Encerrar formulário de subgrupos
 */
async function encerrarFormularioSubgrupos(instancia, dados) {
    console.log('🔧 DEBUG SUBGRUPOS: encerrarFormularioSubgrupos() chamada!'); // DEBUG
    console.log('🏁 Encerrando formulário de subgrupos');
    
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
 * ⏭️ HANDLER: Navegação entre registros de subgrupos
 */
async function navegarSubgrupos(direcao, instancia) {
    console.log(`🔄 Navegando para ${direcao} subgrupo`);
    
    try {
        const subgrupo = await buscarSubgrupoPor(direcao);
        if (subgrupo) {
            preencherFormularioSubgrupo(instancia, subgrupo);
        } else {
            console.log(`Nenhum subgrupo encontrado na direção: ${direcao}`);
        }
    } catch (error) {
        console.error('Erro na navegação:', error);
        alert('Erro ao navegar entre subgrupos: ' + error.message);
    }
}

/**
 * 🆕 HANDLER: Criar novo subgrupo
 */
async function novoSubgrupo(instancia) {
    console.log('🆕 Criando novo subgrupo de classificação');
    
    // Limpa formulário - pronto para nova entrada
    instancia.limparCampos();
    
    // Foca no select grupo para facilitar entrada
    setTimeout(() => {
        const selectGrupo = instancia.form.querySelector('#grupo');
        if (selectGrupo) {
            selectGrupo.focus();
        }
    }, 100);
}

/**
 * ✏️ HANDLER: Habilitar edição do subgrupo
 */
async function editarSubgrupo(instancia, dados) {
    console.log('✏️ Modo edição ativado para subgrupo');
    // A classe já habilita os campos automaticamente
    // Aqui podemos adicionar validações específicas se necessário
}

/**
 * 🗑️ HANDLER: Excluir subgrupo
 */
async function excluirSubgrupo(instancia, dados) {
    console.log('🗑️ Excluindo subgrupo:', dados);
    
    // Verificação básica
    if (!dados.subgrupo || dados.subgrupo.trim() === '') {
        alert('Selecione um subgrupo para excluir');
        return;
    }
    
    if (!dados.grupo || dados.grupo.trim() === '') {
        alert('Grupo não identificado para o subgrupo');
        return;
    }
    
    try {
        // Verifica se o subgrupo tem transações vinculadas
        const temVinculacoes = await verificarVinculacoesSubgrupo(dados.grupo, dados.subgrupo);
        if (temVinculacoes) {
            alert('Este subgrupo possui transações vinculadas e não pode ser excluído');
            return;
        }
        
        if (confirm(`Deseja realmente excluir o subgrupo "${dados.subgrupo}" do grupo "${dados.grupo}"?`)) {
            const resultado = await excluirSubgrupoBanco(dados.grupo, dados.subgrupo);
            
            if (resultado.sucesso) {
                alert('Subgrupo excluído com sucesso!');
                instancia.limparCampos();
                // Navegar para próximo registro ou limpar
                await navegarSubgrupos('proximo', instancia);
            } else {
                alert('Erro ao excluir subgrupo: ' + resultado.erro);
            }
        }
    } catch (error) {
        console.error('Erro na exclusão:', error);
        alert('Erro na exclusão: ' + error.message);
    }
}

/**
 * 💾 HANDLER: Salvar subgrupo
 */
async function salvarSubgrupo(instancia, dados) {
    console.log('💾 Salvando subgrupo:', dados);
    
    // Validações específicas para subgrupos
    if (!validarDadosSubgrupo(dados)) {
        return;
    }
    
    try {
        // Verifica se é criação ou atualização
        const isEdicao = dados.subgrupo && await subgrupoExiste(dados.grupo, dados.subgrupo);
        
        const resultado = isEdicao 
            ? await atualizarSubgrupo(dados) 
            : await criarSubgrupo(dados);
        
        if (resultado.sucesso) {
            alert(`Subgrupo ${isEdicao ? 'atualizado' : 'criado'} com sucesso!`);
            
            // Se era novo registro, mantém os dados no formulário
            if (!isEdicao) {
                console.log('✅ Novo subgrupo criado:', `${dados.grupo} > ${dados.subgrupo}`);
            }
        } else {
            alert('Erro ao salvar subgrupo: ' + resultado.erro);
        }
    } catch (error) {
        console.error('Erro no salvamento:', error);
        alert('Erro no salvamento: ' + error.message);
    }
}

// ============= 4. FUNÇÕES AUXILIARES =============

/**
 * 🔍 BUSCA: Subgrupo por direção de navegação
 */
async function buscarSubgrupoPor(direcao) {
    console.log(`🔍 Buscando subgrupo: ${direcao}`);
    
    // Simula busca no banco - IMPLEMENTAR com API real
    const subgrupos = await obterTodosSubgrupos();
    
    switch(direcao) {
        case 'primeiro':
            return subgrupos.length > 0 ? subgrupos[0] : null;
        case 'ultimo':
            return subgrupos.length > 0 ? subgrupos[subgrupos.length - 1] : null;
        case 'anterior':
        case 'proximo':
            // Implementar lógica de navegação baseada no registro atual
            return subgrupos.length > 0 ? subgrupos[0] : null;
        default:
            return null;
    }
}

/**
 * 📝 PREENCHIMENTO: Formulário com dados do subgrupo
 */
function preencherFormularioSubgrupo(instancia, subgrupo) {
    const form = instancia.form;
    
    // Preenche campos do subgrupo
    if (form.querySelector('#grupo')) form.querySelector('#grupo').value = subgrupo.grupo || '';
    if (form.querySelector('#subgrupo')) form.querySelector('#subgrupo').value = subgrupo.subgrupo || '';
    if (form.querySelector('#descricao_subGrp')) form.querySelector('#descricao_subGrp').value = subgrupo.descricao_subGrp || '';
    if (form.querySelector('#Dicas_classif')) form.querySelector('#Dicas_classif').value = subgrupo.Dicas_classif || '';
    
    console.log('✅ Formulário preenchido com dados do subgrupo:', `${subgrupo.grupo} > ${subgrupo.subgrupo}`);
}

/**
 * 🔽 POPULAÇÃO: Select com grupos disponíveis
 */
async function popularSelectGrupos(instancia) {
    try {
        const grupos = await obterTodosGrupos();
        const selectGrupo = instancia.form.querySelector('#grupo');
        
        if (selectGrupo && grupos.length > 0) {
            // Limpa opções existentes
            selectGrupo.innerHTML = '<option value="">Selecione um grupo...</option>';
            
            // Adiciona grupos disponíveis
            grupos.forEach(grupo => {
                const option = document.createElement('option');
                option.value = grupo.grupo;
                option.textContent = grupo.grupo;
                selectGrupo.appendChild(option);
            });
            
            console.log('✅ Select de grupos populado com', grupos.length, 'itens');
        }
    } catch (error) {
        console.error('Erro ao popular select de grupos:', error);
    }
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
 * ✅ VALIDAÇÃO: Dados do subgrupo
 */
function validarDadosSubgrupo(dados) {
    // Validação do grupo (obrigatório)
    if (!dados.grupo || dados.grupo.trim() === '') {
        alert('Selecione um grupo para o subgrupo');
        return false;
    }
    
    // Validação do nome do subgrupo (obrigatório)
    if (!dados.subgrupo || dados.subgrupo.trim() === '') {
        alert('Nome do subgrupo é obrigatório');
        return false;
    }
    
    // Validação da descrição (obrigatória)
    if (!dados.descricao_subGrp || dados.descricao_subGrp.trim() === '') {
        alert('Descrição do subgrupo é obrigatória');
        return false;
    }
    
    // Validação das dicas (obrigatória)
    if (!dados.Dicas_classif || dados.Dicas_classif.trim() === '') {
        alert('Dicas de classificação são obrigatórias');
        return false;
    }
    
    // Verifica se o nome do subgrupo é muito curto
    if (dados.subgrupo.trim().length < 2) {
        alert('Nome do subgrupo deve ter pelo menos 2 caracteres');
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
 * 📊 DADOS DE TESTE: Obter todos os grupos (reutiliza do form_grupos)
 */
async function obterTodosGrupos() {
    console.log('📊 Buscando todos os grupos para select');
    // Reutiliza dados dos grupos para popular o select
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

/**
 * 📊 DADOS DE TESTE: Obter todos os subgrupos
 */
async function obterTodosSubgrupos() {
    console.log('📊 Buscando todos os subgrupos de classificação');
    // Simula dados do banco - subgrupos de classificação de despesas
    return Promise.resolve([
        {
            grupo: 'Alimentação',
            subgrupo: 'Supermercado',
            descricao_subGrp: 'Compras em supermercados e hipermercados',
            Dicas_classif: 'Inclui: produtos de limpeza, higiene pessoal, alimentos básicos'
        },
        {
            grupo: 'Alimentação',
            subgrupo: 'Restaurantes',
            descricao_subGrp: 'Refeições em restaurantes, lanchonetes e delivery',
            Dicas_classif: 'Inclui: almoço, jantar, lanches, delivery de comida'
        },
        {
            grupo: 'Transporte',
            subgrupo: 'Combustível',
            descricao_subGrp: 'Gastos com gasolina, álcool, diesel',
            Dicas_classif: 'Inclui: abastecimento do veículo próprio'
        },
        {
            grupo: 'Transporte',
            subgrupo: 'Transporte Público',
            descricao_subGrp: 'Ônibus, metrô, trem, táxi, uber',
            Dicas_classif: 'Inclui: passagem, cartão transporte, aplicativos de mobilidade'
        },
        {
            grupo: 'Moradia',
            subgrupo: 'Aluguel',
            descricao_subGrp: 'Pagamento de aluguel residencial',
            Dicas_classif: 'Inclui: aluguel, taxas de administração, seguro'
        },
        {
            grupo: 'Saúde',
            subgrupo: 'Consultas Médicas',
            descricao_subGrp: 'Consultas com médicos e especialistas',
            Dicas_classif: 'Inclui: consulta particular, copagamento plano de saúde'
        }
    ]);
}

/**
 * 🔍 BUSCA: Subgrupo por grupo e nome
 */
async function buscarSubgrupoPorNome(nomeGrupo, nomeSubgrupo) {
    console.log('🔍 Buscando subgrupo por nome:', `${nomeGrupo} > ${nomeSubgrupo}`);
    const subgrupos = await obterTodosSubgrupos();
    return subgrupos.find(s => s.grupo === nomeGrupo && s.subgrupo === nomeSubgrupo) || null;
}

/**
 * ✅ VERIFICAÇÃO: Se subgrupo existe
 */
async function subgrupoExiste(nomeGrupo, nomeSubgrupo) {
    const subgrupo = await buscarSubgrupoPorNome(nomeGrupo, nomeSubgrupo);
    return subgrupo !== null;
}

/**
 * 🔗 VERIFICAÇÃO: Vinculações do subgrupo
 */
async function verificarVinculacoesSubgrupo(nomeGrupo, nomeSubgrupo) {
    console.log('🔗 Verificando transações vinculadas ao subgrupo:', `${nomeGrupo} > ${nomeSubgrupo}`);
    // Simula verificação - implementar consulta real
    return Promise.resolve(false);
}

/**
 * 💾 OPERAÇÃO: Criar subgrupo no banco
 */
async function criarSubgrupo(dados) {
    console.log('💾 Criando subgrupo de classificação:', dados);
    // Simula criação - implementar API real
    return Promise.resolve({
        sucesso: true,
        subgrupo: `${dados.grupo} > ${dados.subgrupo}`,
        mensagem: 'Subgrupo de classificação criado com sucesso'
    });
}

/**
 * 📝 OPERAÇÃO: Atualizar subgrupo no banco
 */
async function atualizarSubgrupo(dados) {
    console.log('📝 Atualizando subgrupo de classificação:', dados);
    // Simula atualização - implementar API real
    return Promise.resolve({
        sucesso: true,
        mensagem: 'Subgrupo de classificação atualizado com sucesso'
    });
}

/**
 * 🗑️ OPERAÇÃO: Excluir subgrupo do banco
 */
async function excluirSubgrupoBanco(nomeGrupo, nomeSubgrupo) {
    console.log('🗑️ Excluindo subgrupo do banco:', `${nomeGrupo} > ${nomeSubgrupo}`);
    return Promise.resolve({
        sucesso: true,
        mensagem: 'Subgrupo de classificação excluído com sucesso'
    });
}
