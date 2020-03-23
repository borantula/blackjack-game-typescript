import { comprehension, map, splitAt } from "fp-ts/lib/Array";
import { tuple } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import randomString from "crypto-random-string";

import { Deck, Card } from "./types";
import { rankNames, suits } from "./constants";
import { makeCard } from "./card";
import { NotEnoughCardsInDeckError } from "./errors";

export function makeDeck(): Deck {
  const cards = pipe(comprehension([rankNames, suits], tuple), map(makeCard));

  return {
    id: randomString({ length: 10, type: "url-safe" }),
    cards
  };
}

/**
 * Using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method
 * https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
 * @param deck
 */
export function shuffleDeck(deck: Deck): Deck {
  let newDeck = { ...deck, cards: [...deck.cards] };
  for (let i = newDeck.cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = newDeck.cards[i];
    newDeck.cards[i] = newDeck.cards[j];
    newDeck.cards[j] = temp;
  }
  return newDeck;
}

export function pickCardsFromDeck(
  deck: Deck,
  count = 1
): { cards: Card[]; deck: Deck } {
  if (count > deck.cards.length) {
    throw new NotEnoughCardsInDeckError("NOT_ENOUGH_CARDS_IN_DECK");
  }
  const split = splitAt(count)(deck.cards);
  return {
    cards: split[0],
    deck: { ...deck, cards: split[1] }
  };
}
