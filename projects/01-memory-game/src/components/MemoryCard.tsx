import type { Character } from "../types";
import FrontCard from "./FrontCard";

export default function MemoryCard({
  index,
  data,
  checkTry,
  isFlipped,
  isResolved,
}: {
  index: number;
  data: Character
  checkTry: (index: number) => void;
  isFlipped: boolean;
  isResolved: boolean;
}) {

  const handleClickFlipCard = () => {
    if (isResolved || isFlipped) return;

    checkTry(index)
  }

  const cardIsFlippedClass = isFlipped || isResolved ? "card__inner is-flipped" : "card__inner";

  return (
    <article className="card" onClick={handleClickFlipCard}>
      <div className={cardIsFlippedClass}>
        <div className="card__face card__front">
          ?
        </div>
        <FrontCard sizeCard={150} name={data.name} imageSrc={data.image} />
      </div>
    </article>
  )
}
