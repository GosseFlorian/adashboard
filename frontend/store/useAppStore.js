import { create } from "zustand";

export const useAppStore = create((set, get) => ({
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
      set({ error: err.message });
    }
  },

  toggleTheme: (themeId) => {
    const current = get().selectedThemeId;
    set({ selectedThemeId: current === themeId ? null : themeId });
  },

  openForm: (themeId) => set({ showFormForTheme: themeId }),

  closeForm: () => set({ showFormForTheme: null }),

  // --- POST /skills ---
  addSkill: async (description, themeId, isDone) => {
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
  toggleSkill: async (id) => {
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
  deleteSkill: async (id) => {
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
