const DealAgainButton = ({ deckLoaded, hideButtons, dealAgain }) => {
    return (
            <button
                className={`
                ${!deckLoaded ? 'disabled' : ''}
                ${hideButtons ? "btn btn__deal" : "hideButtons" }`}
                type="button"
                onClick={dealAgain}
                disabled={!deckLoaded}
            >
                {!deckLoaded ? 'Loading...' : 'Deal again?'}
            </button>
    );
}

export default DealAgainButton;