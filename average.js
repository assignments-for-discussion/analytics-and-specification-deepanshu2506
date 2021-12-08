
function average(numbers) {
  return numbers.filter(c => !!c).reduce((p, c)=> p + c, 0) / numbers.length;
}

module.exports = {average};
