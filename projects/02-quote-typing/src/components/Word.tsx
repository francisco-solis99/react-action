import Letter from "./Letter";

export default function Word({ word, wordTyped, isWordActive, isWrong }: { word: string, wordTyped: string, isWordActive: boolean, isWrong: boolean }) {
  return (
    <>
      <span className={`typing__word ${isWrong ? 'typing__word-wrong' : ''}`}>
        {
          [...word].map((letter, index) => {
            const isTyped = index < wordTyped.length && wordTyped !== '';
            const statusLetter = wordTyped[index] !== '*';

            return (
              <Letter
                key={`letter-${index}`}
                letter={letter}
                isCorrect={isTyped ? statusLetter : null}
                isActive={isWordActive && index === wordTyped.length}
                isLastLetter={isWordActive && wordTyped.length === word.length && wordTyped.length - 1 === index}
              />
            )
          })
        }
      </span>
    </>
  )
}
