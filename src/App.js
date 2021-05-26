import './App.css';
import { useEffect, useState } from 'react'
import ActionBtn from './components/ActionBtn';
import Title from './components/Title'
import ExperienceBar from './components/ExperienceBar'
import randomizer from './utils/randomizer';
import GameMessage from './components/GameMessage';
import Dealer from './components/Dealer';
import Player from './components/Player';
import initialDeal from './utils/initialDeal';
import dealOneCard from './utils/dealOneCard';
import dealerLogic from './utils/dealerLogic';
import evolvePokemon from './utils/evolvePokemon';
import { getScore } from './utils/score';
import sleep from './utils/sleep';
import compareScore from './utils/compareScore';
import fetchRetry from './utils/fetchRetry';
import DocErrorModal from './components/DocErrorModal';

function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [currentBet, setCurrentBet] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [currentPlayer, setCurrentPlayer] = useState('none');
<<<<<<< HEAD
  const [error, setError] = useState();
=======
  const [currentMessage, setCurrentMessage] = useState('Deal');
>>>>>>> main

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
    setCurrentMessage('Deal');
    setDealerHand([])
    setPlayerHand([])
  }

  const handleDeal = async () => {
    const { player, dealer, updatedDeck } = initialDeal(currentDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setCurrentDeck(updatedDeck);

    const bet = 100;
    setCurrentBet(bet);
    setBalance(balance - bet);

    const dealerHasBlackjack = getScore(dealer) === 21;
    const playerHasBlackjack = getScore(player) === 21;
    if (dealerHasBlackjack) {
      setCurrentPlayer('player1');
      await sleep(1000);
      setCurrentPlayer('dealer');
      setCurrentMessage('Dealer has Blackjack!');
      await sleep(2000);
      setCurrentPlayer('finished');
    } else if (playerHasBlackjack) {
      setCurrentPlayer('player1');
      await sleep(1000);
      setCurrentMessage('Player has Blackjack!');
      await sleep(2000);
      setCurrentPlayer('finished');
    } else {
      setCurrentPlayer('player1');
      setCurrentMessage("Player's turn");
    }
  }

  const handleHit = async () => {
    const { updatedHand, deck } = dealOneCard(currentDeck, playerHand)
    setPlayerHand(updatedHand)
    setCurrentDeck(deck)
    
    if (getScore(updatedHand) > 21) {
      setCurrentMessage("Player Busts");
      await sleep(2000);
      setCurrentPlayer('finished');
    }
  }

  const handleDouble = async () => {
    const { updatedHand, deck } = dealOneCard(currentDeck, playerHand)
    setPlayerHand(updatedHand)
    setCurrentDeck(deck)
    setBalance(balance - currentBet)
    setCurrentBet(currentBet * 2)

    if (getScore(updatedHand) > 21) {
      setCurrentMessage("Player Busts");
      await sleep(2000);
      setCurrentPlayer('finished');
    } else {
      handleStand(deck)
    }
  }

  const handleStand = async (updatedDeck) => {
    setCurrentMessage("Dealer's Turn");
    await sleep(2000);
    setCurrentPlayer('dealer');
    const {hand, deck} = dealerLogic(dealerHand, updatedDeck);
    setDealerHand(hand);
    setCurrentDeck(deck);

    setCurrentPlayer('finished');
  }

  useEffect(() => {
    const playerWinsLogic = async () => {
      const blackjack = getScore(playerHand) === 21 && playerHand.length === 2;
      setCurrentMessage(`Player Wins with ${ blackjack ? 'blackjack!' : getScore(playerHand)}`);
      await sleep(2000);

      // if blackjack, pay 2.5x
      let payout;
      if (blackjack) {
        payout = currentBet * 2.5;
        setBalance(balance + payout);
        // else pay 2x
      } else {
        payout = currentBet * 2;
        setBalance(balance + payout);
      }
      setCurrentMessage(`Player gains ${payout}XP!`);
      await sleep(2000);

      setCurrentMessage(`What?`);
      await sleep(2000);
      setCurrentMessage(`${playerPokemon[0].name} is evolving...`);
      await sleep(2000);
      // only evolve pokemon if there is another pokemon in the evolution line
      const pokemonCanEvolve = playerPokemon.length > 1
      if (pokemonCanEvolve) {
        const evolvedLine = evolvePokemon(playerPokemon);
        setPlayerPokemon(evolvedLine);
        await sleep(1000);
        setCurrentMessage(`${playerPokemon[0].name} evolved into ${playerPokemon[1].name}`);
        await sleep(2000);
      }
      // reset current bet
      setCurrentBet(0);
      await sleep(2000);
      setGameState(false);
    }

    const playerLosesLogic = async () => {
      const blackjack = getScore(dealerHand) === 21 && dealerHand.length === 2;
      setCurrentMessage(`Dealer Wins with ${blackjack ? 'blackjack!' : getScore(dealerHand)}`);
      await sleep(2000);
      setCurrentMessage(`Player loses ${currentBet}XP!`);
      await sleep(2000);
      setGameState(false);
    }

    const playerTiesLogic = async () => {
      setCurrentMessage('Player Pushes!');
      setBalance(currentBet + balance);
      await sleep(1500);
      setGameState(false);
    }

    const gameIsFinished = (currentPlayer === 'finished');
    
    if (gameIsFinished) {
      setCurrentPlayer('none');
      // dummy win condition that is true if the user doesn't bust
      const playerWins = compareScore(playerHand, dealerHand) === 'player';
      const dealerWins = compareScore(playerHand, dealerHand) === 'dealer';
      const playerTie = compareScore(playerHand, dealerHand) === 'tie';
      if (playerWins) {
        playerWinsLogic();
      } else if (dealerWins) {
        playerLosesLogic();
      } else if (playerTie) {
        playerTiesLogic(playerTie);
      } else {
      }
    }
  }, [currentPlayer, balance, currentBet, playerHand, playerPokemon, dealerHand])
  
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
        console.log(error, "Pokemon API call failed");
      })
  }, [])

  useEffect(() => {
    // generate the 6 decks and set state t
    
    async function getDeck() {
      try {
        // Get deckId first to fetch deck of cards.
        // deckId is also used later for shuffling existing deck when restarting the game
        const { deck_id } = await fetchRetry(
          'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
        );

        const failureCallback = () => {
          setError('DoC API call failed');
        };

        // get 312 (52 * 6) cards with deck id
        const deck = await fetchRetry(
          `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=312`,
          failureCallback
        );

        const cards = deck.cards.map((card) => ({
          image: card.image, // "https://deckofcardsapi.com/static/img/0S.png"
          value: card.value, // "10'"
          suit: card.suit, // "SPADES"
        }));
        setCurrentDeck(cards);
      } catch (err) {
        console.log(err);
      }
    }

    getDeck();

  }, []);

  
    
  return (
    <>      
      {
        // if the game is not running, render title screen
        !gameState ? (
          <Title startGame={handleGameStart} deckLoaded={ currentDeck && currentDeck.length > 0}/>
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
                  currentTurn={currentPlayer}
                />

                <GameMessage message={currentMessage} />

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
                      disabled={playerHand.length > 2 || currentPlayer !== 'player1'}
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
      <DocErrorModal show={error}/>
    </>
  );
}

export default App;
