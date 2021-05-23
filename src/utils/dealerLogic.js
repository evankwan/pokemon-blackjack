import dealOneCard from './dealOneCard';
import {getScore} from './score';


const dealerLogic = (dealerHand, currentDeck, setDealerHand, setCurrentDeck) => {
  let hand = [...dealerHand]
  let dealerScore = getScore(dealerHand)
  console.log(dealerScore);


  while (dealerScore < 17) {
    const updatedValues = dealOneCard(currentDeck, hand)
    hand = updatedValues.updatedHand
    currentDeck = updatedValues.deck;
    dealerScore = getScore(hand)
    console.log(hand);
    console.log(dealerScore);

    setDealerHand(hand);
    setCurrentDeck(currentDeck);
  }

}

export default dealerLogic;
