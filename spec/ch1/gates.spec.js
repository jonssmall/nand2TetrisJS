const gates = require('../../js/ch1/gates');
const tables = require('./truthTables');

describe("NAND gates", binaryTest(gates.NAND, tables.NAND));
describe("NOT gates", unaryTest(gates.NOT, tables.NOT));
describe("AND gates", binaryTest(gates.AND, tables.AND));
describe("OR gates", binaryTest(gates.OR, tables.OR));
describe("XOR gates", binaryTest(gates.XOR, tables.XOR));

// wrapper for truth tables with 2 inputs and 1 output: AND, OR, XOR, NAND
function binaryTest(gateFunc, table) {
  return function() {
    table.forEach(row => {
      const {x, y, out} = row;
      it(`${x}, ${y} -> ${out}`, function() {
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