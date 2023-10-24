import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const medicalRecordsJourney = yesNoQuestion('q1', {
  topicIfYes: 'Your own medical records',
  topicIfNo: 'Someone else’s medical records',
  yes: continueStep(
    'm1',
    yesNoQuestion('q5', {
      topicIfYes: 'Your own VA records',
      topicIfNo: 'Your own medical records',
      yes: summary('m23'),
      no: question(
        'q7',
        [
          answer(
            'literal:Active duty or reserve medical records',
            summary('m24'),
            'Your own active duty or reserve medical records',
          ),
          answer(
            'literal:My Medicaid/Medicare participant records',
            summary('m25'),
            'Your own Medicaid/Medicare participant records',
          ),
          answer(
            'literal:My Indian Health Service participant records',
            summary('m26'),
            'Your own Indian Health Service participant records',
          ),
          answer(
            'literal:Other medical records',
            summary('m50'),
            'All other medical records',
          ),
          answer(
            'startOver',
            { type: 'start-over' },
          ),
        ],
      ),
    }),
  ),
  no: continueStep(
    'm2',
    yesNoQuestion('q6', {
      topicIfYes: 'Someone else’s VA Medical records',
      topicIfNo: 'Someone else’s medical records',
      yes: summary('m27'),
      no: question(
        'q7',
        [
          answer(
            'literal:Active duty or reserve military servicemember medical records',
            summary('m28'),
            'Active duty or reserve military servicemember medical records',
          ),
          answer(
            'literal:Medicaid/Medicare participant records',
            summary('m29'),
            'Medicaid/Medicare participant records',
          ),
          answer(
            'literal:Indian Health Service participant records',
            summary('m30'),
            'Indian Health Service participant records',
          ),
          answer(
            'literal:Other medical records',
            summary('m51'),
            'All other medical records',
          ),
          answer(
            'literal:None of the Above (I want to start over)',
            { type: 'start-over' },
          ),
        ],
      ),
    }),
  ),
});

export default medicalRecordsJourney;
