const initialDeal = (currentDeck, setPlayerHand, setDealerHand, setCurrentDeck) => {
  const newPlayerHand = [];
  const newDealerHand = [];
  const deck = [...currentDeck];

  for (let i = 0; i < 2; i++) {
    let currentCard = deck.splice(0, 1);
    newPlayerHand.push(currentCard[0]);
    currentCard = deck.splice(0, 1);
    newDealerHand.push(currentCard[0]);
  }

  console.log(newPlayerHand);
  console.log(newDealerHand);
  setPlayerHand(newPlayerHand);
  setDealerHand(newDealerHand);
  setCurrentDeck(deck);
}

export default initialDeal