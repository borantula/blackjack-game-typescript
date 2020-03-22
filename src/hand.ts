import { Hand, Card } from "./types";
import { pipe } from "fp-ts/lib/pipeable";
import { Rank, PICTURE_CARD_VALUE } from "./constants";
import { isPicturedCard } from "./card";

export const makeHand = (cards: Card[]): Hand => ({ cards });

export const addCardsToHand = (cards: Card[], hand: Hand) => {
  return pipe(cards, cards => cards.concat(hand.cards), makeHand);
};

// TODO: how can we refactor
export const getScore = (hand: Hand) => {
  let score = hand.cards.reduce((total, card) => {
    const cardScore = isPicturedCard(card)
      ? PICTURE_CARD_VALUE
      : Number(card.rank);
    return cardScore + total;
  }, 0);

  const aces = findAces(hand);
  if (aces) {
    for (let index = 0; index < aces.length; index++) {
      // adding diff between ace values 1 and 11 if it's not making score higher than 21
      if (score + 10 > 21) {
        break;
      }
      score += 10;
    }
  }

  return score;
};

export const findAces = (hand: Hand) =>
  hand.cards.filter(card => card.rank === Rank.Ace);
