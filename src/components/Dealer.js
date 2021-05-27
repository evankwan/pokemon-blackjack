import Hand from './Hand';
import Sprite from './Sprite';

const Dealer = ({ hand, dealerPokemon, currentTurn }) => {
    return (
        <div className="dealer">
            <div className="dealer__container">
                <Sprite pokemon={dealerPokemon} imgPosition='sprite__dealer'
                spriteNamePosition='sprite__name-dealer'/>
                <Hand cards={hand} dealer={true} currentTurn={currentTurn}/>
            </div>
        </div>
    )
}

export default Dealer;