import { create } from "zustand";
import type { Theme, Skill } from "../src/types";

interface AppState {
  themes: Theme[];
  skills: Skill[];
  selectedThemeId: number | null;
  showFormForTheme: number | null;
  loadData: () => Promise<void>;
  toggleTheme: (themeId: number) => void;
  openForm: (themeId: number) => void;
  closeForm: () => void;
  addSkill: (
    description: string,
    themeId: number,
    isDone: boolean,
  ) => Promise<void>;
  toggleSkill: (id: number) => Promise<void>;
  deleteSkill: (id: number) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  themes: [],
  skills: [],
  selectedThemeId: null,
  showFormForTheme: null,

  // --- GET /themes et GET /skills ---
  loadData: async () => {
    try {
      const [themes, skills] = await Promise.all([
        fetch("http://localhost:3000/themes").then((r) => r.json()),
        fetch("http://localhost:3000/skills").then((r) => r.json()),
      ]);
      set({ themes, skills });
    } catch (err) {
      console.error("Erreur chargement des données:", err);
    }
  },

  toggleTheme: (themeId) => {
    const current = get().selectedThemeId;
    set({ selectedThemeId: current === themeId ? null : themeId });
  },

  openForm: (themeId) => set({ showFormForTheme: themeId }),

  closeForm: () => set({ showFormForTheme: null }),

  // --- POST /skills ---
  addSkill: async (description: string, themeId: number, isDone: boolean) => {
    try {
      const response = await fetch("http://localhost:3000/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          theme_id: themeId,
          is_done: isDone,
        }),
      });
      const newSkill = await response.json();
      set((state) => ({ skills: [...state.skills, newSkill] }));
    } catch (err) {
      console.error("Erreur ajout skill:", err);
    }
  },

  // --- PATCH /skills/:id ---
  toggleSkill: async (id: number) => {
    try {
      const skill = get().skills.find((s) => s.id === id);
      if (!skill) return;
      const newValue = !skill.is_done;

      await fetch(`http://localhost:3000/skills/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_done: newValue }),
      });

      set((state) => ({
        skills: state.skills.map((s) =>
          s.id === id ? { ...s, is_done: newValue } : s,
        ),
      }));
    } catch (err) {
      console.error("Erreur toggle skill:", err);
    }
  },

  // --- DELETE /skills/:id ---
  deleteSkill: async (id: number) => {
    try {
      await fetch(`http://localhost:3000/skills/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        skills: state.skills.filter((s) => s.id !== id),
      }));
    } catch (err) {
      console.error("Erreur suppréssion skill:", err);
    }
  },
}));
