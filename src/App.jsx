import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [players, setPlayers] = useState(
    [
      { name: 'Player1', token: 'X' },
      { name: 'Player2', token: 'O' }
    ]
  )


  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [board, setBoard] = useState(Array(9).fill(null))


  const nextTurn = () => {
    setCurrentPlayerIndex(prev => prev === 0 ? 1 : 0
    )
  }

  const currentPlayer = players[currentPlayerIndex]


  const handleClick = (index) => {
    console.log('Click en casilla', index)
    const newBoard = [...board]
    newBoard[index] = currentPlayer.token
    setBoard(newBoard)
    nextTurn()

  }


  const restart = () => {
    const cleanBoard = Array(9).fill(null)
    setBoard(cleanBoard)
  }


  return (
    <>
      <div className='main-container'>

        <div>
          <h4>
            Turno de: {currentPlayer.name}
          </h4>

        </div>

        <div className='container'>

          <div className='board-container'>

            {board.map((value, index) => (
              <button
                className='box'
                disabled={value !== null}
                key={index}
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <button className='restart'
          onClick={() => restart()}
        >
          Reiniciar
        </button>

      </div>

    </>
  )
}

export default App
