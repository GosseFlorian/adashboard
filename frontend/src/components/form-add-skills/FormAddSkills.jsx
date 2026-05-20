import { useAppStore } from "../../../store/useAppStore";
import { useState } from "react";
import "./FormAddSkills.css";

export function FormAddSkills({ themeId }) {
  const addSkill = useAppStore((s) => s.addSkill);
  const closeForm = useAppStore((s) => s.closeForm);
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    await addSkill(description, themeId, isDone);
    setDescription("");
    setIsDone(false);
    closeForm();
  };

  return (
    <div className="overlay" onClick={closeForm}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Ajouter une compétence</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Je sais..."
          />

          <div className="radio-group">
            <p>La compétence est :</p>
            <label>
              <input
                type="radio"
                name="isDone"
                checked={isDone === true}
                onChange={() => setIsDone(true)}
              />
              Validée
            </label>
            <label>
              <input
                type="radio"
                name="isDone"
                checked={isDone === false}
                onChange={() => setIsDone(false)}
              />
              Pas validée
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}
