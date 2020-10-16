-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24-Ago-2020 às 16:36
-- Versão do servidor: 10.4.11-MariaDB
-- versão do PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bot`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `guilds`
--

CREATE TABLE `guilds` (
  `GUILD_ID` varchar(18) NOT NULL,
  `prefix` varchar(4) NOT NULL,
  `CHANNELID_WELCOME` varchar(18) NOT NULL,
  `CHANNELID_LEFT` varchar(18) NOT NULL,
  `CHANNELID_LOGS` varchar(18) NOT NULL,
  `CARGOID_WELCOME` varchar(18) NOT NULL,
  `CHANNELID_MEMBERCOUNT` varchar(18) NOT NULL,
  `ENABLE_ANTIINVITE` varchar(1) NOT NULL,
  `ENABLE_WELCOME` varchar(1) NOT NULL,
  `ENABLE_LEFT` varchar(1) NOT NULL,
  `ENABLE_UPXP` varchar(1) NOT NULL,
  `ENABLE_LOGS` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `guilds`
--

INSERT INTO `guilds` (`GUILD_ID`, `prefix`, `CHANNELID_WELCOME`, `CHANNELID_LEFT`, `CHANNELID_LOGS`, `CARGOID_WELCOME`, `CHANNELID_MEMBERCOUNT`, `ENABLE_ANTIINVITE`, `ENABLE_WELCOME`, `ENABLE_LEFT`, `ENABLE_UPXP`, `ENABLE_LOGS`) VALUES
('300399780851613696', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('325416452029153280', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('512287579392180234', '!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('525086007956340746', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('568435018502897674', '/', '682648807695188039', '682648807695188039', '682648807695188039', '0', '722813863137116161', '0', '0', '0', '0', '0'),
('575100004641800202', '!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('593569038261682185', '!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('620319031504928769', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('632377814183575552', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('678818599120666625', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('680888911668707480', '!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('698252854980509736', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('704677629088759869', '!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('714119351686398064', '!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('716360478741495939', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('723315556710744116', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('739520383249547374', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0'),
('744965529902514247', 'p!', '', '', '', '', '', '0', '0', '0', '0', '0');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `USER_ID` varchar(18) NOT NULL,
  `USER_XP` int(8) NOT NULL,
  `USER_LEVEL` int(8) NOT NULL,
  `USER_GUILD` varchar(127) NOT NULL,
  `USER_BACKGROUND` varchar(3000) NOT NULL,
  `USER_FUNDO` varchar(3) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`USER_ID`, `USER_XP`, `USER_LEVEL`, `USER_GUILD`, `USER_BACKGROUND`, `USER_FUNDO`) VALUES
('498492304592601090', 617, 3, '568435018502897674', '', ''),
('564201450851532807', 0, 0, '593569038261682185', '', ''),
('422535241211707393', 134, 1, '744965529902514247', '', ''),
('664174201220890645', 86, 1, '744965529902514247', '', ''),
('506979435485069324', 120, 1, '744965529902514247', '', ''),
('717766639260532826', 73, 1, '744965529902514247', '', ''),
('663013214438817822', 39, 1, '744965529902514247', '', ''),
('617529327105474560', 25, 1, '744965529902514247', '', ''),
('740917149819732029', 2, 1, '744965529902514247', '', ''),
('528613144088543233', 6, 1, '744965529902514247', '', ''),
('498492304592601090', 10, 1, '512287579392180234', '', ''),
('498492304592601090', 53, 1, '744965529902514247', '', ''),
('705777046630039562', 0, 0, '744965529902514247', '', ''),
('622922897509580821', 7, 1, '744965529902514247', '', ''),
('706208229251874826', 0, 0, '744965529902514247', '', ''),
('696781828715184229', 0, 0, '744965529902514247', '', ''),
('634329966099562527', 18, 1, '723315556710744116', '', ''),
('645920589017514016', 9, 1, '723315556710744116', '', ''),
('630845661079797786', 0, 0, '744965529902514247', '', ''),
('231815259357315073', 30, 1, '723315556710744116', '', ''),
('726463374975828030', 3, 1, '744965529902514247', '', ''),
('258596740364500992', 38, 1, '723315556710744116', '', ''),
('260622545202577408', 3, 1, '723315556710744116', '', ''),
('664922549498413057', 0, 0, '744965529902514247', '', ''),
('550715056145563679', 44, 1, '723315556710744116', '', ''),
('648907467845009416', 3, 1, '723315556710744116', '', ''),
('672652538880720896', 4, 1, '744965529902514247', '', ''),
('527216915354222603', 0, 0, '744965529902514247', '', '');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `guilds`
--
ALTER TABLE `guilds`
  ADD PRIMARY KEY (`GUILD_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
