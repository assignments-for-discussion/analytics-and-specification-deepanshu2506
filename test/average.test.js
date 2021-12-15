const {expect} = require('chai');
const {average} = require('../average');

it('computes average of a list of numbers', () => {
  // floating point numbers cannot be compared for equality,
  // hence allowing a delta tolerance
  expect(average([1, 2, 3, 4])).to.be.approximately(2.5, 0.01);
});

it('reports the average as NaN on an empty list', () => {
  expect(average([])).to.be.NaN;
});

it('ignores NaN in the input', () => {
  expect(average([1, NaN, 2])).to.be.approximately(1.5, 0.01);
});


it('return NaN as output if there is more than 50% missing values', () => {
  expect(average([NaN, NaN, 2])).to.be.NaN;
});

it('return NaN if there is a long sequence of NaN values', () => {
  expect(average([1, NaN, NaN, NaN, 3, 2])).to.be.NaN;
});

it('return average if less than 50% NaN and no long sequences of NaN', () => {
  expect(average([1, NaN, NaN, 3, 2, NaN, 1, 1, 1, 1]))
      .to.be.approximately(1.4, 0.03);
});
