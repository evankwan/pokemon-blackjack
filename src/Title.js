const Title = () => {
  return (
    <>
      <h1>Welcome to Pokemon Blackjack!</h1>

      <h2>How to Play:</h2>
      <ol>
        <li>Bet and win Exp for your Pokemon</li>
        <li>Play until your cards total 21 (Don't go over!)</li>
        <li>"Hit" to get 1 more card</li>
        <li>"Stand" to confirm your hand</li>
        <li>Win if your hand is better than the dealers</li>
        <li>Collect your Exp, and evolve your Pokemon!</li>
      </ol>

      <button type="button">Play Now</button>
    </>
  );
}

export default Title;