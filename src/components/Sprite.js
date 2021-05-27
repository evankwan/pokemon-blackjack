import './Sprite.css'

const Sprite = ({ pokemon, leftSprite, imgPosition, spriteNamePosition, currentBet }) => {

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
                {currentBet 
                ? 
                    <div className="display-flex">
                        <p className={`sprite__name ${spriteNamePosition}`}>{name}</p> 
                        
                        <div className="sprite__betContainer">
                            <p className="sprite__betAmount">{currentBet}</p>
                        </div>
                    </div>
                : null}
        </div>
    )
}

export default Sprite;