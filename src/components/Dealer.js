import Hand from './Hand';
import Sprite from './Sprite';

//this component creates a container to hold the dealer's Sprite (pokemon image) and their hand (hand includes the cards and score)
const Dealer = ({ hand, dealerPokemon, currentTurn }) => {
    return (
        <div className="dealer">
            <div className="dealer__container">
                <Sprite 
                pokemon={dealerPokemon} 
                imgPosition='sprite__dealer'
                spriteNamePosition='sprite__name-dealer'/>

                <Hand 
                cards={hand} 
                dealer={true} 
                currentTurn={currentTurn} />
            </div>
        </div>
    )
}

export default Dealer;