import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [ dealerHand, setDealerHand ] = useState([]);
  const [ playerHand, setPlayerHand ] = useState([]);
  const [ playerPokemon, setPlayerPokemon ] = useState([]);
  const [ currentDeck, setCurrentDeck ] = useState([]);
  const [ gameState, setGameState ] = useState(false);
  const [ currentBet, setCurrentBet ] = useState(100);
  const [ balance, setBalance ] = useState(200);

  const availablePokemon = [];

  // function to compare users score to dealers
  // function to test if users score is less than / equal 21


  useEffect(() => {
    // generate random pokemon index from availablePokemon array, make the API call, adn set the playerPokemon state
  }, [])

  useEffect(() => {
    // generate the 6 decks and set state t
  }, [])
  

  return (
    <>
    {/* title will include h1 and deal button to start game */}
    {/* will only appear when game state is false */}
      <Title />
      {/* div to hold xp bars */}
      <div>
        <ExperienceBar />
      </div>

      <div className="gameBoard">
        {/* dealer component holds hand component and sprite component */}
        {/* needs hand state */}
        <Dealer />
        <GameMessage />
        {/* player component holds hand component and sprite component */}
        {/* needs hand state */}
        <Player />

        <div className="actions">
          {/* only show deal when game state is false */}
          <button>Deal</button>
          {/* only show hit, double, stand, if game state is true */}
          <button>Hit</button>
          {/* show double only when player hand is 2 cards*/}
          <button>Double</button>
          <button>Stand</button>
        </div>
      </div>
    </>
  );
}

export default App;
