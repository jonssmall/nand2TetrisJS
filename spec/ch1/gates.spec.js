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
describe("Multi-Bit MUX gates", multiBitMuxTest());
describe("Multi-Way OR gates", multiWayOrTest());
describe("Four-Way MUX gates", fourWayMuxTest());
describe("Eight-Way MUX gates", eightWayMuxTest());
describe("Four-Way DMUX gates", fourWayDmuxTest());
describe("Eight-Way DMUX gates", eightWayDmuxTest());

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

function multiBitMuxTest() {
  return () => {
    it("Applies MUX to a bus of inputs", () => {
      const inputArray = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}];
      let sel = 0;
      expect(gates.multiBitMUX(inputArray, sel)).toEqual([false, true, false]);
      sel = 1;
      expect(gates.multiBitMUX(inputArray, sel)).toEqual([false, false, true]);
    });
  }
}

function multiWayOrTest() {
  return () => {
    it("Returns true when at least one input in bus is true", () => {
      expect(gates.multiWayOR([0,0,0,1])).toBe(true);
    });
    it("Returns false when no input in bus is true", () => {
      expect(gates.multiWayOR([0,0,0,0])).toBe(false);
    });
  }
}

function fourWayMuxTest() {
  return () => {
    const inA = [0,0,0,1];
    const inB = [0,0,1,0];
    const inC = [0,1,0,0];
    const inD = [1,0,0,0];

    // todo: can be turned into table forEach
    it("sel[1] 0, sel[0] 0 -> a", () => {
      expect(gates.FourWayMUX(inA, inB, inC, inD, 0, 0)).toEqual(inA.map(i => Boolean(i)));
    });
    it("sel[1] 0, sel[0] 1 -> b", () => {
      expect(gates.FourWayMUX(inA, inB, inC, inD, 0, 1)).toEqual(inB.map(i => Boolean(i)));
    });
    it("sel[1] 1, sel[0] 0 -> c", () => {
      expect(gates.FourWayMUX(inA, inB, inC, inD, 1, 0)).toEqual(inC.map(i => Boolean(i)));
    });
    it("sel[1] 1, sel[0] 1 -> d", () => {
      expect(gates.FourWayMUX(inA, inB, inC, inD, 1, 1)).toEqual(inD.map(i => Boolean(i)));
    });
  }
}

function eightWayMuxTest() {
  return () => {
    const ins = {
      a: [0,0,0],
      b: [0,0,1],
      c: [0,1,0],
      d: [0,1,1],
      e: [1,0,0],
      f: [1,0,1],
      g: [1,1,0],
      h: [1,1,1]
    };    
    tables.eightWayMUX.forEach(row => { // {sel2: 0, sel1: 0, sel0: 0, out: "a"},      
      it(`sel[2] ${row.sel2} sel[1] ${row.sel1} sel[0] ${row.sel0} -> ${row.out}`, () => {      
        expect(gates.EightWayMUX(ins.a, ins.b, ins.c, ins.d, ins.e, ins.f, ins.g, ins.h, row.sel2, row.sel1, row.sel0))
              .toEqual(ins[row.out].map(i => Boolean(i)));
      });
    });
  }
}

function fourWayDmuxTest() {
  const truth = [
    [0,0,"a"],
    [0,1,"b"],
    [1,0,"c"],
    [1,1,"d"]
  ];
  return () => {
    truth.forEach(row => {
      // input of 1, one true 3 falses
      it(`in 1, sel[1] ${row[0]} sel[0] ${row[1]} -> ${row[2]}`, () => {
        const outSkeleton = {a: false, b: false, c: false, d: false};
        outSkeleton[row[2]] = true;
        expect(gates.FourWayDMUX(1, row[0], row[1])).toEqual(outSkeleton);
      });
      // input of 0, will be false across
      it(`in 0, sel[1] ${row[0]} sel[0] ${row[1]} -> ${row[2]}`, () => {
        const outSkeleton = {a: false, b: false, c: false, d: false};
        expect(gates.FourWayDMUX(0, row[0], row[1])).toEqual(outSkeleton);
      });
    })
  }
}

function eightWayDmuxTest() {
  const truth = [
    [0,0,0,"a"],
    [0,0,1,"b"],
    [0,1,0,"c"],
    [0,1,1,"d"],
    [1,0,0,"e"],
    [1,0,1,"f"],
    [1,1,0,"g"],
    [1,1,1,"h"]
  ];
  return () => {
    truth.forEach(row => {
      // input of 1, one true 7 falses
      it(`in 1, sel[2] ${row[0]} sel[1] ${row[1]} sel[0] ${row[2]} -> ${row[3]}`, () => {
        const outSkeleton = {a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false};
        outSkeleton[row[3]] = true;
        expect(gates.EightWayDMUX(1, row[0], row[1], row[2])).toEqual(outSkeleton);
      });
      // input of 0, will be false across
      it(`in 0, sel[2] ${row[0]} sel[1] ${row[1]} sel[0] ${row[2]} -> ${row[3]}`, () => {        
        const outSkeleton = {a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false};
        expect(gates.EightWayDMUX(0, row[0], row[1], row[2])).toEqual(outSkeleton);
      });
    })
  }
}