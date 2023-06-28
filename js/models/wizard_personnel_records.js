import militaryRecordsJourney from './wizard_military_records';
import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const personnelRecordsJourney = question('q8', [
  answer('literal:Civilian', yesNoQuestion('q1', {
    yes: question('q9', [
      answer('literal:Current', summary('m31')),
      answer('literal:Former', summary('m32')),
    ]),
    no: continueStep('m2', summary('m33')),
  })),
  answer('literal:Military', militaryRecordsJourney),
  answer('literal:Background investigations', summary('m34')),
  answer('literal:Federal Employment', summary('m35')),
]);

export default personnelRecordsJourney;
