/**
 * 
 * @param {array} currentDeck
 * @param {function} setPlayerHand
 * @param {function} setDealerHand
 * @param {function} setCurrentDeck
 */

const initialDeal = (currentDeck) => {
  // spread currentDeck into new variable
  const deck = [...currentDeck];

  // remove the top 4 cards from the deck
  const cardsDealt = deck.splice(0, 4);

  return {
    player: [cardsDealt[0], cardsDealt[2]],
    dealer: [cardsDealt[1], cardsDealt[3]],
    // dealer: [{ image: "https://deckofcardsapi.com/static/img/0D.png", value: "10", suit: "DIAMONDS" }, { image: "https://deckofcardsapi.com/static/img/aceDiamonds.png", value: "ACE", suit: "DIAMONDS" }],
    updatedDeck: deck
  }
  
  // // add first and third cards into player's hand
  // setPlayerHand([cardsDealt[0], cardsDealt[2]]);

  // // add second and fourth cards into dealer's hand
  // setDealerHand([cardsDealt[1], cardsDealt[3]]);

  // // set deck state with missing top 4 cards
  // setCurrentDeck(deck);
}

export default initialDeal