/**
 * @type {WizardQuestion}
 */
const irsTypeQuestion = {
  type: 'question',
  titleMid: 'q3',
  answers: [
    {
      titleMid: 'a15',
      next: { type: 'summary', titleMid: 'm16' },
    },
    {
      titleMid: 'a16',
      next: { type: 'summary', titleMid: 'm17' },
    },
    {
      titleMid: 'a17',
      next: { type: 'summary', titleMid: 'm18' },
    },
  ],
};

/** @type {WizardQuestion} */
const irsRecordsJourney = {
  type: 'question',
  titleMid: 'q1',
  answers: [
    {
      titleMid: 'a1',
      next: {
        type: 'continue',
        titleMid: 'm1',
        next: irsTypeQuestion,
      },
    },
    {
      titleMid: 'a2',
      next: {
        type: 'continue',
        titleMid: 'm2',
        next: irsTypeQuestion,
      },
    },
  ],
};

export default irsRecordsJourney;
