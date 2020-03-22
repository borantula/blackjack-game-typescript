import { Card, CardCode, CardTuple } from "./types";
import { picturedCards } from "./constants";
import { pipe } from "fp-ts/lib/pipeable";

export const makeCard = ([rank, suit]: CardTuple): Card => ({
  rank,
  suit,
  code: pipe(
    rank,
    n => (picturedCards.includes(n) ? n[0] : n),
    firstLetter => `${firstLetter}${suit[0]}`
  ) as CardCode
});

export const isPicturedCard = (card: Card) => picturedCards.includes(card.rank);
