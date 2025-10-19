import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [players, setPlayers] = useState(
    [
      { name: 'PLAYER 1', token: 'X' },
      { name: 'PLAYER 2', token: 'O' }
    ]
  )


  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)
  const currentPlayer = players[currentPlayerIndex]


  const nextTurn = () => {
    setCurrentPlayerIndex(prev => prev === 0 ? 1 : 0
    )
  }



  const handleClick = (index) => {
    console.log('Click en casilla', index)
    const newBoard = [...board]
    newBoard[index] = currentPlayer.token
    setBoard(newBoard)
    const isWinner = checkWinner(newBoard)

    if(isWinner) {
      setWinner(isWinner)
      console.log(winner + " GANA LA PARTIDA")
      return
    }

    nextTurn()
  }



  const restart = () => {
    const cleanBoard = Array(9).fill(null)
    setBoard(cleanBoard)
    setWinner(null)
    setCurrentPlayerIndex(0)
    
  }



  const checkWinner = (board) => {
    const winPossibilities = [
      (board[0] !== null && board[0] === board[1] && board[1] === board[2]),
      (board[3] !== null && board[3] === board[4] && board[4] === board[5]),
      (board[6] !== null && board[6] === board[7] && board[7] === board[8]),
      (board[0] !== null && board[0] === board[3] && board[3] === board[6]),
      (board[1] !== null && board[1] === board[4] && board[4] === board[7]),
      (board[2] !== null && board[2] === board[5] && board[5] === board[8]),
      (board[0] !== null && board[0] === board[4] && board[4] === board[8]),
      (board[2] !== null && board[2] === board[4] && board[4] === board[6])
    ]

   const hasWinner = winPossibilities.some(w => w)

   if(hasWinner){
    return currentPlayer.name
   }

   return null
  }

  return (
    <>
      <div className='main-container'>

        <div>
          <h4>
            {winner ? winner + " GANA LA PARTIDA" : "Turno de: " + players[currentPlayerIndex].name + " (" + players[currentPlayerIndex].token + ")"}
          </h4>

        </div>

        <div className='container'>

          <div className='board-container'>

            {board.map((value, index) => (
              <button
                className='box'
                disabled={(value !== null) || winner}
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
