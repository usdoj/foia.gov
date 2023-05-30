/**
 * Do not use directly. Use getQuestion().
 *
 * @type {WizardQuestion[]}
 */
const medicalRecordsQuestions = [
  {
    qid: 'q1',
    title: 'Are you looking for your own medical records or someone else\'s medical records?',
    answers: [
      {
        title: 'My own', nextQid: 'q2', showMid: 'm1', showContinue: true,
      },
      {
        title: 'Someone else\'s', nextQid: 'q4', showMid: 'm2', showContinue: true,
      },
    ],
  },
  {
    qid: 'q2',
    title: 'Are you a veteran?',
    answers: [
      {
        title: 'Yes', nextQid: null, showMid: 'm3', showContinue: true,
      },
      {
        title: 'No', nextQid: 'q3', showMid: null, showContinue: null,
      },
    ],
  },
  {
    qid: 'q3',
    title: 'Are you active duty or reserve military?',
    answers: [
      {
        title: 'Yes', nextQid: null, showMid: 'm4', showContinue: null,
      },
      {
        title: 'No', nextQid: null, showMid: 'm5', showContinue: null,
      },
    ],
  },
  {
    qid: 'q4',
    title: 'Are you seeking a veteran\'s medical records?',
    answers: [
      {
        title: 'Yes', nextQid: null, showMid: 'm6', showContinue: null,
      },
      {
        title: 'No', nextQid: 'q5', showMid: null, showContinue: null,
      },
    ],
  },
  {
    qid: 'q5',
    title: 'Are you seeking records of an active duty or reserve military service member?',
    answers: [
      {
        title: 'Yes', nextQid: null, showMid: 'm7', showContinue: null,
      },
      {
        title: 'No', nextQid: null, showMid: 'm8', showContinue: null,
      },
    ],
  },
];

export default medicalRecordsQuestions;
