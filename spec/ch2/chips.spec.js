const chips = require("../../js/ch2/chips");

describe("Half-Adder Chip", halfAdderTest());
describe("Full-Adder Chip", fullAdderTest());
describe("16-bit Adder Chip", adder16Test());
describe("ALU Chip", ALUtest());

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

function ALUtest() {
  const truth = [
    {zx: 1, nx: 0, zy: 1, ny: 0, f: 1, no: 0, fn: (x,y) => 0, out: '0'},
    {zx: 1, nx: 1, zy: 1, ny: 1, f: 1, no: 1, fn: (x,y) => 1, out: '1'},
    {zx: 1, nx: 1, zy: 1, ny: 0, f: 1, no: 0, fn: (x,y) => -1, out: '-1'},
    {zx: 0, nx: 0, zy: 1, ny: 1, f: 0, no: 0, fn: (x,y) => x, out: 'x'},
    {zx: 1, nx: 1, zy: 0, ny: 0, f: 0, no: 0, fn: (x,y) => y, out: 'y'},
    {zx: 0, nx: 0, zy: 1, ny: 1, f: 0, no: 1, fn: (x,y) => ~x, out: 'NOT x'},
    {zx: 1, nx: 1, zy: 0, ny: 0, f: 0, no: 1, fn: (x,y) => ~y, out: 'NOT y'},
    {zx: 0, nx: 0, zy: 1, ny: 1, f: 1, no: 1, fn: (x,y) => -x, out: '-x'},
    {zx: 1, nx: 1, zy: 0, ny: 0, f: 1, no: 1, fn: (x,y) => -y, out: '-y'},
    {zx: 0, nx: 1, zy: 1, ny: 1, f: 1, no: 1, fn: (x,y) => ++x, out: 'x + 1'},
    {zx: 1, nx: 1, zy: 0, ny: 1, f: 1, no: 1, fn: (x,y) => ++y, out: 'y + 1'},
    {zx: 0, nx: 0, zy: 1, ny: 1, f: 1, no: 0, fn: (x,y) => --x, out: 'x - 1'},
    {zx: 1, nx: 1, zy: 0, ny: 0, f: 1, no: 0, fn: (x,y) => --y, out: 'y - 1'},
    {zx: 0, nx: 0, zy: 0, ny: 0, f: 1, no: 0, fn: (x,y) => x + y, out: 'x + y'},
    {zx: 0, nx: 1, zy: 0, ny: 0, f: 1, no: 1, fn: (x,y) => x - y, out: 'x - y'},
    {zx: 0, nx: 0, zy: 0, ny: 1, f: 1, no: 1, fn: (x,y) => y - x, out: 'y - x'},
    {zx: 0, nx: 0, zy: 0, ny: 0, f: 0, no: 0, fn: (x,y) => x & y, out: 'x AND y'},
    {zx: 0, nx: 1, zy: 0, ny: 1, f: 0, no: 1, fn: (x,y) => x | y, out: 'x OR y'}
  ];
  return () => {
    const x = [0,0,1,0] // 4
    const y = [1,1,1,0] // 7

    truth.forEach(row => {
      it(`${row.out}`, () => {
        const output = chips.ALU(x, y, row.zx, row.nx, row.zy, row.ny, row.f, row.no);        
        expect(arr2Bin(output.out)).toBe(row.fn(4, 7));
      });
    });
  }
}

// in: [false, true, false, true, true]
// out: 11010
function arrayToBinaryString(arr) {
  return arr.reverse().reduce((acc, e) => {
    return acc + (e ? '1' : '0');
  }, '');
}

// in: 11010
// out: 26
function binaryStringToInteger(str) {
  return parseInt(str, 2);
}

function arr2Bin(arr) {
  return binaryStringToInteger(arrayToBinaryString(arr));
}