import { makeHand, addCardsToHand, getScore } from "./hand";
import { makeDeck } from "./deck";
import { takeLeft } from "fp-ts/lib/Array";
import { makeCard } from "./card";
import { Rank, Suit } from "./constants";

describe("makeHand", () => {
  it("hand has the cards passed", () => {
    const deck = makeDeck();
    const handCards = takeLeft(4)(deck.cards);
    const hand = makeHand(handCards);
    expect(hand.cards).toHaveLength(4);
    expect(hand.cards).toEqual(handCards);
  });
});

describe("addCardsToHand", () => {
  it("hand has the cards passed", () => {
    const deck = makeDeck();
    const handCards = takeLeft(4)(deck.cards);
    const cardsToAdd = takeLeft(2)(deck.cards);
    const hand = addCardsToHand(cardsToAdd, makeHand(handCards));

    expect(handCards).toHaveLength(4);
    expect(cardsToAdd).toHaveLength(2);
    expect(hand.cards).toHaveLength(6);
  });
});

describe("getScore", () => {
  it("Calculate score of a regular hand", () => {
    const cards = [
      makeCard([Rank.Five, Suit.Hearts]),
      makeCard([Rank.Seven, Suit.Hearts])
    ];

    expect(getScore(makeHand(cards))).toBe(12);
  });

  it("Calculate score of a pictured cards in hand", () => {
    const cards = [
      makeCard([Rank.Queen, Suit.Hearts]),
      makeCard([Rank.Seven, Suit.Diamonds])
    ];

    expect(getScore(makeHand(cards))).toBe(17);
  });

  it("Calculate hand with ace <= 21", () => {
    const cards = [
      makeCard([Rank.Ace, Suit.Hearts]),
      makeCard([Rank.Seven, Suit.Diamonds])
    ];

    expect(getScore(makeHand(cards))).toBe(18);
  });

  it("Calculate hand with ace > 21", () => {
    const cards = [
      makeCard([Rank.Ten, Suit.Hearts]),
      makeCard([Rank.Ace, Suit.Hearts]),
      makeCard([Rank.Seven, Suit.Diamonds])
    ];

    expect(getScore(makeHand(cards))).toBe(18);
  });

  it("Calculate hand with multiple aces > 21", () => {
    const cards = [
      makeCard([Rank.Ten, Suit.Hearts]),
      makeCard([Rank.Ace, Suit.Hearts]),
      makeCard([Rank.Ace, Suit.Diamonds]),
      makeCard([Rank.Ace, Suit.Diamonds])
    ];

    expect(getScore(makeHand(cards))).toBe(13);
  });
});
