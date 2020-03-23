import { Hand, Card } from "./types";
import { pipe } from "fp-ts/lib/pipeable";
import { Rank, PICTURE_CARD_VALUE } from "./constants";
import { isPicturedCard } from "./card";
import { reduce } from "fp-ts/lib/Array";
// import { Either, left, right } from "fp-ts/lib/Either";

export const makeHand = (cards: Card[]): Hand => ({ cards });

export const addCardsToHand = (cards: Card[], hand: Hand) => {
  return pipe(cards, cards => cards.concat(hand.cards), makeHand);
};

export const getScore = (hand: Hand) => {
  const score = pipe(hand.cards, calcuateCardScores);

  const totalScore = pipe(hand, findAces, reduce(score, addAceScores));

  return totalScore;
};

const calcuateCardScores = (cards: Card[]) =>
  cards.reduce((total, card) => {
    const cardScore = isPicturedCard(card)
      ? PICTURE_CARD_VALUE
      : Number(card.rank);
    return cardScore + total;
  }, 0);

const addAceScores = (score: number) => (score + 10 > 21 ? score : score + 10);

const findAces = (hand: Hand) => {
  return hand.cards.filter(card => card.rank === Rank.Ace);
  // return aces ? right(aces) : left([]);
};
