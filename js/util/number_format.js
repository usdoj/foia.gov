/**
 * Returns a number in simple currency format
 * @param number
 * @param minDec
 * @param maxDec
 * @returns {*}
 */
function getNumber(number, minDec = 2, maxDec = 2) {
  debugger;
  if (!Number.isInteger(number)) {
    const obj = Intl.NumberFormat('en-US', {
      minimumFractionDigits: minDec,
      maximumFractionDigits: maxDec,
      useGrouping: false,
    });
    return obj.format(number);
  }
  return number;
}

export default {
  getNumber,
};
