import { makeDeck } from "./deck";

describe("makeDeck", () => {
  const deck = makeDeck();
  it("1 deck has has 52 cards upon first built", () => {
    expect(deck.cards).toHaveLength(52);
  });
});
