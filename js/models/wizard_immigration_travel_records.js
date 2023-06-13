/** @type {WizardQuestion} */
const selectTypeQuestion = {
  type: 'question',
  titleMid: 'q2',
  answers: [
    {
      titleMid: 'a3',
      next: { type: 'summary', titleMid: 'm3' },
    },
    {
      titleMid: 'a4',
      next: { type: 'summary', titleMid: 'm4' },
    },
    {
      titleMid: 'a5',
      next: { type: 'summary', titleMid: 'm5' },
    },
    {
      titleMid: 'a6',
      next: { type: 'summary', titleMid: 'm6' },
    },
    {
      titleMid: 'a7',
      next: { type: 'summary', titleMid: 'm7' },
    },
    {
      titleMid: 'a8',
      next: { type: 'summary', titleMid: 'm8' },
    },
    {
      titleMid: 'a9',
      next: { type: 'summary', titleMid: 'm9' },
    },
    {
      titleMid: 'a10',
      next: { type: 'summary', titleMid: 'm10' },
    },
    {
      titleMid: 'a11',
      next: { type: 'summary', titleMid: 'm11' },
    },
    {
      titleMid: 'a12',
      next: { type: 'summary', titleMid: 'm12' },
    },
    {
      titleMid: 'a13',
      next: { type: 'summary', titleMid: 'm13' },
    },
    {
      titleMid: 'a14-1',
      next: { type: 'summary', titleMid: 'm14' },
    },
    {
      titleMid: 'a14-2',
      next: { type: 'summary', titleMid: 'm15' },
    },
  ],
};

/** @type {WizardQuestion} */
const immigrationOrTravelRecordsJourney = {
  type: 'question',
  titleMid: 'q1',
  answers: [
    {
      titleMid: 'a1',
      next: selectTypeQuestion,
    },
    {
      titleMid: 'a2',
      next: selectTypeQuestion,
    },
  ],
};

export default immigrationOrTravelRecordsJourney;
