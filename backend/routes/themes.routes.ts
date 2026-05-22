import { Router } from "express";
import {
  getAllThemes,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
} from "../controllers/themes.controller.js";

const router = Router();

router.get("/", getAllThemes);
router.get("/:id", getThemeById);
router.post("/", createTheme);
router.patch("/:id", updateTheme);
router.delete("/:id", deleteTheme);

export default router;
