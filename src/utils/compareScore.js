import { getScore } from './score';

/**
 * @typedef {object} Card
 * @property {string} image
 * @property {string} value
 * @property {string} suit
 * 
 * */

 /**
  * accepts the playerHand and dealerHand
  * return the player or dealer depending on who has highest score that is 21 or lower
  * if both scores are 21, test if hand.length is 2 and if so, return the player/dealer who has hand/length of 2
  * if both hand.length are 2, return 'tie'

  * @param {Card[]} playerHand 
  * @param {Card[]} dealerHand 
  * @returns {'player' | 'dealer' | 'tie' }
  */

const compareScore = (playerHand, dealerHand) => {
    const playerScore = getScore(playerHand)
    const dealerScore = getScore(dealerHand)
    const dealerTwentyOne = dealerHand.length > 2 && dealerScore === 21;
    const playerBlackjack = playerHand.length === 2 && playerScore === 21;

    if (dealerScore > 21 ) {
        return 'player';
    }
    if (playerScore > 21) {
        return 'dealer';
    }
    if (playerScore > dealerScore) {
        return 'player';
    }
    if (playerScore < dealerScore) {
        return 'dealer';
    }
    if (playerBlackjack && dealerTwentyOne) {
        return 'player';
    }
    if (playerScore === dealerScore) {
        return 'tie';
    }
}

export default compareScore;