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
              titleMid: 'a18-1',
              next: { type: 'summary', titleMid: 'm20' },
            },
            {
              titleMid: 'a18-2',
              next: { type: 'summary', titleMid: 'm21' },
            },
            {
              titleMid: 'a18-3',
              next: { type: 'summary', titleMid: 'm22' },
            },
          ],
        },
      },
    },
  ],
};

export default socsecRecordsJourney;
