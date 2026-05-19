import ProgressBar from "@ramonak/react-progress-bar";
import { SkillsList } from "../skills-list/SkillsList";
import { useAppStore } from "../../../store/useAppStore";
import "./Card.css";

export function Card({ theme }) {
  const getProgressForTheme = useAppStore((s) => s.getProgressForTheme);
  const progress = getProgressForTheme(theme.id);

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
