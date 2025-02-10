import { useEffect, useState } from 'react'
import { getCharactersInfo } from './utils';
import MemoryGame from './components/MemoryGame';
import StartGame from './components/StartGame';

import type { Character } from './types';
import './App.css'
import Loader from './components/Loader';

const SIZE_GAME = 5;

function App() {
  const [dataCharacters, setDatCharacters] = useState<Character[]>([]);
  const [appStatus, setAppStatus] = useState('init');

  useEffect(() => {
    if (appStatus !== 'loading') return;

    getCharactersInfo({ numCharacters: SIZE_GAME })
      .then(data => setDatCharacters(data))
      .catch(err => console.log(err));
  }, [appStatus])

  const handleOnStartGame = () => {
    setAppStatus('loading')
    setTimeout(() => {
      setAppStatus('playing')
    }, 2000)
  }


  const restartGame = () => {
    handleOnStartGame()
  }

  const endGame = () => {
    setAppStatus('end')
  }

  return (
    <div className='game__wrapper'>
      <main className='game__main'>
        {
          appStatus === 'init' && <StartGame onStart={handleOnStartGame} />
        }
        {
          appStatus === 'loading' && <Loader />
        }
        {
          dataCharacters.length > 0 && (appStatus === 'playing' || appStatus === 'end') && (
            <MemoryGame options={dataCharacters} onRestart={restartGame} onEnd={endGame} />
          )
        }
      </main>
      <footer className='game__footer'>
        <small>
          Made with 🧡 by Francisco Solis using <a href="https://web.dragonball-api.com/" rel="nofollow" target='_blank'>Dragon Ball API</a>
        </small>
      </footer>
    </div>
  )
}

export default App



/*
  - Get the characters from the API
    - Use useEffect ✅
    - Use a custom hook to interact with the API
  - Get the neccesarily data from the characters ✅
  - Pass the options to the memory game component ✅
  - Fix the function to put the options randomly ✅
  - Pass the options to the board ✅
  - Render the cards ✅
  - See if the flipped behavios its good ✅
  - Add the shuffle animation at start ✅
    - Maybe put a status state to see the game status (init, playing, end)
  - Add the score ✅
  - Add confetti if wins ✅
  - Add restart button ✅
  - Add the best score (using local storage)
  - Add some diference between the normal card and the found card
    - Hover to the memory cards
  - Add styles to teh modal and the principal view
  - Add styles to the start view component

*/