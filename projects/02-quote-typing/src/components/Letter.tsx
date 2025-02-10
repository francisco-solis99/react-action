export default function Letter({ letter, isCorrect, isActive, isLastLetter }: { letter: string, isCorrect: boolean | null, isActive: boolean, isLastLetter: boolean }) {

  const statusLetterClass = isCorrect === null
    ? ''
    : isCorrect
      ? 'correct' : 'incorrect'

  return (
    <span className={`typing__letter ${isActive ? 'active' : ''} ${statusLetterClass} ${isLastLetter ? 'active last' : ''}`}>
      {letter}
    </span>
  )
}
