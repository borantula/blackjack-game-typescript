import { Hand, Deck } from "./types";

/**
 * Blackjack class should cover
 */
export default class Blackjack {
  currentHand = 0;
  //   playerHands: Hand[];
  //   dealerHand: Hand;
  deck: Deck;

  constructor(deck: Deck) {
    this.deck = deck;
  }
}
