import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const medicalRecordsJourney = yesNoQuestion('q1', {
  yes: continueStep(
    'm1',
    yesNoQuestion('q5', {
      yes: summary('m23'),
      no: question('q7', [
        answer(
          'literal:Medical records for an active duty or reserve military servicemember',
          summary('m24'),
        ),
        answer(
          'literal:Medicaid/Medicare',
          summary('m25'),
        ),
        answer(
          'literal:Indian Health Services',
          summary('m26'),
        ),
      ]),
    }),
  ),
  no: continueStep(
    'm2',
    yesNoQuestion('q6', {
      yes: summary('m27'),
      no: question('q7', [
        answer(
          'literal:Medical records for an active duty or reserve military servicemember',
          summary('m28'),
        ),
        answer(
          'literal:Medicaid/Medicare',
          summary('m29'),
        ),
        answer(
          'literal:Indian Health Services',
          summary('m30'),
        ),
      ]),
    }),
  ),
});

export default medicalRecordsJourney;
