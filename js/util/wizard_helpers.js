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
 * @param {WizardQuestion | WizardContinue | WizardSummary} next
 * @param {string=} newDisplayedTopic
 * @returns {WizardAnswer}
 */
export function answer(titleMid, next, newDisplayedTopic) {
  return { titleMid, next, newDisplayedTopic };
}

/**
 * @param {string} titleMid
 * @param {object} yesNo
 * @param {WizardQuestion | WizardContinue | WizardSummary} yesNo.yes
 * @param {string=} yesNo.topicIfYes
 * @param {WizardQuestion | WizardContinue | WizardSummary} yesNo.no
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
  return {
    type: 'continue', titleMid, next,
  };
}

/**
 * @param {string | undefined} titleMid
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
