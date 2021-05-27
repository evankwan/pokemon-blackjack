const Title = ({ startGame, deckLoaded }) => {
  return (
    <>
      <header id="header" className="header">
        <h1 className="header__title">Pokemon Blackjack!</h1>

        <div className="header__rules-container">
          <h2 className="header__list-header">How to Play:</h2>
          <ol className="header__list-container">
            <li>Bet and win Exp for your Pokemon</li>
            <li>Play until your cards total 21 (Don't go over!)</li>
            <li>"Hit" to get 1 more card</li>
            <li>"Stand" to confirm your hand</li>
            <li>Win if your hand is better than the dealers</li>
            <li>Collect your Exp, and evolve your Pokemon!</li>
          </ol>
        </div>

        <button 
          className={`btn btn__play ${!deckLoaded ? 'disabled' : '' } `}
          type="button"
          onClick={startGame}
          disabled={!deckLoaded}
        >
          {/* wait until the deck is loaded (DoC API has successfully been called) before the text on the button is switche to Play Now */}
          {!deckLoaded ? 'Loading...' : 'Play Now ' }
        </button>
      </header>
      <footer>
        <p>Created at <a href="https://junocollege.com/" target="_blank" rel="noreferrer">Juno College</a></p>
      </footer>
    </>
  );
}

export default Title;