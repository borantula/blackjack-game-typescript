import { Deck } from "./types";
import { rankNames, suits } from "./constants";
import { comprehension, map, copy } from "fp-ts/lib/Array";
import { tuple } from "fp-ts/lib/function";
import { makeCard } from "./card";
import { pipe } from "fp-ts/lib/pipeable";

export function makeDeck(): Deck {
  const cards = pipe(comprehension([rankNames, suits], tuple), map(makeCard));

  return {
    cards,
    count: cards.length
  };
}

/**
 * Using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method
 * https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
 * @param deck
 */
export function shuffleDeck(deck: Deck): Deck {
  let newDeck = { ...deck, cards: copy(deck.cards) };
  for (let i = newDeck.cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = newDeck.cards[i];
    newDeck.cards[i] = newDeck.cards[j];
    newDeck.cards[j] = temp;
  }
  return newDeck;
}
