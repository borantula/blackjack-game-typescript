import { makeDeck, shuffleDeck } from "./deck";

describe("makeDeck", () => {
  const deck = makeDeck();
  it("1 deck has has 52 cards upon first built", () => {
    expect(deck.cards).toHaveLength(52);
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
