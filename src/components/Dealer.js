import Hand from './Hand';
import Sprite from './Sprite';
import "./Dealer.css";

const Dealer = ({ hand, dealerPokemon }) => {
    return (
        <div className="dealer">
            <div className="dealer__container">
                <Sprite pokemon={dealerPokemon} imgPosition='sprite__dealer'
                spriteNamePosition='sprite__name-dealer'/>
                <Hand cards={hand} dealer={true}/>
            </div>
        </div>
    )
}

export default Dealer;