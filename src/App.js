import './App.css';
import { useEffect, useState } from 'react'
import ActionBtn from './components/ActionBtn';
import Title from './components/Title'
import ExperienceBar from './components/ExperienceBar'
import randomizer from './utils/randomizer';
import Sprite from './components/Sprite';
import GameMessage from './components/GameMessage';
import Dealer from './components/Dealer';
import Hand from './components/Hand';
import Player from './components/Player';
import initialDeal from './utils/initialDeal';
import dealOneCard from './utils/dealOneCard';
import dealerLogic from './utils/dealerLogic';
import evolvePokemon from './utils/evolvePokemon';
import { getScore } from './utils/score';
import compareScore from './utils/compareScore';

function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [currentBet, setCurrentBet] = useState(0);
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
    setDealerHand([])
    setPlayerHand([])
  }

  const handleDeal = () => {
    initialDeal(currentDeck, setPlayerHand, setDealerHand, setCurrentDeck);
    const bet = 100;
    setCurrentBet(bet);
    setBalance(balance - bet);
    setCurrentPlayer('player1')
  }

  const handleHit = () => {
    const { updatedHand, deck } = dealOneCard(currentDeck, playerHand)
    setPlayerHand(updatedHand)
    setCurrentDeck(deck)
    console.log('inside handleHit, before if')
    if (getScore(updatedHand) > 21) {
      setGameState(false)
      // do we want to return back to the landing page on player bust?
      // setCurrentPlayer('finished');
    }
  }

  const handleDouble = () => {
    const { updatedHand, deck } = dealOneCard(currentDeck, playerHand)
    setPlayerHand(updatedHand)
    setCurrentDeck(deck)
    setBalance(balance - currentBet)
    setCurrentBet(currentBet * 2)

    if (getScore(updatedHand) > 21) {
      setGameState(false)
    } else {
      handleStand(deck)
    }
  }

  const handleStand = (updatedDeck) => {
    setCurrentPlayer('dealer')
    const {hand, deck} = dealerLogic(dealerHand, updatedDeck)
    
    setDealerHand(hand)
    setCurrentDeck(deck)
    setCurrentPlayer('finished')
  }

  useEffect(() => {
    const playerWinsLogic = () => {
      // only evolve pokemon if there is another pokemon in the evolution line
      const pokemonCanEvolve = playerPokemon.length > 1
      if (pokemonCanEvolve) {
        const evolvedLine = evolvePokemon(playerPokemon);
        setPlayerPokemon(evolvedLine);
      }

      // if blackjack, pay 2.5x
      const blackjack = getScore(playerHand) === 21 && playerHand.length === 2
      if (blackjack) {
        setBalance(balance + (currentBet * 2.5));
        // else pay 2x
      } else {
        setBalance(balance + (currentBet * 2));
      }
      // reset current bet
      setCurrentBet(0);
    }

    const gameIsFinished = currentPlayer === 'finished';
    if (gameIsFinished) {
      // dummy win condition that is true if the user doesn't bust
      const playerWins = compareScore(playerHand, dealerHand) === 'player';
      const dealerWins = compareScore(playerHand, dealerHand) === 'dealer';
      const playerTie = compareScore(playerHand, dealerHand) === 'tie';
      if (playerWins) {
        playerWinsLogic();
      } else if (dealerWins) {
        // allPlayersLoseLogic();
      } else if (playerTie) {
        // playerTieLogic(playerTie);
        console.log('tie');
      } else {
      }
    }
  }, [currentPlayer, balance, currentBet, playerHand, playerPokemon])
  
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
        console.log(error, "API call failed");
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
        !gameState ? (
          <Title startGame={handleGameStart} />
        ) : (
          // if the game is running, render game UI
          <>
              <div className="wrapper gameBoard">
                <div>
                  <ExperienceBar balance={balance}/>
                </div>
                
                <Dealer
                  hand={dealerHand}
                  dealerPokemon={dealerPokemon}
                />

                <GameMessage message={"Deal"} />

                {playerPokemon.length > 0
                  ?
                  <Player
                    hand={playerHand}
                    playerPokemon={playerPokemon}
                    currentBet={currentBet}
                  />
                  : null}

                <div className="actions">
                  {/* only show deal when game state is false */}
                  { playerHand.length === 0 
                  ?
                    <ActionBtn
                    name={"Deal"}
                    className={"btn btn__deal"}
                    handleClick={handleDeal}
                  />
                  :
                  <div className="btn__container">
                    {/* only show hit, double, stand, if game state is true */}
                    <ActionBtn
                      name={"Hit"}
                      className={"btn btn__hit"}
                      handleClick={handleHit}
                    />
                    {/* show double only when player hand is 2 cards */}
                    <ActionBtn
                      name={"Double"}
                      className={"btn btn__double"}
                      handleClick={handleDouble}
                    />

                    <ActionBtn
                      name={"Stand"}
                      className={"btn btn__stand"}
                      handleClick={() => handleStand(currentDeck)}
                    />
                  </div>
                  }


                  {/* player component holds hand component and sprite component */}
                  {/* needs hand state */}
                  {/* <Player /> */}


                </div>
              </div>
          </>
        )
      }
    </>
  );
}

export default App;
