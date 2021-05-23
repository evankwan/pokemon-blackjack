const Sprite = ({ pokemon, leftSprite, imgPosition, spriteNamePosition }) => {

    // console.log(pokemon);
    const { name, sprite }  = pokemon

    return (
        <div className={`sprite ${imgPosition}`}>
            <div className="sprite__container">
                <img
                className={leftSprite ? "sprite__left-img" : "" }
                src={sprite} 
                alt={`The pokemon ${name}`} 
                />
                <p className={`sprite__name ${spriteNamePosition}`}>{name}</p>
            </div>
        </div>
    )
}

export default Sprite;