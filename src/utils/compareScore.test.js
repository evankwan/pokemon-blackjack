import compareScore from './compareScore';

const playerHand = [
    {
        image: 'https://deckofcardsapi.com/static/img/5D.png',
        value: 'ACE',
        suit: 'DIAMONDS',
    },
    {
        image: 'https://deckofcardsapi.com/static/img/JD.png',
        value: 'JACK',
        suit: 'DIAMONDS',
    }
];

const dealerHand = [
    {
        image: 'https://deckofcardsapi.com/static/img/2C.png',
        value: '2',
        suit: 'CLUBS',
    },
    {
        image: 'https://deckofcardsapi.com/static/img/AC.png',
        value: '9',
        suit: 'CLUBS',
    },
    {
        image: 'https://deckofcardsapi.com/static/img/6C.png',
        value: '6',
        suit: 'CLUBS',
    }
];

describe('compareScore', () => {
    it('should return "player" if player wins from having the highest score', () => {
        const result = compareScore(playerHand, dealerHand);
        expect(result).toBe('player');
    })
    it('should return "player" if player wins because dealer busts', () => {
        const dealerBustHand = [...dealerHand, {
            image: 'https://deckofcardsapi.com/static/img/AC.png',
            value: '9',
            suit: 'CLUBS',
        }];
        const result = compareScore(playerHand, dealerBustHand);
        expect(result).toBe('player');
    })
    it('should return "dealer" if dealer wins because player busts', () => {
        const playerBustHand = [...dealerHand, {
            image: 'https://deckofcardsapi.com/static/img/AC.png',
            value: '9',
            suit: 'CLUBS',
        }];
        const result = compareScore(playerBustHand, dealerHand);
        expect(result).toBe('dealer');
    })
    
    it('should return "player" if player has blackjack, even if the dealer gets 21 with 3 cards or more', () => {
        const playerWinningHand = playerHand;
        const dealerWithTwentyOne = [
            {
                image: 'https://deckofcardsapi.com/static/img/2H.png',
                value: '2',
                suit: 'HEARTS',
            },
            {
                image: 'https://deckofcardsapi.com/static/img/4C.png',
                value: '4',
                suit: 'CLUBS',
            },
            {
                image: 'https://deckofcardsapi.com/static/img/AC.png',
                value: 'ACE',
                suit: 'CLUBS',
            },
            {
                image: 'https://deckofcardsapi.com/static/img/4S.png',
                value: '4',
                suit: 'SPADES',
            }];
        const result = compareScore(playerWinningHand, dealerWithTwentyOne);
        expect(result).toBe('player');
    })
    it('should return "dealer" if dealer has blackjack', () => {
        const playerLosingHandAtBeggining = dealerHand.slice(0, 2);
        const dealerBlackjackHand = [...playerHand];
        const result = compareScore(playerLosingHandAtBeggining, dealerBlackjackHand);
        expect(result).toBe('dealer');
    })
    it('should return "dealer" if dealer wins from having the highest score (the player stands)', () => {
        const dealerWinningHand = [{
            image: 'https://deckofcardsapi.com/static/img/3C.png',
            value: '3',
            suit: 'CLUBS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/2C.png',
            value: '2',
            suit: 'CLUBS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/AD.png',
            value: 'ACE',
            suit: 'DIAMONDS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/2C.png',
            value: '2',
            suit: 'CLUBS',
        }];
        const playerLosingHand = [{
            image: 'https://deckofcardsapi.com/static/img/AH.png',
            value: 'ACE',
            suit: 'HEARTS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/2C.png',
            value: '2',
            suit: 'CLUBS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/AD.png',
            value: 'ACE',
            suit: 'DIAMONDS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/3S.png',
            value: '3',
            suit: 'SPADES',
        }];
        const result = compareScore(playerLosingHand, dealerWinningHand);
        expect(result).toBe('dealer');
    })
    it('should return "tie" if both dealer and player gets blackjack', () => {
        const playerTieHand = playerHand;
        const dealerTieHand = [{
            image: 'https://deckofcardsapi.com/static/img/QS.png',
            value: 'QUEEN',
            suit: 'SPADES',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/AD.png',
            value: 'ACE',
            suit: 'DIAMONDS',
        }]
        const result = compareScore(playerTieHand, dealerTieHand);
        expect(result).toBe('tie');
    })
    it('should return "tie" if both dealer and player have the same final score', () => {
        const playerTieHand = [{
            image: 'https://deckofcardsapi.com/static/img/AH.png',
            value: 'ACE',
            suit: 'HEARTS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/AC.png',
            value: 'ACE',
            suit: 'CLUBS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/10H.png',
            value: '10',
            suit: 'HEARTS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/7D.png',
            value: '7',
            suit: 'DIAMONDS',
        }];
        const dealerTieHand = [{
            image: 'https://deckofcardsapi.com/static/img/3C.png',
            value: '3',
            suit: 'CLUBS',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/AS.png',
            value: 'ACE',
            suit: 'SPADES',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/2S.png',
            value: '2',
            suit: 'SPADES',
        },
        {
            image: 'https://deckofcardsapi.com/static/img/3C.png',
            value: '3',
            suit: 'CLUBS',
        }];
        const result = compareScore(playerTieHand, dealerTieHand);
        expect(result).toBe('tie');
    })
});