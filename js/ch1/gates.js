// assumed primitive, starting point of all other gates
function NAND(x, y) {
  return !(x && y);
}

function NOT(x) {
  return NAND(x, x);
}

function AND(x, y) {
  return NOT(NAND(x, y));
}

function OR(x, y) {
  return NAND(NOT(x), NOT(y));
}

function XOR(x, y) {
  return AND(NOT(AND(x, y)), OR(x, y));
}

function MUX(x, y, sel) {
  // todo: get this gate working
  // return OR(NOT(AND(x, sel)), AND(y, sel));
  return Boolean(sel ? y : x);
}

function DMUX(input, sel) {
  // todo: get this gate working
  const [ x, y ] = sel ? [ 0, input ] : [ input, 0];
  return {x, y};
}

// todo: multis

module.exports = {
  NAND, NOT, AND, OR, XOR, MUX, DMUX
};
