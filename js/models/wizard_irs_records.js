import extraMessages from './wizard_extra_messages';
import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const irsTypeQuestion = question('q1', [
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
    'literal:None of the Above (I want to start over)',
    { type: 'start-over' },
  ),
]);

/** @type {WizardQuestion} */
const irsRecordsJourney = yesNoQuestion('q1', {
  topicIfYes: 'Your own Internal Revenue Service (IRS) records',
  topicIfNo: 'Someone else’s Internal Revenue Service (IRS) records',
  yes: continueStep('m1', irsTypeQuestion),
  no: continueStep('m2', irsTypeQuestion),
});

export default irsRecordsJourney;
