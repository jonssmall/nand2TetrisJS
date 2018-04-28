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
  return OR(AND(x, NOT(sel)), AND(y, sel));
}

function DMUX(input, sel) {
  return {
    x: AND(input, NOT(sel)),
    y: AND(input, sel)
  };
}

// todo: multis

module.exports = {
  NAND, NOT, AND, OR, XOR, MUX, DMUX
};
