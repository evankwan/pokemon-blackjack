/**
 * @typedef {object } Card
 * @property {string} image
 * @property {string} value
 * @property {string} suit
 * */

/**
 * Takes card object and returns a value number or string "ACE"
 * @param {Card} card
 * @returns {number | "ACE"}
 */
export function getCardValue(card) {
  switch (card.value) {
    // if it's ace, return string "ACE"
    case 'ACE':
      return 'ACE';
    // return 10 for face cards
    case 'JACK':
    case 'QUEEN':
    case 'KING':
      return 10;
    default:
      // For non-face card, convert string ("7") to number(7)
      return +card.value;
  }
}

/**
 * Takes an array of card object and returns score of given hand
 * @param {Card[]} cards
 * @returns {number} score
 */
export function getScore(cards) {
  // mapping hand into an array of values and then sorting, so the 'ACE' values are at the end
  let cardValues = cards.map((card) => {
    const cardValue = getCardValue(card);
    return cardValue
  })
  cardValues.sort();

  let score = cardValues.reduce((accumulatedScore, card, index) => {

    if (typeof card === 'number') {
      accumulatedScore += card;
      return accumulatedScore;
    }

    // if this is the last ace, test if it can be 1 or 11
    if(card === 'ACE' && index === (cardValues.length - 1)) {
      if (accumulatedScore + 11 > 21) {
        return accumulatedScore + 1;
      } else {
        return accumulatedScore + 11;
      }
    }

    // if this is NOT the last ace, assign it a value of 1
    if (card === 'ACE') {
      return accumulatedScore + 1;
    }

    return accumulatedScore;
  }, 0);

  return score;
}
