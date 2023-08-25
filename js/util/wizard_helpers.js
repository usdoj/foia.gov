import { useEffect, useState } from 'react';

/**
 * @param {string} titleMid
 * @param {WizardAnswer[]} answers
 * @param {string=} addendumMid
 * @returns {WizardQuestion}
 */
export function question(titleMid, answers, addendumMid) {
  return {
    type: 'question', titleMid, answers, addendumMid,
  };
}

/**
 * @param {string} titleMid
 * @param {WizardAnswer['next']} next
 * @param {string=} newDisplayedTopic
 * @returns {WizardAnswer}
 */
export function answer(titleMid, next, newDisplayedTopic) {
  return { titleMid, next, newDisplayedTopic };
}

/**
 * @param {string} titleMid
 * @param {object} yesNo
 * @param {WizardAnswer['next']} yesNo.yes
 * @param {string=} yesNo.topicIfYes
 * @param {WizardAnswer['next']} yesNo.no
 * @param {string=} yesNo.topicIfNo
 * @param {string=} addendumMid
 * @returns {WizardQuestion}
 */
export function yesNoQuestion(titleMid, yesNo, addendumMid) {
  return question(titleMid, [
    answer('a1', yesNo.yes, yesNo.topicIfYes),
    answer('a2', yesNo.no, yesNo.topicIfNo),
  ], addendumMid);
}

/**
 * @param {string} titleMid
 * @param {WizardQuestion | WizardContinue | WizardSummary} next
 * @returns {WizardContinue}
 */
export function continueStep(titleMid, next) {
  return { type: 'continue', titleMid, next };
}

/**
 * @param {string=} titleMid
 * @returns {WizardSummary}
 */
export function summary(titleMid) {
  return { type: 'summary', titleMid };
}

/**
 * @returns {URLSearchParams}
 */
export function urlParams() {
  return new URLSearchParams(
    typeof document === 'undefined' ? '' : location.search,
  );
}

/**
 * If an anchor is the only content inside a paragraph, convert the paragraph into
 * component card markup.
 *
 * @param {string} html
 * @returns {string}
 */
export function convertSomeLinksToCards(html) {
  return html.replace(/<p>(.+?)<\/p>/sg, (m0, pInnerHtml) => {
    const [n0, linkOpenTag, linkInnerHtml] = pInnerHtml.trim().match(/^(<a [^>]+>)(.+?)<\/a>$/s) || [];
    if (!n0) {
      // No modification
      return m0;
    }

    function extClass() {
    // If the link goes outside the foia domain, add an extra class name
      return (linkOpenTag.startsWith('<a href="https://www.foia.gov')) ? '' : 'foia-component-card--alt--ext';
    }

    return `
      <div class="foia-component-card foia-component-card--alt ${extClass()}">
        ${linkOpenTag}
          <h2 class="foia-component-card__title">${linkInnerHtml}</h2>
        </a>
      </div>
    `;
  });
}

/**
 * Ensure obj.confidence_score exists. Move from obj.score or set as 0;
 *
 * @param {object} obj
 * @returns {object}
 */
export function normalizeScore(obj) {
  const { score, confidence_score, ...rest } = obj;

  if (typeof confidence_score === 'number') {
    return { confidence_score, ...rest };
  }

  if (typeof score === 'number') {
    return { confidence_score: score, ...rest };
  }

  console.warn('obj missing confidence_score', obj);
  return { confidence_score: 0, ...rest };
}

/**
 * @param {string} query
 * @param {FlatListItem[]} flatList
 * @returns {FlatListItem|null}
 */
export function searchMatchingAgency(query, flatList) {
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
   * @param {boolean} replaceWords
   * @returns {string[]}
   */
  const normalize = (str, replaceWords) => str
    .replace(/\bunited states\b/ig, ' ')
    .replace(/([a-z])['’]s\b/g, '$1s')
    .replace(/(\W|^)U\.S\./g, '$1 ')
    .split(/\W+/)
    .filter((el) => el.trim() !== '')
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
   * @type {Array<{score: number, item: FlatListItem, abbr: string, titleNormalized: string}>}
   */
  const indexItems = flatList.map((item) => ({
    item,
    titleNormalized: joinWithCommas(normalize(item.title, true)),
    abbr: item.abbreviation.toUpperCase(),
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

  // Case-insensitive matches against title words
  for (let i = 0; i < words.length - 1; i++) {
    indexItems.forEach((item) => {
      // Try 2, 3, and 4 length matches, scoring 1 each
      for (let matchLen = 2; matchLen <= 4; matchLen++) {
        const wordsToCheck = words.slice(i, i + matchLen);
        if (wordsToCheck.length < matchLen) {
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
  }

  indexItems.sort((a, b) => b.score - a.score);
  const first = indexItems[0];

  return first && first.score ? first.item : null;
}

export function useWait(waitMs) {
  const [hasWaited, setHasWaited] = useState(false);
  useEffect(() => {
    if (hasWaited) {
      return () => 0;
    }

    const timeout = window.setTimeout(() => {
      setHasWaited(true);
    }, waitMs);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasWaited]);

  function reset() {
    setHasWaited(false);
  }

  return {
    hasWaited,
    reset,
  };
}

/**
 * @param {string} string
 * @returns {string}
 * @licence https://github.com/sindresorhus/escape-string-regexp/blob/main/license
 */
function escapeStringRegexp(string) {
  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d');
}

/**
 * @param {string} query
 * @param {WizardTriggerPhrase[]} phrases
 * @returns {{ idx: number; matchLen: number; trigger: string; skip: string } | null}
 */
export function scanForTriggers(query, phrases) {
  const queryNormalized = query.replace(/\s+/g, ' ');

  for (let i = 0; i < phrases.length; i++) {
    const { trigger, caseSensitive, skip } = phrases[i];
    const pattern = `\\b${escapeStringRegexp(trigger)}\\b`;
    const regex = new RegExp(pattern, caseSensitive ? '' : 'i');
    const match = regex.exec(queryNormalized);
    if (match) {
      return {
        idx: match.index, matchLen: match[0].length, trigger, skip,
      };
    }
  }

  return null;
}
