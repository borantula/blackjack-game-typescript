import { Deck, CardTuple } from "./types";
import { Suit, Rank, rankNames } from "./constants";
import { comprehension, map } from "fp-ts/lib/Array";
import { tuple } from "fp-ts/lib/function";
import { makeCard } from "./card";
import { pipe } from "fp-ts/lib/pipeable";

export const makeDeck = (): Deck => {
  // TODO: could this be better?
  const pairs: CardTuple[] = comprehension<Rank, Suit, CardTuple>(
    [rankNames, Object.keys(Suit) as Suit[]],
    tuple
  );

  const cards = pipe(pairs, map(makeCard));

  return {
    cards,
    count: cards.length
  };
};
