const Hand = ({cards}) => {
  console.log(cards);
  return (
    <div className="hand">
      <ul className="hand__card-list">
        {
          cards
          ? cards.map((card, index) => {
            console.log(card);
              const { image, value, suit } = card;
              const alt = `${value.toLowerCase()} of ${suit.toLowerCase()}`;
              return (
                <li key={index} className="hand__card-item">
                  <img className="hand__card-img" src={image} alt={alt} />
                </li>
              );
            })
          : ""
        }
      </ul>
    </div>
  );
};

export default Hand;
