import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const militaryRecordsJourney = question('q10', [
  answer(
    'literal:Current',
    yesNoQuestion('q11', {
      topicIfYes: 'Military records, Current, active duty status',
      topicIfNo: 'Military records, Current, not active duty',
      yes: summary('m36'),
      no: yesNoQuestion('q1', {
        topicIfYes: 'Military records, Current, your own',
        topicIfNo: 'Military records, Current, someone else\'s',
        yes: continueStep('m1', summary('m37')),
        no: continueStep('m2', summary('m38')),
      }),
    }),
    'Military records, Current',
  ),
  answer(
    'literal:Former',
    yesNoQuestion('q1', {
      topicIfYes: 'Military records, former, your own',
      topicIfNo: 'Military records, former, someone else\'s',
      yes: continueStep(
        'm1',
        question(
          'q12',
          [
            answer('literal:OMPF', summary('m39'), 'Your own former military records: OMPF'),
            answer('literal:Medical Records', summary('m25'), 'Your own former military records: Medical Records'),
            answer('literal:DD Form 214 (Report of Separation)', summary('m40'), 'Your own former military records: DD Form 214 (Report of Separation)'),
            answer("literal:Veteran's Benefits", summary('m41'), 'Your own former military records: Veteran\'s Benefits'),
            answer('literal:National Guard', summary('m42'), 'Your own former military records: National Guard'),
          ],
          'literal:<p>For other information, we suggest you contact your medical provider directly.</p>',
        ),
      ),
      no: continueStep(
        'm2',
        question(
          'q12',
          [
            answer('literal:OMPF', summary('m43'), 'Someone else\'s former military records: OMPF'),
            answer('literal:Medical Records', summary('m27'), 'Someone else\'s former military records: Medical Records'),
            answer('literal:DD Form 214 (Report of Separation)', summary('m44'), 'Someone else\'s former military records: DD Form 214 (Report of Separation)'),
            answer("literal:Veteran's Benefits", summary('m45'), 'Someone else\'s former military records: Veteran\'s Benefits'),
            answer('literal:National Guard', summary('m46'), 'Someone else\'s former military records: National Guard'),
          ],
          'literal:<p>For other information, we suggest contacting the medical provider directly.</p>',
        ),
      ),
    }),
    'Military records, Former',
  ),
]);

export default militaryRecordsJourney;
