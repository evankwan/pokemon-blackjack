import { getScore } from './score';

const cards = [
  {
    image: 'https://deckofcardsapi.com/static/img/5D.png',
    value: '5',
    suit: 'DIAMONDS',
  },
  {
    image: 'https://deckofcardsapi.com/static/img/2C.png',
    value: '2',
    suit: 'CLUBS',
  },
  {
    image: 'https://deckofcardsapi.com/static/img/AC.png',
    value: 'ACE',
    suit: 'CLUBS',
  },
  {
    image: 'https://deckofcardsapi.com/static/img/JD.png',
    value: 'JACK',
    suit: 'DIAMONDS',
  },
];

describe('getScore', () => {
  it('should return correct score', () => {
    expect(getScore(cards.slice(0, 1))).toBe(5);
    expect(getScore(cards.slice(0, 2))).toBe(8);
    expect(getScore(cards.slice(0, 3))).toBe(18);

    const aceAfterJack = [...cards.slice(0, 2), cards[3], cards[2]];
    expect(getScore(aceAfterJack)).toBe(18);
  });
});
