import './App.css';
import { useEffect, useState } from 'react'
import Title from './components/Title'
import ExperienceBar from './components/ExperienceBar'
import randomizer from './utils/randomizer';
import Sprite from './components/Sprite';

function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [currentBet, setCurrentBet] = useState(100);
  const [balance, setBalance] = useState(200);
  const [currentPlayer, setCurrentPlayer] = useState('');

  // array of usable pokemon families
  const availablePokemon = [
    // each sub-array is the evolution line of pokemon
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [29, 30, 31],
    [32, 33, 34],
    [66, 67, 68],
    [74, 75, 76],
    [92, 93, 94],
    [147, 148, 149],
    [152, 153, 154],
    [155, 156, 157],
    [158, 159, 160]
  ];
  
  // object holding the dealer's pokemon
  const dealerPokemon = { 
    name: "mr-mime", 
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"
  };

  const handleGameStart = () => {
    setGameState(true);
  }
  
  useEffect(() => {
    // generate random pokemon family from availablePokemon array 
    const pokemonFamily = randomizer(availablePokemon);

    // make the API calls for all three pokemon in the evolution line
    const chosenFamily = pokemonFamily.map(async (pokemonId) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      const pokemonObject = await response.json();
      const chosenPokemon = {
        name: pokemonObject.name,
        sprite: pokemonObject.sprites.front_default
      }
      // add the chosenPokemon object to the new array
      return chosenPokemon;
    })

    // once all promises have resolved, set playerPokemon state to the chosenFamily
    Promise.all(chosenFamily)
      .then((familyArray) => {
        setPlayerPokemon(familyArray)
      }).catch((error) => {
        console.log(error);
      })
  }, [])

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
      {
        // if the game is not running, render title screen
        !gameState
          ? <Title startGame={handleGameStart}/>
        // if the game is running, render game UI
          : <div>
              <ExperienceBar />
            </div>
      }
      
      {/* div to hold xp bars */}
      

      {/* <div className="gameBoard">  */}
        {/* dealer component holds hand component and sprite component */}
        {/* needs hand state */}
        {/* <Dealer />
        <GameMessage /> */}
        {/* player component holds hand component and sprite component */}
        {/* needs hand state */}
        {/* <Player />

        <div className="actions">
          {/* only show deal when game state is false */}
          {/* <button>Deal</button> */}
          {/* only show hit, double, stand, if game state is true */}
          {/* <button>Hit</button> */}
          {/* show double only when player hand is 2 cards*/}
          {/* <button>Double</button>
          <button>Stand</button>
        </div>
      </div> */}
    </>
  );
}

export default App;
