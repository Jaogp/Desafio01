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
            <a href="produtos.php">Produtos</a>
            <a href="vendas.php">Vendas</a>
        </nav>
    </header>

    <!-- Área Principal -->
    <div id="area-principal">
        <div id="area-produtos">
            <h2>Produtos</h2>
        </div>

        <!-- Tabela de Produtos -->
        <div id="area-menu-produtos">
            <table>
                <thead>
                    <tr>
                        <th>Código de Produto</th>
                        <th>Categoria</th>
                        <th>Descrição do Produto</th>
                        <th>Quantidade</th>
                        <th>Valor unitário</th>
                        <th>Data de Cadastro</th>
                        <th>Data de Validade</th>
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
                    $sql = "SELECT idproduto, categoria, nome_produto, estoque_atual, valor_unitario, data_cadastro, data_validade FROM produto";
                    $result = $conn->query($sql);

                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>
                                    <td>{$row['idproduto']}</td>
                                    <td>{$row['categoria']}</td>
                                    <td>{$row['nome_produto']}</td>
                                    <td>{$row['estoque_atual']}</td>
                                    <td>{$row['valor_unitario']}</td>
                                    <td>" . date('d/m/Y', strtotime($row['data_cadastro'])) . "</td>
                                    <td>" . date('d/m/Y', strtotime($row['data_validade'])) . "</td>
                                  </tr>";
                        }
                    } else {
                        echo "<tr><td colspan='6'>Nenhum produto encontrado</td></tr>";
                    }
                    $conn->close();
                    ?>
                </tbody>
            </table>
        </div>

    <!-- Modal de Alerta -->
    <div id="alert-modal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="fecharModal()">&times;</span>
            <h2>Atenção!</h2>
            <p id="alert-message"></p>
        </div>
    </div>

    <!-- Conectar o arquivo JavaScript -->
    <script src="script.js"></script>
</body>
</html>
