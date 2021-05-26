import { getCardValue, getScore } from '../utils/score';

const Hand = ({ cards, currentTurn, dealer = false }) => {
  // calculate the score for the hand
  const score = getScore(cards);

  // format the score for display
  const formattedScore = (score) => {
    // test if the hand includes an Ace
    let includesAce = false;
    cards.forEach((card) => {
      if (card.value === "ACE") {
        includesAce = true;
      }
    })

    // if the user has blackjack display the word 'blackjack'
    if (score === 21 && cards.length === 2) {
      return 'Blackjack'
    }

    // if the use has 21 but more than 2 cards, display the score 21
    if (score === 21) {
      return `21`
    }

    // if there is no ace, display the score
    if (!includesAce) {
      return score
    }

    // if there is an ace and the score is not 21
    if (includesAce) {
      // calculate the total as if Ace = 1
      const aceAsOneTotal = cards.reduce((accumulator, card) => {
        // get the value of this card
        let cardValue = getCardValue(card);
        // if this card is an Ace, add 1 to the accumulator
        if (cardValue === "ACE") {
          return accumulator += 1;
        }
        // return the accumulator plus the card value
        return accumulator += cardValue;
      }, 0);

      // if we add 10 to the total and it's under 21, display both options for if Ace = 1 and Ace = 11
      if (aceAsOneTotal + 10 < 21) {
        return `${aceAsOneTotal}/${aceAsOneTotal + 10}`
        // otherwise, just return the total treating Ace = 1
      } else {
        return `${aceAsOneTotal}`
      }
    }

    return score;
  }

  // markup that displays the formattedScore
  const scoreDisplay = 
    <div className="hand__score-container">
      <p className="hand__score">{formattedScore(score)}</p>
    </div>;

  // boolean logic to determine if we show the Dealer's score
  const showDealerScore = () => {
    if (dealer && (currentTurn === 'dealer' || currentTurn === 'finished')) {
      return true
    }
  }

  return (
    <div className="hand">
      {showDealerScore() ? scoreDisplay : ""}
      <ul className="hand__card-list">
        {
          cards
          ? cards.map((card, index) => {
              const { image, value, suit } = card;
              const alt = `${value.toLowerCase()} of ${suit.toLowerCase()}`;
              const dealerCardFaceDown = (
                cards.length === 2 && 
                index === cards.length - 1 && 
                dealer &&
                currentTurn === 'player1'
              );
              return (
                <li key={index} className={`hand__card-item ${dealerCardFaceDown ? "card__dealer-facedown" : ""}`}>
                  <img className="hand__card-img" src={image} alt={alt} />
                </li>
              );
            })
          : ""
        }
      </ul>
      {dealer ? "" : scoreDisplay}
    </div>
  );
};

export default Hand;
