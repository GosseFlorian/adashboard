import { Request, Response } from "express";
import { pool } from "../db/client.js";
import type { Skill } from "../types.js";

export async function getAllSkills(req: Request, res: Response) {
  try {
    const result = await pool.query<Skill>("SELECT * FROM skills ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getSkillById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query<Skill>(
      "SELECT * FROM skills WHERE id = $1",
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Skill introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createSkill(req: Request, res: Response) {
  try {
    const { description, theme_id, is_done = false } = req.body;
    if (!description || typeof description !== "string") {
      return res
        .status(400)
        .json({ error: "Le champ description est requis (string)" });
    }

    const result = await pool.query<Skill>(
      "INSERT INTO skills (description, theme_id, is_done) VALUES ($1, $2, $3) RETURNING *",
      [description, theme_id, is_done],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateSkill(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { description, is_done } = req.body;

    const result = await pool.query<Skill>(
      "UPDATE skills SET description = COALESCE($1, description), is_done = COALESCE($2, is_done) WHERE id = $3 RETURNING *",
      [description ?? null, is_done ?? null, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Skill introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteSkill(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM skills WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Skill introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
