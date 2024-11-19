const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3358;

// Configuração de conexão com o MySQL
const db = mysql.createConnection({
  host: '127.0.0.1', // ou IP do seu servidor de banco de dados
  user: 'adri', // usuário do MySQL
  password: '1234', // senha do MySQL
  database: 'gestaoEstoque' // nome do banco de dados
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rota para buscar registros da tabela
app.get('/produto', (req, res) => {
  const sql = 'SELECT * FROM produto';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados');
      console.error(err);
      return;
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Nova rota para calcular total de vendas e produtos saídos em um intervalo de datas
app.get('/total-vendas', (req, res) => {
  const { dataInicio, dataFim } = req.query;
  const sql = `
    SELECT SUM(valor) AS totalVendas, SUM(quantidade) AS totalProdutos
    FROM vendas
    WHERE data_venda BETWEEN ? AND ?;
  `;
  db.query(sql, [dataInicio, dataFim], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar total de vendas');
      console.error(err);
      return;
    }
    res.json(results[0]);
  });
});

