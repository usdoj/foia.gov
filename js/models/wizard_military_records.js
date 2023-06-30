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
      yes: summary('m36'),
      no: yesNoQuestion('q1', {
        yes: continueStep('m1', summary('m37')),
        no: continueStep('m2', summary('m38')),
      }),
    }),
  ),
  answer(
    'literal:Former',
    yesNoQuestion('q1', {
      yes: continueStep(
        'm1',
        question(
          'q12',
          [
            answer('literal:OMPF', summary('m39')),
            answer('literal:Medical Records', summary('m25')),
            answer('literal:DD Form 214 (Report of Separation)', summary('m40')),
            answer("literal:Veteran's Benefits", summary('m41')),
            answer('literal:National Guard', summary('m42')),
          ],
          'literal:<p>For other information, we suggest you contact your medical provider directly.</p>',
        ),
      ),
      no: continueStep(
        'm2',
        question(
          'q12',
          [
            answer('literal:OMPF', summary('m43')),
            answer('literal:Medical Records', summary('m27')),
            answer('literal:DD Form 214 (Report of Separation)', summary('m44')),
            answer("literal:Veteran's Benefits", summary('m45')),
            answer('literal:National Guard', summary('m46')),
          ],
          'literal:<p>For other information, we suggest contacting the medical provider directly.</p>',
        ),
      ),
    }),
  ),
]);

export default militaryRecordsJourney;
