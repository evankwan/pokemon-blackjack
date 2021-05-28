const DealAgainButton = ({ deckLoaded, hideButtons, dealAgain }) => {
  return (
      //the DealAgainButton button appears at the end of each hand
      //it is disabled (can not be clicked on) when a new deck has not been loaded (new deck)
      //if hideButtons (hide action buttons of "hit", "double" and "stand" is set to true, the DealAgainButton button will appear on screen with the class of "btn btn__deal"
    <button
      className={`
      ${!deckLoaded ? 'disabled' : ''}
      ${hideButtons ? "btn btn__deal" : "hideButtons" }`}
      type="button"
      onClick={dealAgain}
      disabled={!deckLoaded}>
        {!deckLoaded ? 'Loading...' : 'Deal again?'}
    </button>
  );
}

export default DealAgainButton;