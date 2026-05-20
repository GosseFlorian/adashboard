import ProgressBar from "@ramonak/react-progress-bar";
import { SkillsList } from "../skills-list/SkillsList";
import { useAppStore } from "../../../store/useAppStore";
import "./Card.css";

export function Card({ theme }) {
  const allSkills = useAppStore((s) => s.skills);
  const selectedThemeId = useAppStore((s) => s.selectedThemeId);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const skills = allSkills.filter((s) => s.theme_id === theme.id);
  const progress =
    skills.length === 0
      ? 0
      : Math.round(
          (skills.filter((s) => s.is_done).length / skills.length) * 100,
        );

  const isSelected = selectedThemeId === theme.id;

  return (
    <div className={`theme-card ${isSelected ? "selected" : ""}`}>
      <div className="theme-card-header" onClick={() => toggleTheme(theme.id)}>
        <h2 className="theme-name">{theme.name}</h2>
        <ProgressBar labelAlignment="left" completed={progress} />
      </div>

      {isSelected && <SkillsList themeId={theme.id} />}
    </div>
  );
}
