// routes/skills.routes.js
import { Router } from "express";
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skills.controller.js";

const router = Router();

router.get("/", getAllSkills);
router.get("/:id", getSkillById);
router.post("/", createSkill);
router.patch("/:id", updateSkill);
router.delete("/:id", deleteSkill);

export default router;
