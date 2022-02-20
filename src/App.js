import { useEffect, useState } from 'react';
import './App.css';
// import Choise from './components/Choise';
import Form from './components/Form';
import PopUp from './components/PopUp';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const [logIn, setLogIn] = useState(true);
  const [error, setError] = useState(false);
  // const [choise, setChoise] = useState(false);
  // const [easy, setEasy] = useState(false);
  // const [hard, setHard] = useState(false);


  const addUser = (data) => {
     if(data.user.length >= 5){
      setLogIn(false);
      // setChoise(true);
      setUser(prevUser => {
        return [...prevUser, data]
      });
      setError(false)
    }else{
      setError(true);
    }
  }
  // console.log(user.map(user => user.user))

  const shuffledCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));

    setChoiseOne(null)
    setChoiseTwo(null)
    setCards(shuffleCards);
    setTurns(0);
    setModal(false);
    setUser([]);
    setLogIn(true)    
  }
  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }
  useEffect(() => {
    if(cards.length && cards.every(card => card.matched === true)){
      setTimeout(() => setModal(true), 1000)
      // console.log('hi')
    }
  }, [cards])

  useEffect(() => {
    if(choiseOne && choiseTwo){
      setDisabled(true)
      if(choiseOne.src === choiseTwo.src){

        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiseOne.src){
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurns()
      }else{
        setTimeout(() => resetTurns(), 1000)
      }
    }
  },[choiseOne, choiseTwo])


  const resetTurns = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
    
  }
  


  useEffect(() => {
    shuffledCards()
    
  },[])


   

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>
      { logIn && 
      <Form addUser={addUser} error={error}/>
      }
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
           card={card} 
           key={card.id} 
           handleChoise={handleChoise}
           flipped={card === choiseOne || card === choiseTwo || card.matched}
           disabled={disabled}
           />
        ))}
        
      </div>
      <p>Turns: {turns}</p>
      {modal && <PopUp user={user.map(user => user.user)} turns={turns} shuffledCards={shuffledCards}/>}
    </div>
  );
}

export default App;
