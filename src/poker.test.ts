import { evaluateHand, HandRank, Hand, Rank, Suit, compareHands } from './poker';

describe('Poker hand evaluation', () => {
  test('should identify a Royal Flush', () => {
    const hand: Hand = {
      cards: [
        { rank: '10', suit: 'hearts' },
        { rank: 'J', suit: 'hearts' },
        { rank: 'Q', suit: 'hearts' },
        { rank: 'K', suit: 'hearts' },
        { rank: 'A', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.ROYAL_FLUSH);
  });

  test('should identify a Straight Flush', () => {
    const hand: Hand = {
      cards: [
        { rank: '5', suit: 'spades' },
        { rank: '6', suit: 'spades' },
        { rank: '7', suit: 'spades' },
        { rank: '8', suit: 'spades' },
        { rank: '9', suit: 'spades' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.STRAIGHT_FLUSH);
  });

  test('should identify a Four of a Kind', () => {
    const hand: Hand = {
      cards: [
        { rank: '10', suit: 'hearts' },
        { rank: '10', suit: 'spades' },
        { rank: '10', suit: 'diamonds' },
        { rank: '10', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.FOUR_OF_A_KIND);
  });

  test('should identify a Full House', () => {
    const hand: Hand = {
      cards: [
        { rank: '3', suit: 'hearts' },
        { rank: '3', suit: 'spades' },
        { rank: '3', suit: 'clubs' },
        { rank: '7', suit: 'diamonds' },
        { rank: '7', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.FULL_HOUSE);
  });

  test('should identify a Flush', () => {
    const hand: Hand = {
      cards: [
        { rank: '2', suit: 'hearts' },
        { rank: '5', suit: 'hearts' },
        { rank: '7', suit: 'hearts' },
        { rank: '9', suit: 'hearts' },
        { rank: 'J', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.FLUSH);
  });

  test('should identify a Straight', () => {
    const hand: Hand = {
      cards: [
        { rank: '3', suit: 'hearts' },
        { rank: '4', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '6', suit: 'clubs' },
        { rank: '7', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.STRAIGHT);
  });

  test('should identify a Three of a Kind', () => {
    const hand: Hand = {
      cards: [
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'spades' },
        { rank: '8', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.THREE_OF_A_KIND);
  });

  test('should identify Two Pair', () => {
    const hand: Hand = {
      cards: [
        { rank: '9', suit: 'hearts' },
        { rank: '9', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
        { rank: 'K', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.TWO_PAIR);
  });

  test('should identify One Pair', () => {
    const hand: Hand = {
      cards: [
        { rank: 'J', suit: 'hearts' },
        { rank: 'J', suit: 'spades' },
        { rank: '3', suit: 'diamonds' },
        { rank: '7', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.ONE_PAIR);
  });

  test('should identify a High Card', () => {
    const hand: Hand = {
      cards: [
        { rank: '2', suit: 'hearts' },
        { rank: '3', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '7', suit: 'clubs' },
        { rank: 'K', suit: 'hearts' },
      ],
    };
    expect(evaluateHand(hand)).toBe(HandRank.HIGH_CARD);
  });
  
  test('should return 1 when hand1 has a higher pair than hand2', () => {
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

  test('should return 1 when hand1 has higher rank than hand2', () => {
    const hand1: Hand = {
      cards: [
        { rank: "A", suit: "hearts" },
        { rank: "2", suit: "clubs" },
        { rank: "3", suit: "spades" },
        { rank: "4", suit: "diamonds" },
        { rank: "5", suit: "hearts" },
      ]
    };

    const hand2: Hand = {
      cards: [
        { rank: "K", suit: "hearts" },
        { rank: "2", suit: "diamonds" },
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "hearts" },
        { rank: "5", suit: "spades" },
      ]
    };

    expect(compareHands(hand1, hand2)).toBe(1); // "A" > "K"
  });

  test('should return -1 when hand2 has higher rank than hand1', () => {
    const hand1: Hand = {
      cards: [
        { rank: "J", suit: "hearts" },
        { rank: "2", suit: "clubs" },
        { rank: "3", suit: "spades" },
        { rank: "4", suit: "diamonds" },
        { rank: "5", suit: "hearts" },
      ]
    };

    const hand2: Hand = {
      cards: [
        { rank: "Q", suit: "hearts" },
        { rank: "2", suit: "diamonds" },
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "hearts" },
        { rank: "5", suit: "spades" },
      ]
    };

    expect(compareHands(hand1, hand2)).toBe(-1); // "Q" > "J"
  });

  test('should return 0 when both hands have the same highest card', () => {
    const hand1: Hand = {
      cards: [
        { rank: "A", suit: "hearts" },
        { rank: "2", suit: "clubs" },
        { rank: "3", suit: "spades" },
        { rank: "4", suit: "diamonds" },
        { rank: "5", suit: "hearts" },
      ]
    };

    const hand2: Hand = {
      cards: [
        { rank: "A", suit: "spades" },
        { rank: "2", suit: "diamonds" },
        { rank: "3", suit: "clubs" },
        { rank: "4", suit: "hearts" },
        { rank: "5", suit: "spades" },
      ]
    };

    expect(compareHands(hand1, hand2)).toBe(0); // "A" == "A"
  });

  test('should identify Royal Flush > Straight Flush', () => {
    const hand1: Hand = {
      cards: [
        { rank: '10', suit: 'hearts' },
        { rank: 'J', suit: 'hearts' },
        { rank: 'Q', suit: 'hearts' },
        { rank: 'K', suit: 'hearts' },
        { rank: 'A', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '5', suit: 'spades' },
        { rank: '6', suit: 'spades' },
        { rank: '7', suit: 'spades' },
        { rank: '8', suit: 'spades' },
        { rank: '9', suit: 'spades' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Royal Flush) > hand2 (Straight Flush)
  });

  test('should identify Straight Flush > Four of a Kind', () => {
    const hand1: Hand = {
      cards: [
        { rank: '5', suit: 'spades' },
        { rank: '6', suit: 'spades' },
        { rank: '7', suit: 'spades' },
        { rank: '8', suit: 'spades' },
        { rank: '9', suit: 'spades' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '10', suit: 'hearts' },
        { rank: '10', suit: 'spades' },
        { rank: '10', suit: 'diamonds' },
        { rank: '10', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Straight Flush) > hand2 (Four of a Kind)
  });

  test('should identify Four of a Kind > Full House', () => {
    const hand1: Hand = {
      cards: [
        { rank: '10', suit: 'hearts' },
        { rank: '10', suit: 'spades' },
        { rank: '10', suit: 'diamonds' },
        { rank: '10', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '3', suit: 'hearts' },
        { rank: '3', suit: 'spades' },
        { rank: '3', suit: 'clubs' },
        { rank: '7', suit: 'diamonds' },
        { rank: '7', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Four of a Kind) > hand2 (Full House)
  });

  test('should identify Full House > Flush', () => {
    const hand1: Hand = {
      cards: [
        { rank: '3', suit: 'hearts' },
        { rank: '3', suit: 'spades' },
        { rank: '3', suit: 'clubs' },
        { rank: '7', suit: 'diamonds' },
        { rank: '7', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '2', suit: 'hearts' },
        { rank: '5', suit: 'hearts' },
        { rank: '7', suit: 'hearts' },
        { rank: '9', suit: 'hearts' },
        { rank: 'J', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Full House) > hand2 (Flush)
  });

  test('should identify Flush > Straight', () => {
    const hand1: Hand = {
      cards: [
        { rank: '2', suit: 'hearts' },
        { rank: '5', suit: 'hearts' },
        { rank: '7', suit: 'hearts' },
        { rank: '9', suit: 'hearts' },
        { rank: 'J', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '3', suit: 'hearts' },
        { rank: '4', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '6', suit: 'clubs' },
        { rank: '7', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Flush) > hand2 (Straight)
  });

  test('should identify Straight > Three of a Kind', () => {
    const hand1: Hand = {
      cards: [
        { rank: '3', suit: 'hearts' },
        { rank: '4', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '6', suit: 'clubs' },
        { rank: '7', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'spades' },
        { rank: '8', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Straight) > hand2 (Three of a Kind)
  });

  test('should identify Three of a Kind > Two Pair', () => {
    const hand1: Hand = {
      cards: [
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'spades' },
        { rank: '8', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '9', suit: 'hearts' },
        { rank: '9', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
        { rank: 'K', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Three of a Kind) > hand2 (Two Pair)
  });

  test('should identify Two Pair > One Pair', () => {
    const hand1: Hand = {
      cards: [
        { rank: '9', suit: 'hearts' },
        { rank: '9', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
        { rank: 'K', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: 'J', suit: 'hearts' },
        { rank: 'J', suit: 'spades' },
        { rank: '3', suit: 'diamonds' },
        { rank: '7', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (Two Pair) > hand2 (One Pair)
  });

  test('should identify One Pair > High Card', () => {
    const hand1: Hand = {
      cards: [
        { rank: 'J', suit: 'hearts' },
        { rank: 'J', suit: 'spades' },
        { rank: '3', suit: 'diamonds' },
        { rank: '7', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
      ],
    };

    const hand2: Hand = {
      cards: [
        { rank: '2', suit: 'hearts' },
        { rank: '3', suit: 'spades' },
        { rank: '5', suit: 'diamonds' },
        { rank: '7', suit: 'clubs' },
        { rank: 'K', suit: 'hearts' },
      ],
    };

    expect(compareHands(hand1, hand2)).toBe(1); // hand1 (One Pair) > hand2 (High Card)
  });
});
