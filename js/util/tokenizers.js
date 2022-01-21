function firstLetterOfEachCapitalizedWord(text = '') {
  const letters = text.match(/\b[A-Z]/g);
  return letters ? [letters.join('')] : [];
}

export default {
  firstLetterOfEachCapitalizedWord,
};
