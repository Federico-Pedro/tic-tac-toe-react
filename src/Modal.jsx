import {validatePlayers} from './script.js'
import {useState} from 'react'


const Modal = ({start, players, setPlayers}) => {

  const [error, setError] = useState(null)
  const handleStart = () => {
    const validation = validatePlayers(players)
    if (!validation.valid){
      setError(validation.error)
      console.log(error)
      return
    } 
    setError(null)
    start()
  }

    return (<div className='modal'>
      <h4 className="title">
        Bienvenidos al TA-TE-TI
      </h4>
      <div className="input-container">
        <label className="input-name" htmlFor="player1"> Jugador 1:
          <input type="text" name="player1" placeholder="Player 1"
            onChange={(e) => {
              const newPlayers = [...players]
              newPlayers[0].name = e.target.value
              setPlayers(newPlayers)
            }} />
        </label>
        <label className="input-name" htmlFor="player2"> Jugador 2:
          <input type="text" name="player2" placeholder="Player 2"
            onChange={(e) => {
              const newPlayers = [...players]
              newPlayers[1].name = e.target.value
              setPlayers(newPlayers)
            }} />
        </label>
      </div>
      {error && <p style={{ color: '#ff0040' }}>{error}</p>}
      <div className='modalButtonContainer'>
        <button className='modalButton' onClick={handleStart}>Comenzar</button>
      </div>
    </div>)
}

export default Modal
