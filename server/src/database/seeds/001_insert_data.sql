-- ============================================
-- 1. ÉQUIPES DU CLUB (5 équipes réelles)
-- ============================================
INSERT INTO equipes
(nom, slug, categorie, description, ville, logo, photo_equipe, entrainements, lieu, coach_nom, coach_photo, type)
VALUES
('U7', 'u7', 'U7', 'Categorie eveil pour les plus jeunes', 'Mas-thibert',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876338/FCP_U7-removebg-preview_fyfkwl.png',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876343/photoEquipe1_miewwm.jpg',
'Mercredi 14h-15h, Samedi 10h-11h', 'Stade Municipal',
'Entraineur U7', 'https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png', 'club'),

('U9', 'u9', 'U9', 'Apprentissage du football', 'Mas-thibert',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876342/FCP_U9-removebg-preview_giszpg.png',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876342/photoEquipe2_zleeoo.jpg',
'Mardi 17h-18h, Jeudi 17h-18h', 'Stade Municipal',
'Entraineur U9', 'https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png', 'club'),

('U10', 'u10', 'U10', 'Developpement technique', 'Mas-thibert',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876340/FCP_U10-removebg-preview_upoac3.png',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876342/photoEquipe3_woxcmc.jpg',
'Lundi 18h-19h30, Vendredi 18h-19h30', 'Stade Municipal',
'Entraineur U10', 'https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png', 'club'),

('U12', 'u12', 'U12', 'Competition departementale', 'Mas-thibert',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876339/FCP_U12-removebg-preview_p8jwz6.png',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876341/photoEquipe4_bqeeuh.jpg',
'Mardi 18h-19h30, Jeudi 18h-19h30', 'Stade Municipal',
'Entraineur U12', 'https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png', 'club'),

('Equipe Seniors', 'seniors', 'Seniors', 'les anciens', 'Mas-thibert',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769877586/logo_senior_appdoz.png',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876341/photoEquipe5_e6iu8d.jpg',
'Mardi 20h-22h, Jeudi 20h-22h', 'Stade Municipal',
'Entraineur Seniors', 'https://res.cloudinary.com/diiorawlx/image/upload/v1769876835/coach-ano_ehc3zl.png', 'club'),

('AS Aix-en-Provence', 'as-aix', 'Seniors', NULL, 'Aix-en-Provence',
'https://res.cloudinary.com/diiorawlx/image/upload/v1770477961/equipes/logo/k2myhgrfnff3j12inrnu.jpg',
NULL, NULL, NULL, NULL, NULL, 'exterieure'),

('FC Aubagne', 'fc-aubagne', 'U12', NULL, 'Aubagne',
'https://res.cloudinary.com/diiorawlx/image/upload/v1770478002/equipes/logo/grxfkxrnr3f9jf8izpk5.jpg',
NULL, NULL, NULL, NULL, NULL, 'exterieure'),

('Olympique Salon', 'olympique-salon', 'U9', NULL, 'Salon-de-Provence',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876343/logo-ano_jgd1kz.jpg',
NULL, NULL, NULL, NULL, NULL, 'exterieure'),

('US Marignane', 'us-marignane', 'U10', NULL, 'Marignane',
'https://res.cloudinary.com/diiorawlx/image/upload/v1769876343/logo-ano_jgd1kz.jpg',
NULL, NULL, NULL, NULL, NULL, 'exterieure'),

('TEST', 'test', 'TEST', 'Test equipe', 'Marseille',
'http://test.jpg', 'http://test.jpg',
NULL, NULL, 'http://test.jpg', NULL, 'club');
-- ============================================
-- 2. Users
-- ============================================
INSERT INTO users (name, email, password, role)
VALUES
('Admin FC Provence', 'admin@fcprovence.fr', '$2b$10$LStsKQbDy.Vq8gmuqEHEdOMsbU53oltZcUhKsLSLbUOwQaEeLHSri', 'admin'),
('testeStaff', 'test@staff.fr', '$2b$10$WIZCuKP4Yk4x4shd/dpz/u6zfbco5ndOmSZxsfrrfLY8p3YuptW..', 'staff'),
('hicham', 'hicham@admin.fr', '$2b$10$QdPicGdFyPi9tnEZT0LzWuOVrVL9.Y9QQIOeHZr5K58YXFStu2SXG', 'admin');

-- ============================================
-- 3. JOUEURS EXEMPLES (À COMPLÉTER PAR L'ADMIN)
-- ============================================

INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, photo, equipe_id)
VALUES
('Joueur1', 'Prenom1', '2017-01-15', 'Attaquant', 7,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876349/photo-perso1_rmgdbq.jpg', 1),
('Joueur2', 'Prenom2', '2017-03-22', 'Milieu',    10, 'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png', 1),
('Joueur3', 'Prenom3', '2017-05-10', 'Defenseur', 4,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876349/photo-perso2_b5srei.jpg', 1),
('Joueur4', 'Prenom4', '2017-02-18', 'Gardien',   1,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png', 1),
('Joueur5', 'Prenom5', '2017-06-30', 'Attaquant', 9,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876351/joueur-ano_s62com.png', 1),
('Joueur6', 'Prenom6', '2017-04-12', 'Milieu',    6,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png', 1),
('Joueur7', 'Prenom7', '2015-04-12', 'Attaquant', 9,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876351/joueur-ano_s62com.png', 2),
('Joueur8', 'Prenom8', '2015-06-25', 'Milieu',    8,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png', 2),
('Joueur9', 'Prenom9', '2015-09-03', 'Defenseur', 5,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876351/joueur-ano_s62com.png', 2),
('Joueur10','Prenom10','2015-02-14', 'Gardien',   1,  'https://res.cloudinary.com/diiorawlx/image/upload/v1769876350/joueuse-ano_qd5qef.png', 2),
('joueur',  'test',    '2014-01-07', 'Gardien',   1,  'https://res.cloudinary.com/diiorawlx/image/upload/v1770478505/joueurs/k3bzj5x9x0zeojrrwnqt.jpg', 1);


-- ============================================
-- 5. MATCHS PASSÉS (quelques exemples)
-- ============================================
INSERT INTO matches
(date, location, equipe_domicile_id, equipe_exterieur_id, score_domicile, score_exterieur, is_home, is_tournament, tournament_id)
VALUES
('2024-12-15 15:00:00', 'Stade Municipal', 1, 6, 2, 1, 1, 0, NULL),
('2025-01-10 16:00:00', 'Stade d''Aix',     6, 5, 1, 3, 0, 0, NULL),
('2026-01-30 14:00:00', 'Stade Municipal', 1, 7, 2, 1, 1, 0, NULL),
('2026-02-05 13:30:00', 'Stade Municipal', 2, 8, 2, 3, 1, 0, NULL),
('2026-02-20 15:30:00', 'Stade Municipal', 5, 6, NULL, NULL, 1, 0, NULL),
('2026-02-12 15:40:00', 'salon',           4, 8, NULL, NULL, 1, 0, NULL),
('2026-02-18 19:38:00', 'stade de marseille', 2, 9, NULL, NULL, 1, 0, NULL);


-- ============================================
-- 7. GALERIES (quelques exemples)
-- ============================================
INSERT INTO galeries (titre, description, date, equipe_id)
VALUES
('Photos d''equipe - Saison 2024-2025', 'Photos officielles de toutes les equipes', '2024-09-01 00:00:00', NULL),
('Match Seniors - Janvier 2025', 'Photos du match contre Aix', '2025-01-10 00:00:00', 5),
('Entrainement U7', 'Seances d''entrainement des U7', '2025-01-15 00:00:00', 1),
('Tombola du club - Janvier 2026', 'Grande tombola annuelle du club', '2026-01-15 00:00:00', NULL);

-- ============================================
-- 8. PHOTOS (quelques exemples)
-- ============================================
INSERT INTO galeries (titre, description, date, equipe_id)
VALUES
('Photos d''equipe - Saison 2024-2025', 'Photos officielles de toutes les equipes', '2024-09-01 00:00:00', NULL),
('Match Seniors - Janvier 2025', 'Photos du match contre Aix', '2025-01-10 00:00:00', 5),
('Entrainement U7', 'Seances d''entrainement des U7', '2025-01-15 00:00:00', 1),
('Tombola du club - Janvier 2026', 'Grande tombola annuelle du club', '2026-01-15 00:00:00', NULL);

-- ============================================
-- 9. ÉVÉNEMENTS
-- ============================================
INSERT INTO evenements (titre, description, date, lieu, logo, type)
VALUES
('Match Seniors vs AS Aix', 'Championnat departemental', '2025-02-20 15:30:00', 'Stade Municipal', '/logos/seniors.png', 'match'),
('Tournoi de Printemps', 'Tournoi inter-clubs toutes categories', '2025-03-15 10:00:00', 'Stade Municipal', '/logos/club.png', 'tournoi'),
('Portes ouvertes du club', 'Venez decouvrir le FC Provence', '2025-04-05 14:00:00', 'Stade Municipal', '/logos/club.png', 'autre'),
('test evenement', 'test ajout event via admin', '2026-02-14 15:37:00', 'arles', NULL, 'autre');

-- ============================================
-- 10. ACTUALITÉS
-- ============================================
INSERT INTO actualites (titre, contenu, image, auteur)
VALUES
('Debut de saison 2025-2026', 'Le FC Provence reprend les entrainements pour toutes les categories. Inscription encore possible pour les U7 et U9.', NULL, 'FC Provence'),
('Victoire des Seniors', 'Belle victoire 3-1 de nos Seniors face a l''AS Aix-en-Provence. Bravo a toute l''equipe !', NULL, 'Entraineur Seniors'),
('Journee portes ouvertes', 'Rendez-vous le 5 avril pour decouvrir le club, rencontrer les educateurs et essayer gratuitement !', NULL, 'FC Provence'),
('teste actu', 'test actu via admin', NULL, 'admin');u	test actu via admin	2026-02-07 14:50:26	admin

