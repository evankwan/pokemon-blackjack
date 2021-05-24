import dealOneCard from './dealOneCard';
import {getScore} from './score';


const dealerLogic = (dealerHand, currentDeck) => {
  let hand = [...dealerHand];
  let deck = [...currentDeck];
  hand[1].class= "";
  let dealerScore = getScore(dealerHand);

  console.log('initial score:', dealerScore, hand.length);
  while (dealerScore < 17) {
    const updatedValues = dealOneCard(deck, hand);
    hand = updatedValues.updatedHand;
    deck = updatedValues.deck;
    dealerScore = getScore(hand);
  }

  return {hand, deck}

}

export default dealerLogic;
