import { useAppStore } from "../../../store/useAppStore";
import "./Skill.css";

export function Skill({ skill }) {
  const { toggleSkill, deleteSkill } = useAppStore();
  return (
    <div className="skill">
      <button onClick={() => toggleSkill(skill.id)}>
        {skill.is_done ? "x" : ""}
      </button>
      <p>{skill.description}</p>
      <button onClick={() => deleteSkill(skill.id)}>Supprimer</button>
    </div>
  );
}
