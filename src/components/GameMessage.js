//GameMessage updates the message in the middle of the screen
const GameMessage = ({message}) => {
  return (    
      <h2 className={"game-message"}>{message}</h2>    
  )
}

export default GameMessage;