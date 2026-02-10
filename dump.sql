-- MySQL dump 10.13  Distrib 9.2.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: fcProvence
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actualites`
--

DROP TABLE IF EXISTS `actualites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actualites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(150) NOT NULL,
  `contenu` text NOT NULL,
  `date_publication` datetime DEFAULT CURRENT_TIMESTAMP,
  `auteur` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actualites`
--

LOCK TABLES `actualites` WRITE;
/*!40000 ALTER TABLE `actualites` DISABLE KEYS */;
INSERT INTO `actualites` VALUES (1,'Début de saison 2025-2026','Le FC Provence reprend les entraînements pour toutes les catégories. Inscription encore possible pour les U7 et U9.','2026-01-23 19:42:13','FC Provence'),(2,'Victoire des Seniors','Belle victoire 3-1 de nos Seniors face à l\'AS Aix-en-Provence. Bravo à toute l\'équipe !','2026-01-23 19:42:13','Entraîneur Seniors'),(3,'Journée portes ouvertes','Rendez-vous le 5 avril pour découvrir le club, rencontrer les éducateurs et essayer gratuitement !','2026-01-23 19:42:13','FC Provence'),(6,'teste actu','test actu via admin','2026-02-07 14:50:26','admin');
/*!40000 ALTER TABLE `actualites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipes`
--

DROP TABLE IF EXISTS `equipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `categorie` varchar(50) DEFAULT NULL,
  `description` text,
  `ville` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `photo_equipe` varchar(255) DEFAULT NULL,
  `entrainements` varchar(255) DEFAULT NULL,
  `lieu` varchar(100) DEFAULT NULL,
  `coach_nom` varchar(100) DEFAULT NULL,
  `coach_photo` varchar(255) DEFAULT NULL,
  `type` enum('club','exterieure') NOT NULL DEFAULT 'club',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipes`
--

LOCK TABLES `equipes` WRITE;
/*!40000 ALTER TABLE `equipes` DISABLE KEYS */;
INSERT INTO `equipes` VALUES (1,'U7','u7','U7','Categorie eveil pour les plus jeunes','Mas-thibert','https://res.cloudinary.com/diiorawlx/image/upload/v1769876338/FCP_U7-removebg-preview_fyfkwl.png','https://res.cloudinary.com/diiorawlx/image/upload/v1769876343/photoEquipe1_miewwm.jpg','Mercredi 14h-15h, Samedi 10h-11h','Stade Municipal','Entraineur U7','https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png','club'),(2,'U9','u9','U9','Apprentissage du football','Mas-thibert','https://res.cloudinary.com/diiorawlx/image/upload/v1769876342/FCP_U9-removebg-preview_giszpg.png','https://res.cloudinary.com/diiorawlx/image/upload/v1769876342/photoEquipe2_zleeoo.jpg','Mardi 17h-18h, Jeudi 17h-18h','Stade Municipal','Entraineur U9','https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png','club'),(3,'U10 ','u10','U10','Developpement technique','Mas-thibert','https://res.cloudinary.com/diiorawlx/image/upload/v1769876340/FCP_U10-removebg-preview_upoac3.png','https://res.cloudinary.com/diiorawlx/image/upload/v1769876342/photoEquipe3_woxcmc.jpg','Lundi 18h-19h30, Vendredi 18h-19h30','Stade Municipal','Entraineur U10','https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png','club'),(4,'U12','u12','U12','Competition departementale','Mas-thibert','https://res.cloudinary.com/diiorawlx/image/upload/v1769876339/FCP_U12-removebg-preview_p8jwz6.png','https://res.cloudinary.com/diiorawlx/image/upload/v1769876341/photoEquipe4_bqeeuh.jpg','Mardi 18h-19h30, Jeudi 18h-19h30','Stade Municipal','Entraineur U12','https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png','club'),(5,'Equipe Seniors','seniors','Seniors','les anciens ','Mas-thibert','https://res.cloudinary.com/diiorawlx/image/upload/v1769877586/logo_senior_appdoz.png','https://res.cloudinary.com/diiorawlx/image/upload/v1769876341/photoEquipe5_e6iu8d.jpg','Mardi 20h-22h, Jeudi 20h-22h','Stade Municipal','Entraineur Seniors','https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png','club'),(6,'AS Aix-en-Provence','as-aix','Seniors','','Aix-en-Provence','https://res.cloudinary.com/diiorawlx/image/upload/v1770477961/equipes/logo/k2myhgrfnff3j12inrnu.jpg',NULL,'','','',NULL,'exterieure'),(7,'FC Aubagne','fc-aubagne','U12','','Aubagne','https://res.cloudinary.com/diiorawlx/image/upload/v1770478002/equipes/logo/grxfkxrnr3f9jf8izpk5.jpg',NULL,'','','',NULL,'exterieure'),(8,'Olympique Salon','olympique-salon','U9',NULL,'Salon-de-Provence','https://res.cloudinary.com/diiorawlx/image/upload/v1769876343/logo-ano_jgd1kz.jpg',NULL,NULL,NULL,NULL,NULL,'exterieure'),(9,'US Marignane','us-marignane','U10',NULL,'Marignane','https://res.cloudinary.com/diiorawlx/image/upload/v1769876343/logo-ano_jgd1kz.jpg',NULL,NULL,NULL,NULL,NULL,'exterieure'),(11,'TEST','test','TEST','Test equipe','Marseille','http://test.jpg','http://test.jpg',NULL,NULL,NULL,'http://test.jpg','club');
/*!40000 ALTER TABLE `equipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evenements`
--

DROP TABLE IF EXISTS `evenements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evenements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(150) NOT NULL,
  `description` text,
  `date` datetime DEFAULT NULL,
  `lieu` varchar(150) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `type` enum('match','tournoi','réunion','autre') DEFAULT 'autre',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evenements`
--

LOCK TABLES `evenements` WRITE;
/*!40000 ALTER TABLE `evenements` DISABLE KEYS */;
INSERT INTO `evenements` VALUES (1,'Match Seniors vs AS Aix','Championnat départemental','2025-02-20 15:30:00','Stade Municipal','/logos/seniors.png','match'),(2,'Tournoi de Printemps','Tournoi inter-clubs toutes catégories','2025-03-15 10:00:00','Stade Municipal','/logos/club.png','tournoi'),(3,'Portes ouvertes du club','Venez découvrir le FC Provence','2025-04-05 14:00:00','Stade Municipal','/logos/club.png','autre'),(5,'test evenement','test ajout event via admin','2026-02-14 15:37:00','arles',NULL,'autre');
/*!40000 ALTER TABLE `evenements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galeries`
--

DROP TABLE IF EXISTS `galeries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galeries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(150) NOT NULL,
  `description` text,
  `date` datetime DEFAULT NULL,
  `equipe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `equipe_id` (`equipe_id`),
  CONSTRAINT `galeries_ibfk_1` FOREIGN KEY (`equipe_id`) REFERENCES `equipes` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeries`
--

LOCK TABLES `galeries` WRITE;
/*!40000 ALTER TABLE `galeries` DISABLE KEYS */;
INSERT INTO `galeries` VALUES (1,'Photos d\'équipe - Saison 2024-2025','Photos officielles de toutes les équipes','2024-09-01 00:00:00',NULL),(2,'Match Seniors - Janvier 2025','Photos du match contre Aix','2025-01-10 00:00:00',5),(3,'Entraînement U7','Séances d\'entraînement des U7','2025-01-15 00:00:00',1),(5,'Tombola du club - Janvier 2026','Grande tombola annuelle du club','2026-01-15 00:00:00',NULL);
/*!40000 ALTER TABLE `galeries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joueurs`
--

DROP TABLE IF EXISTS `joueurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joueurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `date_naissance` date DEFAULT NULL,
  `poste` varchar(50) DEFAULT NULL,
  `numero` int DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `equipe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `equipe_id` (`equipe_id`),
  CONSTRAINT `joueurs_ibfk_1` FOREIGN KEY (`equipe_id`) REFERENCES `equipes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joueurs`
--

LOCK TABLES `joueurs` WRITE;
/*!40000 ALTER TABLE `joueurs` DISABLE KEYS */;
INSERT INTO `joueurs` VALUES (1,'Joueur1','Prénom1','2017-01-15','Attaquant',7,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876349/photo-perso1_rmgdbq.jpg',1),(2,'Joueur2','Prénom2','2017-03-22','Milieu',10,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png',1),(3,'Joueur3','Prénom3','2017-05-10','Défenseur',4,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876349/photo-perso2_b5srei.jpg',1),(4,'Joueur4','Prénom4','2017-02-18','Gardien',1,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png',1),(5,'Joueur5','Prénom5','2017-06-30','Attaquant',9,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876351/joueur-ano_s62com.png',1),(6,'Joueur6','Prénom6','2017-04-12','Milieu',6,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png',1),(7,'Joueur7','Prénom7','2015-04-12','Attaquant',9,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876351/joueur-ano_s62com.png',2),(8,'Joueur8','Prénom8','2015-06-25','Milieu',8,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png',2),(9,'Joueur9','Prénom9','2015-09-03','Défenseur',5,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876351/joueur-ano_s62com.png',2),(10,'Joueur10','Prénom10','2015-02-14','Gardien',1,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png',2),(38,'joueur ','test','2014-01-07','Gardien',1,'https://res.cloudinary.com/diiorawlx/image/upload/v1770478505/joueurs/k3bzj5x9x0zeojrrwnqt.jpg',1);
/*!40000 ALTER TABLE `joueurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `location` varchar(100) NOT NULL,
  `equipe_domicile_id` int NOT NULL,
  `equipe_exterieur_id` int NOT NULL,
  `score_domicile` int DEFAULT NULL,
  `score_exterieur` int DEFAULT NULL,
  `is_home` tinyint(1) DEFAULT '1',
  `is_tournament` tinyint(1) DEFAULT '0',
  `tournament_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `equipe_domicile_id` (`equipe_domicile_id`),
  KEY `equipe_exterieur_id` (`equipe_exterieur_id`),
  KEY `tournament_id` (`tournament_id`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`equipe_domicile_id`) REFERENCES `equipes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`equipe_exterieur_id`) REFERENCES `equipes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (1,'2024-12-15 15:00:00','Stade Municipal',1,6,2,1,1,0,NULL),(2,'2025-01-10 16:00:00','Stade d\'Aix',6,5,1,3,0,0,NULL),(3,'2026-01-30 14:00:00','Stade Municipal',1,7,2,1,1,0,NULL),(4,'2026-02-05 13:30:00','Stade Municipal',2,8,2,3,1,0,NULL),(5,'2026-02-20 15:30:00','Stade Municipal',5,6,NULL,NULL,1,0,NULL),(6,'2026-02-12 15:40:00','salon',4,8,NULL,NULL,1,0,NULL),(7,'2026-02-18 19:38:00','stade de marseille',2,9,NULL,NULL,1,0,NULL);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `galerie_id` int NOT NULL,
  `filename` varchar(255) NOT NULL,
  `titre` varchar(150) DEFAULT NULL,
  `description` text,
  `uploaded_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `galerie_id` (`galerie_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`galerie_id`) REFERENCES `galeries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,1,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876343/photoEquipe1_miewwm.jpg','Équipe U7','Photo officielle équipe U7','2026-01-23 19:41:14'),(2,1,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876342/photoEquipe2_zleeoo.jpg','Équipe U9','Photo officielle équipe U9','2026-01-23 19:41:14'),(3,1,'https://res.cloudinary.com/diiorawlx/image/upload/v1769876341/photoEquipe5_e6iu8d.jpg','Équipe Seniors','Photo officielle équipe Seniors','2026-01-23 19:41:14'),(4,2,'https://res.cloudinary.com/diiorawlx/image/upload/v1770312906/match1_zj9ycc.jpg','Action de jeu','Belle action pendant le match','2026-01-23 19:41:14'),(5,3,'https://res.cloudinary.com/diiorawlx/image/upload/v1770312871/entrainement1_p9ydcb.jpg','Exercices','Entraînement technique','2026-01-23 19:41:14'),(7,2,'https://res.cloudinary.com/diiorawlx/image/upload/v1770312905/match2_suf4tr.jpg','Action de match','Deuxième photo du match contre Aix','2026-02-05 19:10:23'),(8,3,'https://res.cloudinary.com/diiorawlx/image/upload/v1770312873/entrainement2_uuyhdx.jpg','Exercices tactiques','Séance d\'entraînement technique U7','2026-02-05 19:12:00'),(14,5,'https://res.cloudinary.com/diiorawlx/image/upload/v1770312820/event1_btcdwq.jpg','Tombola 2025','Ambiance de la tombola annuelle','2026-02-05 19:15:20'),(15,5,'https://res.cloudinary.com/diiorawlx/image/upload/v1770312819/event2_dwmanl.jpg','Stand buvette','Le stand de la buvette lors de la tombola','2026-02-05 19:15:20'),(16,5,'https://res.cloudinary.com/diiorawlx/image/upload/v1770312819/event3_vzhcog.jpg','Jeux pour enfants','Les activités pour les plus jeunes','2026-02-05 19:15:20');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournaments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
INSERT INTO `tournaments` VALUES (1,'Tournoi de Printemps','Stade Municipal de Marseille','2025-03-15','2025-03-17'),(2,'Coupe Départementale U12','Complexe Sportif','2025-04-20','2025-04-21');
/*!40000 ALTER TABLE `tournaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') DEFAULT 'staff',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin FC Provence','admin@fcprovence.fr','$2b$10$LStsKQbDy.Vq8gmuqEHEdOMsbU53oltZcUhKsLSLbUOwQaEeLHSri','admin','2026-02-06 17:37:17'),(4,'testeStaff','test@staff.fr','$2b$10$WIZCuKP4Yk4x4shd/dpz/u6zfbco5ndOmSZxsfrrfLY8p3YuptW..','staff','2026-02-06 21:20:41'),(5,'Ichem Admin','ichem@admin.fr','$2b$10$QdPicGdFyPi9tnEZT0LzWuOVrVL9.Y9QQIOeHZr5K58YXFStu2SXG','admin','2026-02-09 18:28:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-10 19:59:54
