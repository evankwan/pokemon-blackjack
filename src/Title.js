const Title = () => {
  return (
    <header id="header" className="header">
      <h1 className="header__title">Welcome to Pokemon Blackjack!</h1>

      <h2 className="header__list-header">How to Play:</h2>
      <ol className="header__list-container">
        <li>Bet and win Exp for your Pokemon</li>
        <li>Play until your cards total 21 (Don't go over!)</li>
        <li>"Hit" to get 1 more card</li>
        <li>"Stand" to confirm your hand</li>
        <li>Win if your hand is better than the dealers</li>
        <li>Collect your Exp, and evolve your Pokemon!</li>
      </ol>

      <button className="btn btn__play" type="button">Play Now</button>
    </header>
  );
}

export default Title;