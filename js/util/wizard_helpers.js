/**
 * @param {string} titleMid
 * @param {WizardAnswer[]} answers
 * @returns {WizardQuestion}
 */
export function question(titleMid, answers) {
  return { type: 'question', titleMid, answers };
}

/**
 * @param {string} titleMid
 * @param {WizardQuestion | WizardContinue | WizardSummary} next
 * @returns {WizardAnswer}
 */
export function answer(titleMid, next) {
  return { titleMid, next };
}

/**
 * @param {string} titleMid
 * @param {object} yesNo
 * @param {WizardQuestion | WizardContinue | WizardSummary} yesNo.yes
 * @param {WizardQuestion | WizardContinue | WizardSummary} yesNo.no
 * @returns {WizardQuestion}
 */
export function yesNoQuestion(titleMid, yesNo) {
  return question(titleMid, [
    answer('a1', yesNo.yes),
    answer('a2', yesNo.no),
  ]);
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
 * @param {string | undefined} titleMid
 * @returns {WizardSummary}
 */
export function summary(titleMid) {
  return { type: 'summary', titleMid };
}
