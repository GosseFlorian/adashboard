import { Skill } from "../skills/Skill";
import { useAppStore } from "../../../store/useAppStore";
import { FormAddSkills } from "../form-add-skills/FormAddSkills";
import { useState } from "react";

export function SkillsList({ themeId }) {
  const allSkills = useAppStore((s) => s.skills);
  const skills = allSkills.filter((sk) => sk.theme_id === themeId);

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="skill-list">
        {skills.length === 0 ? (
          <p>Aucune compétence pour ce thème.</p>
        ) : (
          skills.map((skill) => <Skill key={skill.id} skill={skill} />)
        )}
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          Ajouter une compétence
        </button>
      </div>
      {showForm && (
        <FormAddSkills themeId={themeId} onClose={() => setShowForm(false)} />
      )}
    </>
  );
}
