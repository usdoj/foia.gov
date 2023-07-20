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
      yes: summary('m23', 'My medical records, veteran'),
      no: question(
        'q7',
        [
          answer(
            'literal:Medical records for an active duty or reserve military servicemember',
            summary('m24', 'Medical records for an active duty or reserve military servicemember'),
          ),
          answer(
            'literal:My Medicaid/Medicare participant records',
            summary('m25', 'My Medicaid/Medicare participant records'),
          ),
          answer(
            'literal:My Indian Health Service participant records',
            summary('m26', 'My Indian Health Service participant records'),
          ),
        ],
        'literal:<p>For other information, we suggest you contact your medical provider directly.</p>',
        'My medical records, civilian',
      ),
    }),
    'My medical records',
  ),
  no: continueStep(
    'm2',
    yesNoQuestion('q6', {
      yes: summary('m27', 'Someone else\'s medical records, veteran'),
      no: question(
        'q7',
        [
          answer(
            'literal:Medical records for an active duty or reserve military servicemember',
            summary('m28', 'Medical records for an active duty or reserve military servicemember'),
          ),
          answer(
            'literal:Medicaid/Medicare participant records',
            summary('m29', 'Someone else\'s Medicaid/Medicare participant records'),
          ),
          answer(
            'literal:Indian Health Service participant records',
            summary('m30', 'Someone else\'s Indian Health Service participant records'),
          ),
        ],
        'literal:<p>For other information, we suggest contacting the medical provider directly.</p>',
        'Someone else\'s medical records, civilian',
      ),
    }),
    'Someone else\'s medical records',
  ),
});

export default medicalRecordsJourney;
