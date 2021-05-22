const Sprite = ({ pokemon: { name, sprite }, leftImage = false }) => {
    return (
        <div className="sprite">
            <div className="sprite__container">
                <img
                className={leftImage ? "sprite__leftImage" : "" }
                src={sprite} 
                alt={`The pokemon ${name}`} 
                />
                
            </div>
            <p className="sprite__name">{name}</p>
        </div>
    )
}

export default Sprite;