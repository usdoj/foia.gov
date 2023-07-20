import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';
import extraMessages from './wizard_extra_messages';

/**
 * Create a couple journeys with the same shape
 *
 * @param {"immigration" | "travel"} coreTopic
 * @returns {WizardQuestion}
 */
function createJourney(coreTopic) {
  const topicPrefix = `Your own or someone else's ${coreTopic} records`;

  /** @type {WizardQuestion} */
  const selectTypeQuestion = question(
    'q2',
    [
      answer('a3', summary('m3'), `${topicPrefix}: ${extraMessages.a3}`),
      answer('a4', summary('m4'), `${topicPrefix}: ${extraMessages.a4}`),
      answer('a5', summary('m5'), `${topicPrefix}: ${extraMessages.a5}`),
      answer('a6', summary('m6'), `${topicPrefix}: ${extraMessages.a6}`),
      answer('a7', summary('m7'), `${topicPrefix}: ${extraMessages.a7}`),
      answer('a8', summary('m8'), `${topicPrefix}: ${extraMessages.a8}`),
      answer('a9', summary('m9'), `${topicPrefix}: ${extraMessages.a9}`),
      answer('a10', summary('m10'), `${topicPrefix}: ${extraMessages.a10}`),
      answer('a11', summary('m11'), `${topicPrefix}: ${extraMessages.a11}`),
      answer('a12', summary('m12'), `${topicPrefix}: ${extraMessages.a12}`),
      answer('a13', summary('m13'), `${topicPrefix}: ${extraMessages.a13}`),
      answer('a14-1', summary('m14'), `${topicPrefix}: ${extraMessages['a14-1']}`),
      answer('a14-2', summary('m15'), `${topicPrefix}: ${extraMessages['a14-2']}`),
    ],
  );

  return yesNoQuestion(
    'q1',
    {
      topicIfYes: `Your own ${coreTopic} records`,
      topicIfNo: `Someone else's ${coreTopic} records`,
      yes: continueStep('m1', selectTypeQuestion),
      no: continueStep('m2', selectTypeQuestion),
    },
  );
}

export const immigrationRecordsJourney = createJourney('immigration');
export const travelRecordsJourney = createJourney('travel');
