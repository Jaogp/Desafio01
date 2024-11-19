-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 31/10/2024 às 05:58
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `gestaoestoque`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `idproduto` int(11) NOT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `estoque_atual` int(11) DEFAULT NULL,
  `data_cadastro` date DEFAULT NULL,
  `data_validade` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`idproduto`, `categoria`, `nome`, `estoque_atual`, `data_cadastro`, `data_validade`) VALUES
(1, 'Bebida', 'Coca-Cola 350ml', 50, '2024-10-30', '2025-10-30'),
(2, 'Alimento', 'Coxinha de Frango', 72, '2024-10-30', '2024-11-04'),
(3, 'Alimento', 'Esfirra de Carne', 50, '2024-10-30', '2024-11-04'),
(4, 'Bebida', 'Guaraná Antarctica 200ml', 25, '2024-10-30', '2025-10-30'),
(5, 'Alimento', 'Bolinho de Queijo', 30, '2024-10-30', '2024-11-04'),
(6, 'Alimento', 'Empada de Frango', 25, '2024-10-30', '2024-11-04');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`idproduto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
