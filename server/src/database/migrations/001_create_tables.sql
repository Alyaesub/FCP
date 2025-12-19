/*
*TABLE EQUIPES
  - Une seule table pour toutes les équipes (club + adversaires)
  - Le champ "type" permet de différencier :
  'club'       : équipe du FC Provence
  'exterieure' : adversaire, équipe d'un autre club
*/
CREATE TABLE equipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  categorie VARCHAR(50),
  ville VARCHAR(100),
  logo VARCHAR(255),
  type ENUM('club', 'exterieure') NOT NULL DEFAULT 'club'
);

/*
*TABLE JOUEURS
  - Chaque joueur appartient à une équipe (club ou externe)
  - ON DELETE CASCADE : si une équipe est supprimée,
    on supprime automatiquement ses joueurs associés
*/
CREATE TABLE IF NOT EXISTS joueurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  date_naissance DATE,
  poste VARCHAR(50),
  numero INT,
  photo VARCHAR(255),
  equipe_id INT,
  FOREIGN KEY (equipe_id) REFERENCES equipes(id) ON DELETE CASCADE
);

-- TABLE TOURNOIS
CREATE TABLE IF NOT EXISTS tournaments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

/*
*TABLE MATCHS
  - Gestion des matchs : club vs adversaire
  - Utilise la même table "equipes" pour les 2 équipes
  → equipe_domicile_id  = équipe du club (à domicile)
  → equipe_adverse_id   = équipe adverse (club ou externe)
*/
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATETIME NOT NULL,
  location VARCHAR(100) NOT NULL,
  equipe_domicile_id INT NOT NULL,
  equipe_adverse_id INT NOT NULL,
  score_domicile INT,
  score_exterieur INT,
  is_home BOOLEAN DEFAULT TRUE,
  is_tournament BOOLEAN DEFAULT FALSE,
  tournament_id INT,
  FOREIGN KEY (equipe_domicile_id) REFERENCES equipes(id) ON DELETE CASCADE,
  FOREIGN KEY (equipe_adverse_id) REFERENCES equipes(id) ON DELETE CASCADE,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE SET NULL
);

-- TABLE GALERIES
CREATE TABLE IF NOT EXISTS galeries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  description TEXT,
  date DATETIME,
  equipe_id INT,
  FOREIGN KEY (equipe_id) REFERENCES equipes(id) ON DELETE SET NULL
);

-- TABLE PHOTOS
CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  galerie_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  description TEXT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (galerie_id) REFERENCES galeries(id) ON DELETE CASCADE
);

-- TABLE EVENEMENTS
CREATE TABLE IF NOT EXISTS evenements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  description TEXT,
  date DATETIME,
  lieu VARCHAR(150),
  type ENUM('match', 'tournoi', 'réunion', 'autre') DEFAULT 'autre'
);

-- TABLE USERS (admin/staff)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'staff') DEFAULT 'staff'
);