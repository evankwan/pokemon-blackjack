const Hand = ({ cards }) => {
  return (
    <div className="hand">
      <ul className="hand__card-list">
        {cards.map((card) => {
          const { image, value, suit } = card;
          const alt = `${value.toLowerCase()} of ${suit.toLowerCase()}`;
          return (
            <li className="hand__card-item">
              <img className="hand__card-img" src={image} alt={alt} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Hand;
