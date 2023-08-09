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
      topicIfNo: 'Military records, Current, not active duty',
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
      topicIfYes: 'Your own retired or former military servicemember Records',
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
              'literal:Medical Records',
              summary('m25'),
              'Medical Records',
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
              'literal:National Guard Records',
              summary('m42'),
              'National Guard Records',
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
              'literal:Medical Records',
              summary('m27'),
              'Medical Records',
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
              'literal:National Guard Records',
              summary('m46'),
              'National Guard Records',
            ),
            answer(
              'startOver',
              { type: 'start-over' },
            ),
          ],
        ),
      ),
    }),
    'Retired or Former Military Servicemember Records',
  ),
]);

export default militaryRecordsJourney;
