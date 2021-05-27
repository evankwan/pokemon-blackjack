import Hand from './Hand';
import Sprite from './Sprite';

// creates and displays the Hand and Sprite for the player
const Player = ({ hand, playerPokemon, currentBet }) => {

  // grab the first pokemon in the current pokemon array
  const currentPokemon = playerPokemon[0];

  return (
    <div className="player">
      <div className="player__container">
        {/* show hand */}
        <Hand cards={hand} />
        
        {/* player */}
        <Sprite 
        pokemon={currentPokemon} 
        leftSprite={true} 
        imgPosition='sprite__player'
        spriteNamePosition='sprite__name-player'
        currentBet={currentBet} />
      </div>
    </div>
  )
}

export default Player;