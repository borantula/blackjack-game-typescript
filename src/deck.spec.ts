import { makeDeck, shuffleDeck, pickCardsFromDeck } from "./deck";
import { uniq, takeLeft } from "fp-ts/lib/Array";
import { eqString } from "fp-ts/lib/Eq";
import { NotEnoughCardsInDeckError } from "./errors";

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

describe("pickCardsFromDeck", () => {
  it("picks default(1) number of cards from top of the deck", () => {
    const deck = shuffleDeck(makeDeck());
    const picked = pickCardsFromDeck(deck);

    expect(deck.cards.length).toEqual(picked.deck.cards.length + 1);

    expect(picked.cards.map(c => c.code)).toEqual(
      takeLeft(1)(deck.cards).map(c => c.code)
    );
  });

  it("picks specified number of cards from top of the deck", () => {
    const deck = shuffleDeck(makeDeck());
    const picked = pickCardsFromDeck(deck, 2);

    expect(deck.cards.length).toEqual(picked.deck.cards.length + 2);

    expect(picked.cards.map(c => c.code)).toEqual(
      takeLeft(2)(deck.cards).map(c => c.code)
    );
  });

  it("throw error when more card is wanted then in the deck", () => {
    const picked = () => pickCardsFromDeck(shuffleDeck(makeDeck()), 62);

    expect(picked).toThrowError(NotEnoughCardsInDeckError);
  });
});
