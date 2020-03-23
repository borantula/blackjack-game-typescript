import { Rank, cardCodes, Suit } from "./constants";

export type CardCode = typeof cardCodes[number];

export type CardTuple = [Rank, Suit];

export type Deck = {
  id: string;
  cards: Card[];
};

export type Card = {
  rank: Rank;
  suit: Suit;
  code: CardCode;
};

export type Hand = {
  cards: Card[];
};
