import { useState } from 'react'
import './App.css'
import Modal from './Modal.jsx'


function App() {

  const [players, setPlayers] = useState(
    [
      { name: '', token: 'X', score: 0 },
      { name: '', token: 'O', score: 0 }
    ]
  )


  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)
  const [isDraw, setIsDraw] = useState(null)
  const [showmodal, setShowModal] = useState(true)
  const [winningLine, setWinningLine] = useState(null)
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
  
  const result = checkWinner(newBoard)  
  const drawResult = checkDraw(newBoard)
  
  if (result) {
    setWinner(result.winner)
    setWinningLine(result.winningLine)  
    
    
    const newScore = [...players]
    newScore[currentPlayerIndex].score += 1
    setPlayers(newScore)
    console.log(players)
    return
  } else if (drawResult) {
    setIsDraw(drawResult)
    return
  }

  nextTurn()  
}



  const newMatch = () => {
    const cleanBoard = Array(9).fill(null)
    setBoard(cleanBoard)
    setWinner(null)
    setIsDraw(null)
    setCurrentPlayerIndex(0)
    setWinningLine(null)
  }

  const restart = () => {
    const cleanBoard = Array(9).fill(null)
    setBoard(cleanBoard)
    setWinner(null)
    setIsDraw(null)
    setCurrentPlayerIndex(0)
    setWinningLine(null)
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[0].score = 0;
      newPlayers[1].score = 0;
      return newPlayers;
    });
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
    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {

        return {
          winner: currentPlayer.name,
          winningLine: line
        }
      }
    }
    return null
  }

  return (
    <>

      {showmodal ? <Modal start={startGame}
        players={players}
        setPlayers={setPlayers}

      /> :
        (<div className='main-container'>
          <div>
            <h4>
              {winner ? winner + " GANA LA PARTIDA" : (isDraw ? isDraw : "Turno de: " + players[currentPlayerIndex].name + " (" + players[currentPlayerIndex].token + ")")}
            </h4>
            <h6 className="score">
              {players[0].name} : {players[0].score} - {players[1].name} : {players[1].score}
            </h6>
          </div>

          <div className='container'>

            <div className='board-container'>

              {board.map((value, index) => (
                <button
                  className={winningLine?.includes(index) ? "winning-box" : isDraw ? "winning-box" : "box"}
                  disabled={(value !== null) || winner || isDraw}
                  key={index}
                  onClick={() => handleClick(index)}
                  
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="button-container">

            <button className='restart'
              onClick={() => newMatch()}
            >
              Nueva Partida
            </button>
            <button className='restart'
              onClick={() => restart()}
            >
              Reiniciar
            </button>
          </div>

        </div>)}

    </>
  )
}

export default App
