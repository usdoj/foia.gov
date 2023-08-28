import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const militaryRecordsJourney = question('q10', [
  answer(
    'a22',
    yesNoQuestion('q11', {
      topicIfYes: 'Active duty status of a military servicemember',
      topicIfNo: 'Current active duty or reserve military service member records',
      yes: summary('m36'),
      no: yesNoQuestion('q1', {
        topicIfYes: 'Your own current active duty or reserve military servicemember records',
        topicIfNo: 'Someone else’s current active duty or reserve military servicemember records',
        yes: continueStep('m1', summary('m37')),
        no: continueStep('m2', summary('m38')),
      }),
    }),
    'Current active duty or reserve military servicemember records',
  ),
  answer(
    'a23',
    yesNoQuestion('q1', {
      topicIfYes: 'Your own retired or former military servicemember records',
      topicIfNo: 'Someone else’s retired or former military servicemember records',
      yes: continueStep(
        'm1',
        question(
          'q12',
          [
            answer(
              'literal:Official Military Personnel File (OMPF)',
              summary('m39'),
              'Official Military Personnel File (OMPF)',
            ),
            answer(
              'literal:Medical records',
              summary('m25'),
              'Medical records',
            ),
            answer(
              'literal:DD Form 214 (Report of Separation)',
              summary('m40'),
              'DD Form 214 (Report of Separation)',
            ),
            answer(
              "literal:Veteran's Benefits",
              summary('m41'),
              'Veteran’s Benefits',
            ),
            answer(
              'literal:National Guard records',
              summary('m42'),
              'National Guard records',
            ),
            answer(
              'startOver',
              { type: 'start-over' },
            ),
          ],
        ),
      ),
      no: continueStep(
        'm2',
        question(
          'q12',
          [
            answer(
              'literal:Official Military Personnel File (OMPF)',
              summary('m43'),
              'Official Military Personnel File (OMPF)',
            ),
            answer(
              'literal:Medical records',
              summary('m27'),
              'Medical records',
            ),
            answer(
              'literal:DD Form 214 (Report of Separation)',
              summary('m44'),
              'DD Form 214 (Report of Separation)',
            ),
            answer(
              "literal:Veteran's Benefits",
              summary('m45'),
              'Veteran’s Benefits',
            ),
            answer(
              'literal:National Guard records',
              summary('m46'),
              'National Guard records',
            ),
            answer(
              'startOver',
              { type: 'start-over' },
            ),
          ],
        ),
      ),
    }),
    'Retired or former military servicemember records',
  ),
]);

export default militaryRecordsJourney;
