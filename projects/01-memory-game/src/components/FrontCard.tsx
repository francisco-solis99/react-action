import { useEffect } from "react";

export default function FrontCard({ sizeCard, name, imageSrc }: { sizeCard: number, name: string, imageSrc: string }) {

  useEffect(() => {
    document.body.style.setProperty(
      "--width",
      `${sizeCard}px`
    );

    return () => {
      document.body.style.setProperty(
        "--width",
        `$150px`
      );
    }
  }, [sizeCard])

  return (
    <div className="card__face card__back">
      <header className="card__header">
        <div className="card__header-text">
          <h2>{name}</h2>
        </div>
      </header>
      <div className="card__img-container">
        <img src={imageSrc} alt={name} />
      </div>
    </div>
  )
}
