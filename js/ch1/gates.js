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

function multiBitOR(inputArray) { // [{x:0, y:0}, {x:1, y:0}, ...]
  return inputArray.map(i => OR(i.x, i.y));
}

function multiBitMUX(inputArray, sel) { // [{x:0, y:0}, {x:1, y:0}, ...]
  return inputArray.map(i => MUX(i.x, i.y, sel));
}

function multiWayOR(inputArray) {
  //todo: do as gates, revisit data structure & test
  return inputArray.some(i => i);
}

// input is 4 multi-bit arrays and 2 selectors, 
//    must be converted into object notation for inner MUX calls
// todo: is the inconsistent input structure acceptable between here and MUX?
function FourWayMUX(inA, inB, inC, inD, sel1, sel0) {
  const objAB = objConverter(inA, inB);
  const objCD = objConverter(inC, inD);
  const aOrB = multiBitMUX(objAB, sel0);
  const cOrD = multiBitMUX(objCD, sel0);
  return multiBitMUX(objConverter(aOrB, cOrD), sel1);
}

function EightWayMUX(inA, inB, inC, inD, inE, inF, inG, inH, sel2, sel1, sel0) {
  return multiBitMUX(objConverter(FourWayMUX(inA, inB, inC, inD, sel1, sel0), FourWayMUX(inE, inF, inG, inH, sel1, sel0)), sel2);
}

function FourWayDMUX() {
  
}

function EightWayDMUX() {
  
}

function objConverter(arr1, arr2) {
  return arr1.map((e, i) => {
    return {x: e, y: arr2[i]};
  });
}

module.exports = {
  NAND, NOT, AND, OR, XOR, MUX, DMUX, multiBitNOT, 
  multiBitAND, multiBitMUX, multiWayOR, FourWayMUX,
  EightWayMUX, FourWayDMUX, EightWayDMUX
};
