import medicalRecordsQuestions from './wizard_medical_records';
import militaryRecordsQuestions from './wizard_military_records';

/**
 * @type {WizardTopic[]}
 */
export const allTopics = [
  {
    tid: 't1', title: 'Medical Records', introMid: null, firstQid: 'q1',
  },
  {
    tid: 't2', title: 'Military Records', introMid: null, firstQid: 'q6',
  },
  {
    tid: 't3', title: 'Personnel records', introMid: null, firstQid: null,
  },
  {
    tid: 't4', title: 'Tax Records', introMid: null, firstQid: null,
  },
  {
    tid: 't5', title: 'Social Security Records', introMid: null, firstQid: null,
  },
];

/**
 * @type {WizardQuestion[]}
 */
const allQuestions = [
  ...medicalRecordsQuestions,
  ...militaryRecordsQuestions,
];

/**
 * @param {string} qid
 * @returns {WizardQuestion|null}
 */
export function getQuestion(qid) {
  return allQuestions.find((el) => el.qid === qid) || null;
}

/**
 * @param {string} tid
 * @returns {WizardTopic|null}
 */
export function getTopic(tid) {
  return allTopics.find((el) => el.tid === tid) || null;
}
