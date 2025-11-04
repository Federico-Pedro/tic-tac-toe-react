import { useState } from 'react'
import './App.css'
import Modal from './Modal.jsx'


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
  const [isDraw, setIsDraw] = useState(null)
  const [showmodal, setShowModal] = useState(true)
  const currentPlayer = players[currentPlayerIndex]



  const startGame = () => {
    setShowModal(!showmodal)
  }

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
    const isDraw = checkDraw(newBoard)
    if (isWinner) {
      setWinner(isWinner)
      return
    } else if (isDraw) {
      setIsDraw(isDraw)
      return
    }

    nextTurn()
  }



  const restart = () => {
    const cleanBoard = Array(9).fill(null)
    setBoard(cleanBoard)
    setWinner(null)
    setIsDraw(null)
    setCurrentPlayerIndex(0)

  }


  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


  const checkDraw = (board) => {
    const isDrawInevitable = lines.every(([a, b, c]) => {
      const lineValues = [board[a], board[b], board[c]].filter(v => v !== null);
      const hasX = lineValues.includes('X');
      const hasO = lineValues.includes('O');
      return hasX && hasO;
    });

    if (isDrawInevitable) {
      return "EMPATE";
    }

    return null;
  }



  const checkWinner = (board) => {
    for (const [a, b, c] of lines) {
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        return currentPlayer.name
      }
    }
    return null
  }

  return (
    <>
    //mostrar modal de ganador o de empate dependiendo de esos estados
      {showmodal ? <Modal start={startGame} /> : (<div className='main-container'>
        <div>
          <h4>
            {winner ? winner + " GANA LA PARTIDA" : (isDraw ? isDraw : "Turno de: " + players[currentPlayerIndex].name + " (" + players[currentPlayerIndex].token + ")")}
          </h4>

        </div>

        <div className='container'>

          <div className='board-container'>

            {board.map((value, index) => (
              <button
                className='box'
                disabled={(value !== null) || winner || isDraw}
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

      </div>)}

    </>
  )
}

export default App
