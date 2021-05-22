const ActionBtn = (props) => {
  const {
    name,
    className
  } = props
  return (  
    <>
      <button className={className} type="button">{name}</button>
    </>
  );
}

export default ActionBtn;