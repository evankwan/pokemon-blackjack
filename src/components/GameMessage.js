import './GameMessage.css';

const GameMessage = ({message}) => {
  return (    
      <span className={"game-message"}>{message}</span>    
  )
}

export default GameMessage;