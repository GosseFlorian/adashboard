import { useAppStore } from "../../../store/useAppStore";
import type { Skill as SkillType } from "../../types";
import "./Skill.css";

interface SkillProps {
  skill: SkillType;
}

export function Skill({ skill }: SkillProps) {
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
