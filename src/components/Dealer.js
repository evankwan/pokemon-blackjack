import Hand from './Hand';
import Sprite from './Sprite';
import "./Dealer.css";

const Dealer = ({ hand, playerPokemon, dealerPokemon }) => {
    return (
        <div className="dealer">
            <div className="dealer__container">
                <Sprite pokemon={dealerPokemon} />
                <Hand cards={hand} />
                <Sprite pokemon={playerPokemon} leftSprite={true} />
            </div>
        </div>
    )
}

export default Dealer;