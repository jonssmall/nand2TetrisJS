const chips = require("../../js/ch2/chips");

describe("Half-Adder Chip", halfAdderTest());
describe("Full-Adder Chip", fullAdderTest());
describe("16-bit Adder Chip", adder16Test());

function halfAdderTest() {
  const truth = [
    { a: 0, b: 0, carry: 0, sum: 0 },
    { a: 0, b: 1, carry: 0, sum: 1 },
    { a: 1, b: 0, carry: 0, sum: 1 },
    { a: 1, b: 1, carry: 1, sum: 0 }
  ];
  return () => {
    truth.forEach(row => {
      it(`${JSON.stringify(row)}`, () => {
        expect(chips.halfAdder(row.a, row.b)).toEqual({ carry: Boolean(row.carry), sum: Boolean(row.sum) });
      });
    });
  }
}

function fullAdderTest() {
  const truth = [
    { a: 0, b: 0, c: 0, carry: 0, sum: 0 },
    { a: 0, b: 0, c: 1, carry: 0, sum: 1 },
    { a: 0, b: 1, c: 0, carry: 0, sum: 1 },
    { a: 0, b: 1, c: 1, carry: 1, sum: 0 },
    { a: 1, b: 0, c: 0, carry: 0, sum: 1 },
    { a: 1, b: 0, c: 1, carry: 1, sum: 0 },
    { a: 1, b: 1, c: 0, carry: 1, sum: 0 },
    { a: 1, b: 1, c: 1, carry: 1, sum: 1 }
  ];
  return () => {
    truth.forEach(row => {
      it(`${JSON.stringify(row)}`, () => {
        expect(chips.fullAdder(row.a, row.b, row.c)).toEqual({ carry: Boolean(row.carry), sum: Boolean(row.sum) });
      });
    });
  }
}

function adder16Test() {
  return () => {
    it("Must have a 16 bit bus for each input", () => {
      expect(function() { chips.adder16([1,0,0], [0,0,0]) }).toThrowError("Both input buses must be 16 bits")
    });
    it("Returns binary as a string", () => {
      const inA = "0000000000000000";
      const inB = "0000000000000001";
      expect(chips.adder16(inA, inB)).toBe("0000000000000001");
      const inA2 = "1111111111111111";      
      expect(chips.adder16(inA2, inB)).toBe("0000000000000000");
      const inA3 = "1000101010111001";
      const inB3 = "0001110101011111";
      const res3 = "1010100000011000";
      expect(chips.adder16(inA3, inB3)).toBe(res3);
    });
  }
}