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

const dealOneCard = (currentDeck, currentHand) => {
    // spread currentDeck into new variable
    const updatedDeck = [...currentDeck];

    // remove the top card from the deck
    const cardsDealt = updatedDeck.splice(0, 1);

    // adding one card to the existing currentHand array (to prevent overriding the player or dealer's hand)
    const updatedHand = [...currentHand, ...cardsDealt]

    return {updatedHand, updatedDeck};
}

export default dealOneCard;