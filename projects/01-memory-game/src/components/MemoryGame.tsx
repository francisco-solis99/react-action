import { useRef, useState } from "react";
import Board from "./Board";
import Score from "./Score";
import { getDoubleOptionsRandom } from "../utils";
import type { Character } from "../types";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import useLocalStorage from "../hooks/useLocalStorage";

export default function MemoryGame({ options, onRestart, onEnd }: { options: Character[], onRestart: () => void, onEnd: () => void }) {
  const [moves, setMoves] = useState<number>(0);
  const generatedBoard = useRef(getDoubleOptionsRandom(options));
  const { modalRef, openModal, closeModal } = useModal()
  const { localStorageValue, updateValue } = useLocalStorage({ key: 'memory-game', initialValue: null })

  const incrementMoves = () => setMoves(prev => prev + 1);

  return (
    <div className="memory-game">
      {
        generatedBoard &&
        (
          <div className="board__wrapper">
            <Board
              board={generatedBoard.current}
              onMove={incrementMoves}
              onEnd={() => {
                openModal()
                // Set in the local storage
                if (!localStorageValue || moves < Number(localStorageValue)) {
                  updateValue(moves)
                }
                onEnd()
              }} />
          </div>
        )
      }
      <Score score={moves} bestTry={Number(localStorageValue) + 1 ?? 0} />
      <Modal ref={modalRef} onCloseModal={() => {
        onRestart()
        closeModal()
      }}>
        <Score score={moves} bestTry={Number(localStorageValue) + 1 ?? 0} />
      </Modal>
    </div>
  );
}
