import ProgressBar from "@ramonak/react-progress-bar";
import { SkillsList } from "../skills-list/SkillsList";
import { useAppStore } from "../../../store/useAppStore";
import "./Card.css";

export function Card({ theme }) {
  const allSkills = useAppStore((s) => s.skills);
  const skills = allSkills.filter((s) => s.theme_id === theme.id);
  const progress =
    skills.length === 0
      ? 0
      : Math.round(
          (skills.filter((s) => s.is_done).length / skills.length) * 100,
        );

  return (
    <div className="card">
      <div className="header-card">
        <h2>{theme.name}</h2>
        <ProgressBar labelAlignment="left" completed={progress} />
      </div>
      <div className="skill-list hide">
        <SkillsList themeId={theme.id} />
      </div>
    </div>
  );
}
