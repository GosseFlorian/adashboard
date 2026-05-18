INSERT INTO themes (id, name)
VALUES
(1, 'JavaScript'),
(2, 'React'),
(3, 'PostgreSQL'),
(4, 'Node.js');

INSERT INTO skills (id, description, is_done, theme_id)
VALUES
(1,	'lire du js', FALSE, 1),
(2, 'Faire des composant React', FALSE,	2),
(3, 'Base de données PostgreSQL', FALSE, 3),
(4, 'Créer une API en node',FALSE, 4);