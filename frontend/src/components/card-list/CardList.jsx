import { Card } from "../cards/Card";

export function CardList({ cards }) {
  return (
    <div className="theme-list">
      {cards.maps((card) => (
        <Card key={card.id} theme={card} />
      ))}
    </div>
  );
}
