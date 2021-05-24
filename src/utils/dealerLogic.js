import dealOneCard from './dealOneCard';
import {getScore} from './score';


const dealerLogic = (dealerHand, currentDeck) => {
  let hand = [...dealerHand];
  let deck = [...currentDeck];
  // hand[1].class= "";
  let dealerScore = getScore(dealerHand)


  while (dealerScore < 17) {
    const updatedValues = dealOneCard(currentDeck, dealerHand)
    hand = updatedValues.updatedHand
    deck = updatedValues.deck;
    dealerScore = getScore(dealerHand)
  }

  return {hand, deck}

}

export default dealerLogic;
