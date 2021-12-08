
function average(numbers) {
  const sanitized =  numbers.filter(c => !isNaN(c));
  return sanitized.reduce((p, c)=> p + c, 0) / sanitized.length;
}

module.exports = {average};
