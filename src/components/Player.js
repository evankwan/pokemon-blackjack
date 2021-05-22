import Hand from './Hand';
import Sprite from './Sprite';
import "./Player.css";

const Player = ({ hand, playerPokemon }) => {

    const currentPokemon = playerPokemon[0];

    console.log(currentPokemon);

    return (
        <div className="player">
            <div className="player__container">
                <Sprite pokemon={currentPokemon} leftSprite={true}/>
                <Hand cards={hand} />
            </div>
        </div>
    )
}

export default Player;