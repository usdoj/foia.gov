
// Types for stores/wizard_store.js

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

type WizardQueryType = 'unknown' | 'courtRecs' | 'medRecs';

interface WizardRequest {
  isSeekingOwnRecords: null | boolean;
  isVeteran: null | boolean;
  query: string;
  recommendedAgencies: null | WizardAgency[];
  type: WizardQueryType;
  userTopics: Set<WizardTopic>;
}

interface WizardVars {
  allTopics: null | WizardTopic[];
  numLoading: number;
  page: WizardPage;
  request: null | WizardRequest;
  remainingRequests: WizardRequest[];
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
