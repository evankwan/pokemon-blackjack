import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [currentBet, setCurrentBet] = useState(100);
  const [balance, setBalance] = useState(200);

  const availablePokemon = [];

  // function to compare users score to dealers
  // function to test if users score is less than / equal 21

  useEffect(() => {
    // generate random pokemon index from availablePokemon array, make the API call, adn set the playerPokemon state
  }, []);

  useEffect(() => {
    // generate the 6 decks and set state t
    async function getDeck() {
      // Get deckId first to fetch deck of cards.
      // deckId is also used later for shuffling existing deck when restarting the game
      const deckId = await fetch(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
      )
        .then((res) => res.json())
        .then((data) => data.deck_id);

      // get 312 (52 * 6) cards with deck id
      const deck = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=312`
      )
        .then((res) => res.json())
        .then((data) => {
          const cards = data.cards.map((card) => ({
            image: card.image, // "https://deckofcardsapi.com/static/img/0S.png"
            value: card.value, // "10'"
            suit: card.suit, // "SPADES"
          }));
          return cards;
        });
      setCurrentDeck(deck);
    }

    getDeck();
  }, []);

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
