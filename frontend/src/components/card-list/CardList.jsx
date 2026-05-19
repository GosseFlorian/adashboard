import { useAppStore } from "../../../store/useAppStore";
import { Card } from "../cards/Card";

export function CardList() {
  const themes = useAppStore((t) => t.themes);

  return (
    <div className="theme-list">
      {themes.map((theme) => (
        <Card key={theme.id} theme={theme} />
      ))}
    </div>
  );
}
