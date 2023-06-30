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
      no: question(
        'q7',
        [
          answer(
            'literal:Medical records for an active duty or reserve military servicemember',
            summary('m24'),
          ),
          answer(
            'literal:My Medicaid/Medicare participant records',
            summary('m25'),
          ),
          answer(
            'literal:My Indian Health Service participant records',
            summary('m26'),
          ),
        ],
        'literal:<p>For other information, we suggest you contact your medical provider directly.</p>',
      ),
    }),
  ),
  no: continueStep(
    'm2',
    yesNoQuestion('q6', {
      yes: summary('m27'),
      no: question(
        'q7',
        [
          answer(
            'literal:Medical records for an active duty or reserve military servicemember',
            summary('m28'),
          ),
          answer(
            'literal:Medicaid/Medicare participant records',
            summary('m29'),
          ),
          answer(
            'literal:Indian Health Service participant records',
            summary('m30'),
          ),
        ],
        'literal:<p>For other information, we suggest contacting the medical provider directly.</p>',
      ),
    }),
  ),
});

export default medicalRecordsJourney;
