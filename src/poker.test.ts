import { evaluateHand, HandRank, Hand, Rank, Suit } from './poker';

describe('Poker hand evaluation', () => {
  test('should return HIGH_CARD for a single card', () => {
    const hand: Hand = {
      cards: [
        { rank: "A", suit: "hearts" },
        { rank: "2", suit: "clubs" },
        { rank: "3", suit: "spades" },
        { rank: "4", suit: "diamonds" },
        { rank: "5", suit: "hearts" },
      ]
    };
    expect(evaluateHand(hand)).toBe(HandRank.HIGH_CARD);
  });
});
