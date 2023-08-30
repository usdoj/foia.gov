/**
 * @param {string} query
 * @param {FlatListItem[]} flatList
 * @returns {FlatListItem|null}
 */
function searchMatchingAgency(query, flatList) {
  // Remove words search engines often disregard
  const stopWords = ('a able about across after all almost also am among an and any are as at'
    + ' be because been but by can cannot could dear did do does either else ever every for from get'
    + ' got had has have he her hers him his how however i if in into is it its just least let like'
    + ' likely may me might most must my neither no nor not of off often on only or other our own'
    + ' rather said say says she should since so some than that the their them then there these they'
    + ' this tis to too twas us wants was we were what when where which while who whom why will with'
    + ' would yet you your').split(' ');

  const replacementMap = {
    administration: 'admin',
    assistant: 'asst',
    attorneys: 'attorney',
    corporation: 'corp',
    defence: 'defense',
    department: 'dept',
    disability: 'disabled',
    environmental: 'environment',
    executive: 'exec',
    forces: 'force',
    government: 'govt',
    institute: 'inst',
    intelligence: 'intel',
    liberties: 'liberty',
    management: 'mgmt',
    national: 'natl',
    operations: 'ops',
    policing: 'police',
    services: 'svcs',
    technology: 'tech',
  };

  /**
   * @param {string} str
   * @returns {string}
   */
  const removeLinksFromMission = (str) => str.replace(/<p><a [^>]+>[\s\S]+?<\/a><\/p>/, '');

  /**
   * @param {string} str
   * @param {boolean} replaceWords
   * @returns {string[]}
   */
  const normalize = (str, replaceWords) => str
    // Remove tags.
    .replace(/(<([^>]+)>)/ig, '')
    // I don't recall why this was done.
    .replace(/\bunited states\b/ig, ' ')
    // U.S. to US
    .replace(/(\W|^)U\.S\./g, '$1 ')
    // Remove commas from large numbers.
    .replace(/,(\d\d\d\s)/g, '$1')
    .replace(/,(\d\d\d),(\d\d\d\s)/g, '$1$2')
    // "501(c)(3)" -> [501c3]
    .replace(/\b501\s?\(c\)\s?\(3\)/ig, '501c3')
    // "501 c.3" -> [501c3]
    .replace(/\b501\s?c\.?\s?3/ig, '501c3')
    .split(/\W+/)
    .filter((el) => el.trim() !== '')
    // "agency's mission" -> [Foo,mission]
    // "Harry S Truman" -> [Harry,Truman] (this is acceptable for matching)
    .filter((el) => el !== 's')
    .filter((el) => {
      if (el === el.toUpperCase()) {
        // All caps, so even if this is a stop word, don't treat it as such because
        // it might match an agency abbreviation.
        return true;
      }

      // Mixed or lowercase words, don't allow stop words
      return !stopWords.includes(el.toLowerCase());
    })
    .map((el) => (replaceWords ? (replacementMap[el.toLowerCase()] || el) : el));

  /**
   * @param {string[]} words
   * @returns {string}
   */
  const joinWithCommas = (words) => `,${words.map((el) => el.toLowerCase()).join()},`;

  /**
   * @type {Array<{
   *   score: number;
   *   item: FlatListItem;
   *   abbr: string;
   *   titleNormalized: string;
   *   missionNormalized: string;
   *   }>}
   */
  const indexItems = flatList.map((item) => ({
    item,
    titleNormalized: joinWithCommas(normalize(item.title, true)),
    // missionNormalized: joinWithCommas(normalize(item))
    abbr: item.abbreviation.toUpperCase(),
    missionNormalized: joinWithCommas(
      normalize(removeLinksFromMission(item.description.processed || ''), true),
    ),
    score: 0,
  }));

  // Score matching abbreviations by how long they are. We're generally giving a
  // bigger score because the user had to give us uppercase.
  normalize(query, false)
    .forEach((word) => {
      indexItems.forEach((item) => {
        if (word === item.abbr.toUpperCase()) {
          item.score += word.length;
        }
      });
    });

  const words = normalize(query, true);

  for (let i = 0; i < words.length; i++) {
    // Case-insensitive matches against title words
    indexItems.forEach((item) => {
      // Try 2, 3, and 4 length matches, scoring 1 each
      for (let matchLen = 2; matchLen <= 4; matchLen++) {
        const wordsToCheck = words.slice(i, i + matchLen);
        if (wordsToCheck.length < matchLen) {
          // There weren't enough words after words[i] to match this length.
          return;
        }

        const needle = joinWithCommas(wordsToCheck);
        if (item.titleNormalized.includes(needle)) {
          item.score += 1;
        } else {
          return;
        }
      }
    });

    // Case-insensitive matches against mission words
    indexItems.forEach((item) => {
      // Try 3, 4, and 5 length matches, scoring 1 each
      for (let matchLen = 3; matchLen <= 5; matchLen++) {
        const wordsToCheck = words.slice(i, i + matchLen);
        if (wordsToCheck.length < matchLen) {
          // There weren't enough words after words[i] to match this length.
          return;
        }

        const needle = joinWithCommas(wordsToCheck);
        if (item.missionNormalized.includes(needle)) {
          item.score += 1;
        } else {
          return;
        }
      }
    });
  }

  indexItems.sort((a, b) => b.score - a.score);
  const first = indexItems[0];

  return first && first.score ? first.item : null;
}

export default searchMatchingAgency;
