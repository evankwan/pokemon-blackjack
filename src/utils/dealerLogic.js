import dealOneCard from './dealOneCard';
import {getScore} from './score';


const dealerLogic = (dealerHand, currentDeck, setDealerHand, setCurrentDeck) => {
  let hand = [...dealerHand]
  let deck = [...currentDeck]
  let dealerScore = getScore(dealerHand)
  console.log(dealerScore);


  while (dealerScore < 17) {
    const updatedValues = dealOneCard(deck, hand)
    hand = updatedValues.updatedHand
    deck = updatedValues.deck;
    dealerScore = getScore(hand)
    console.log(hand);
    console.log(dealerScore);

  }

  return {hand, deck}

}

export default dealerLogic;
