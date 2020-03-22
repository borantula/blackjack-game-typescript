import { Rank, cardCodes, Suit } from "./constants";

export type CardCode = typeof cardCodes[number];

export type CardTuple = [Rank, Suit];

export type Deck = {
  cards: Card[];
  count: number;
};

export type Card = {
  rank: Rank;
  suit: Suit;
  code: CardCode;
};
