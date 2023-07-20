import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';
import extraMessages from './wizard_extra_messages';

const substring = 'Your own or someone else\'s immigration records';
/** @type {WizardQuestion} */
const selectTypeQuestion = question(
  'q2',
  [
    answer('a3', summary('m3', `${substring}: ${extraMessages.a3}`)),
    answer('a4', summary('m4', `${substring}: ${extraMessages.a4}`)),
    answer('a5', summary('m5', `${substring}: ${extraMessages.a5}`)),
    answer('a6', summary('m6', `${substring}: ${extraMessages.a6}`)),
    answer('a7', summary('m7', `${substring}: ${extraMessages.a7}`)),
    answer('a8', summary('m8', `${substring}: ${extraMessages.a8}`)),
    answer('a9', summary('m9', `${substring}: ${extraMessages.a9}`)),
    answer('a10', summary('m10', `${substring}: ${extraMessages.a10}`)),
    answer('a11', summary('m11', `${substring}: ${extraMessages.a11}`)),
    answer('a12', summary('m12', `${substring}: ${extraMessages.a12}`)),
    answer('a13', summary('m13', `${substring}: ${extraMessages.a13}`)),
    answer('a14-1', summary('m14', `${substring}: ${extraMessages['a14-1']}`)),
    answer('a14-2', summary('m15', `${substring}: ${extraMessages['a14-2']}`)),
  ],
);

/** @type {WizardQuestion} */
const immigrationOrTravelRecordsJourney = yesNoQuestion(
  'q1',
  {
    yes: continueStep('m1', selectTypeQuestion, 'Your own immigration records'),
    no: continueStep('m2', selectTypeQuestion, 'Someone else\'s immigration records'),
  },
);

export default immigrationOrTravelRecordsJourney;
