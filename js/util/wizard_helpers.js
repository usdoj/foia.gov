/**
 * @param {string} titleMid
 * @param {WizardAnswer[]} answers
 * @param {string=} addendumMid
 * @param {string=} displayedTopic
 * @returns {WizardQuestion}
 */
export function question(titleMid, answers, addendumMid, displayedTopic) {
  return {
    type: 'question', titleMid, answers, addendumMid, displayedTopic,
  };
}

/**
 * @param {string} titleMid
 * @param {WizardQuestion | WizardContinue | WizardSummary} next
 * @param {string=} displayedTopic
 * @returns {WizardAnswer}
 */
export function answer(titleMid, next, displayedTopic) {
  return { titleMid, next, displayedTopic };
}

/**
 * @param {string} titleMid
 * @param {object} yesNo
 * @param {WizardQuestion | WizardContinue | WizardSummary} yesNo.yes
 * @param {WizardQuestion | WizardContinue | WizardSummary} yesNo.no
 * @param {string=} addendumMid
 * @param {string=} displayedTopic
 * @returns {WizardQuestion}
 */
export function yesNoQuestion(titleMid, yesNo, addendumMid, displayedTopic) {
  return question(titleMid, [
    answer('a1', yesNo.yes, displayedTopic),
    answer('a2', yesNo.no, displayedTopic),
  ], addendumMid, displayedTopic);
}

/**
 * @param {string} titleMid
 * @param {WizardQuestion | WizardContinue | WizardSummary} next
 * @param {string=} displayedTopic
 * @returns {WizardContinue}
 */
export function continueStep(titleMid, next, displayedTopic) {
  return {
    type: 'continue', titleMid, next, displayedTopic,
  };
}

/**
 * @param {string | undefined} titleMid
 * @param {string=} displayedTopic
 * @returns {WizardSummary}
 */
export function summary(titleMid, displayedTopic) {
  return { type: 'summary', titleMid, displayedTopic };
}

/**
 * @returns {URLSearchParams}
 */
export function urlParams() {
  return new URLSearchParams(
    typeof document === 'undefined' ? '' : location.search,
  );
}
