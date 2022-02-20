import ReactDOM from 'react-dom'
import './PopUp.css'
export default function PopUp({turns, shuffledCards, user}) {
  return ReactDOM.createPortal((
    <div className="popBackDrop">
        <div className="pop">
            <h2>Game Over</h2>
            <p>{user} you took {turns} turns</p>
            <button onClick={shuffledCards}>play again?</button>
        </div>
    </div>
  ), document.body)
}
