import extraMessages from './wizard_extra_messages';

/**
 * @type {WizardQuestion}
 */
const irsTypeQuestion = {
  type: 'question',
  titleMid: 'q3',
  answers: [
    {
      titleMid: 'a15',
      next: { type: 'summary', titleMid: 'm16', displayedTopic: extraMessages.a15 },
    },
    {
      titleMid: 'a16',
      next: { type: 'summary', titleMid: 'm17', displayedTopic: extraMessages.a16 },
    },
    {
      titleMid: 'a17',
      next: { type: 'summary', titleMid: 'm18', displayedTopic: extraMessages.a17 },
    },
  ],
  // displayedTopic: 'Your own or someone else\'s IRS records',
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
        displayedTopic: 'Your own IRS records',
      },
    },
    {
      titleMid: 'a2',
      next: {
        type: 'continue',
        titleMid: 'm2',
        next: irsTypeQuestion,
        displayedTopic: 'Someone else\'s IRS records',
      },
    },
  ],
};

export default irsRecordsJourney;
