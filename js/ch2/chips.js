const gates = require("../ch1/gates");

// half-adder, full-adder, add16, inc16, ALU

function halfAdder(a, b) {
  return {
    sum: gates.XOR(a,b),
    carry: gates.AND(a,b)
  };
}

function fullAdder(a, b, c) {
  const half1 = halfAdder(a,b);
  const half2 = halfAdder(c, half1.sum);
  return {
    sum: half2.sum,
    carry: gates.OR(half1.carry, half2.carry)
  };
};

// n-bit adder, used for 16 bits
// assumes each input bus is same length
// returns binary number in left-to-right, index is nth bit
function adderN(arrA, arrB) {
  const first = fullAdder(arrA[0], arrB[0], 0);
  return arrA.slice(1).reduce((acc, e, i, a) => {
    return [...acc, fullAdder(arrA[i+1], arrB[i+1], acc[i].carry)];
  }, [first]); 
}

// non-array input
function ezAdder(inA, inB) {
  return adderN(binaryToArray(inA), binaryToArray(inB));
}

// in: "11010", out: [0,1,0,1,1]
function binaryToArray(binaryString) {
  return Array.from(binaryString).map(Number).reverse();
}

// receives and returns 16-bit binary in human-readable form e.g. 001 + 101 = 110
function adder16(inA, inB) {
  if(inA.length === 16 && inB.length === 16) {
    return ezAdder(inA, inB).reduce((acc, e) => { // e = {sum: false, carry:false}
      return [...acc, e.sum ? 1 : 0];
    }, []).reverse().join("");
  } else {
    throw new Error("Both input buses must be 16 bits");
  }
}

function inc16(inA) {
  return adder16(inA, "0000000000000001");
}

/*
  inputs:
    16 bit x
    16 bit y
    zx: if 1 set x to 00000...
    nx: if 1 negate x e.g. 010 -> 101
    zy, ny: same for y
    f: if 0 -> y AND x; if 1 -> y + x
    no: if 1 negate output
  outputs: 
    out: 16 bit result
    zr: 1 if out 0
    ng: 1 if out negative
*/
function ALU(inX, inY, zx, nx, zy, ny, f, no) {
  const x1 = gates.multiBitMUX(inX.map(i => ({x: i, y: 0})), zx);
  const x2 = nx ? gates.multiBitNOT(x1) : x1;
  // console.log('x2', x2);

  // multiBitMUX expects uniform input [{x: ..., y: ...}, ...], required to map y as x here.
  const y1 = gates.multiBitMUX(inY.map(i => ({x: i, y: 0})), zy);
  const y2 = ny ? gates.multiBitNOT(y1) : y1;
  // console.log('y2', y2);

  const combined = f ? adderN(x2, y2).map(e => e.sum) : gates.multiBitAND(x2.map((e, i) => ({x: e, y: y2[i]})));
  const out = no ? gates.multiBitNOT(combined) : combined;
  return {
    out,
    zr: out.every(e => !e), // true if all elements false
    ng: out[out.length - 1] // last element true if negative
  };
}

module.exports = {
  halfAdder, fullAdder, adder16, inc16, ALU
};
