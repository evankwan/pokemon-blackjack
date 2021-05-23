/**
 * accepts the current deck and player to deal card to
 * draws the top card off the currentDeck
 * removes the card from currentDeck
 * adds the card to the player/dealer's hand
 * does not return value
 * @param {array} currentDeck
 * @param {function} currentHand
 * @param {function} setHand
 * @param {function} setCurrentDeck
 */

const dealOneCard = (currentDeck, currentHand, setHand, setCurrentDeck) => {
    // spread currentDeck into new variable
    const deck = [...currentDeck];

    // remove the top 4 cards from the deck
    const cardsDealt = deck.splice(0, 1);

    // adding one card to the existing currentHand array (to prevent overriding the player or dealer's hand)
    const updatedHand = [...currentHand, ...cardsDealt]

    // add first and third cards into player's hand
    setHand(updatedHand);

    // set deck state with missing top 4 cards
    setCurrentDeck(deck);
}

export default dealOneCard;