// controllers/skills.controller.js
import { pool } from "../db/client.js";

export async function getAllSkills(req, res) {
  try {
    const result = await pool.query("SELECT * FROM skills ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getSkillById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM skills WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Skill introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createSkill(req, res) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "Le champ name est requis (string)" });
    }

    const result = await pool.query(
      "INSERT INTO skills (name) VALUES ($1) RETURNING *",
      [name],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateSkill(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "Le champ name est requis (string)" });
    }

    const result = await pool.query(
      "UPDATE skills SET name = $1 WHERE id = $2 RETURNING *",
      [name, id],
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

export async function deleteSkill(req, res) {
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
