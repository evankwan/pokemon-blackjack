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
import DealAgainButton from './components/DealAgainButton';
import DocErrorModal from './components/DocErrorModal';

function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [currentBet, setCurrentBet] = useState(0);
  const [balance, setBalance] = useState(1200);
  const [currentPlayer, setCurrentPlayer] = useState('none');
  const [hideButtons, setHideButtons] = useState(false);
  const [error, setError] = useState();
  const [currentMessage, setCurrentMessage] = useState('Deal');
  const [playAgain, setPlayAgain] = useState(false);
  const [experienceNeeded, setExperienceNeeded] = useState(1500);

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
    // change the game state to true to display game
    setGameState(true);
    // set the message on screen
    setCurrentMessage('Deal');
    // empty hands
    setDealerHand([])
    setPlayerHand([])
    // set the current player
    setCurrentPlayer('player1');
  }

  // determines the size of Bet
  const determineBet = () => {
    // if possible, set bet to 100 XP
    if (balance >= 100) {
      const bet = 100;
      setCurrentBet(bet);
      setBalance(balance - bet);
      // if there is no XP in balance, reset to 1000
    } else if (balance <= 0) {
      setBalance(1000);
      setCurrentBet(100);
      // if between 0 and 100, bet the remaining balance
    } else {
      const bet = balance;
      setCurrentBet(bet);
      setBalance(balance - bet);
    }
  }

  const handleDeal = async () => {
    // run the initial deal and set the player and dealer hands and the new deck
    const { player, dealer, updatedDeck } = initialDeal(currentDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setCurrentDeck(updatedDeck);
    // show action buttons
    setHideButtons(false);

    // set the current bet
    determineBet();

    // booleans to determine blackjacks
    const dealerHasBlackjack = getScore(dealer) === 21;
    const playerHasBlackjack = getScore(player) === 21;

    // what happens after the initial deal
    if (dealerHasBlackjack) {
      // move between player and dealer turns
      setCurrentPlayer('pending');
      await sleep(1000);
      // show the dealer's hand and alert player
      setCurrentPlayer('dealer');
      setCurrentMessage('Dealer has Blackjack!');
      await sleep(2000);
      // end hand
      setCurrentPlayer('finished');
    } else if (playerHasBlackjack) {
      // move between player and dealer turns
      setCurrentPlayer('pending');
      await sleep(1000);
      // set message on screen
      setCurrentMessage('Player has Blackjack!');
      await sleep(2000);
      // end hand
      setCurrentPlayer('finished');
    } else {
      // if no one has blackjack, move to the player's turn
      setCurrentPlayer('player1');
      setCurrentMessage("Player's turn");
    }
  }

  // handles event for clicking 'hit' action button
  const handleHit = async () => {
    // prevent hit if score exceeds 21
    if (getScore(playerHand) <= 21 ) {
      // deal a card and return the updated hand and deck. update appropriate states
      const { updatedHand, deck } = dealOneCard(currentDeck, playerHand);
      setPlayerHand(updatedHand);
      setCurrentDeck(deck);
      // if the player busts
      if (getScore(updatedHand) > 21) {
        // set message and move to dealer's turn to show cards
        setCurrentMessage("Player Busts");
        setCurrentPlayer("dealer");

        await sleep(2000);
        // end hand
        setCurrentPlayer('finished');
      }
    }
  }

  // handle event click on 'double' action button
  const handleDouble = async () => {
    // immediately set turn to dealer
    setCurrentPlayer('dealer');
    // deal one card to player and return updated hand/deck and set those states
    const { updatedHand, deck } = dealOneCard(currentDeck, playerHand)
    setPlayerHand(updatedHand)
    setCurrentDeck(deck)
    // double the bet and remove from balance
    setBalance(balance - currentBet)
    setCurrentBet(currentBet * 2)

    // if player busts
    if (getScore(updatedHand) > 21) {
      setCurrentMessage("Player Busts");
      await sleep(2000);
      // end hand
      setCurrentPlayer('finished');
    } else {
      // move to dealer turn
      handleStand(deck)
    }
  }

  // event handler functino for click on 'stand' action button
  const handleStand = async (updatedDeck) => {
    // move to dealer's turn
    setCurrentMessage("Dealer's Turn");
    setCurrentPlayer('dealer')
    await sleep(2000);
    // run the dealer logic and set the states
    const { hand, deck } = dealerLogic(dealerHand, updatedDeck);
    setDealerHand(hand);
    setCurrentDeck(deck);

    // end hand
    setCurrentPlayer('finished');
  }

  // function to deal again after hand finishes
  const dealAgain = async () => {
    // if player has no more balance
    if (balance <= 0) {
      // toggle play again to generate new pokemon
      setPlayAgain(!playAgain);
    }
    if (currentPlayer === 'none') {
      // reset hand
      setHideButtons(true);
      setDealerHand([])
      setPlayerHand([])
      handleDeal();
    }
  }

  useEffect(() => {
    // logic for player iwnning
    const playerWinsLogic = async () => {
      // boolean for if player got blackjack
      const blackjack = getScore(playerHand) === 21 && playerHand.length === 2;
      setCurrentMessage(`Player Wins with ${blackjack ? 'blackjack!' : getScore(playerHand)}`);
      await sleep(2000);

      // calculate payout
      let payout;
      let newBalance;
      if (blackjack) {
        payout = currentBet * 2.5;
        // else pay 2x
      } else {
        payout = currentBet * 2;
      }
      // adjust balance and set state
      newBalance = balance + payout;
      setBalance(newBalance);
      setCurrentMessage(`Player gains ${payout}XP!`);

      // only evolve pokemon if there is another pokemon in the evolution line
      const pokemonCanEvolve = playerPokemon.length > 1
      if (pokemonCanEvolve && newBalance >= experienceNeeded) {

        await sleep(2000);
        setCurrentMessage(`What?`);

        await sleep(2000);
        setCurrentMessage(`${playerPokemon[0].name} is evolving...`);

        await sleep(2000);
        // remove current evolution from pokemonFamily
        const evolvedLine = evolvePokemon(playerPokemon);
        // set pokemon state to new fmaily line (first is the evolved pokemon)
        setPlayerPokemon(evolvedLine);

        await sleep(1000);
        setCurrentMessage(`${playerPokemon[0].name} evolved into ${playerPokemon[1].name}`);
        // adjust the experience needed
        setExperienceNeeded(2000);
      }
      // reset current bet
      setCurrentBet(0);
      await sleep(3000);
      // prompt to deal again
      setCurrentMessage(`Deal Again?`);

      //hide all buttons and ask to deal again
      setHideButtons(true);
    }

    // logic for player losing
    const playerLosesLogic = async () => {
      // boolean for if dealer got blackjack
      const blackjack = getScore(dealerHand) === 21 && dealerHand.length === 2;
      // alert user of how dealer won
      setCurrentMessage(`Dealer Wins with ${blackjack ? 'blackjack!' : getScore(dealerHand)}`);
      await sleep(2000);
      // tell user how much XP they lose
      setCurrentMessage(`Player loses ${currentBet}XP!`);
      await sleep(2000);

      // reset current bet
      setCurrentBet(0);
      
      // if balance is 0 or less
      if (balance <= 0) {
        // game over
        setCurrentMessage(`${playerPokemon[0].name} ran out of XP`);
        await sleep(2000);
        //hide all buttons and ask to play again
        setHideButtons(true);
        setCurrentMessage(`Play Again?`);
      } else {
        //hide all buttons and ask to deal again
        setHideButtons(true);
        setCurrentMessage(`Deal Again?`);
      }
    }

    // logic if player pushes, renamed to Ties to remove confusion with Array.push
    const playerTiesLogic = async () => {
      // alert user and adjust balance to replace bet
      setCurrentMessage('Player Pushes!');
      setBalance(currentBet + balance);
      await sleep(3000);

      // reset current bet
      setCurrentBet(0);

      //hide all buttons and ask to deal again
      setCurrentMessage(`Deal Again?`);
      setHideButtons(true);
    }

    // check if game is finished when useEffect is triggered
    const gameIsFinished = (currentPlayer === 'finished');

    // if the game is finished
    if (gameIsFinished) {
      // immediately set currentPlayer to none to not trigger this twice in a row
      setCurrentPlayer('none');
      // check who wins and run the appropriate logic
      const playerWins = compareScore(playerHand, dealerHand) === 'player';
      const dealerWins = compareScore(playerHand, dealerHand) === 'dealer';
      const playerTie = compareScore(playerHand, dealerHand) === 'tie';
      if (playerWins) {
        playerWinsLogic();
      } else if (dealerWins) {
        playerLosesLogic();
      } else if (playerTie) {
        playerTiesLogic(playerTie);
      } 
    }
  }, [currentPlayer, balance, currentBet, playerHand, playerPokemon, dealerHand])

  useEffect(() => {

    // wrapping the API call in a function
    const getPokemon = async () => {
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
    }
    
    getPokemon();
  }, [playAgain])

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
          <Title startGame={handleGameStart} deckLoaded={currentDeck && currentDeck.length > 0} />
        ) : (
          // if the game is running, render game UI
          <>
            <div className="gameBoard">
              <div className="wrapper">
                <div>
                  <ExperienceBar balance={balance} expNeeded={experienceNeeded}/>
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
                  {playerHand.length === 0
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
                        hideButtons={hideButtons}
                        currentPlayer={currentPlayer}
                      />
                      {/* show double only when player hand is 2 cards */}
                      <ActionBtn
                        name={"Double"}
                        className={"btn btn__double"}
                        handleClick={handleDouble}
                        disabled={playerHand.length > 2 || currentPlayer !== 'player1' || (balance < currentBet)}
                        hideButtons={hideButtons}
                        currentPlayer={currentPlayer}
                      />

                      <ActionBtn
                        name={"Stand"}
                        className={"btn btn__stand"}
                        handleClick={() => handleStand(currentDeck)}
                        hideButtons={hideButtons}
                        currentPlayer={currentPlayer}
                      />
                      <DealAgainButton
                        dealAgain={dealAgain}
                        deckLoaded={currentDeck && currentDeck.length > 0}
                        hideButtons={hideButtons}
                      />

                    </div>
                  }


                  {/* player component holds hand component and sprite component */}
                  {/* needs hand state */}
                  {/* <Player /> */}


                </div>
                </div> {/* wrapper div */}
            </div> {/* gameBoard div */}
          </>
        )
      }
      <DocErrorModal show={error} />
    </>
  );
}

export default App;
