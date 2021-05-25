const ActionBtn = (props) => {
  const {
    name,
    className,
    handleClick,
    disabled = false
  } = props
  return (  
    <>
      <button 
        className={`${className} ${disabled ? "disabled" : ""}`} 
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