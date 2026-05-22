CREATE TABLE themes (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(100),
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    description VARCHAR(250),
    is_done BOOLEAN,
    theme_id INTEGER,
    CONSTRAINT fk_themes
        FOREIGN KEY (theme_id)
        REFERENCES themes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);