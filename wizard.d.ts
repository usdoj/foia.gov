/**
 * This file provides types for IDE static analysis only.
 *
 * See js/stores/wizard_store.js
 */

type WizardPage = 'Init' | 'Two' | 'Three';

interface WizardTopic {
  label: string;
  tid: number;
}

interface WizardAgency {
  name: string;
  dept: string;
  url: string;
}

type WizardJourney = 'Unrecognized' | 'CourtRecords' | 'MedRecords';

interface WizardRequest {
  isSeekingOwnRecords: null | boolean;
  isVeteran: null | boolean;
  journey: WizardJourney;
  query: string;
  recommendedAgencies: null | WizardAgency[];
  userTopics: Set<WizardTopic>;
}

interface WizardVars {
  allTopics: null | WizardTopic[];
  numLoading: number;
  page: WizardPage;
  request: null | WizardRequest;
  ui: null | Record<string, string>;
}

interface WizardActions {
  initLoad(): void;
  initLoadSuccess(allTopics: WizardTopic[], ui: Record<string, string>): void;
  nextPage(): void;
  reset(): void;
  setIsSeekingOwnRecords(val: boolean): void;
  setIsVeteran(val: boolean): void;
  submitRequest(query: string, topics: WizardTopic[]): void;
}

interface WizardState extends WizardVars {
  actions: WizardActions;
  isLoading(): boolean;
  isReady(): boolean;
}
