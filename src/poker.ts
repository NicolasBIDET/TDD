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
  const suits = hand.cards.map(card => card.suit);
  const rankCount = new Map<string, number>();

  // Comptage des occurrences de chaque rang
  ranks.forEach(rank => {
    rankCount.set(rank, (rankCount.get(rank) || 0) + 1);
  });

  const pairCount = Array.from(rankCount.values()).filter(count => count === 2).length;
  const threeOfAKindCount = Array.from(rankCount.values()).filter(count => count === 3).length;
  const fourOfAKindCount = Array.from(rankCount.values()).filter(count => count === 4).length;

  const isFlush = new Set(suits).size === 1; // Vérifier si toutes les cartes sont de la même couleur
  const sortedRanks = ranks.map(getCardValue).sort((a, b) => a - b); // Trier les valeurs des cartes
  const isStraight = sortedRanks[4] - sortedRanks[0] === 4 && new Set(sortedRanks).size === 5;

  // Cas : Royal Flush (suite 10-J-Q-K-A de la même couleur)
  if (isFlush && isStraight && sortedRanks[0] === 10) {
    return HandRank.ROYAL_FLUSH;
  }

  // Cas : Straight Flush
  if (isFlush && isStraight) {
    return HandRank.STRAIGHT_FLUSH;
  }

  // Cas : Four of a Kind (Carré)
  if (fourOfAKindCount === 1) {
    return HandRank.FOUR_OF_A_KIND;
  }

  // Cas : Full House (Full)
  if (threeOfAKindCount === 1 && pairCount === 1) {
    return HandRank.FULL_HOUSE;
  }

  // Cas : Flush
  if (isFlush) {
    return HandRank.FLUSH;
  }

  // Cas : Straight
  if (isStraight) {
    return HandRank.STRAIGHT;
  }

  // Cas : Three of a Kind (Brelan)
  if (threeOfAKindCount === 1) {
    return HandRank.THREE_OF_A_KIND;
  }

  // Cas : Two Pair (Deux paires)
  if (pairCount === 2) {
    return HandRank.TWO_PAIR;
  }

  // Cas : One Pair (Une paire)
  if (pairCount === 1) {
    return HandRank.ONE_PAIR;
  }

  // Cas : High Card (Carte haute)
  return HandRank.HIGH_CARD;
}

export function compareHands(hand1: Hand, hand2: Hand): number {
  const rank1 = evaluateHand(hand1);
  const rank2 = evaluateHand(hand2);

  // Si les rangs des mains sont différents, renvoyer immédiatement le résultat
  if (rank1 > rank2) return 1;
  if (rank1 < rank2) return -1;

  // Si les rangs sont égaux, on compare les cartes de la combinaison principale
  const sortedHand1 = sortCardsByValue(hand1);
  const sortedHand2 = sortCardsByValue(hand2);

  // Cas pour chaque type de combinaison
  switch (rank1) {
    case HandRank.HIGH_CARD:
      return compareHighCard(sortedHand1, sortedHand2);

    case HandRank.ONE_PAIR:
      return compareOnePair(sortedHand1, sortedHand2);

    case HandRank.TWO_PAIR:
      return compareTwoPair(sortedHand1, sortedHand2);

    case HandRank.THREE_OF_A_KIND:
      return compareThreeOfAKind(sortedHand1, sortedHand2);

    case HandRank.STRAIGHT:
      return compareStraight(sortedHand1, sortedHand2);

    case HandRank.FLUSH:
      return compareFlush(sortedHand1, sortedHand2);

    case HandRank.FULL_HOUSE:
      return compareFullHouse(sortedHand1, sortedHand2);

    case HandRank.FOUR_OF_A_KIND:
      return compareFourOfAKind(sortedHand1, sortedHand2);

    case HandRank.STRAIGHT_FLUSH:
      return compareStraightFlush(sortedHand1, sortedHand2);

    case HandRank.ROYAL_FLUSH:
      return compareRoyalFlush(sortedHand1, sortedHand2);

    default:
      return 0;
  }
}

function compareHighCard(sortedHand1: Card[], sortedHand2: Card[]): number {
  return compareCards(sortedHand1, sortedHand2);
}

function compareOnePair(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Trouver la paire et les kickers
  const pair1 = findPair(sortedHand1);
  const pair2 = findPair(sortedHand2);

  if (getCardValue(pair1.rank) > getCardValue(pair2.rank)) return 1;
  if (getCardValue(pair1.rank) < getCardValue(pair2.rank)) return -1;

  // Si les paires sont égales, comparer les kickers
  return compareKickers(sortedHand1, sortedHand2); // Commence après la paire
}

function compareTwoPair(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Trouver les paires et les kickers
  const [pair1a, pair1b] = findTwoPairs(sortedHand1);
  const [pair2a, pair2b] = findTwoPairs(sortedHand2);

  if (getCardValue(pair1a.rank) > getCardValue(pair2a.rank)) return 1;
  if (getCardValue(pair1a.rank) < getCardValue(pair2a.rank)) return -1;

  if (getCardValue(pair1b.rank) > getCardValue(pair2b.rank)) return 1;
  if (getCardValue(pair1b.rank) < getCardValue(pair2b.rank)) return -1;

  // Si les deux paires sont égales, comparer les kickers
  return compareKickers(sortedHand1, sortedHand2); // Commence après les deux paires
}

function compareThreeOfAKind(sortedHand1: Card[], sortedHand2: Card[]): number {
  const threeOfAKind1 = findThreeOfAKind(sortedHand1);
  const threeOfAKind2 = findThreeOfAKind(sortedHand2);

  if (getCardValue(threeOfAKind1.rank) > getCardValue(threeOfAKind2.rank)) return 1;
  if (getCardValue(threeOfAKind1.rank) < getCardValue(threeOfAKind2.rank)) return -1;

  // Comparer les kickers si nécessaire
  return compareKickers(sortedHand1, sortedHand2);
}

function compareStraight(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Un "Straight" est défini par les valeurs des cartes, donc on compare directement
  const value1 = getCardValue(sortedHand1[4].rank); // La carte la plus haute de la suite
  const value2 = getCardValue(sortedHand2[4].rank);

  if (value1 > value2) return 1;
  if (value1 < value2) return -1;

  return 0; // Si les cartes les plus hautes sont égales, c'est une égalité
}

function compareFlush(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Comparer les cartes par ordre de valeur (car elles sont toutes de la même couleur)
  return compareCards(sortedHand1, sortedHand2);
}

function compareFullHouse(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Extraire les valeurs de "Three of a Kind" et "Pair"
  const threeOfAKind1 = findThreeOfAKind(sortedHand1);
  const threeOfAKind2 = findThreeOfAKind(sortedHand2);

  if (getCardValue(threeOfAKind1.rank) > getCardValue(threeOfAKind2.rank)) return 1;
  if (getCardValue(threeOfAKind1.rank) < getCardValue(threeOfAKind2.rank)) return -1;

  // Si les "Three of a Kind" sont égaux, comparer les paires
  const pair1 = findPair(sortedHand1);
  const pair2 = findPair(sortedHand2);

  if (getCardValue(pair1.rank) > getCardValue(pair2.rank)) return 1;
  if (getCardValue(pair1.rank) < getCardValue(pair2.rank)) return -1;

  return 0; // Si tout est égal
}

function compareFourOfAKind(sortedHand1: Card[], sortedHand2: Card[]): number {
  const fourOfAKind1 = findFourOfAKind(sortedHand1);
  const fourOfAKind2 = findFourOfAKind(sortedHand2);

  if (getCardValue(fourOfAKind1.rank) > getCardValue(fourOfAKind2.rank)) return 1;
  if (getCardValue(fourOfAKind1.rank) < getCardValue(fourOfAKind2.rank)) return -1;

  // Si les "Four of a Kind" sont égaux, comparer les kickers
  return compareKickers(sortedHand1, sortedHand2);
}

function compareStraightFlush(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Un "Straight Flush" est une combinaison d'une suite et d'une couleur, donc on peut simplement comparer la valeur des cartes
  const value1 = getCardValue(sortedHand1[4].rank); // La carte la plus haute de la suite
  const value2 = getCardValue(sortedHand2[4].rank);

  if (value1 > value2) return 1;
  if (value1 < value2) return -1;

  return 0; // Si les cartes les plus hautes sont égales
}

function compareRoyalFlush(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Un "Royal Flush" est toujours la même main, donc on n'a qu'à comparer les cartes les plus hautes (elles seront toutes égales)
  return 0; // Si c'est un Royal Flush, c'est égal par définition
}

function compareKickers(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Comparer les kickers (cartes restantes)
  console.log(sortedHand1, sortedHand2);
  sortedHand1 = removeSpecificCombinations(sortedHand1);
  sortedHand2 = removeSpecificCombinations(sortedHand2);
  console.log(sortedHand1, sortedHand2);

  for (let i = 0; i < 5; i++) {
    const value1 = getCardValue(sortedHand1[i].rank);
    const value2 = getCardValue(sortedHand2[i].rank);

    if (value1 > value2) return 1;
    if (value1 < value2) return -1;
  }
  return 0; // Si les kickers sont égaux
}

function compareCards(sortedHand1: Card[], sortedHand2: Card[]): number {
  // Comparer les cartes de la main, carte par carte
  for (let i = 0; i < 5; i++) {
    const value1 = getCardValue(sortedHand1[i].rank);
    const value2 = getCardValue(sortedHand2[i].rank);

    if (value1 > value2) return 1;
    if (value1 < value2) return -1;
  }
  return 0; // Si toutes les cartes sont égales
}

function findPair(sortedHand: Card[]): Card {
  const counts = countCards(sortedHand);
  return sortedHand.find(card => counts[card.rank] === 2)!;
}

function findTwoPairs(sortedHand: Card[]): [Card, Card] {
  const counts = countCards(sortedHand);
  const pairs = sortedHand.filter(card => counts[card.rank] === 2);
  return [pairs[0], pairs[1]];
}

function findThreeOfAKind(sortedHand: Card[]): Card {
  const counts = countCards(sortedHand);
  return sortedHand.find(card => counts[card.rank] === 3)!;
}

function findFourOfAKind(sortedHand: Card[]): Card {
  const counts = countCards(sortedHand);
  return sortedHand.find(card => counts[card.rank] === 4)!;
}

function countCards(hand: Card[]): { [key in Rank]: number } {
  return hand.reduce((acc, card) => {
    acc[card.rank] = (acc[card.rank] || 0) + 1;
    return acc;
  }, {} as { [key in Rank]: number });
}

export function getCardValue(rank: Rank): number {
  const valueMap: { [key in Rank]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
  };

  return valueMap[rank];
}

function sortCardsByValue(hand: Hand): Card[] {
  return hand.cards
    .map(card => ({
      ...card,
      value: getCardValue(card.rank) // Ajouter une valeur numérique pour la comparaison
    }))
    .sort((a, b) => b.value - a.value); // Trier par valeur décroissante
}

function removeSpecificCombinations(cards: Card[]): Card[] {
  const rankCount = new Map<string, number>();

  // Comptage des cartes par rang
  cards.forEach(card => {
    rankCount.set(card.rank, (rankCount.get(card.rank) || 0) + 1);
  });

  // Fonction pour retirer les Paires, Three of a Kind, Four of a Kind
  const removeCardsOfRank = (rank: string): Card[] => {
    return cards.filter(card => card.rank !== rank);
  };

  // Retirer les Paires, Three of a Kind et Four of a Kind
  rankCount.forEach((count, rank) => {
    if (count === 2) { // Pair
      cards = removeCardsOfRank(rank);
    }
    if (count === 3) { // Three of a Kind
      cards = removeCardsOfRank(rank);
    }
    if (count === 4) { // Four of a Kind
      cards = removeCardsOfRank(rank);
    }
  });

  return cards; // Retourner les cartes restantes après suppression
}