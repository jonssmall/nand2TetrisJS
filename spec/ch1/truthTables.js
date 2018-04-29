const NAND = [
  {x: 0, y: 0, out: 1},
  {x: 1, y: 0, out: 1},
  {x: 0, y: 1, out: 1},
  {x: 1, y: 1, out: 0}
];

const NOT = [
  {x: 0, out: 1},
  {x: 1, out: 0}
];

const AND = [
  {x: 0, y: 0, out: 0},
  {x: 1, y: 0, out: 0},
  {x: 0, y: 1, out: 0},
  {x: 1, y: 1, out: 1}
];

const OR = [
  {x: 0, y: 0, out: 0},
  {x: 1, y: 0, out: 1},
  {x: 0, y: 1, out: 1},
  {x: 1, y: 1, out: 1}
];

const XOR = [
  {x: 0, y: 0, out: 0},
  {x: 1, y: 0, out: 1},
  {x: 0, y: 1, out: 1},
  {x: 1, y: 1, out: 0}
];

const MUX = [
  {x: 0, y: 0, sel: 0, out: 0},
  {x: 0, y: 1, sel: 0, out: 0},
  {x: 1, y: 0, sel: 0, out: 1},
  {x: 1, y: 1, sel: 0, out: 1},
  {x: 0, y: 0, sel: 1, out: 0},
  {x: 0, y: 1, sel: 1, out: 1},
  {x: 1, y: 0, sel: 1, out: 0},
  {x: 1, y: 1, sel: 1, out: 1}
];

const DMUX = [
  {input: 0, sel: 0, x: 0, y: 0},
  {input: 1, sel: 0, x: 1, y: 0},
  {input: 0, sel: 1, x: 0, y: 0},
  {input: 1, sel: 1, x: 0, y: 1}
];

const fourWayMUX = [
  {sel1: 0, sel0: 0, out: "a"},
  {sel1: 0, sel0: 1, out: "b"},
  {sel1: 1, sel0: 0, out: "c"},
  {sel1: 1, sel0: 1, out: "d"}
];

const eightWayMUX = [
  {sel2: 0, sel1: 0, sel0: 0, out: "a"},
  {sel2: 0, sel1: 0, sel0: 1, out: "b"},
  {sel2: 0, sel1: 1, sel0: 0, out: "c"},
  {sel2: 0, sel1: 1, sel0: 1, out: "d"},
  {sel2: 1, sel1: 0, sel0: 0, out: "e"},
  {sel2: 1, sel1: 0, sel0: 1, out: "f"},
  {sel2: 1, sel1: 1, sel0: 0, out: "g"},
  {sel2: 1, sel1: 1, sel0: 1, out: "h"}
];

const fourWayDMUX = [
  {sel1: 0, sel0: 0, a: "in", b: 0, c: 0, d: 0},
  {sel1: 0, sel0: 1, a: 0, b: "in", c: 0, d: 0},
  {sel1: 1, sel0: 0, a: 0, b: 0, c: "in", d: 0},
  {sel1: 1, sel0: 1, a: 0, b: 0, c: 0, d: "in"}
];

// const eightWayDMUX = [
//   {sel1: 0, sel0: 0, a: "in", b: 0, c: 0, d: 0},
//   {sel1: 0, sel0: 1, a: 0, b: "in", c: 0, d: 0},
//   {sel1: 1, sel0: 0, a: 0, b: 0, c: "in", d: 0},
//   {sel1: 1, sel0: 1, a: 0, b: 0, c: 0, d: "in"}
// ];

module.exports = {
  NAND, NOT, AND, OR, XOR, MUX, DMUX, fourWayMUX, eightWayMUX
};