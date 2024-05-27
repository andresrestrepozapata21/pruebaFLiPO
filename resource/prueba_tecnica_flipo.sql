-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2024 a las 09:13:48
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_tecnica_flipo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `classes`
--

CREATE TABLE `classes` (
  `id_class` int(11) NOT NULL,
  `name_class` varchar(255) NOT NULL,
  `description_class` varchar(255) NOT NULL,
  `date_created_class` datetime NOT NULL,
  `deleteAt` datetime(6) DEFAULT NULL,
  `fk_id_teacher_class` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `classes`
--

INSERT INTO `classes` (`id_class`, `name_class`, `description_class`, `date_created_class`, `deleteAt`, `fk_id_teacher_class`) VALUES
(27, 'fdsa', 'fsdadfs', '2024-05-26 14:09:53', '2024-05-26 14:21:14.000000', NULL),
(28, 'dfsa', 'fdas', '2024-05-26 14:12:24', '2024-05-26 14:19:45.000000', NULL),
(29, 'fdsafdfdsafd', 'fdsafdsa', '2024-05-26 14:21:19', '2024-05-26 14:21:22.000000', NULL),
(30, 'Matematicas', 'Calculo Integral', '2024-05-26 14:23:28', NULL, 1),
(31, 'fdas', 'fdsaf', '2024-05-26 15:16:32', '2024-05-26 15:38:55.000000', NULL),
(32, 'fdsa', 'f', '2024-05-26 15:16:38', '2024-05-26 15:16:55.000000', NULL),
(33, 'fdsa', 'fdas', '2024-05-26 15:51:59', '2024-05-26 15:52:04.000000', NULL),
(34, 'fdsa', 'fdsafd', '2024-05-26 16:24:26', '2024-05-26 20:13:07.000000', NULL),
(35, 'fdsa', 'fdsaf', '2024-05-26 16:39:09', '2024-05-26 16:39:12.000000', NULL),
(36, 'Biologia', 'Ciencias Naturales', '2024-05-26 22:35:28', NULL, 9),
(37, 'fga', 'fsa', '2024-05-26 22:37:33', '2024-05-26 22:37:39.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--

CREATE TABLE `students` (
  `id_student` int(11) NOT NULL,
  `name_student` varchar(255) NOT NULL,
  `last_name_student` varchar(255) NOT NULL,
  `email_student` varchar(255) NOT NULL,
  `date_created_student` datetime NOT NULL,
  `deleteAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id_student`, `name_student`, `last_name_student`, `email_student`, `date_created_student`, `deleteAt`) VALUES
(1, 'Alex', 'Marin', 'correo2@gmail.com', '2024-05-24 15:27:11', NULL),
(2, 'Fernando', 'Marin', 'correo@gmail.com', '2024-05-24 15:27:11', NULL),
(3, 'Camilo', 'Sanchez', 'correo@gmail.com', '2024-05-26 22:29:42', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students_by_classes`
--

CREATE TABLE `students_by_classes` (
  `fk_id_class_sbc` int(11) NOT NULL,
  `fk_id_student_sbc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students_by_classes`
--

INSERT INTO `students_by_classes` (`fk_id_class_sbc`, `fk_id_student_sbc`) VALUES
(30, 1),
(30, 3),
(36, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teachers`
--

CREATE TABLE `teachers` (
  `id_teacher` int(11) NOT NULL,
  `name_teacher` varchar(255) NOT NULL,
  `last_name_teacher` varchar(255) NOT NULL,
  `email_teacher` varchar(255) NOT NULL,
  `date_created_teacher` datetime NOT NULL,
  `deleteAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teachers`
--

INSERT INTO `teachers` (`id_teacher`, `name_teacher`, `last_name_teacher`, `email_teacher`, `date_created_teacher`, `deleteAt`) VALUES
(1, 'Andrés', 'Restrepo', 'arz1@gmail.com', '2024-05-24 15:27:11', NULL),
(2, 'Camilo', 'Reyes', 'arz@gmail.com', '2024-05-24 15:27:11', '2024-05-26 21:59:11.000000'),
(3, 'Diego', 'Restrepo', 'arz@gmail.com', '2024-05-24 15:27:11', '2024-05-25 09:46:36.000000'),
(4, 'Andres', 'fdsa', 'fdas@dkaslf.com', '2024-05-26 21:00:03', '2024-05-26 21:16:03.000000'),
(5, 'Andres', 'fdsa', 'fdas@fdsa.com', '2024-05-26 21:00:31', '2024-05-26 21:16:01.000000'),
(6, 'Andres', 'fdsa', 'fdas@fdsa.com', '2024-05-26 21:01:48', '2024-05-26 21:15:59.000000'),
(7, 'fdasf', 'fdasf', 'fdas@fdsa.com', '2024-05-26 21:02:30', '2024-05-26 21:15:57.000000'),
(8, 'fdsa', 'fdas', 'fdas@fdsa.com', '2024-05-26 21:03:12', '2024-05-26 21:15:55.000000'),
(9, 'Wiliam', 'Amaya', 'correo@gmail.com', '2024-05-26 22:16:28', NULL),
(10, 'Andres', 'fdsafdsaffdsa', 'fdas@fdsa.com', '2024-05-26 22:34:06', '2024-05-26 22:34:33.000000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id_class`),
  ADD KEY `FK_e8e3710d76ada56ca069323dba3` (`fk_id_teacher_class`);

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id_student`);

--
-- Indices de la tabla `students_by_classes`
--
ALTER TABLE `students_by_classes`
  ADD PRIMARY KEY (`fk_id_class_sbc`,`fk_id_student_sbc`),
  ADD KEY `IDX_a8a08d807e75a897f7a82a0d57` (`fk_id_class_sbc`),
  ADD KEY `IDX_73ecbd26470fcc9c02b8e40216` (`fk_id_student_sbc`);

--
-- Indices de la tabla `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id_teacher`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `classes`
--
ALTER TABLE `classes`
  MODIFY `id_class` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id_teacher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `FK_e8e3710d76ada56ca069323dba3` FOREIGN KEY (`fk_id_teacher_class`) REFERENCES `teachers` (`id_teacher`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `students_by_classes`
--
ALTER TABLE `students_by_classes`
  ADD CONSTRAINT `FK_73ecbd26470fcc9c02b8e402165` FOREIGN KEY (`fk_id_student_sbc`) REFERENCES `students` (`id_student`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a8a08d807e75a897f7a82a0d57f` FOREIGN KEY (`fk_id_class_sbc`) REFERENCES `classes` (`id_class`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
