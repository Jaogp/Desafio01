<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Gestão de Estoque</title>
    <link rel="stylesheet" href="estilo_projeto.css">
</head>
<body>
    <!-- Cabeçalho -->
    <header id="area-cabecalho">
        <div id="area-logo">
            <h1>Gestão <span class="cinza">Estoque</span></h1>
        </div>
        <!-- Menu de navegação -->
        <nav id="area-menu-cabecalho">
            <a href="index.php">Produtos</a>
            <a href="venda.php">Vendas</a>
        </nav>
    </header>

    <!-- Área Principal -->
    <div id="area-principal">
        <div id="area-produtos">
            <h2>Vendas de produto</h2>
        </div>


        <!-- Seletor de Datas e Botão de Consulta de Vendas -->
    <div id="consulta-vendas">
        <h3>Consultar de Vendas</h3>
        <label>Data Início: <input type="date" id="data-inicio"></label>
        <label>Data Fim: <input type="date" id="data-fim"></label>
        <button onclick="consultarVendas()">Consultar Vendas</button>
        <div id="resultado-vendas"></div>
    </div>


        <!-- Tabela de Produtos -->
        <div id="area-menu-produtos">
            <table>
                <thead>
                    <tr>
                        <th>Código de venda</th>
                        <th>Nome do cliente</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Código de Produto</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                <?php
                // Conexão com o banco de dados
                $conn = new mysqli("localhost", "root", "", "gestaoestoque");

                // Verificar conexão
                if ($conn->connect_error) {
                    die("Conexão falhou: " . $conn->connect_error);
                }

                // Consulta para selecionar produtos
                $sql = "SELECT idvenda, nome_cliente, valor_total_venda, data_venda, idproduto, quantidade_produto FROM venda";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['idvenda']}</td>
                                <td>{$row['nome_cliente']}</td>
                                <td>{$row['valor_total_venda']}</td>
                                <td>{$row['data_venda']}</td>
                                <td>{$row['idproduto']}</td>
                                <td>{$row['quantidade_produto']}</td>
                            </tr>";
                    }
                } else {
                    echo "<tr><td colspan='4'>Nenhum produto encontrado</td></tr>";
                }
                $conn->close();
                ?>
                </tbody>

</body>
</html>