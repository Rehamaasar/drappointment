-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Dec 31, 2025 at 02:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthcare_plus`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `patient_full_name` varchar(120) NOT NULL,
  `patient_email` varchar(150) NOT NULL,
  `patient_phone` varchar(30) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` time NOT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `patient_full_name`, `patient_email`, `patient_phone`, `doctor_id`, `preferred_date`, `preferred_time`, `message`, `status`, `created_at`) VALUES
(1, NULL, 'John Doe', 'john@example.com', '+1 (555) 000-0000', 1, '2026-01-10', '10:30:00', 'I have chest discomfort sometimes.', 'pending', '2025-12-28 09:42:27'),
(2, NULL, 'Reham Hasan Aasar', 'rehamaassar@gmail.com', '+96181544571', 4, '2002-02-22', '06:36:00', 'udg', 'pending', '2025-12-29 20:45:39'),
(3, NULL, 'Reham Hasan Aasar', 'rehamaassar@gmail.com', '+96181544571', 1, '2002-02-22', '05:55:00', NULL, 'pending', '2025-12-30 09:31:42'),
(4, NULL, 'Hussein Postman', 'hussein.postman@gmail.com', '71000000', 1, '2026-01-10', '10:30:00', 'Appointment created from Postman', 'pending', '2025-12-31 11:25:11');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `specialty_id` int(11) NOT NULL,
  `years_experience` int(11) NOT NULL DEFAULT 0,
  `rating` decimal(2,1) NOT NULL DEFAULT 0.0,
  `location` varchar(200) NOT NULL,
  `bio` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `full_name`, `specialty_id`, `years_experience`, `rating`, `location`, `bio`, `image_path`, `is_active`, `created_at`) VALUES
(1, 'Dr. Sarah Johnson', 1, 15, 4.9, 'HealthCare+ Medical Center', 'Board-certified cardiologist focused on preventive cardiology and heart disease management.', '/images/doctors/dr-sarah-johnson.png', 1, '2025-12-28 09:42:27'),
(2, 'Dr. Michael Chen', 2, 12, 4.8, 'HealthCare+ Medical Center', 'Pediatrician with a patient-centered approach for children and families.', '/images/doctors/dr-michael-chen.png', 1, '2025-12-28 09:42:27'),
(3, 'Dr. Emily Rodriguez', 3, 10, 4.9, 'HealthCare+ Medical Center', 'Dermatologist specializing in skincare, acne treatment, and medical dermatology.', '/images/doctors/dr-emily-rodriguez.png', 1, '2025-12-28 09:42:27'),
(4, 'Dr. James Wilson', 4, 18, 4.7, 'HealthCare+ Orthopedic Center', 'Dr. James Wilson is an orthopedic surgeon specializing in joint replacement and sports injuries, helping patients restore mobility and return to an active lifestyle.', '/images/doctors/dr-james-wilson.png', 1, '2025-12-29 20:17:42'),
(5, 'Dr. Aisha Patel', 5, 8, 4.9, 'HealthCare+ Wellness Center', 'Dr. Aisha Patel is a psychiatrist focusing on anxiety, depression, and stress-related conditions, offering both medication management and therapy-focused care.', '/images/doctors/dr-aisha-patel.png', 1, '2025-12-29 20:17:42'),
(6, 'Dr. Robert Martinez', 6, 20, 4.8, 'HealthCare+ Family Clinic', 'Dr. Robert Martinez is a general physician providing primary care, chronic disease management, and preventive health services for adults and seniors.', '/images/doctors/dr-robert-martinez.png', 1, '2025-12-29 20:17:42');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability`
--

CREATE TABLE `doctor_availability` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `day_of_week` varchar(15) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_availability`
--

INSERT INTO `doctor_availability` (`id`, `doctor_id`, `day_of_week`, `start_time`, `end_time`, `is_active`) VALUES
(1, 1, 'Monday', '09:00:00', '14:00:00', 1),
(2, 1, 'Wednesday', '11:00:00', '16:00:00', 1),
(3, 1, 'Friday', '09:00:00', '13:00:00', 1),
(4, 2, 'Tuesday', '10:00:00', '15:00:00', 1),
(5, 2, 'Thursday', '12:00:00', '18:00:00', 1),
(6, 3, 'Monday', '10:00:00', '14:00:00', 1),
(7, 3, 'Friday', '12:00:00', '17:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reset_token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `reviewer_name` varchar(120) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `patient_since` year(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `doctor_id`, `user_id`, `reviewer_name`, `rating`, `comment`, `patient_since`, `created_at`) VALUES
(1, 1, NULL, 'Jennifer Adams', 5, 'The care I received was exceptional. Highly recommend!', '2022', '2025-12-28 09:42:27'),
(2, 2, NULL, 'David Thompson', 5, 'Booking appointments is easy and the staff is professional.', '2021', '2025-12-28 09:42:27'),
(3, 3, NULL, 'Maria Garcia', 5, 'Impressed with the level of care and attention to detail.', '2023', '2025-12-28 09:42:27');

-- --------------------------------------------------------

--
-- Table structure for table `specialties`
--

CREATE TABLE `specialties` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialties`
--

INSERT INTO `specialties` (`id`, `name`) VALUES
(1, 'Cardiologist'),
(3, 'Dermatologist'),
(6, 'General Physician'),
(4, 'Orthopedic Surgeon'),
(2, 'Pediatrician'),
(5, 'Psychiatrist');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'patient',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password_hash`, `role`, `created_at`) VALUES
(1, 'Hussein Test', 'hussein@test.com', '03123456', '$2a$10$sA4KrWD1SZrr5H6fK5aeo.5UvUsLCFhb.948FUxC.ixZ.iutumPuC', 'patient', '2025-12-29 18:44:22'),
(2, 'Reham Hasan Aasar', 'rehamaassar@gmail.com', 'oihawo', '$2a$10$CMpM/0MFP1/DYtDC4uBV.OLoiu6b62XxIlq6XUFVkEWCOtEftCFkG', 'patient', '2025-12-29 20:34:37'),
(3, 'Reham Hasan Aasar', '52230205@students.liu.edu.lb', '81544571', '$2a$10$tBjLmvLtXHHDvLoJqwQ4teyFjKj.n2f1ubOwy8b4lEw2StyUMVKWi', 'patient', '2025-12-30 09:27:45'),
(4, 'Postman User', 'postmanuser1@gmail.com', '70000000', '$2a$10$1.D84YDixi6tyXzFA0jihe4EE9c.Y.S98ZFynehdpv1/QdOoyD.f2', 'patient', '2025-12-31 11:19:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_appointments_doctor_id` (`doctor_id`),
  ADD KEY `idx_appointments_user_id` (`user_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_doctors_specialty_id` (`specialty_id`);

--
-- Indexes for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_availability_doctor_id` (`doctor_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reset_token` (`reset_token`),
  ADD KEY `fk_password_resets_user` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_reviews_doctor_id` (`doctor_id`),
  ADD KEY `idx_reviews_user_id` (`user_id`);

--
-- Indexes for table `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_appointments_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  ADD CONSTRAINT `fk_appointments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `fk_doctors_specialty` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`);

--
-- Constraints for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD CONSTRAINT `fk_availability_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `fk_password_resets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
