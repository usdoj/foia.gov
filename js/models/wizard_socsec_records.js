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
      next: {
        type: 'continue',
        titleMid: 'm1',
        next: {
          type: 'summary',
          titleMid: 'm19',
        },
        displayedTopic: 'My Social Security records',
      },
    },
    {
      titleMid: 'a2',
      next: {
        type: 'continue',
        titleMid: 'm2',
        next: {
          type: 'question',
          titleMid: 'q4',
          answers: [
            {
              titleMid: 'a18',
              next: { type: 'summary', titleMid: 'm20', displayedTopic: extraMessages.a18 },
            },
            {
              titleMid: 'a19',
              next: { type: 'summary', titleMid: 'm21', displayedTopic: extraMessages.a19 },
            },
            {
              titleMid: 'a20',
              next: { type: 'summary', titleMid: 'm22', displayedTopic: `Someone else's ${extraMessages.a20}` },
            },
          ],
        },
        displayedTopic: 'Someone else\'s Social Security records',
      },
    },
  ],
};

export default socsecRecordsJourney;
