import { evaluateHand, HandRank, Hand, Rank, Suit, compareHands } from './poker';

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

  test('should return ONE_PAIR for a pair of cards', () => {
    const hand: Hand = {
      cards: [
        { rank: "A", suit: "hearts" },
        { rank: "A", suit: "diamonds" },
        { rank: "2", suit: "spades" },
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "hearts" },
      ]
    };
    expect(evaluateHand(hand)).toBe(HandRank.ONE_PAIR);
  });

  test('should return TWO_PAIR for two pairs of cards', () => {
    const hand: Hand = {
      cards: [
        { rank: "A", suit: "hearts" },
        { rank: "A", suit: "diamonds" },
        { rank: "K", suit: "spades" },
        { rank: "K", suit: "clubs" },
        { rank: "2", suit: "hearts" },
      ]
    };
    expect(evaluateHand(hand)).toBe(HandRank.TWO_PAIR);
  });
  
  test('should return 1 when hand1 has a higher rank than hand2', () => {
    const hand1: Hand = {
      cards: [
        { rank: "10", suit: "hearts" },
        { rank: "10", suit: "diamonds" },
        { rank: "2", suit: "spades" },
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "hearts" },
      ]
    };
    const hand2: Hand = {
      cards: [
        { rank: "9", suit: "hearts" },
        { rank: "9", suit: "diamonds" },
        { rank: "2", suit: "spades" },
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "hearts" },
      ]
    };
    expect(compareHands(hand1, hand2)).toBe(1);
  });
});
