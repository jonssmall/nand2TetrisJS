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

module.exports = {
  halfAdder, fullAdder, adder16
};
