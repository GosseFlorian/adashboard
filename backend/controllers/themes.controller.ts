import { Request, Response } from "express";
import { pool } from "../db/client.js";
import type { Theme } from "../types.js";

export async function getAllThemes(req: Request, res: Response) {
  try {
    const result = await pool.query<Theme>("SELECT * FROM themes ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getThemeById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query<Theme>(
      "SELECT * FROM themes WHERE id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Theme introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createTheme(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "Le champ name est requis (string)" });
    }

    const result = await pool.query<Theme>(
      "INSERT INTO themes (name) VALUES ($1) RETURNING *",
      [name],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateTheme(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "Le champ name est requis (string)" });
    }

    const result = await pool.query<Theme>(
      "UPDATE themes SET name = $1 WHERE id = $2 RETURNING *",
      [name, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Theme introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteTheme(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM themes WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Theme introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
