import { travelRecordsJourney, immigrationRecordsJourney } from './wizard_immigration_travel_records';
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
    tid: 't1', title: 'Immigration records', journey: immigrationRecordsJourney,
  },
  {
    tid: 't2', title: 'Travel records', journey: travelRecordsJourney,
  },
  {
    tid: 't3', title: 'Tax records', journey: taxRecordsJourney,
  },
  {
    tid: 't4', title: 'Social Security records', journey: socsecRecordsJourney,
  },
  {
    tid: 't5', title: 'Medical records', journey: medicalRecordsJourney,
  },
  {
    tid: 't6', title: 'Personnel records', journey: personnelRecordsJourney,
  },
  {
    tid: 't7', title: 'Military records', journey: militaryRecordsJourney,
  },
];

export default allTopics;
