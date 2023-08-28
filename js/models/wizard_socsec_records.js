import extraMessages from './wizard_extra_messages';
import {
  answer, continueStep, question, summary, yesNoQuestion,
} from '../util/wizard_helpers';

/**
 * @type {WizardQuestion}
 */
const socsecRecordsJourney = yesNoQuestion('q1', {
  topicIfYes: 'Your own Social Security records',
  topicIfNo: 'Someone else\'s Social Security records',
  yes: continueStep(
    'm1',
    question(
      'q4',
      [
        answer('a20', summary('m47'), `Your ${extraMessages.a20.toLowerCase()}`),
        answer('a21', summary('m19')),
        answer('startOver', { type: 'start-over' }),
      ],
    ),
  ),
  no: continueStep(
    'm2',
    question(
      'q4',
      [
        answer(
          'a18',
          summary('m20'),
          extraMessages.a18,
        ),
        answer(
          'a19',
          summary('m21'),
          extraMessages.a19,
        ),
        answer(
          'a20',
          summary('m22'),
          `Someone else's ${extraMessages.a20.toLowerCase()}`,
        ),
        answer(
          'literal:All other social security records',
          summary('m48'),
          'All other social security records',
        ),
        answer('startOver', { type: 'start-over' }),
      ],
    ),
  ),
});

export default socsecRecordsJourney;
