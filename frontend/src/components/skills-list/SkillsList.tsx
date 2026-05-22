import { Skill } from "../skills/Skill";
import { useAppStore } from "../../../store/useAppStore";
import "./SkillsList.css";

interface SkillsListProps {
  themeId: number;
}

export function SkillsList({ themeId }: SkillsListProps) {
  const allSkills = useAppStore((s) => s.skills);
  const openForm = useAppStore((s) => s.openForm);
  const skills = allSkills.filter((sk) => sk.theme_id === themeId);

  return (
    <>
      <div className="skills-container">
        {skills.length === 0 ? (
          <p>Aucune compétence pour ce thème.</p>
        ) : (
          skills.map((skill) => <Skill key={skill.id} skill={skill} />)
        )}
      </div>
      <button className="add-skill-btn" onClick={() => openForm(themeId)}>
        Ajouter une compétence
      </button>
    </>
  );
}
