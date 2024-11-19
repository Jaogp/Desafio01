<?php
// Conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "gestaoestoque");

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta para selecionar produtos e calcular totais
$sql = "SELECT idvenda, idproduto, quantidade_produto, valor_total_venda FROM venda";
$result = $conn->query($sql);

// Variáveis para acumular os totais
$total_produtos_vendidos = 0;
$valor_total_vendas = 0.0;

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['idvenda']}</td>
                <td>{$row['idproduto']}</td>
                <td>{$row['quantidade_produto']}</td>
                <td>{$row['valor_total_venda']}</td>
              </tr>";
        
        // Acumular os totais
        $total_produtos_vendidos += $row['quantidade_produto'];
        $total_vendas += $row['valor_total_venda'];
    }
} else {
    echo "<tr><td colspan='4'>Nenhum produto encontrado</td></tr>";
}

// Exibir o total de produtos e vendas
echo "<tr>
        <td colspan='2'><strong>Total</strong></td>
        <td><strong>$total_produtos_vendidos</strong></td>
        <td><strong>R$ $valor_total_vendas</strong></td>
      </tr>";

$conn->close();
?>
