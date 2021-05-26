const ActionBtn = (props) => {
  const {
    name,
    className,
    handleClick,
    disabled = false,
    hideButtons = false,
    currentPlayer,
  } = props


  // ${ hideButtons ? "hideButtons" : "" }
      // `(this.hideButtons ? "hideButtons" : "btn btn__deal")`

      //${hideButtons ? "hideButtons" + " btn btn__deal" : "" } 
      console.log(hideButtons);
      console.log(currentPlayer);
  return (  
    <>
    {/* {currentPlayer === 'none' ? {} : ""} */}
      <button 
        className={`
        ${className}
        ${disabled ? "disabled" : ""}
        ${hideButtons ? "hideButtons" : "" } `}
        type="button"
        onClick={handleClick}
        disabled={disabled}
      >
        {name}
      </button>
    </>
  );
}

export default ActionBtn;