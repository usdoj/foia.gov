import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';
import extraMessages from './wizard_extra_messages';

/** @type {WizardQuestion} */
const selectTypeQuestion = question(
  'q2',
  [
    answer('a3', summary('m3'), extraMessages.a3),
    answer('a4', summary('m4'), extraMessages.a4),
    answer('a5', summary('m5'), extraMessages.a5),
    answer('a6', summary('m6'), extraMessages.a6),
    answer('a7', summary('m7'), extraMessages.a7),
    answer('a8', summary('m8'), extraMessages.a8),
    answer('a9', summary('m9'), extraMessages.a9),
    answer('a10', summary('m10'), extraMessages.a10),
    answer('a11', summary('m11'), extraMessages.a11),
    answer('a12', summary('m12'), extraMessages.a12),
    answer('a13', summary('m13'), extraMessages.a13),
    answer('a14-1', summary('m14'), extraMessages['a14-1']),
    answer('a14-2', summary('m15'), extraMessages['a14-2']),
    answer(
      'startOver',
      { type: 'start-over' },
    ),
  ],
);

const immigrationOrTravelRecordsJourney = yesNoQuestion(
  'q1',
  {
    topicIfYes: 'Your own immigration or travel records',
    topicIfNo: 'Someone else\'s immigration or travel records',
    yes: continueStep('m1', selectTypeQuestion),
    no: continueStep('m2', selectTypeQuestion),
  },
);

export default immigrationOrTravelRecordsJourney;
