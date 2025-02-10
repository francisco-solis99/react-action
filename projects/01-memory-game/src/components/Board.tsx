import MemoryCard from "./MemoryCard";
import { useEffect, useRef, useState } from "react";
import confetti from 'canvas-confetti'
import type { Character } from "../types";

export default function Board({
  board,
  onMove,
  onEnd
}: {
  board: Character[];
  onMove: () => void;
  onEnd: () => void;
}) {
  const [pairSelected, setPairSelected] = useState<number[]>([]);
  const [cardsIndexFound, setCardsIndexFound] = useState<number[]>([]);
  const timeoutId = useRef<number | null>(null);
  const boardContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef(Array(board.length).fill(null))

  const checkPair = (indexToCheck: number) => {
    if (pairSelected.length === 2) return;

    // make a move
    onMove()
    // evaluate the move
    if (!pairSelected.length) {
      setPairSelected([indexToCheck]);
      return;
    }
    setPairSelected((prev) => [...prev, indexToCheck]);
    const [index1] = pairSelected;
    if (board[index1].id === board[indexToCheck].id) {
      setCardsIndexFound((prev) => [...prev, index1, indexToCheck]);
      if (checkIsWin([...cardsIndexFound, index1, indexToCheck])) {
        confetti()
        setTimeout(() => {
          onEnd()
        }, 1000)
      }
    }
  };

  const checkIsWin = (currentCardsFound: number[]) => {
    return currentCardsFound.length === board.length
  };

  const checkIsFlipped = (index: number) => {
    return pairSelected.includes(index);
  };

  const checkIsResolved = (index: number) => {
    return cardsIndexFound.includes(index);
  };


  useEffect(() => {
    if (pairSelected.length !== 2) return;
    // Only if you complete the pair movements start the timeout

    timeoutId.current = setTimeout(() => {
      setPairSelected([]);
    }, 800);

    return () => {
      console.log("clear the timeout");
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    };
  }, [pairSelected]);

  // just the first time
  useEffect(() => {
    if (boardContainerRef.current && cardsRef?.current) {
      console.log({ boardContainerRef, cardsRef })
      const { x, y, height, width } = boardContainerRef.current.getBoundingClientRect();

      const targetX = x + width / 2;
      const targetY = y + height / 2;


      cardsRef?.current?.forEach((item: HTMLDivElement, index: number) => {
        const {
          x: childX,
          y: childY,
          height: childHeight,
          width: childWidth,
        } = item.getBoundingClientRect();

        const distanceX = childX + childWidth / 2;
        const distanceY = childY + childHeight / 2;

        item.animate(
          {
            transform: [
              "translate(0px)",
              `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
              `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
              "translate(0px)",
            ],
            easing: ["cubic-bezier(0.68,-.55,.265,1.55)"],
            offset: [0, 0.3, 0.7, 1],
          },
          // timing options
          {
            delay: (index * 1500) / 9,
            duration: 3400,
          }
        );
      });
    }
  }, [])

  return (
    <div className="board" ref={boardContainerRef}>
      {board.map((item, index) => {
        return (
          <div key={`card-${index}`} ref={(el) => (cardsRef.current[index] = el)}>
            <MemoryCard
              index={index}
              data={item}
              checkTry={checkPair}
              isFlipped={checkIsFlipped(index)}
              isResolved={checkIsResolved(index)}
            >
            </MemoryCard>
          </div>
        );
      })}
    </div>
  );
}
