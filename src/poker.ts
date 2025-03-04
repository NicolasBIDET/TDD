// poker.ts
export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface Hand {
  cards: Card[];
}

export enum HandRank {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  STRAIGHT_FLUSH,
  ROYAL_FLUSH,
}

export function evaluateHand(hand: Hand): HandRank {
  // TODO: Implémenter la logique d'évaluation de la main
  return HandRank.HIGH_CARD;
}

export function compareHands(hand1: Hand, hand2: Hand): number {
  const rank1 = evaluateHand(hand1);
  const rank2 = evaluateHand(hand2);

  if (rank1 > rank2) return 1;
  if (rank1 < rank2) return -1;
  return 0; // TODO: Comparer en détail en cas d'égalité
}
