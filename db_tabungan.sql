-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2021 at 11:03 AM
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
(202103266, 'Agus', 'Laki-Laki', '088765432345', 'agus@gmail.com', 'Singaparna', 2021032668, 'Aktif'),
(2021032523, 'SMK YPC TASIKMALAYA', 'Laki-Laki', '089876543212', 'smkypc@gmail.com', 'Jl. Garut-tasikmalaya Ds.Cikunten Kec.Singaparna Kab.Tasikmalaya', 2021032511, 'Aktif'),
(2021032645, 'Tegar Purnama', 'Laki-Laki', '089876543234', 'tegar@gmail.com', 'Mangunreja', 2021032663, 'Aktif'),
(2021032647, 'Agis Maulana', 'Laki-Laki', '081294574329', 'agismaulana112@gmail.com', 'Singaparna', 2021032676, 'Aktif'),
(2021032651, 'Dede Devi', 'Perempuan', '089875432345', 'dedev@gmail.com', 'Puspahiang', 2021032671, 'Aktif'),
(2021032670, 'Dadan', 'Laki-Laki', '088765432345', 'Dadan@gmail.com', 'Cikeusal', 2021032697, 'Aktif'),
(2021032676, 'Rahmat', 'Laki-Laki', '088765432123', 'rahmat@gmail.com', 'Cicarulang', 2021032674, 'Aktif');

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
(2021031372, 'Agis Maulana', 'Laki-Laki', '085623454321', 'agismaulana112@gmail.com', 'Rancapeundeuy', 2021031365, 'Aktif'),
(2021032440, 'Rahmat Hidayat', 'Laki-Laki', '085698765432', 'rahmat@gmail.com', 'Cicarulang', 2021032485, 'Aktif'),
(2021032611, 'Gustopa MI', 'Laki-Laki', '089876543213', 'gustopaMI@gmail.com', 'Cicarulang', 2021032676, 'Aktif'),
(2021032697, 'agis', 'Laki-Laki', '089843234567', 'agis@gmail.com', 'Singaparna', 202103261, 'Aktif');

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
('202103261011155188', '$2y$10$4saCgvpc7xCfHEYhNQcPzuMRPgQhVkfzHxYPtWc56bsv0vpR/PuVS', 2021032651),
('202103261482153272', '$2y$10$b1TwxOR.nYCMJYJDl/subed8Bofmu3tI6SGApncYlBuhld9blh8zC', 2021032676),
('20210326186489970', '$2y$10$vh9ABHR1bzq3Qn4N0tnEeOnzelrUnF4MG4ENaJj/CMCi9Nu7cojUu', 2021032645),
('202103261990327382', '$2y$10$QHNOdgeSUgmF9RhiwcsLNOSM3g1W3m74JuMvXt5bZC4YzeFMRo/R.', 202103266),
('20210326430030007', '$2y$10$fmk7O1AQ2DdWO/4DtwtDWuatwe38O0QtPl5iyrz3GzcjypK8OrFvK', 2021032670),
('20210326709983506', '$2y$10$yWXuG2wjUdRQovV5qx.rD.ddhqAIpk43a2hYRA2UCbbtlY0Ub.Lgu', 2021032647);

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
(202103260700157, '2021-03-26 07:00:15', 20000, 'tarik', '20210326709983506'),
(2021032509501235, '2021-03-25 09:50:12', 20000, 'transfer', '20210325509425802'),
(2021032510031043, '2021-03-25 10:03:10', 20000, 'transfer', '20210325509425802'),
(2021032607000429, '2021-03-26 07:00:04', 100000, 'setor', '20210326709983506'),
(2021032607231098, '2021-03-26 07:23:10', 2000, 'transfer', '20210326709983506'),
(2021032607292778, '2021-03-26 07:29:27', 2000, 'transfer', '20210325722833418'),
(2021032607311077, '2021-03-26 07:31:10', 2000, 'transfer', '20210325722833418'),
(2021032607312279, '2021-03-26 07:31:22', 20000, 'transfer', '20210325722833418'),
(2021032607323054, '2021-03-26 07:32:30', 4000, 'transfer', '20210325722833418'),
(2021032607324225, '2021-03-26 07:32:42', 4000, 'transfer', '20210325722833418'),
(2021032607360588, '2021-03-26 07:36:05', 20000, 'setor', '20210325722833418');

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
(2021032509501266, 'Pembayaran', 'Pembayaran SPP', 2021032509501235, '20210325722833418', 'berhasil'),
(2021032510031068, 'Pembayaran', 'Pembayaran SPP', 2021032510031043, '20210325722833418', 'berhasil'),
(2021032607231068, 'Pembayaran', '-', 2021032607231098, '20210325722833418', 'berhasil'),
(2021032607292710, 'Non Pembayaran', '-', 2021032607292778, '20210326709983506', 'berhasil'),
(2021032607311050, 'Non Pembayaran', '-', 2021032607311077, '20210326709983506', 'berhasil'),
(2021032607312253, 'Non Pembayaran', '-', 2021032607312279, '20210326709983506', 'berhasil'),
(2021032607323043, 'Non Pembayaran', '-', 2021032607323054, '20210326709983506', 'berhasil'),
(2021032607324224, 'Non Pembayaran', '-', 2021032607324225, '20210326709983506', 'berhasil');

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
(202103261, 'agis', '$2y$10$HJjWhHrYakByu/2DDHDaEeYjoz7Lck/Vtim0Sdcp.KlAZ2W8aY98m', 'Operator'),
(2021031326, 'admin', '$2y$10$u6kKlpIQ.F1iqJL0PU34e.B03vIUg3efoIAllYwqaBJ756Y2QG32y', 'Administrator'),
(2021031365, 'agis', '$2y$10$Ze079BNqee1uIHFb2/5AzuSG1vRjruwZMZXzYeU63INga0hWTmEle', 'Operator'),
(2021032485, 'rahmat', '$2y$10$jU0Gm.TjVwYwkyI2kdVCM.HbaRyjwTaWM0ZXwyYqrwKFDddrjjvY6', 'Operator'),
(2021032511, 'lembaga', '$2y$10$jvgcT8BDO3eO5YpPnjxi8.3HO.YIbf0G66jmOkGfHeAgtQhzNHOgW', 'Nasabah'),
(2021032663, 'tegar', '$2y$10$n0O4l1vAaHGFKSW8uOWxZuwVX.Z27xjlwKZxQV19ymPfNPuuyVLQC', 'Nasabah'),
(2021032668, 'agus', '$2y$10$VX0hsfn1e5wnFdI7Th6TFePLS01CGmY5f8jjA2vMO58yK0rb1OayO', 'Nasabah'),
(2021032671, 'dedev', '$2y$10$bXcZrQgPlUSJTjCKfqhwYeGa1.UamW9TFQ8dECkbkUFe63mApLMva', 'Nasabah'),
(2021032674, 'rahmat', '$2y$10$4dY1q0ixwPm7Mte0qFEc6udhF1XtAcvW9koYbtP5WxDEVfUdXnrF6', 'Nasabah'),
(2021032676, 'agismaulana', '$2y$10$9eCDuB1Kw7ucMOvmjggHqOjf4/M/MNRdOMCxRWyBGYZ92NSTnPttS', 'Nasabah'),
(2021032697, 'dadan', '$2y$10$Lqa4mD.oyBh75.xrm27Y8Ouf6eXnwHsR3ttEIJ7yZffh0YWAyMeze', 'Nasabah');

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
