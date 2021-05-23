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
        onClick={() => {
          if (name === 'Deal') {
            dealCards();
          }
        }}
      >
        {name}
      </button>
    </>
  );
}

export default ActionBtn;