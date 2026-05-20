import { useAppStore } from "../../../store/useAppStore";
import { Card } from "../cards/Card";
import "./CardList.css";

export function CardList() {
  const themes = useAppStore((t) => t.themes);

  return (
    <div className="themes-container">
      {themes.map((theme) => (
        <Card key={theme.id} theme={theme} />
      ))}
    </div>
  );
}
