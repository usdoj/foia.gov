
function getCurrentDate(separator = '') {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
}

export default {
  getCurrentDate,
};
