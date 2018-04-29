const gates = require("../ch1/gates");

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

module.exports = {
  halfAdder, fullAdder
};
