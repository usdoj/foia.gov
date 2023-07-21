import militaryRecordsJourney from './wizard_military_records';
import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const personnelRecordsJourney = question('q8', [
  answer(
    'literal:Civilian',
    yesNoQuestion('q1', {
      topicIfYes: 'Personnel records, Civilian, your own',
      topicIfNo: 'Personnel records, Civilian, someone else\'s',
      yes: question('q9', [
        answer('literal:Current', summary('m31'), 'Your own Civilian Personnel Records, Current Employee'),
        answer('literal:Former', summary('m32'), 'Your own Civilian Personnel Records, Former Employee'),
      ]),
      no: continueStep('m2', summary('m33')),
    }),
    'Personnel Records, Civilian',
  ),

  answer('literal:Military', militaryRecordsJourney),

  answer('literal:Background investigations', summary('m34'), 'Background investigations'),

  answer('literal:Federal Employment', summary('m35'), 'Federal Employment'),
]);

export default personnelRecordsJourney;
