-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: bsv4zvc33c42py9eie7t-mysql.services.clever-cloud.com:3306
-- Üretim Zamanı: 16 Nis 2024, 17:18:14
-- Sunucu sürümü: 8.0.22-13
-- PHP Sürümü: 8.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `bsv4zvc33c42py9eie7t`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tags`
--

CREATE TABLE `tags` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Development', '2024-04-09 00:44:30', '2024-04-09 00:44:30', NULL),
(2, 'Design', '2024-04-09 00:45:06', '2024-04-09 00:45:06', NULL),
(3, 'Marketing', '2024-04-09 00:45:11', '2024-04-09 00:45:11', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Alexander Johnson', 'active', '2024-04-09 02:41:39', '2024-04-09 02:41:39', NULL),
(2, 'William Smith', 'active', '2024-04-09 02:44:10', '2024-04-09 02:44:10', NULL),
(3, 'Alexander Garcia', 'active', '2024-04-09 02:44:22', '2024-04-09 02:44:22', NULL),
(4, 'Emma Miller', 'active', '2024-04-09 02:44:33', '2024-04-09 02:44:33', NULL),
(5, 'Olivia Brown', 'passive', '2024-04-09 02:44:47', '2024-04-09 02:44:47', NULL),
(6, 'Sophia Johnson', 'active', '2024-04-09 02:45:46', '2024-04-09 02:45:46', NULL),
(7, 'Isabella Rodriguez', 'passive', '2024-04-09 02:46:14', '2024-04-09 02:46:14', NULL),
(8, 'Emma Jones', 'active', '2024-04-09 02:46:26', '2024-04-09 02:46:26', NULL),
(9, 'James Johnson', 'passive', '2024-04-09 02:46:41', '2024-04-09 02:46:41', NULL),
(10, 'Ava Martinez', 'active', '2024-04-09 02:46:55', '2024-04-09 02:46:55', NULL),
(11, 'James Garcia', 'active', '2024-04-09 02:48:20', '2024-04-09 02:48:20', NULL),
(12, 'Alexander Jones', 'passive', '2024-04-09 02:48:39', '2024-04-09 02:48:39', NULL),
(13, 'Sophia Martinez', 'active', '2024-04-09 02:49:00', '2024-04-09 02:49:00', NULL),
(14, 'Emma Williams', 'passive', '2024-04-09 02:49:13', '2024-04-09 02:49:13', NULL),
(15, 'Olivia Johnson', 'active', '2024-04-09 02:49:34', '2024-04-09 02:49:34', NULL),
(16, 'Isabella Miller', 'active', '2024-04-09 02:49:49', '2024-04-09 02:49:49', NULL),
(17, 'Michael Rodriguez', 'active', '2024-04-09 02:50:01', '2024-04-09 02:50:01', NULL),
(18, 'John Brown', 'passive', '2024-04-09 02:50:27', '2024-04-09 02:50:27', NULL),
(19, 'James Miller', 'passive', '2024-04-09 02:50:53', '2024-04-09 02:50:53', NULL),
(20, 'Michael Johnson', 'active', '2024-04-09 02:51:06', '2024-04-09 02:51:06', NULL),
(21, 'Michael Brown', 'active', '2024-04-09 02:51:18', '2024-04-09 02:51:18', NULL),
(22, 'Ava Martinez', 'passive', '2024-04-09 02:51:30', '2024-04-09 02:51:30', NULL),
(23, 'Sophia Martinez', 'passive', '2024-04-09 02:52:09', '2024-04-09 02:52:09', NULL),
(24, 'Ava Smith', 'passive', '2024-04-09 02:52:36', '2024-04-09 02:52:36', NULL),
(25, 'John Jones', 'active', '2024-04-09 02:53:02', '2024-04-09 02:53:02', NULL),
(26, 'Alexander Williams', 'active', '2024-04-09 02:53:09', '2024-04-09 02:53:09', NULL),
(27, 'Isabella Williams', 'passive', '2024-04-09 02:54:53', '2024-04-09 02:54:53', NULL),
(28, 'Alexander Martinez', 'active', '2024-04-09 02:55:18', '2024-04-09 02:55:18', NULL),
(29, 'Sophia Rodriguez', 'passive', '2024-04-09 02:59:18', '2024-04-09 02:59:18', NULL),
(30, 'Sophia Miller', 'active', '2024-04-09 02:59:32', '2024-04-09 02:59:32', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users_to_tags`
--

CREATE TABLE `users_to_tags` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users_to_tags`
--

INSERT INTO `users_to_tags` (`id`, `user_id`, `tag_id`) VALUES
(1, 1, 1),
(3, 1, 2),
(4, 2, 1),
(5, 2, 3),
(8, 3, 2),
(9, 3, 1),
(10, 4, 2),
(11, 4, 3),
(12, 4, 1),
(14, 5, 3),
(15, 5, 2),
(16, 6, 3),
(18, 6, 2),
(20, 7, 2),
(21, 7, 1),
(22, 8, 1),
(24, 8, 3),
(25, 9, 2),
(27, 9, 3),
(28, 10, 3),
(30, 10, 1),
(31, 11, 1),
(32, 11, 2),
(34, 12, 2),
(35, 12, 1),
(36, 12, 3),
(37, 13, 3),
(39, 13, 1),
(40, 14, 2),
(41, 14, 3),
(43, 15, 1),
(44, 15, 2),
(45, 15, 3),
(46, 16, 3),
(47, 16, 2),
(50, 17, 3),
(51, 17, 1),
(52, 18, 1),
(53, 18, 2),
(54, 18, 3),
(55, 19, 3),
(56, 19, 2),
(58, 20, 2),
(60, 20, 1),
(61, 21, 1),
(62, 21, 2),
(63, 21, 3),
(64, 22, 3),
(66, 22, 1),
(67, 23, 2),
(69, 23, 1),
(71, 24, 2),
(72, 24, 3),
(73, 25, 3),
(74, 25, 2),
(75, 25, 1),
(76, 26, 2),
(77, 26, 3),
(78, 26, 1),
(79, 27, 1),
(80, 27, 2),
(81, 27, 3),
(82, 28, 3),
(83, 28, 2),
(84, 28, 1),
(85, 29, 2),
(86, 29, 3),
(88, 30, 1),
(90, 30, 3);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`name`);

--
-- Tablo için indeksler `users_to_tags`
--
ALTER TABLE `users_to_tags`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Tablo için AUTO_INCREMENT değeri `users_to_tags`
--
ALTER TABLE `users_to_tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
