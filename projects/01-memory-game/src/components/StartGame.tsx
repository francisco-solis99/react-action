import FrontCard from "./FrontCard";

const PORTRAITS = [
  {
    id: 'portrait1',
    name: 'Vegeta',
    image: 'https://dragonball-api.com/characters/vegeta_normal.webp'
  },
  {
    id: 'portrait2',
    name: 'Goku',
    image: 'https://dragonball-api.com/characters/goku_normal.webp'
  },
  {
    id: 'portrait3',
    name: 'Gohan',
    image: 'https://dragonball-api.com/characters/gohan.webp'
  }
]

export default function StartGame({ onStart }: { onStart: () => void }) {

  return (
    <section className="memory__start-game">
      <div className="portrait__cards">
        {
          PORTRAITS.map(portrait => {
            return (
              <div key={portrait.id} className="card card__portrait">
                <div className="card__inner is-flipped">
                  <FrontCard sizeCard={250} name={portrait.name} imageSrc={portrait.image} />
                </div>
              </div>
            )
          })
        }
      </div>
      <h1 className="game__title">Dragon Ball Memory Game</h1>
      <button className="button__start" onClick={onStart}>Start Game</button>
    </section>
  )
}
