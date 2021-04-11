-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2021 at 12:10 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tabungan`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `NASABAH` ()  select * from nasabah$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pegawai` ()  select * from pegawai$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `transaksi_all` ()  select * from transaksi left join transfer on transaksi.id_transaksi = transfer.id_transaksi$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `nasabah`
--

CREATE TABLE `nasabah` (
  `kd_nasabah` int(11) NOT NULL,
  `nm_nasabah` varchar(255) DEFAULT NULL,
  `jk` enum('Laki-Laki','Perempuan') DEFAULT NULL,
  `no_hp` varchar(13) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `id_users` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nasabah`
--

INSERT INTO `nasabah` (`kd_nasabah`, `nm_nasabah`, `jk`, `no_hp`, `email`, `alamat`, `id_users`, `status`) VALUES
(202103273, 'Rahmat Hidayat', 'Laki-Laki', '089875432123', 'rahmat@gmail.com', 'Cicarulang', 2021032796, 'Aktif'),
(2021032523, 'SMK YPC TASIKMALAYA', 'Laki-Laki', '089876543212', 'smkypc@gmail.com', 'Jl. Garut-tasikmalaya Ds.Cikunten Kec.Singaparna Kab.Tasikmalaya', 2021032511, 'Aktif'),
(2021032753, 'Dede Devi', 'Perempuan', '081200987654', 'dedev@gmail.com', 'Puspahiang', 2021032747, 'Aktif');

--
-- Triggers `nasabah`
--
DELIMITER $$
CREATE TRIGGER `delete_nasabah` AFTER DELETE ON `nasabah` FOR EACH ROW BEGIN
delete from users where id_users = old.id_users;
delete from rekening where kd_nasabah = old.kd_nasabah;
delete t1, t2 from rekening as t1 join transaksi as t2 on t1.no_rekening = t2.no_rekening where t1.kd_nasabah = old.kd_nasabah AND t2.jenis_transaksi != 'transfer';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `nasabah_all`
-- (See below for the actual view)
--
CREATE TABLE `nasabah_all` (
`kd_nasabah` int(11)
,`nm_nasabah` varchar(255)
,`jk` enum('Laki-Laki','Perempuan')
,`no_hp` varchar(13)
,`email` varchar(255)
,`alamat` text
,`id_users` int(11)
,`status` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `kd_pegawai` int(11) NOT NULL,
  `nm_pegawai` varchar(255) DEFAULT NULL,
  `jk` enum('Laki-Laki','Perempuan') DEFAULT NULL,
  `no_hp` varchar(13) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `id_users` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`kd_pegawai`, `nm_pegawai`, `jk`, `no_hp`, `email`, `alamat`, `id_users`, `status`) VALUES
(202103139, 'Admin', 'Laki-Laki', '0', 'admin@gmail.com', '-', 2021031326, 'Aktif'),
(2021032726, 'Agis Maulana', 'Laki-Laki', '089875432123', 'agis@gmail.com', 'Singaparna', 2021032795, 'Aktif'),
(2021032910, 'Agis Maulana', 'Laki-Laki', '089898754321', 'agismaulana0603@gmail.com', NULL, 2021032954, 'Aktif'),
(2021032985, 'Muhammad Iqbal', 'Laki-Laki', '081298765432', 'Iqbal@gmail.com', 'Pasir Pari', 2021032920, 'Aktif');

--
-- Triggers `pegawai`
--
DELIMITER $$
CREATE TRIGGER `after_delete_pegawai` AFTER DELETE ON `pegawai` FOR EACH ROW BEGIN
delete from users where id_users = old.id_users;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rekening`
--

CREATE TABLE `rekening` (
  `no_rekening` varchar(20) NOT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `kd_nasabah` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rekening`
--

INSERT INTO `rekening` (`no_rekening`, `pin`, `kd_nasabah`) VALUES
('20210325722833418', '$2y$10$NH3LJjEJDNsIMBc8PfC1..SnDA.9VPYBkmQfoMccP9oIabfg7EhNe', 2021032523),
('202103271091325997', '$2y$10$c8CYYJw61yzgodQ5HMc8WOUD7TfJjLoRdYrjzdpgFISjAINW49qfG', 202103273),
('202103271979931962', '$2y$10$MoJxJXFAdetIj0Uun01quuYcY4gjGiOtAeSHmCxNM.rXDCCiJ5Pky', 2021032753);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` bigint(20) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `nominal` double DEFAULT NULL,
  `jenis_transaksi` enum('setor','tarik','transfer') DEFAULT NULL,
  `no_rekening` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `waktu`, `nominal`, `jenis_transaksi`, `no_rekening`) VALUES
(2021032704165866, '2021-03-27 04:16:58', 20000, 'setor', '202103271979931962'),
(2021032706462432, '2021-03-27 06:46:24', 12000, 'transfer', '202103271979931962'),
(2021032908245566, '2021-03-29 08:24:55', 60000, 'setor', '202103271979931962'),
(2021032910085421, '2021-03-29 10:08:54', 8000, 'tarik', '202103271979931962'),
(2021032910100695, '2021-03-29 10:10:06', 10000, 'transfer', '202103271979931962');

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `id_transfer` bigint(20) NOT NULL,
  `jenis_pembayaran` enum('Pembayaran','Non Pembayaran') DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `id_transaksi` bigint(20) DEFAULT NULL,
  `no_rekening` varchar(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id_transfer`, `jenis_pembayaran`, `keterangan`, `id_transaksi`, `no_rekening`, `status`) VALUES
(2021032706462459, 'Pembayaran', 'Pembayaran Kas', 2021032706462432, '20210325722833418', 'berhasil'),
(2021032910100617, 'Non Pembayaran', NULL, 2021032910100695, '202103271091325997', 'berhasil');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` enum('Nasabah','Operator','Administrator') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `username`, `password`, `level`) VALUES
(2021031326, 'admin', '$2y$10$rjJonQFbY5wr8z6gTsxt7.B8iyrpdKK/IgwKv8N2PbcPELE/dfgXy', 'Administrator'),
(2021032511, 'lembaga', '$2y$10$jvgcT8BDO3eO5YpPnjxi8.3HO.YIbf0G66jmOkGfHeAgtQhzNHOgW', 'Nasabah'),
(2021032747, 'dedev', '$2y$10$MxdWt0/N4QO4SrI5.vYw7O/ldv1GBv7TPh0g7gNXnTeAynkl1uQCm', 'Nasabah'),
(2021032795, 'agismaulana', '$2y$10$n1JEougKKMDRNz9cbRGJNucicSzxIwha3U00lAfOKD9RBm3u6rNOu', 'Operator'),
(2021032796, 'rahmat', '$2y$10$CjbUZLK70sX2njVG3IakuuKtcF/O0rmpehghyD5OC6G4dCsbxmFG6', 'Nasabah'),
(2021032920, 'petugas2', '$2y$10$miqTwIBUB7VGVeR5IRoFUeL6JC3Sf11zTPOetq.soZ9KidGxtqOLi', 'Operator'),
(2021032954, 'petugas1', '$2y$10$Y42kiQgHSXREIP1IrRuSFeUV0ED9rdL0mktWrrPe/owtKBtAB88V6', 'Operator');

-- --------------------------------------------------------

--
-- Structure for view `nasabah_all`
--
DROP TABLE IF EXISTS `nasabah_all`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `nasabah_all`  AS SELECT `nasabah`.`kd_nasabah` AS `kd_nasabah`, `nasabah`.`nm_nasabah` AS `nm_nasabah`, `nasabah`.`jk` AS `jk`, `nasabah`.`no_hp` AS `no_hp`, `nasabah`.`email` AS `email`, `nasabah`.`alamat` AS `alamat`, `nasabah`.`id_users` AS `id_users`, `nasabah`.`status` AS `status` FROM `nasabah` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nasabah`
--
ALTER TABLE `nasabah`
  ADD PRIMARY KEY (`kd_nasabah`) USING BTREE;

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`kd_pegawai`);

--
-- Indexes for table `rekening`
--
ALTER TABLE `rekening`
  ADD PRIMARY KEY (`no_rekening`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`id_transfer`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
