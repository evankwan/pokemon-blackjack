const Hand = ({ cards, dealer = false }) => {
  return (
    <div className="hand">
      <ul className="hand__card-list">
        {
          cards
          ? cards.map((card, index) => {
              const { image, value, suit } = card;
              const alt = `${value.toLowerCase()} of ${suit.toLowerCase()}`;
              const dealerCardFaceDown = (cards.length === 2 && index === cards.length - 1 && dealer);
              return (
                <li key={index} className={`hand__card-item ${dealerCardFaceDown ? "card__dealer-facedown" : ""}`}>
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
