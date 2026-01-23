-- ============================================
-- 1. ÉQUIPES DU CLUB (5 équipes réelles)
-- ============================================
INSERT INTO equipes (nom, slug, categorie, description, ville, logo, photo_equipe, entrainements, lieu, coach_nom, coach_photo, type)
VALUES
('U7 - Equipe Eveil', 'u7-eveil', 'U7', 'Categorie eveil pour les plus jeunes', 'Mas-thibert', '/logos/u7.png', '/equipes/u7-team.jpg', 'Mercredi 14h-15h, Samedi 10h-11h', 'Stade Municipal', 'Entraineur U7', '/coaches/coach-u7.jpg', 'club'),
('U9 - Equipe Debutants', 'u9-debutants', 'U9', 'Apprentissage du football', 'Mas-thibert', '/logos/u9.png', '/equipes/u9-team.jpg', 'Mardi 17h-18h, Jeudi 17h-18h', 'Stade Municipal', 'Entraineur U9', '/coaches/coach-u9.jpg', 'club'),
('U10 - Equipe Developpement', 'u10-developpement', 'U10', 'Developpement technique', 'Mas-thibert', '/logos/u10.png', '/equipes/u10-team.jpg', 'Lundi 18h-19h30, Vendredi 18h-19h30', 'Stade Municipal', 'Entraineur U10', '/coaches/coach-u10.jpg', 'club'),
('U12 - Equipe Competition', 'u12-competition', 'U12', 'Competition departementale', 'Mas-thibert', '/logos/u12.png', '/equipes/u12-team.jpg', 'Mardi 18h-19h30, Jeudi 18h-19h30', 'Stade Municipal', 'Entraineur U12', '/coaches/coach-u12.jpg', 'club'),
('Equipe Seniors', 'seniors', 'Seniors', 'Equipe premiere', 'Mas-thibert', '/logos/seniors.png', '/equipes/seniors-team.jpg', 'Mardi 20h-22h, Jeudi 20h-22h', 'Stade Municipal', 'Entraineur Seniors', '/coaches/coach-seniors.jpg', 'club');

-- ============================================
-- 2. ÉQUIPES ADVERSES (exemples pour matchs)
-- ============================================
INSERT INTO equipes (nom, slug, categorie, ville, logo, type)
VALUES 
('AS Aix-en-Provence', 'as-aix', 'Seniors', 'Aix-en-Provence', '/logos/aix.png', 'exterieure'),
('FC Aubagne', 'fc-aubagne', 'U12', 'Aubagne', '/logos/aubagne.png', 'exterieure'),
('Olympique Salon', 'olympique-salon', 'U9', 'Salon-de-Provence', '/logos/salon.png', 'exterieure'),
('US Marignane', 'us-marignane', 'U10', 'Marignane', '/logos/marignane.png', 'exterieure');

-- ============================================
-- 3. JOUEURS EXEMPLES (À COMPLÉTER PAR L'ADMIN)
-- ============================================

-- 6 joueurs U7 (exemples à remplacer)
INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, photo, equipe_id)
VALUES 
('Joueur1', 'Prénom1', '2017-01-15', 'Attaquant', 7, '/joueurs/default-u7.jpg', 1),
('Joueur2', 'Prénom2', '2017-03-22', 'Milieu', 10, '/joueurs/default-u7.jpg', 1),
('Joueur3', 'Prénom3', '2017-05-10', 'Défenseur', 4, '/joueurs/default-u7.jpg', 1),
('Joueur4', 'Prénom4', '2017-02-18', 'Gardien', 1, '/joueurs/default-u7.jpg', 1),
('Joueur5', 'Prénom5', '2017-06-30', 'Attaquant', 9, '/joueurs/default-u7.jpg', 1),
('Joueur6', 'Prénom6', '2017-04-12', 'Milieu', 6, '/joueurs/default-u7.jpg', 1);

-- 6 joueurs U9 (exemples à remplacer)
INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, photo, equipe_id)
VALUES 
('Joueur7', 'Prénom7', '2015-04-12', 'Attaquant', 9, '/joueurs/default-u9.jpg', 2),
('Joueur8', 'Prénom8', '2015-06-25', 'Milieu', 8, '/joueurs/default-u9.jpg', 2),
('Joueur9', 'Prénom9', '2015-09-03', 'Défenseur', 5, '/joueurs/default-u9.jpg', 2),
('Joueur10', 'Prénom10', '2015-02-14', 'Gardien', 1, '/joueurs/default-u9.jpg', 2),
('Joueur11', 'Prénom11', '2015-07-20', 'Attaquant', 11, '/joueurs/default-u9.jpg', 2),
('Joueur12', 'Prénom12', '2015-05-08', 'Défenseur', 3, '/joueurs/default-u9.jpg', 2);

-- 6 joueurs U10 (exemples à remplacer)
INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, photo, equipe_id)
VALUES 
('Joueur13', 'Prénom13', '2014-03-15', 'Attaquant', 10, '/joueurs/default-u10.jpg', 3),
('Joueur14', 'Prénom14', '2014-05-22', 'Milieu', 8, '/joueurs/default-u10.jpg', 3),
('Joueur15', 'Prénom15', '2014-07-10', 'Défenseur', 4, '/joueurs/default-u10.jpg', 3),
('Joueur16', 'Prénom16', '2014-02-28', 'Gardien', 1, '/joueurs/default-u10.jpg', 3),
('Joueur17', 'Prénom17', '2014-08-12', 'Attaquant', 9, '/joueurs/default-u10.jpg', 3),
('Joueur18', 'Prénom18', '2014-04-05', 'Milieu', 6, '/joueurs/default-u10.jpg', 3);

-- 8 joueurs U12 (exemples à remplacer)
INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, photo, equipe_id)
VALUES 
('Joueur19', 'Prénom19', '2012-01-20', 'Attaquant', 11, '/joueurs/default-u12.jpg', 4),
('Joueur20', 'Prénom20', '2012-03-15', 'Milieu', 8, '/joueurs/default-u12.jpg', 4),
('Joueur21', 'Prénom21', '2012-05-30', 'Défenseur', 5, '/joueurs/default-u12.jpg', 4),
('Joueur22', 'Prénom22', '2012-07-08', 'Gardien', 1, '/joueurs/default-u12.jpg', 4),
('Joueur23', 'Prénom23', '2012-09-14', 'Attaquant', 9, '/joueurs/default-u12.jpg', 4),
('Joueur24', 'Prénom24', '2012-02-22', 'Milieu', 6, '/joueurs/default-u12.jpg', 4),
('Joueur25', 'Prénom25', '2012-04-18', 'Défenseur', 4, '/joueurs/default-u12.jpg', 4),
('Joueur26', 'Prénom26', '2012-11-05', 'Milieu', 10, '/joueurs/default-u12.jpg', 4);

-- 11 joueurs Seniors (exemples à remplacer)
INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, photo, equipe_id)
VALUES 
('Joueur27', 'Prénom27', '1995-01-20', 'Attaquant', 11, '/joueurs/default-senior.jpg', 5),
('Joueur28', 'Prénom28', '1993-07-15', 'Milieu', 8, '/joueurs/default-senior.jpg', 5),
('Joueur29', 'Prénom29', '1996-11-30', 'Défenseur', 5, '/joueurs/default-senior.jpg', 5),
('Joueur30', 'Prénom30', '1994-03-08', 'Gardien', 1, '/joueurs/default-senior.jpg', 5),
('Joueur31', 'Prénom31', '1997-05-14', 'Milieu', 6, '/joueurs/default-senior.jpg', 5),
('Joueur32', 'Prénom32', '1995-09-22', 'Attaquant', 9, '/joueurs/default-senior.jpg', 5),
('Joueur33', 'Prénom33', '1996-02-18', 'Défenseur', 4, '/joueurs/default-senior.jpg', 5),
('Joueur34', 'Prénom34', '1994-12-05', 'Milieu', 10, '/joueurs/default-senior.jpg', 5),
('Joueur35', 'Prénom35', '1998-03-11', 'Défenseur', 3, '/joueurs/default-senior.jpg', 5),
('Joueur36', 'Prénom36', '1992-08-27', 'Milieu', 7, '/joueurs/default-senior.jpg', 5),
('Joueur37', 'Prénom37', '1999-01-15', 'Attaquant', 19, '/joueurs/default-senior.jpg', 5);

-- ============================================
-- 4. TOURNOIS
-- ============================================
INSERT INTO tournaments (name, location, start_date, end_date)
VALUES 
('Tournoi de Printemps', 'Stade Municipal de Marseille', '2025-03-15', '2025-03-17'),
('Coupe Départementale U12', 'Complexe Sportif', '2025-04-20', '2025-04-21');

-- ============================================
-- 5. MATCHS PASSÉS (quelques exemples)
-- ============================================
INSERT INTO matches (date, location, equipe_domicile_id, equipe_exterieur_id, score_domicile, score_exterieur, is_home, is_tournament, tournament_id)
VALUES 
('2024-12-15 15:00:00', 'Stade Municipal', 1, 6, 2, 1, TRUE, FALSE, NULL),
('2025-01-10 16:00:00', 'Stade d\'Aix', 6, 5, 1, 3, FALSE, FALSE, NULL);

-- ============================================
-- 6. MATCHS À VENIR (quelques exemples)
-- ============================================
INSERT INTO matches (date, location, equipe_domicile_id, equipe_exterieur_id, score_domicile, score_exterieur, is_home, is_tournament, tournament_id)
VALUES 
('2026-01-30 15:00:00', 'Stade Municipal', 1, 7, NULL, NULL, TRUE, FALSE, NULL),
('2026-02-05 14:30:00', 'Stade Municipal', 2, 8, NULL, NULL, TRUE, FALSE, NULL),
('2026-02-20 15:30:00', 'Stade Municipal', 5, 6, NULL, NULL, TRUE, FALSE, NULL);

-- ============================================
-- 7. GALERIES (quelques exemples)
-- ============================================
INSERT INTO galeries (titre, description, date, equipe_id)
VALUES 
('Photos d\'équipe - Saison 2024-2025', 'Photos officielles de toutes les équipes', '2024-09-01 00:00:00', NULL),
('Match Seniors - Janvier 2025', 'Photos du match contre Aix', '2025-01-10 00:00:00', 5),
('Entraînement U7', 'Séances d\'entraînement des U7', '2025-01-15 00:00:00', 1);

-- ============================================
-- 8. PHOTOS (quelques exemples)
-- ============================================
INSERT INTO photos (galerie_id, filename, titre, description)
VALUES 
(1, 'photo-equipe-u7.jpg', 'Équipe U7', 'Photo officielle équipe U7'),
(1, 'photo-equipe-u9.jpg', 'Équipe U9', 'Photo officielle équipe U9'),
(1, 'photo-equipe-seniors.jpg', 'Équipe Seniors', 'Photo officielle équipe Seniors'),
(2, 'match-seniors-1.jpg', 'Action de jeu', 'Belle action pendant le match'),
(3, 'entrainement-u7-1.jpg', 'Exercices', 'Entraînement technique');

-- ============================================
-- 9. ÉVÉNEMENTS
-- ============================================
INSERT INTO evenements (titre, description, date, lieu, logo, type)
VALUES 
('Match Seniors vs AS Aix', 'Championnat départemental', '2025-02-20 15:30:00', 'Stade Municipal', '/logos/seniors.png', 'match'),
('Tournoi de Printemps', 'Tournoi inter-clubs toutes catégories', '2025-03-15 10:00:00', 'Stade Municipal', '/logos/club.png', 'tournoi'),
('Portes ouvertes du club', 'Venez découvrir le FC Provence', '2025-04-05 14:00:00', 'Stade Municipal', '/logos/club.png', 'autre');

-- ============================================
-- 10. ACTUALITÉS
-- ============================================
INSERT INTO actualites (titre, contenu, image, auteur)
VALUES 
('Début de saison 2024-2025', 'Le FC Provence reprend les entraînements pour toutes les catégories. Inscription encore possible pour les U7 et U9.', '/actus/debut-saison.jpg', 'FC Provence'),
('Victoire des Seniors', 'Belle victoire 3-1 de nos Seniors face à l\'AS Aix-en-Provence. Bravo à toute l\'équipe !', '/actus/victoire-seniors.jpg', 'Entraîneur Seniors'),
('Journée portes ouvertes', 'Rendez-vous le 5 avril pour découvrir le club, rencontrer les éducateurs et essayer gratuitement !', '/actus/portes-ouvertes.jpg', 'FC Provence');

-- ============================================
-- VÉRIFICATION
-- ============================================
SELECT 'Équipes' as Contenu, COUNT(*) as Nombre FROM equipes
UNION ALL
SELECT 'Joueurs', COUNT(*) FROM joueurs
UNION ALL
SELECT 'Matchs', COUNT(*) FROM matches
UNION ALL
SELECT 'Tournois', COUNT(*) FROM tournaments
UNION ALL
SELECT 'Galeries', COUNT(*) FROM galeries
UNION ALL
SELECT 'Photos', COUNT(*) FROM photos
UNION ALL
SELECT 'Événements', COUNT(*) FROM evenements
UNION ALL
SELECT 'Actualités', COUNT(*) FROM actualites;