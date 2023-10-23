import extraMessages from './wizard_extra_messages';
import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const taxTypeQuestion = question('q1', [
  answer(
    'a15',
    summary('m16'),
    extraMessages.a15,
  ),
  answer(
    'a16',
    summary('m17'),
    extraMessages.a16,
  ),
  answer(
    'a17',
    summary('m18'),
    extraMessages.a17,
  ),
  answer(
    'startOver',
    { type: 'start-over' },
  ),
]);

/** @type {WizardQuestion} */
const taxRecordsJourney = yesNoQuestion('q1', {
  topicIfYes: 'Your own tax records',
  topicIfNo: 'Someone else’s tax records',
  yes: continueStep('m1', taxTypeQuestion),
  no: continueStep('m2', taxTypeQuestion),
});

export default taxRecordsJourney;
