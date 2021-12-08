
function average(numbers) {
  return numbers.reduce((p, c)=> c ? p + c : p, 0) / numbers.length;
}

module.exports = {average};
