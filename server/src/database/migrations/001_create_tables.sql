-- TABLE EQUIPES
CREATE TABLE IF NOT EXISTS equipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  categorie VARCHAR(50) NOT NULL
);

-- TABLE JOUEURS
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

-- TABLE MATCHS
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATETIME NOT NULL,
  location VARCHAR(100) NOT NULL,
  opponent VARCHAR(100) NOT NULL,
  equipe_domicile_id INT,
  equipe_exterieur_id INT,
  score_domicile INT,
  score_exterieur INT,
  is_home BOOLEAN DEFAULT TRUE,
  is_tournament BOOLEAN DEFAULT FALSE,
  tournament_id INT,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE SET NULL,
  FOREIGN KEY (equipe_domicile_id) REFERENCES equipes(id) ON DELETE SET NULL,
  FOREIGN KEY (equipe_exterieur_id) REFERENCES equipes(id) ON DELETE SET NULL
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