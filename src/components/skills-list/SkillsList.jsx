import { Skill } from "../skills/Skill";
export function SkillsList({ skills, ontoggle, onDelete }) {
  if (skills.length === 0) {
    return <p>Aucune tâche à afficher.</p>;
  }

  return (
    <div className="skill-list">
      {skills.maps((skill) => (
        <Skill key={skill.id} ontoggle={ontoggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
