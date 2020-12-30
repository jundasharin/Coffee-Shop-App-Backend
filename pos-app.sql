-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Des 2020 pada 03.31
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos-app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Favorite & Promo'),
(2, 'Coffee'),
(3, 'Non-Coffee'),
(4, 'Foods'),
(5, 'Add-on');

-- --------------------------------------------------------

--
-- Struktur dari tabel `coupon`
--

CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL,
  `coupon_name` varchar(50) NOT NULL,
  `image` varchar(64) NOT NULL,
  `discount_id` int(11) NOT NULL,
  `limitmax` int(11) NOT NULL,
  `code` varchar(64) NOT NULL,
  `desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `coupon`
--

INSERT INTO `coupon` (`coupon_id`, `coupon_name`, `image`, `discount_id`, `limitmax`, `code`, `desc`) VALUES
(1, 'SPECIAL NATAL', '2020-12-28T10-05-01.282Zert.jpg', 50, 20000, 'HPPYNYR', 'DISKON 50 PERSEN'),
(2, 'SPECIAL NATAL DAN TAHUN BARU', '2020-12-28T10-15-44.683Zcrstms.jpg', 50, 20000, 'MRRY CRSTMSS', 'DISKON 50 PERSEN'),
(3, 'SPECIAL NATAL DAN TAHUN BARU', '2020-12-28T11-47-00.757Zcrstms.jpg', 50, 20000, 'MRRY CRSTMSS', 'DISKON 50 PERSEN');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detailhistory`
--

CREATE TABLE `detailhistory` (
  `detailHistory_id` int(11) NOT NULL,
  `history_id` int(32) NOT NULL,
  `product_id` int(11) NOT NULL,
  `orderqty` int(11) NOT NULL,
  `size_R` bit(1) NOT NULL,
  `size_L` bit(1) NOT NULL,
  `size_XL` bit(1) NOT NULL,
  `small` bit(1) NOT NULL,
  `medium` bit(1) NOT NULL,
  `large` bit(1) NOT NULL,
  `homedelivery` bit(1) NOT NULL,
  `dinein` bit(1) NOT NULL,
  `pickup` bit(1) NOT NULL,
  `orderTotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detailhistory`
--

INSERT INTO `detailhistory` (`detailHistory_id`, `history_id`, `product_id`, `orderqty`, `size_R`, `size_L`, `size_XL`, `small`, `medium`, `large`, `homedelivery`, `dinein`, `pickup`, `orderTotal`) VALUES
(1, 1, 19, 1, b'1', b'0', b'0', b'0', b'0', b'0', b'0', b'1', b'0', 15000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `gender`
--

CREATE TABLE `gender` (
  `gender_id` int(11) NOT NULL,
  `info` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `gender`
--

INSERT INTO `gender` (`gender_id`, `info`) VALUES
(1, 'Male'),
(2, 'Female');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `paymentMethod_id` int(11) NOT NULL,
  `history_createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`history_id`, `user_id`, `discount`, `subtotal`, `paymentMethod_id`, `history_createdAt`) VALUES
(1, 1, 2, 30000, 1, '2020-12-29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `paymentmethod`
--

CREATE TABLE `paymentmethod` (
  `paymentMethod_id` int(11) NOT NULL,
  `info` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `paymentmethod`
--

INSERT INTO `paymentmethod` (`paymentMethod_id`, `info`) VALUES
(1, 'Card'),
(2, 'Bank Account'),
(3, 'Cash On Delivery');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(32) NOT NULL,
  `image` varchar(225) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_desc` varchar(500) NOT NULL,
  `size_R` bit(1) NOT NULL,
  `size_L` bit(1) NOT NULL,
  `size_XL` bit(1) NOT NULL,
  `small` bit(1) NOT NULL,
  `medium` bit(1) NOT NULL,
  `large` bit(1) NOT NULL,
  `homedelivery` bit(1) NOT NULL,
  `dinein` bit(1) NOT NULL,
  `pickup` bit(1) NOT NULL,
  `delivery_starthour` time NOT NULL,
  `delivery_endhour` time NOT NULL,
  `product_stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `image`, `category_id`, `product_desc`, `size_R`, `size_L`, `size_XL`, `small`, `medium`, `large`, `homedelivery`, `dinein`, `pickup`, `delivery_starthour`, `delivery_endhour`, `product_stock`) VALUES
(19, 'Es Kopi Susu', 15000, '2020-12-28T10-02-29.195Ztee.png', 1, 'Es campur kopi susu', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', '09:00:00', '23:00:00', 200);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(32) NOT NULL,
  `user_password` varchar(256) NOT NULL,
  `mobileNumber` int(25) NOT NULL,
  `deliveryAddress` varchar(100) NOT NULL,
  `displayName` varchar(32) NOT NULL,
  `firstName` varchar(16) NOT NULL,
  `lastName` varchar(16) NOT NULL,
  `birthDate` date NOT NULL,
  `gender_id` int(11) NOT NULL,
  `image` varchar(64) NOT NULL,
  `roleId` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `mobileNumber`, `deliveryAddress`, `displayName`, `firstName`, `lastName`, `birthDate`, `gender_id`, `image`, `roleId`) VALUES
(1, 'jundas', 'haris@ahmad.com', '$2b$10$rlaKGYEju7w8ZCjAriFL3.goA.tslQW3mY.dhxVEidmqagLVKL75q', 2147483647, 'Kediri', 'Jundan', 'haris', 'jundas', '1997-03-04', 1, '2020-12-30T02-09-46.701Zert.jpg', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user1`
--

CREATE TABLE `user1` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(64) NOT NULL,
  `user_password` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user1`
--

INSERT INTO `user1` (`user_id`, `user_name`, `user_email`, `user_password`) VALUES
(1, 'jundas', 'jundas@harin.com', '$2b$10$V2ZMIO39NcyEIdfUEUPFPe9Gyyti/SlXJAXhQ9LB7HXToYiQuwLdK'),
(2, 'aghnia', 'aghnia@pasza.com', '$2b$10$bYpoGNRHZ76WemHCymAFh.dX1XN1/GZ3c9QI5Tt8BHUSUIUf5bbWO'),
(3, 'aghnia', 'jundasharin', '$2b$10$S8WnBCm/sl5VBaYh4uHggOMxIMTmlroyJi2phhLdJOjnSBTmYJmjO');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indeks untuk tabel `detailhistory`
--
ALTER TABLE `detailhistory`
  ADD PRIMARY KEY (`detailHistory_id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeks untuk tabel `user1`
--
ALTER TABLE `user1`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `coupon`
--
ALTER TABLE `coupon`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `detailhistory`
--
ALTER TABLE `detailhistory`
  MODIFY `detailHistory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `user1`
--
ALTER TABLE `user1`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
