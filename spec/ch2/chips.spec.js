const chips = require("../../js/ch2/chips");

describe("Half-Adder Chip", halfAdderTest());
describe("Full-Adder Chip", fullAdderTest());

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