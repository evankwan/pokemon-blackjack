import {useState, useEffect} from 'react';
import randomizer from '../utils/randomizer';
import initialDeal from '../utils/initialDeal';
import dealOneCard from '../utils/dealOneCard';
import evolvePokemon from '../utils/evolvePokemon';
import { getScore } from '../utils/score';
import sleep from '../utils/sleep';
import compareScore from '../utils/compareScore';


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

const usePokemonBlackjack = () => {

  const [currentDeck, setCurrentDeck] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [currentBet, setCurrentBet] = useState(false);
  const [balance, setBalance] = useState(2600);
  const [playAgain, setPlayAgain] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('none');
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('Deal');
  const [playerPokemon, setPlayerPokemon] = useState([]);
  const [experienceNeeded, setExperienceNeeded] = useState(1500); 
  const [error, setError] = useState();



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
  }

  // determines the size of Bet
  const determineBet = async () => {
    let bet = 0;
    // if possible, set bet to 100 XP
    if (balance >= 100) {
      bet = 100;
      setCurrentBet(bet);
      setBalance(balance - bet);
      // if there is no XP in balance, reset to 1000
    } else if (balance <= 0) {
      bet = 100;
      setBalance(1000);
      setCurrentBet(100);
      // if between 0 and 100, bet the remaining balance
    } else {
      bet = balance;
      setCurrentBet(bet);
      setBalance(balance - bet);
    }
    setCurrentMessage(`Player bets ${bet}XP`);
    await sleep(1500);
  }

  const handleDeal = async () => {
    // set the current player
    setCurrentPlayer('player1');
    // run the initial deal and set the player and dealer hands and the new deck
    const { player, dealer, updatedDeck } = initialDeal(currentDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setCurrentDeck(updatedDeck);
    // show action buttons
    setButtonsHidden(false);

    // set the current bet
    await determineBet();

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
      const { updatedHand, updatedDeck } = dealOneCard(currentDeck, playerHand);
      setPlayerHand(updatedHand);
      setCurrentDeck(updatedDeck);
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
    const { updatedHand, updatedDeck } = dealOneCard(currentDeck, playerHand)
    setPlayerHand(updatedHand)
    setCurrentDeck(updatedDeck)
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
      handleStand(updatedDeck)
    }
  }

  // event handler functino for click on 'stand' action button
  const handleStand = async (updatedDeck) => {
    // move to dealer's turn
    setCurrentMessage("Dealer's Turn");
    setCurrentPlayer('dealer')
    await sleep(1200);
    // run the dealer logic and set the states
    let dealerScore = getScore(dealerHand);
    let hand = [...dealerHand];
    let deck = [...updatedDeck];

    // loop until dealer can no longer play
    while (dealerScore < 17) {
      // deal another card and set states
      const { updatedHand, updatedDeck } = dealOneCard(deck, hand);
      hand = updatedHand;
      deck = updatedDeck;
      setDealerHand(hand);
      setCurrentDeck(deck);

      // re-calculate score
      dealerScore = getScore(hand);
      // pause before moving to next iteration
      await sleep(1000);
    }
    await sleep(500);

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
      // after the first hand has been played, reset hand
      setButtonsHidden(true);
      setDealerHand([])
      setPlayerHand([])
      handleDeal();
    }
  }

  useEffect(() => {
    
    // logic for player winning
    const winCurrentHand = async () => {
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

      // pokemonCanEvolve handles the evolution of each pokemon 
      // each of the pokemon from availablePokemon has an evoluiton line
      // each pokemon start at the first level of the evolution line. this is represented as the [0] index of its respective array.
      // each pokemon can only evolve up to the 3rd pokemon in the evolution line
      // we will only evolve the pokemon if there is another pokemon in the evolution line
      const pokemonCanEvolve = playerPokemon.length > 1
      console.log(playerPokemon);
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
      setButtonsHidden(true);
    }

    // logic for player losing
    const loseCurrentHand = async () => {
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
        setButtonsHidden(true);
        setCurrentMessage(`Play Again?`);
      } else {
        //hide all buttons and ask to deal again
        setButtonsHidden(true);
        setCurrentMessage(`Deal Again?`);
      }
    }

    // logic if player pushes, renamed to Ties to remove confusion with Array.push
    const tieCurrentHand = async () => {
      // alert user and adjust balance to replace bet
      setCurrentMessage('Player Pushes!');
      setBalance(currentBet + balance);
      await sleep(3000);

      // reset current bet
      setCurrentBet(0);

      //hide all buttons and ask to deal again
      setCurrentMessage(`Deal Again?`);
      setButtonsHidden(true);
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
        winCurrentHand();
      } else if (dealerWins) {
        loseCurrentHand();
      } else if (playerTie) {
        tieCurrentHand(playerTie);
      } 
    }
  }, [currentPlayer, balance, currentBet, playerHand, playerPokemon, dealerHand, experienceNeeded])

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

    const showErrorModal = () => {
      setError('DoC API call failed');
    };

    async function getDeck() {
      let deck_id;
      try {
        // Get deckId first to fetch deck of cards.
        // deckId is also used later for shuffling existing deck when restarting the game
        const idResponse = await fetch(
          'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
        );
        if (idResponse) {          
          const idData = await idResponse.json()  
          deck_id = idData.deck_id;                  
        } else {
          showErrorModal();
          return;  
        }
      } catch (deckIdError) {        
        showErrorModal();
        return;
      }

      try {
        // get 312 (52 * 6) cards with deck id
        const deckResponse = await fetch(
          `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=312`,          
        );

        if (deckResponse) {
          const deck = await deckResponse.json()
          const cards = deck.cards.map((card) => ({
            image: card.image, // "https://deckofcardsapi.com/static/img/0S.png"
            value: card.value, // "10'"
            suit: card.suit, // "SPADES"
          }));
          setCurrentDeck(cards);                    
        } else {
          showErrorModal();
          return;  
        }
  
      } catch(deckError) {        
        showErrorModal();
        return
      }
    }

    getDeck();

  }, []);

  return {
    dealerPokemon,
    playerPokemon,
    currentDeck,
    dealerHand,
    playerHand,
    gameState, 
    currentPlayer,
    currentBet,
    currentMessage,
    experienceNeeded,
    balance,
    buttonsHidden,
    error,
    handleGameStart,
    handleDeal,
    handleHit,
    handleDouble,
    handleStand,
    dealAgain,    
  }
}

export default usePokemonBlackjack;