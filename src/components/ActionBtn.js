const ActionBtn = (props) => {
  const {
    name,
    className,
    dealCards
  } = props
  return (  
    <>
      <button 
        className={className} 
        type="button"
        onClick={
          name === 'Deal'
          ? dealCards
          : dealCards
        }
      >
        {name}
      </button>
    </>
  );
}

export default ActionBtn;