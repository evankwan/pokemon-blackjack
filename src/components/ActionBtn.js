const ActionBtn = (props) => {
  const {
    name,
    className,
    handleClick,
    disabled = false,
    hideButtons = false,
    currentPlayer,
  } = props

  const notPlayersTurn = (currentPlayer !== 'player1' && name !== 'Deal');

  return (  
    <>
      {/* all action buttons (hit/stand/double) should be disabled when no more action is allowed by the player  */}
      {/* the double button is disabled after "hit" or "stand" is clicked */}
      {/* all action buttons are completely hidden when the hideButtons class is on. this class is on right after a player has won, lost or tied  */}

      <button 
        className={` 
          ${className}
          ${disabled 
            ? "disabled" 
            : notPlayersTurn
              ? "disabled" 
              : ""}
          ${hideButtons 
            ? "hideButtons" 
            : "" } 
        `}
        type="button"
        onClick={handleClick}
        disabled={disabled || notPlayersTurn }
      >
        {name}
      </button>
    </>
  );
}

export default ActionBtn;