import extraMessages from './wizard_extra_messages';

/**
 * @type {WizardQuestion}
 */
const socsecRecordsJourney = {
  type: 'question',
  titleMid: 'q1',
  answers: [
    {
      titleMid: 'a1',
      newDisplayedTopic: 'Your own Social Security records',
      next: {
        type: 'continue',
        titleMid: 'm1',
        next: {
          type: 'question',
          titleMid: 'q4',
          answers: [
            {
              titleMid: 'a20',
              newDisplayedTopic: `Your own ${extraMessages.a20}`,
              next: { type: 'summary', titleMid: 'm47' },
            },
            {
              titleMid: 'a21',
              next: { type: 'summary', titleMid: 'm19' },

            },
          ],
        },
      },
    },
    {
      titleMid: 'a2',
      newDisplayedTopic: 'Someone else\'s Social Security records',
      next: {
        type: 'continue',
        titleMid: 'm2',
        next: {
          type: 'question',
          titleMid: 'q4',
          answers: [
            {
              titleMid: 'a18',
              newDisplayedTopic: extraMessages.a18,
              next: { type: 'summary', titleMid: 'm20' },
            },
            {
              titleMid: 'a19',
              newDisplayedTopic: extraMessages.a19,
              next: { type: 'summary', titleMid: 'm21' },
            },
            {
              titleMid: 'a20',
              newDisplayedTopic: `Someone else's ${extraMessages.a20}`,
              next: { type: 'summary', titleMid: 'm22' },
            },
            {
              titleMid: 'literal:All other social security records',
              newDisplayedTopic: 'All other social security records',
              next: { type: 'summary', titleMid: 'm48' },
            },
          ],
        },
      },
    },
  ],
};

export default socsecRecordsJourney;
