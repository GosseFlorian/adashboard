import { useAppStore } from "../../../store/useAppStore";
import { useState, useRef, useEffect } from "react";
import "./FormAddSkills.css";

interface FormAddSkillsProps {
  themeId: number;
}

export function FormAddSkills({ themeId }: FormAddSkillsProps) {
  const addSkill = useAppStore((s) => s.addSkill);
  const closeForm = useAppStore((s) => s.closeForm);
  const [description, setDescription] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
        <h3 className="form-title">Ajouter une compétence</h3>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="form-text"
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Je sais..."
          />

          <p className="radio-title">La compétence est :</p>
          <div className="radio-group">
            <label className="radio-input-text">
              <input
                className="radio-input"
                type="radio"
                name="isDone"
                checked={isDone === true}
                onChange={() => setIsDone(true)}
              />
              Validée
            </label>
            <label className="radio-input-text">
              <input
                className="radio-input"
                type="radio"
                name="isDone"
                checked={isDone === false}
                onChange={() => setIsDone(false)}
              />
              Pas validée
            </label>
          </div>
          <button className="submit-btn" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
