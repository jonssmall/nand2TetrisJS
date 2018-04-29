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

function multiBitNOT(inputArray) {
 return inputArray.map(i => NOT(i));
}

function multiBitAND(inputArray) { // [{x:0, y:0}, {x:1, y:0}, ...]
  return inputArray.map(i => AND(i.x, i.y));
}

function multiBitOR(inputArray) {
  return inputArray.map(i => OR(i.x, i.y));
}

function multiBitMUX(inputArray, sel) {
  return inputArray.map(i => MUX(i.x, i.y, sel));
}

function multiWayOR(inputArray) {
  //todo: do as gates, revisit data structure & test
  return inputArray.some(i => i);
}

function multiWayMUX() {
  
}

function multiWayDMUX() {
  
}

module.exports = {
  NAND, NOT, AND, OR, XOR, MUX, DMUX, multiBitNOT, multiBitAND, multiWayOR
};
