const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3358;

// Classe Database para encapsular operações do banco de dados
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    connect() {
        this.connection.connect(err => {
            if (err) {
                console.error('Erro ao conectar ao MySQL:', err);
                return;
            }
            console.log('Conectado ao MySQL!');
        });
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

// Configuração do banco de dados
const db = new Database({
    host: '127.0.0.1',
    user: 'adri',
    password: '1234',
    database: 'gestaoEstoque'
});
db.connect();

// Rota para buscar produtos
app.get('/produto', async (req, res) => {
    try {
        const produtos = await db.query('SELECT * FROM produto');
        res.json(produtos);
    } catch (err) {
        res.status(500).send('Erro ao buscar produtos');
        console.error(err);
    }
});

// Rota para buscar total de vendas
app.get('/total-vendas', async (req, res) => {
    const { dataInicio, dataFim } = req.query;
    try {
        const vendas = await db.query(
            `
            SELECT SUM(valor) AS totalVendas, SUM(quantidade) AS totalProdutos
            FROM vendas
            WHERE data_venda BETWEEN ? AND ?;
            `,
            [dataInicio, dataFim]
        );
        res.json(vendas[0]);
    } catch (err) {
        res.status(500).send('Erro ao buscar vendas');
        console.error(err);
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

