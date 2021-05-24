import Hand from './Hand';
import Sprite from './Sprite';
import "./Player.css";

const Player = ({ hand, playerPokemon, currentBet }) => {

    const currentPokemon = playerPokemon[0];

    return (
        <div className="player">
            <div className="player__container">
                <Hand cards={hand} />
                <Sprite pokemon={currentPokemon} leftSprite={true} imgPosition='sprite__player'
                spriteNamePosition='sprite__name-player'
                currentBet={currentBet} />
            </div>
        </div>
    )
}

export default Player;