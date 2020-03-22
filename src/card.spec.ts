import { makeCard } from "./card";
import { Rank, Suit } from "./constants";

describe("makeCard", () => {
  it("Card code created correctly from numbered cards", () => {
    expect(makeCard([Rank.Ace, Suit.Clubs]).code).toBe("1C");
    expect(makeCard([Rank.Two, Suit.Hearts]).code).toBe("2H");
    expect(makeCard([Rank.Ten, Suit.Hearts]).code).toBe("10H");
  });

  it("Card code created correctly from picture cards", () => {
    expect(makeCard([Rank.Queen, Suit.Clubs]).code).toBe("QC");
    expect(makeCard([Rank.Jack, Suit.Hearts]).code).toBe("JH");
    expect(makeCard([Rank.King, Suit.Diamonds]).code).toBe("KD");
  });
});
