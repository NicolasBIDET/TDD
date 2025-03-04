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
  const ranks = hand.cards.map(card => card.rank);
  const rankCount = new Map<string, number>();

  ranks.forEach(rank => {
    rankCount.set(rank, (rankCount.get(rank) || 0) + 1);
  });

  const pairCount = Array.from(rankCount.values()).filter(count => count === 2).length;
  
  if (pairCount === 2) { // Deux paires
    return HandRank.TWO_PAIR;
  }
  
  if (pairCount === 1) { // Une paire
    return HandRank.ONE_PAIR;
  }

  return HandRank.HIGH_CARD;
}

export function compareHands(hand1: Hand, hand2: Hand): number {
  const rank1 = evaluateHand(hand1);
  const rank2 = evaluateHand(hand2);

  if (rank1 > rank2) return 1;
  if (rank1 < rank2) return -1;

  const highestCard1 = Math.max(...hand1.cards.map(card => parseInt(card.rank)));
  const highestCard2 = Math.max(...hand2.cards.map(card => parseInt(card.rank)));
  console.log(highestCard1)
  console.log(highestCard2)

  return highestCard1 > highestCard2 ? 1 : (highestCard1 == highestCard2 ? 0: -1);
}
