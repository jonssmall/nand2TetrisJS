const gates = require("../ch1/gates");

function halfAdder(a, b) {
  return {
    sum: gates.XOR(a,b),
    carry: gates.AND(a,b)
  };
}

module.exports = {
  halfAdder
};
