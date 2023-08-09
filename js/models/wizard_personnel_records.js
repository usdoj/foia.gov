import militaryRecordsJourney from './wizard_military_records';
import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const personnelRecordsJourney = question('q8', [
  answer(
    'literal:Civilian personnel or retirement service history records',
    yesNoQuestion('q1', {
      topicIfYes: 'Your own civilian  personnel or retirement service history record',
      topicIfNo: 'Someone else’s civilian personnel or retirement service history record',
      yes: question('q9', [
        answer('literal:Current', summary('m31'), 'Your own civilian personnel or retirement service history record - current employee'),
        answer('literal:Former', summary('m32'), 'Your own civilian personnel or retirement service history record - former employee'),
      ]),
      no: continueStep('m2', summary('m33')),
    }),
    'Civilian personnel or retirement service history record',
  ),

  answer('literal:Military personnel records', militaryRecordsJourney),

  answer(
    'literal:Background investigation and security clearance records',
    summary('m34'),
    'Background investigation and security clearance records',
  ),

  answer(
    'literal:Federal employment recruiting, examining, and placement records',
    summary('m35'),
    'Federal employment recruiting, examining, and placement records',
  ),

  answer(
    'startOver',
    { type: 'start-over' },
  ),
]);

export default personnelRecordsJourney;
