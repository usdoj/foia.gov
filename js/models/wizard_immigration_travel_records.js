import {
  answer, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/** @type {WizardQuestion} */
const selectTypeQuestion = question(
  'q2',
  [
    answer('a3', summary('m3')),
    answer('a4', summary('m4')),
    answer('a5', summary('m5')),
    answer('a6', summary('m6')),
    answer('a7', summary('m7')),
    answer('a8', summary('m8')),
    answer('a9', summary('m9')),
    answer('a10', summary('m10')),
    answer('a11', summary('m11')),
    answer('a12', summary('m12')),
    answer('a13', summary('m13')),
    answer('a14-1', summary('m14')),
    answer('a14-2', summary('m15')),
  ],
);

/** @type {WizardQuestion} */
const immigrationOrTravelRecordsJourney = yesNoQuestion(
  'q1',
  {
    yes: selectTypeQuestion,
    no: selectTypeQuestion,
  },
);

export default immigrationOrTravelRecordsJourney;
