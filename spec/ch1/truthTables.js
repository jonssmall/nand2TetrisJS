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

module.exports = {
  NAND, NOT, AND, OR, XOR, MUX, DMUX
};