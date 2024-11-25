// Classe base para abstrair entidades
class Entidade {
    constructor(dados) {
        Object.assign(this, dados);
    }

    salvar() {
        console.log(`Salvando ${this.constructor.name}:`, this);
    }
}

// Classe Produto
class Produto extends Entidade {
    static async carregarProdutos() {
        const response = await fetch('http://localhost:3358/produto');
        return await response.json();
    }

    static exibirProdutos(produtos) {
        const tabela = document.querySelector('#area-menu-produtos tbody');
        tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td><span class="validade" data-validade="${produto.data_validade}">${Produto.formatarData(produto.data_validade)}</span></td>
            `;
            tabela.appendChild(row);
        });
    }

    static formatarData(data) {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    validarEstoque() {
        if (this.quantidade <= 0) {
            console.warn(`Produto ${this.descricao} está sem estoque.`);
        }
    }
}

// Classe Venda
class Venda extends Entidade {
    calcularTotal() {
        return this.quantidade * this.valorUnitario;
    }

    static async consultarVendas(dataInicio, dataFim) {
        const response = await fetch(`http://localhost:3358/total-vendas?dataInicio=${dataInicio}&dataFim=${dataFim}`);
        return await response.json();
    }
}

// Função para exibir vendas
async function consultarVendas() {
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;

    if (!dataInicio || !dataFim) {
        alert('Por favor, selecione as datas para consulta.');
        return;
    }

    const { totalVendas, totalProdutos } = await Venda.consultarVendas(dataInicio, dataFim);

    const resultado = document.getElementById('resultado-vendas');
    resultado.innerHTML = `
        <p>Total de Vendas: R$ ${totalVendas.toFixed(2)}</p>
        <p>Total de Produtos Saídos: ${totalProdutos}</p>
    `;
}

// Carregar os produtos ao iniciar
document.addEventListener('DOMContentLoaded', async () => {
    const produtos = await Produto.carregarProdutos();
    Produto.exibirProdutos(produtos);
});

// Array local para armazenar os produtos
let produtosLocais = [];

// Carregar produtos do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtosLocais')) || [];
    produtosLocais = produtosSalvos;
    Produto.exibirProdutos(produtosLocais);
});

// Evento para adicionar um produto
document.getElementById('form-adicionar-produto').addEventListener('submit', event => {
    event.preventDefault();

    // Capturar os valores do formulário
    const codigo = document.getElementById('codigo-produto').value;
    const descricao = document.getElementById('descricao-produto').value;
    const quantidade = parseInt(document.getElementById('quantidade-produto').value, 10);
    const validade = document.getElementById('validade-produto').value;

    // Criar um objeto produto
    const novoProduto = { codigo, descricao, quantidade, data_validade: validade };

    // Adicionar ao array local
    produtosLocais.push(novoProduto);

    // Salvar no localStorage
    localStorage.setItem('produtosLocais', JSON.stringify(produtosLocais));

    // Atualizar a tabela
    Produto.exibirProdutos(produtosLocais);

    // Limpar o formulário
    event.target.reset();
});

// Classe Produto
class Produto {
    static exibirProdutos(produtos) {
        const tabela = document.querySelector('#area-menu-produtos tbody');
        tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td><span class="validade" data-validade="${produto.data_validade}">${Produto.formatarData(produto.data_validade)}</span></td>
            `;
            tabela.appendChild(row);
        });
    }

    static formatarData(data) {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
}

