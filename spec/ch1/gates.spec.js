const gates = require('../../js/ch1/gates');
const tables = require('./truthTables');

describe("NAND gates", binaryTest(gates.NAND, tables.NAND));
describe("NOT gates", unaryTest(gates.NOT, tables.NOT));
describe("AND gates", binaryTest(gates.AND, tables.AND));
describe("OR gates", binaryTest(gates.OR, tables.OR));
describe("XOR gates", binaryTest(gates.XOR, tables.XOR));
describe("MUX gates", muxTest());
describe("DMUX gates", demuxTest());
describe("Multi-Bit NOT gates", multiBitNotTest());
describe("Multi-Bit AND gates", multiBitAndTest());

// wrapper for truth tables with 2 inputs and 1 output: AND, OR, XOR, NAND
function binaryTest(gateFunc, table) {
  return () => {
    table.forEach(row => {
      const {x, y, out} = row;
      it(`${x}, ${y} -> ${out}`, () => {
        expect(gateFunc(x, y)).toBe(Boolean(out));
      });
    });    
  }
}

// 1 input, 1 output: NOT
function unaryTest(gateFunc, table) {
  return () => {
    table.forEach(row => {
      const {x, y, out} = row;
      it(`${x} -> ${out}`, () => {
        expect(gateFunc(x)).toBe(Boolean(out));
      });
    });
  }
}

// single-purpose MUX wrapper. Can this be generalized?
function muxTest() {
  return () => {
    tables.MUX.forEach(row => {
      const {x, y, sel, out} = row;
      it(`${x}, ${y}, ${sel} -> ${out}`, () => {
        expect(gates.MUX(x, y, sel)).toBe(Boolean(out));
      });
    });
  }
}

function demuxTest() {
  return () => {
    tables.DMUX.forEach(row => {
      const {input, sel, x, y} = row;
      it(`${input}, ${sel} -> ${x}, ${y}`, () => {
        const output = gates.DMUX(input, sel);
        expect(output.x).toBe(Boolean(x));
        expect(output.y).toBe(Boolean(y));
      });
    });    
  }
}

function multiBitNotTest() {
  return () => {
    it("Applies NOT to a bus of inputs", () => {
      const inputArray = [1,0,0,1,1,0,1];
      const outputArray = gates.multiBitNOT(inputArray);
      expect(inputArray.length).toBe(outputArray.length);
      inputArray.forEach(i => {
        expect(Boolean(inputArray[i])).toBe(!(outputArray[i]));
      });
    });
  }
}

function multiBitAndTest() {
  return () => {
    it("Applies AND to a bus of inputs", () => {
      expect(gates.multiBitAND(tables.AND)).toEqual(tables.AND.map(r => Boolean(r.out)));
    });
  }
}