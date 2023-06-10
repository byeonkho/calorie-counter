-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: sys
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `user_firstname` varchar(80) NOT NULL,
  `user_lastname` varchar(80) NOT NULL,
  `user_password_hash` varchar(80) NOT NULL,
  `user_is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@admin','jesus','christ','$2b$12$AMPIVvNsTFM2HEF.3ZY/NekGO9TAMMPqvGFmoXPmbikAfiyIUWgq6',1),(4,'test@gmail.com','test','test','$2b$12$MLFHC.ij736us/BZWfsLOuwzUir.phHS2n71uEQcehMssJuG1vhIC',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_nutrition`
--

DROP TABLE IF EXISTS `user_nutrition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_nutrition` (
  `nutrition_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  `ingredient_name` varchar(80) NOT NULL,
  `servings` int NOT NULL,
  `unit` varchar(40) NOT NULL,
  `date_entered` varchar(80) NOT NULL,
  `period_of_day` varchar(20) DEFAULT NULL,
  `calories` varchar(80) DEFAULT NULL,
  `fat` varchar(80) DEFAULT NULL,
  `saturated` varchar(80) DEFAULT NULL,
  `polyunsaturatedfat` varchar(80) DEFAULT NULL,
  `monounsaturatedfat` varchar(80) DEFAULT NULL,
  `transfat` varchar(80) DEFAULT NULL,
  `cholesterol` varchar(80) DEFAULT NULL,
  `sodium` varchar(80) DEFAULT NULL,
  `potassium` varchar(80) DEFAULT NULL,
  `carbohydrates` varchar(80) DEFAULT NULL,
  `fiber` varchar(80) DEFAULT NULL,
  `sugar` varchar(80) DEFAULT NULL,
  `protein` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`nutrition_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_nutrition_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_nutrition`
--

LOCK TABLES `user_nutrition` WRITE;
/*!40000 ALTER TABLE `user_nutrition` DISABLE KEYS */;
INSERT INTO `user_nutrition` VALUES (1,1,123,'food',1,'kg','2023-06-08 16:32:40.714785','Breakfast','300','0','0','0','0','0','0','0','0','0','0','0','0'),(3,1,1015006,'chicken meat',4,'chicken','09-06-2023','Breakfast','7912kcal','554.21g','0','118.86g','229.63g','3.57g','2760mg','2576mg','6955.2mg','0g','0g','0g','684.48g'),(5,1,98867,'pork knuckles',4,'piece','09-06-2023','Lunch','1604.8kcal','149.6g','0','11.02g','67.12g','0.27g','455.6mg','448.8mg','0mg','0g','0g','0g','115.6g'),(6,1,6172,'chicken stock',2,'can','09-06-2023','Breakfast','216kcal','7.2g','0','1.28g','3.49g','0','18mg','858mg','630mg','21.18g','0g','9.48g','15.12g'),(9,4,1015006,'chicken meat',2,'chicken','09-06-2023','Breakfast','3956kcal','277.1g','0','59.43g','114.82g','1.78g','1380mg','1288mg','3477.6mg','0g','0g','0g','342.24g'),(10,4,1015006,'chicken meat',2,'unit','09-06-2023','Breakfast','1186.8kcal','83.13g','0','17.83g','34.44g','0.54g','414mg','386.4mg','1043.28mg','0g','0g','0g','102.67g'),(11,1,5075,'chicken legs',1,'leg','09-06-2023','Dinner','419.61kcal','31.27g','0','6.57g','12.98g','0.12g','182.35mg','164.71mg','398.04mg','0.33g','0g','0g','32.1g');
/*!40000 ALTER TABLE `user_nutrition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_weight`
--

DROP TABLE IF EXISTS `user_weight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_weight` (
  `weight_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `weight` float NOT NULL,
  `weight_date_entered` varchar(80) NOT NULL,
  PRIMARY KEY (`weight_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_weight_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_weight`
--

LOCK TABLES `user_weight` WRITE;
/*!40000 ALTER TABLE `user_weight` DISABLE KEYS */;
INSERT INTO `user_weight` VALUES (1,1,80,'01-01-1992'),(3,1,70,'08-06-2023'),(4,1,70,'06-06-2023'),(5,1,80,'05-06-2023'),(6,1,80,'09-06-2023'),(7,1,80,'02-06-2023'),(8,4,80,'09-06-2023');
/*!40000 ALTER TABLE `user_weight` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-10 15:20:42
