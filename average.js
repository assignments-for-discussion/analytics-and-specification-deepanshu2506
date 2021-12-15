function average(numbers) {
  const threshold = Math.floor(Math.sqrt(numbers.length));
  const sanitized = numbers.filter((number) => !isNaN(number));
  const nanSegments = getNaNSegments(numbers, threshold);

  // ratio of missing values
  const missing = (numbers - sanitized) / numbers;

  if (nanSegments.length > 0 || missing >= 0.5) {
    return NaN;
  } else {
    return sanitized.reduce((p, c) => p + c, 0) / sanitized.length;
  }
}

/**
 * returns the lengths of segments that have a
 * length greater than the threshold.
 * @param {Number[]} numbers
 * @param {Number} threshold
 * @return {Number}
 */
function getNaNSegments(numbers, threshold) {
  const nanSegments = [];
  let prev = 0;

  numbers.forEach((number, i) => {
    if (isBlockStart(number, prev)) {
      nanSegments.push([i]);
    } else if (isBlockEnd(number, prev)) {
      const segmentStart = nanSegments.pop()[0];
      const segmentLength = i - segmentStart;
      nanSegments.push(segmentLength);
    }
    prev = number;
  });

  if (Array.isArray(nanSegments[nanSegments.length - 1])) {
    const segmentLength = numbers.length - 1 - nanSegments.pop()[0];
    nanSegments.push(segmentLength);
  }

  return nanSegments.filter((segment) => segment > threshold);
}

function isBlockStart(curr, prev) {
  return isNaN(curr) && !isNaN(prev);
}

function isBlockEnd(curr, prev) {
  return !isNaN(curr) && isNaN(prev);
}

module.exports = {average};
