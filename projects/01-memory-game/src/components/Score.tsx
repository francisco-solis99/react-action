export default function Score({ score, bestTry }: { score: number, bestTry: number }) {

  return (
    <div className="score">
      <span className="score__text">
        Your Moves: <strong>{score}</strong>
      </span>
      <span className="score__text">
        Your Best Try: <strong>{bestTry}</strong>
      </span>
    </div>
  )
}
