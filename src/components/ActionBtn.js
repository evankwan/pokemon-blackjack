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