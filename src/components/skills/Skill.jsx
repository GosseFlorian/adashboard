export function Skill({ skill, ontoggle, onDelete }) {
  return (
    <>
      <button onClick={ontoggle(skill.id)}>{skill.is_done ? "x" : ""}</button>
      <p>{skill.description}</p>
      <button onClick={onDelete(skill.id)}>Supprimer</button>
    </>
  );
}
