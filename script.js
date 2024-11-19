// Função para carregar produtos do backend e adicionar à tabela
async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3358/produto');
        const produtos = await response.json();

        const tabela = document.querySelector('#area-menu-produtos tbody');
        tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td><span class="validade" data-validade="${produto.data_validade}">${formatarData(produto.data_validade)}</span></td>
            `;
            tabela.appendChild(row);
        });

        // Chama a função de verificação após carregar os produtos
        verificarVencimento();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Função para verificar a validade dos produtos e notificar se estiverem próximos do vencimento
function verificarVencimento() {
    const dataAtual = new Date();
    const datasValidade = document.querySelectorAll('.validade');

    datasValidade.forEach(item => {
        const dataValidade = new Date(item.getAttribute('data-validade'));
        const diferencaEmDias = Math.floor((dataValidade - dataAtual) / (1000 * 60 * 60 * 24));

        if (diferencaEmDias <= 7 && diferencaEmDias >= 0) {
            alert(`Atenção! O produto "${item.closest('tr').children[1].innerText}" irá vencer em ${diferencaEmDias} dias.`);
            abrirModal(`O produto "${descricaoProduto}" irá vencer em ${diferencaEmDias} dias.`);
        }
    });
}

// Função para consultar total de vendas em um intervalo de datas
async function consultarVendas() {
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;
    const resultadoVendas = document.getElementById('resultado-vendas');

    if (!dataInicio || !dataFim) {
        alert('Por favor, selecione as datas para consulta.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3358/total-vendas?dataInicio=${dataInicio}&dataFim=${dataFim}`);
        const { totalVendas, totalProdutos } = await response.json();

        resultadoVendas.innerHTML = `
            <p>Total de Vendas: R$ ${totalVendas.toFixed(2)}</p>
            <p>Total de Produtos Saídos: ${totalProdutos}</p>
        `;
    } catch (error) {
        console.error('Erro ao consultar vendas:', error);
        resultadoVendas.innerHTML = '<p>Erro ao buscar total de vendas.</p>';
    }
}

// Função para abrir o modal com a mensagem
function abrirModal(mensagem) {
    const modal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = mensagem;
    modal.style.display = 'block';
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('alert-modal');
    modal.style.display = 'none';
}

// Fechar o modal se o usuário clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('alert-modal');
    if (event.target == modal) {
        fecharModal();
    }
}

// Função para formatar data no formato brasileiro (dd/mm/yyyy)
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Carregar produtos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);
