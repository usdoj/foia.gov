import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const medicalRecordsJourney = yesNoQuestion('q1', {
  topicIfYes: 'My medical records',
  topicIfNo: 'Someone else\'s medical records',
  yes: continueStep(
    'm1',
    yesNoQuestion('q5', {
      topicIfYes: 'My medical records, veteran',
      topicIfNo: 'My medical records, civilian',
      yes: summary('m23'),
      no: question(
        'q7',
        [
          answer(
            'literal:Medical records for an active duty or reserve military servicemember',
            summary('m24'),
            'Medical records for an active duty or reserve military servicemember',
          ),
          answer(
            'literal:My Medicaid/Medicare participant records',
            summary('m25'),
            'My Medicaid/Medicare participant records',
          ),
          answer(
            'literal:My Indian Health Service participant records',
            summary('m26'),
            'My Indian Health Service participant records',
          ),
          answer(
            'literal:None of the Above (I want to start over)',
            { type: 'start-over' },
          ),
        ],
        'literal:<p>For other information, we suggest you contact your medical provider directly.</p>',
      ),
    }),
  ),
  no: continueStep(
    'm2',
    yesNoQuestion('q6', {
      topicIfYes: 'Someone else\'s medical records, veteran',
      topicIfNo: 'Someone else\'s medical records, civilian',
      yes: summary('m27'),
      no: question(
        'q7',
        [
          answer(
            'literal:Medical records for an active duty or reserve military servicemember',
            summary('m28'),
            'Medical records for an active duty or reserve military servicemember',
          ),
          answer(
            'literal:Medicaid/Medicare participant records',
            summary('m29'),
            'Someone else\'s Medicaid/Medicare participant records',
          ),
          answer(
            'literal:Indian Health Service participant records',
            summary('m30'),
            'Someone else\'s Indian Health Service participant records',
          ),
          answer(
            'literal:None of the Above (I want to start over)',
            { type: 'start-over' },
          ),
        ],
        'literal:<p>For other information, we suggest contacting the medical provider directly.</p>',
      ),
    }),
  ),
});

export default medicalRecordsJourney;
