INSERT INTO equipes (nom, categorie)
VALUES 
  ('Seniors A', 'Seniors'),
  ('U17', 'Jeunes'),
  ('U13', 'Jeunes'),
  ('Féminines', 'Adultes');

INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, equipe_id)
VALUES
  ('Durand', 'Maxime', '2001-04-10', 'Attaquant', 9, 1),
  ('Martin', 'Julien', '2002-07-21', 'Gardien', 1, 1),
  ('Dupont', 'Emma', '2008-03-15', 'Milieu', 8, 3),
  ('Rossi', 'Léa', '1999-06-01', 'Défenseure', 4, 4);