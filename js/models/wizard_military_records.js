/**
 * Do not use directly. Use getQuestion().
 *
 * @type {WizardQuestion[]}
 */
const militaryRecordsQuestions = [
  {
    qid: 'q6',
    title: 'Are you seeking records regarding a current or former military service member?',
    answers: [
      {
        title: '<strong>Current:</strong> Active Duty or Reserve Military Servicemember Records', nextQid: 'q7', showMid: null, showContinue: null,
      },
      {
        title: '<strong>Former:</strong> Retired or Former Military Servicemember Records', nextQid: null, showMid: null, showContinue: null,
      },
    ],
  },
  {
    qid: 'q7',
    title: 'Are you seeking to verify the active duty status of a military service member?',
    answers: [
      {
        title: 'Yes', nextQid: null, showMid: 'm9', showContinue: null,
      },
      {
        title: 'No', nextQid: 'q8', showMid: null, showContinue: null,
      },
    ],
  },
  {
    qid: 'q8',
    title: 'Are you looking for your own records?',
    answers: [
      {
        title: 'Yes', nextQid: null, showMid: 'm10', showContinue: null,
      },
      {
        title: 'No', nextQid: null, showMid: 'm11', showContinue: null,
      },
    ],
  },
  {
    qid: 'q9',
    title: 'Are you looking for your own records?',
    answers: [
      {
        title: 'Yes', nextQid: 'q11', showMid: 'm12', showContinue: true,
      },
      {
        title: 'No', nextQid: null, showMid: null, showContinue: null,
      },
    ],
  },
  {
    qid: 'q10',
    title: 'Select one of the following:',
    answers: [
      {
        title: 'Official Military Personnel Files (OMPF)', nextQid: null, showMid: 'm14', showContinue: null,
      },
      {
        title: 'Medical Records', nextQid: null, showMid: 'm6', showContinue: null,
      },
      {
        title: 'DD Form 214 (Report of Separation)', nextQid: null, showMid: 'm15', showContinue: null,
      },
      {
        title: 'Veteran\'s Benefits', nextQid: null, showMid: 'm16', showContinue: null,
      },
    ],
  },
  {
    qid: 'q11',
    title: 'Select one of the following:',
    answers: [
      {
        title: 'Official Military Personnel Files (OMPF)', nextQid: null, showMid: 'm17', showContinue: null,
      },
      {
        title: 'Medical Records', nextQid: null, showMid: 'm6', showContinue: null,
      },
      {
        title: 'DD Form 214 (Report of Separation)', nextQid: null, showMid: 'm18', showContinue: null,
      },
      {
        title: 'Veteran\'s Benefits', nextQid: null, showMid: 'm19', showContinue: null,
      },
    ],
  },
];

export default militaryRecordsQuestions;
