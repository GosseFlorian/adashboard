import ProgressBar from "@ramonak/react-progress-bar";
import { SkillsList } from "../skills-list/SkillsList";
import { useAppStore } from "../../../store/useAppStore";
import type { Theme } from "../../types";
import "./Card.css";

interface CardProps {
  theme: Theme;
}

export function Card({ theme }: CardProps) {
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
        <div className="theme-card-left-header">
          <h2 className="theme-name">{theme.name}</h2>
          <div className={`arrow ${isSelected ? "rotate" : ""}`}>↓</div>
        </div>
        <ProgressBar
          className="progress-bar"
          height="2rem"
          width="10rem"
          borderRadius="var(--border-radius-xs)"
          baseBgColor="var(--black)"
          labelAlignment="left"
          completed={progress}
        />
      </div>

      {isSelected && <SkillsList themeId={theme.id} />}
    </div>
  );
}
