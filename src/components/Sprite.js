const Sprite = ({ pokemon, leftSprite, imgPosition, spriteNamePosition, currentBet }) => {

  // destructure the pokemon this sprite is used for
  const { name, sprite }  = pokemon

  return (
    <div className={`sprite ${imgPosition}`}>
      <div className="sprite__container">
        <img
        className={leftSprite ? "sprite__left-img" : "" }
        src={sprite} 
        alt={`The pokemon ${name}`} 
        />
          
      </div>
      {/* if there is a current bet, show the current bet and pokemon name */}
      <div className="sprite__name-bet-container">
        <p className={`sprite__name ${spriteNamePosition}`}>{name}</p>

        {currentBet
          ?
            <div className="sprite__betContainer">
              <p className="sprite__betAmount">{currentBet}</p>
            </div>
          : null}
      </div>
    </div>
    )
}

export default Sprite;