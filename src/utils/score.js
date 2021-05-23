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
  let sorted = [...cards]
  sorted.sort((a, b) => b.value - a.value)
  sorted.reverse()
  console.log("SORTED!!", sorted);
  let score = sorted.reduce((accumulatedScore, card) => {
    const cardValue = getCardValue(card);

    if (typeof cardValue === 'number') {
      accumulatedScore += cardValue;
      return accumulatedScore;
    }
    // If the added score does not exceed 21, ACE counts as 11
    if (cardValue === 'ACE' && accumulatedScore + 11 <= 21) {
      return accumulatedScore + 11;
    }
    // If the added score exceeds 21, ACE counts as 1
    if (card.value === 'ACE' && accumulatedScore + 11 > 21) {
      return accumulatedScore + 1;
    }
    return accumulatedScore;
  }, 0);

  return score;
}
