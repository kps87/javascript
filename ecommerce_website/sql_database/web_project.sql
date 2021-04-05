-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 23, 2020 at 11:58 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_project`
--
CREATE DATABASE IF NOT EXISTS `web_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `web_project`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `firstName` varchar(200) NOT NULL CHECK (octet_length(`firstName`) > 0 and octet_length(`firstName`) <= 200),
  `lastName` varchar(200) NOT NULL CHECK (octet_length(`lastName`) > 0 and octet_length(`lastName`) <= 200),
  `email` varchar(200) NOT NULL CHECK (octet_length(`email`) > 0 and octet_length(`email`) <= 200),
  `password` varchar(30) NOT NULL CHECK (octet_length(`password`) > 0 and octet_length(`password`) <= 30)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`firstName`, `lastName`, `email`, `password`) VALUES
('Kieran', 'Somers', 'g00221349@gmit.ie', 'kieran1'),
('John', 'Frusciante', 'j.frusciante@gmail.com', 'john1'),
('Jimi', 'Hendrix', 'j.hendrix@gmail.com', 'jimi1'),
('Michael', 'Duignan', 'Michael.Duignan@gmit.ie', 'michael1'),
('Rory', 'Gallagher', 'r.gallagher@gmail.com', 'rory1');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `productType` varchar(20) NOT NULL CHECK (octet_length(`productType`) > 0 and octet_length(`productType`) <= 20),
  `description` varchar(200) NOT NULL CHECK (octet_length(`description`) > 0 and octet_length(`description`) <= 200),
  `manufacturer` varchar(100) NOT NULL CHECK (octet_length(`manufacturer`) > 0 and octet_length(`manufacturer`) <= 100),
  `model` varchar(100) DEFAULT NULL,
  `price` float NOT NULL CHECK (`price` > 0),
  `image` varchar(200) NOT NULL CHECK (octet_length(`image`) > 0 and octet_length(`image`) <= 200),
  `body` varchar(100) DEFAULT NULL,
  `neck` varchar(100) DEFAULT NULL,
  `fretboard` varchar(100) DEFAULT NULL,
  `numberFrets` int(11) DEFAULT NULL CHECK (`numberFrets` > 0),
  `color` varchar(100) NOT NULL,
  `power` int(11) DEFAULT NULL CHECK (`power` > 0),
  `weight` float DEFAULT NULL CHECK (`weight` > 0),
  `speaker` varchar(20) DEFAULT NULL,
  `stringMaterial` varchar(20) DEFAULT NULL,
  `gauge` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `productType`, `description`, `manufacturer`, `model`, `price`, `image`, `body`, `neck`, `fretboard`, `numberFrets`, `color`, `power`, `weight`, `speaker`, `stringMaterial`, `gauge`) VALUES
(1, 'guitar', 'Fender Player Series Strat MN PWT', 'fender', 'stratocaster', 589, '1.jpg', 'alder', 'maple', 'maple', 22, 'white', NULL, NULL, NULL, NULL, NULL),
(2, 'guitar', 'Dave Murray (Iron Maiden) signature model', 'fender', 'stratocaster', 950, '2.jpg', 'alder', 'maple', 'rosewood', 21, 'sunburst', NULL, NULL, NULL, NULL, NULL),
(3, 'guitar', 'Fender Deluxe Strat HSS BP', 'fender', 'stratocaster', 799, '3.jpg', 'alder', 'maple', 'maple', 22, 'silver', NULL, NULL, NULL, NULL, NULL),
(4, 'guitar', 'Fender Vintera 50s Strat Mod MN DBL', 'fender', 'stratocaster', 919, '4.jpg', 'alder', 'maple', 'maple', 21, 'daphne blue', NULL, NULL, NULL, NULL, NULL),
(5, 'guitar', 'Fender AM Perf Strat HSS MN Black', 'fender', 'stratocaster', 1039, '5.jpg', 'alder', 'maple', 'maple', 22, 'black', NULL, NULL, NULL, NULL, NULL),
(6, 'guitar', 'Fender Limited Player Strat Aged Natural', 'fender', 'stratocaster', 679, '6.jpg', 'natural', 'maple', 'Pau Ferro', 22, 'natural', NULL, NULL, NULL, NULL, NULL),
(7, 'guitar', 'Fender Squier Bullet Strat BSB', 'squier', 'stratocaster', 129, '7.jpg', 'basswood', 'maple', 'laurel', 21, 'sunburst', NULL, NULL, NULL, NULL, NULL),
(8, 'guitar', 'Fender Player Series Strat MN 3TS', 'fender', 'stratocaster', 589, '8.jpg', 'alder', 'maple', 'maple', 22, 'sunburst', NULL, NULL, NULL, NULL, NULL),
(9, 'guitar', 'Fender Vintera 50s Strat Mod MN 2-SB', 'fender', 'stratocaster', 919, '9.jpg', 'alder', 'maple', 'maple', 21, 'sunburst', NULL, NULL, NULL, NULL, NULL),
(10, 'guitar', 'Fender SQ CV 60s Strat CAR', 'fender', 'stratocaster', 385, '10.jpg', 'nato', 'maple', 'laurel', 21, 'red', NULL, NULL, NULL, NULL, NULL),
(11, 'guitar', 'Fender Squier Affinity Tele MN BB', 'squier', 'telecaster', 166, '11.jpg', 'alder', 'maple', 'maple', 21, 'blonde', NULL, NULL, NULL, NULL, NULL),
(12, 'guitar', 'Fender Player Series Tele MN TPL', 'fender', 'telecaster', 515, '12.jpg', 'alder', 'maple', 'maple', 22, 'blue', NULL, NULL, NULL, NULL, NULL),
(13, 'guitar', 'Harley Benton TE-90FLT VW Deluxe Series', 'harley benton', 'telecaster', 171, '13.jpg', 'ash', 'maple', 'maple', 22, 'natural', NULL, NULL, NULL, NULL, NULL),
(14, 'guitar', 'Fender SQ CV 50s Tele MN WHB', 'fender', 'telecaster', 343, '14.jpg', 'pine', 'maple', 'maple', 21, 'blonde', NULL, NULL, NULL, NULL, NULL),
(15, 'guitar', 'Fender Player Series Tele HH MN TPL', 'fender', 'telecaster', 549, '15.jpg', 'alder', 'maple', 'maple', 22, 'blue', NULL, NULL, NULL, NULL, NULL),
(16, 'guitar', 'Fender Vintera 60s Tele Modified SFG', 'fender', 'telecaster', 811, '16.jpg', 'alder', 'maple', 'Pau Ferro', 21, 'green', NULL, NULL, NULL, NULL, NULL),
(17, 'guitar', 'Fender AM Pro Tele Ash MN BTB', 'fender', 'telecaster', 1329, '17.jpg', 'ash', 'maple', 'maple', 22, 'blonde', NULL, NULL, NULL, NULL, NULL),
(18, 'guitar', 'Fender Jimmy Page Mirror Tele. RW WBL', 'fender', 'telecaster', 2265, '18.jpg', 'ash', 'maple', 'rosewood', 21, 'white', NULL, NULL, NULL, NULL, NULL),
(19, 'guitar', 'Fender LTD Player Tele MN Aged Nat.', 'fender', 'telecaster', 605, '19.jpg', 'alder', 'maple', 'maple', 22, 'natural', NULL, NULL, NULL, NULL, NULL),
(20, 'guitar', 'Fender Player Series Tele MN PWT', 'fender', 'telecaster', 511, '20.jpg', 'alder', 'maple', 'maple', 22, 'white', NULL, NULL, NULL, NULL, NULL),
(21, 'guitar', 'Gibson Les Paul Custom EB GH', 'gibson', 'les paul', 3439, '21.jpg', 'mahogany', 'maple', 'mahogany', 22, 'black', NULL, NULL, NULL, NULL, NULL),
(22, 'guitar', 'Harley Benton SC-450Plus HB Vintage Series', 'harley benton', 'les paul', 162, '22.jpg', 'mahogany', 'maple', 'mahogany', 22, 'sunburst', NULL, NULL, NULL, NULL, NULL),
(23, 'guitar', 'Harley Benton SC-450Plus LD Vintage Series', 'harley benton', 'les paul', 162, '23.jpg', 'mahogany', 'maple', 'mahogany', 22, 'amber', NULL, NULL, NULL, NULL, NULL),
(24, 'guitar', 'Gibson Les Paul Junior EB', 'gibson', 'les paul', 1159, '24.jpg', 'mahogany', 'mahogany', 'rosewood', 22, 'black', NULL, NULL, NULL, NULL, NULL),
(25, 'guitar', 'Gibson Les Paul Standard 50s HCS', 'gibson', 'les paul', 1839, '25.jpg', 'mahogany', 'maple', 'mahogany', 22, 'Cherry Sunburst', NULL, NULL, NULL, NULL, NULL),
(26, 'guitar', 'Gibson Les Paul Standard 60s IT', 'gibson', 'les paul', 1849, '26.jpg', 'mahogany', 'maple', 'mahogany', 22, 'iced tea', NULL, NULL, NULL, NULL, NULL),
(27, 'guitar', 'Gibson LP Junior 57 Singecut TV White', 'gibson', 'les paul', 2199, '27.jpg', 'mahogany', 'mahogany', 'rosewood', 22, 'white', NULL, NULL, NULL, NULL, NULL),
(28, 'guitar', 'Supro David Bowie 1961 Dual Tone', 'supro', 'single cut', 722, '28.jpg', 'mahogany', 'maple', 'Pau Ferro', 20, 'white', NULL, NULL, NULL, NULL, NULL),
(29, 'guitar', 'ESP LTD EC-1000 BP BLKNB', 'esp', 'single cut', 995, '29.jpg', 'mahogany', 'mahogany', 'ebony', 24, 'burst', NULL, NULL, NULL, NULL, NULL),
(30, 'guitar', 'Gibson Les Paul Tribute SHB', 'gibson', 'les paul', 899, '30.jpg', 'mahogany', 'maple', 'maple', 22, 'honey', NULL, NULL, NULL, NULL, NULL),
(31, 'amplifier', 'Fender Mustang I V.2', 'fender', NULL, 108, '31.jpg', NULL, NULL, NULL, NULL, '', 20, 7.7, '1x8', NULL, NULL),
(32, 'amplifier', 'Vox Adio Air GT', 'vox', NULL, 225, '32.jpg', NULL, NULL, NULL, NULL, '', 50, 2.9, '2x3', NULL, NULL),
(33, 'amplifier', 'Fender Champion 50 XL', 'fender', NULL, 179, '33.jpg', NULL, NULL, NULL, NULL, '', 50, 8.6, '1x12', NULL, NULL),
(34, 'amplifier', 'Fender Mustang GT 100', 'fender', NULL, 294, '34.jpg', NULL, NULL, NULL, NULL, '', 100, 9.97, '1x12', NULL, NULL),
(35, 'amplifier', 'DV Mark Jazz 12', 'DV', NULL, 359, '35.jpg', NULL, NULL, NULL, NULL, '', 60, 8.6, '1x12', NULL, NULL),
(36, 'amplifier', 'Boss Katana Artist', 'Boss', NULL, 422, '36.jpg', NULL, NULL, NULL, NULL, '', 100, 19, '1x12', NULL, NULL),
(37, 'amplifier', 'Marshall MG30GFX', 'Marshall', NULL, 160, '37.jpg', NULL, NULL, NULL, NULL, '', 30, 10.8, '1x10', NULL, NULL),
(38, 'amplifier', 'Roland Cube-10GX', 'Roland', NULL, 108, '38.jpg', NULL, NULL, NULL, NULL, '', 10, 4.7, '1x8', NULL, NULL),
(39, 'amplifier', 'Harley Benton HB-80R', 'Harley Benton', NULL, 135, '39.jpg', NULL, NULL, NULL, NULL, '', 65, 14.5, '1x12', NULL, NULL),
(40, 'amplifier', 'Roland Micro Cube GX RD', 'Roland', NULL, 124, '40.jpg', NULL, NULL, NULL, NULL, '', 3, 2.7, '1x5', NULL, NULL),
(41, 'strings', 'Fender YJM NPS 008-046 String Set', 'fender', NULL, 7.15, '41.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '8-11-14-22-32-46'),
(42, 'strings', 'Ernie Ball 2225', 'ernie ball', NULL, 6.25, '42.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '8-11-14-22-30-38'),
(43, 'strings', 'Daddario EXL130', 'daddario', NULL, 6.25, '43.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '8-11-14-22-30-38'),
(44, 'strings', 'Ernie Ball 2223', 'ernie ball', NULL, 5.15, '44.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '9-11-16-24-32-42'),
(45, 'strings', 'Daddario EXL120-3D', 'daddario', NULL, 14.4, '45.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '9-11-16-24-32-42'),
(46, 'strings', 'Daddario EXL125-3D', 'daddario', NULL, 14.95, '46.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '9-11-16-24-32-42'),
(47, 'strings', 'Ernie Ball 2221', 'ernie ball', NULL, 4.9, '47.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '10-13-17-26-36-46'),
(48, 'strings', 'Daddario EXL110-3D', 'daddario', NULL, 15.3, '48.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '10-13-17-26-36-46'),
(49, 'strings', 'Elixir Optiweb 19077 Light/Heavy', 'elixir', NULL, 12.85, '49.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel ', '10-13-17-32-42-52'),
(50, 'strings', 'Elixir Optiweb 19102 Medium', 'elixir', NULL, 12.6, '50.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel ', '11-14-18-28-38-49'),
(51, 'strings', 'Daddario EXL117', 'daddario', NULL, 6.25, '51.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '11-14-19-32-44-56'),
(52, 'strings', 'Ernie Ball 2627 Beefy Slinky', 'ernie ball', NULL, 6.25, '52.jpg', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, 'Nickel-plated steel', '11-15-22-30-42-54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
