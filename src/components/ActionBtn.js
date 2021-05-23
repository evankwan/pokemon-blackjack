const ActionBtn = (props) => {
  const {
    name,
    className,
    handleClick
  } = props
  return (  
    <>
      <button 
        className={className} 
        type="button"
        onClick={handleClick}
      >
        {name}
      </button>
    </>
  );
}

export default ActionBtn;