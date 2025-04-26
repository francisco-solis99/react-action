import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import Word from "./components/Word";

const QUOTE =
  "From the moment I met you all those years ago not a day has gone by when I havent thought of you";
const QUOTE_WORDS = QUOTE.split(" ");

function App() {
  const [typed, setTypped] = useState(Array(QUOTE_WORDS.length).fill(""));
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDownQuote = (e: KeyboardEvent) => {
    const { key } = e;

    if (key === "Backspace" && inputRef.current !== null) {
      // normal delete
      if (inputRef.current.value !== "") return;

      const previousText = typed.slice(0, currentWordIndex).join("");
      const quoteText = QUOTE_WORDS.slice(0, currentWordIndex).join("");
      console.log({ previousText, quoteText });
      if (previousText === quoteText) return;

      const prevWordIndex = currentWordIndex - 1;
      // if not exist the previous index word do nothing
      if (prevWordIndex < 0) return;

      // Update the word with empty
      setTypped((prev) => {
        const prevQuoteCopy = [...prev];
        prevQuoteCopy[currentWordIndex] = "";
        return prevQuoteCopy;
      });

      // If exist a previous word, change the current word
      setCurrentWordIndex(prevWordIndex);
      inputRef.current.maxLength = QUOTE_WORDS[prevWordIndex].length;
      inputRef.current.value = typed[prevWordIndex] + " ";
      return;
    }
  };

  const handleKeyUpQuote = (e: KeyboardEvent) => {
    const { key, keyCode } = e;

    if (inputRef.current === null) return;

    // focus the input
    inputRef.current.focus();

    // check if is the keysapce
    if (key === " ") {
      const nextWordIndex = currentWordIndex + 1;

      // Check if exist another word, if there is not a word return
      if (!QUOTE_WORDS[nextWordIndex]) return;

      // check if the current word hast at least one letter to pass to the next word
      if (typed[currentWordIndex] === "") return;

      // update the current word
      setCurrentWordIndex(nextWordIndex);
      inputRef.current.value = typed[nextWordIndex];
      inputRef.current.maxLength = QUOTE_WORDS[nextWordIndex].length;
    }

    // Update the word when typed backspace and there is text yet
    if (key === "Backspace") {
      if (typed[currentWordIndex] !== "") {
        const wordTextAfterDelete = [...inputRef.current.value]
          .map((letter, index) =>
            letter === QUOTE_WORDS[currentWordIndex][index] ? letter : "*"
          )
          .join("");
        setTypped((prev) => {
          const prevQuoteCopy = [...prev];
          prevQuoteCopy[currentWordIndex] = wordTextAfterDelete;
          return prevQuoteCopy;
        });
      }
      return;
    }

    // check the keycode (only letters)
    if (keyCode >= 65 && keyCode <= 90) {
      // update the word content
      const letterIndex = typed[currentWordIndex].length;
      const isCorrect = key === QUOTE_WORDS[currentWordIndex][letterIndex];
      const wordText = isCorrect
        ? typed[currentWordIndex] + key
        : typed[currentWordIndex] + "*";

      if (wordText.length > QUOTE_WORDS[currentWordIndex].length) return;
      setTypped((prev) => {
        const prevQuoteCopy = [...prev];
        prevQuoteCopy[currentWordIndex] = wordText;
        return prevQuoteCopy;
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDownQuote);
    document.body.addEventListener("keyup", handleKeyUpQuote);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDownQuote);
      document.body.removeEventListener("keyup", handleKeyUpQuote);
    };
  });

  return (
    <div className="app__wrapper">
      <main className="app__main">
        <h1 className="app__title">QuoteType ✒️</h1>
        <input
          type="text"
          autoFocus={true}
          maxLength={QUOTE_WORDS[currentWordIndex].length}
          className="typed__input"
          ref={inputRef}
        />
        <p className="quote">
          {QUOTE_WORDS.map((word, index) => (
            <Word
              key={`word-${index}`}
              word={word}
              wordTyped={typed[index]}
              isWordActive={index === currentWordIndex}
              isWrong={currentWordIndex > index && typed[index] !== word}
            />
          ))}
        </p>
      </main>
      <footer className="app__footer"></footer>
    </div>
  );
}

export default App;
