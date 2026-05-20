import { useAppStore } from "../../../store/useAppStore";
import { useState } from "react";
import "./FormAddSkills.css";

export function FormAddSkills({ themeId, onClose }) {
  const { addSkill } = useAppStore();

  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    await addSkill(description, themeId, isDone);
    setDescription("");
    setIsDone(false);
    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <p>Ajouter une compétence</p>
      <input
        type="text"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>La compétence est :</p>
      <label>
        <input
          type="radio"
          name="isDone"
          value="true"
          checked={isDone === true}
          onChange={() => setIsDone(true)}
        />
        Validée
      </label>
      <label>
        <input
          type="radio"
          name="isDone"
          value="false"
          checked={isDone === false}
          onChange={() => setIsDone(false)}
        />
        Pas validé
      </label>
      <button type="submit">Ajouter</button>
    </form>
  );
}
