import { makeDeck, shuffleDeck } from "./deck";
import { uniq } from "fp-ts/lib/Array";
import { eqString } from "fp-ts/lib/Eq";

describe("makeDeck", () => {
  const deck = makeDeck();
  it("1 deck has has 52 cards upon first built", () => {
    expect(deck.cards).toHaveLength(52);
  });

  it("Cards should be unique", () => {
    expect(uniq(eqString)(deck.cards.map(c => c.code))).toHaveLength(52);
  });
});

describe("shuffleDeck", () => {
  it("1 deck has has 52 cards upon first built", () => {
    const deck = makeDeck();
    const shuffledDeck = shuffleDeck(deck);
    expect(deck.cards.length).toEqual(shuffledDeck.cards.length);
    expect(deck.cards).not.toEqual(shuffledDeck.cards);
  });
});
