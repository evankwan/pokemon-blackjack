const Sprite = ({ pokemon: { name, sprite }, leftSprite = false }) => {
    return (
        <div className="sprite">
            <div className="sprite__container">
                <img
                className={leftSprite ? "sprite__left-img" : "" }
                src={sprite} 
                alt={`The pokemon ${name}`} 
                />
                
            </div>
            <p className="sprite__name">{name}</p>
        </div>
    )
}

export default Sprite;