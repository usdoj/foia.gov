import immigrationOrTravelRecordsJourney from './wizard_immigration_travel_records';
import medicalRecordsJourney from './wizard_medical_records';
import militaryRecordsJourney from './wizard_military_records';
import personnelRecordsJourney from './wizard_personnel_records';
import socsecRecordsJourney from './wizard_socsec_records';
import taxRecordsJourney from './wizard_tax_records';

/**
 * @type {WizardTopic[]}
 */
const allTopics = [
  {
    tid: 't1', title: 'Immigration or Travel records', journey: immigrationOrTravelRecordsJourney,
  },
  {
    tid: 't2', title: 'Tax records', journey: taxRecordsJourney,
  },
  {
    tid: 't3', title: 'Social Security records', journey: socsecRecordsJourney,
  },
  {
    tid: 't4', title: 'Medical records', journey: medicalRecordsJourney,
  },
  {
    tid: 't5', title: 'Personnel records', journey: personnelRecordsJourney,
  },
  {
    tid: 't6', title: 'Military records', journey: militaryRecordsJourney,
  },
];

export default allTopics;
