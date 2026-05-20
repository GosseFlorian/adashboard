import { useAppStore } from "../../../store/useAppStore";
import "./Skill.css";

export function Skill({ skill }) {
  const { toggleSkill, deleteSkill } = useAppStore();
  return (
    <div className="skill-card">
      <button className="toggle-btn" onClick={() => toggleSkill(skill.id)}>
        {skill.is_done ? "x" : ""}
      </button>
      <p className="skill-description">{skill.description}</p>
      <button className="delete-btn" onClick={() => deleteSkill(skill.id)}>
        Supprimer
      </button>
    </div>
  );
}
