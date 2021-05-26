const DealAgainButton = ({ startGame, deckLoaded, hideButtons, dealAgain, currentPlayer }) => {
    return (
            <button
                className={`
                ${!deckLoaded ? 'disabled' : ''}
                ${hideButtons ? "btn btn__deal" : "hideButtons" }`}
                type="button"
                onClick={dealAgain}
                // onClick={currentPlayer}
                disabled={!deckLoaded}
            >
                {!deckLoaded ? 'Loading...' : 'Deal again?'}
            </button>
    );
}

export default DealAgainButton;