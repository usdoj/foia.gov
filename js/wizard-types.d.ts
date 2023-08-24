/* eslint-disable */
/**
 * This file is not used in compilation, but provides type-checking for the wizard
 * app. Use the project file "wizard.tsconfig.json".
 *
 * npx tsc --watch --project js/wizard.tsconfig.json
 *
 * We tried hard to keep these defined in JSDoc but the mix of tsx and WebStorm support
 * proved unworkable. Either WebStorm would fail to understand the types in use, or tsc
 * would fail to find the types.
 */

import { SetState } from 'zustand';

declare global {
  type ZustandSet<T> = SetState<T>;

  type ZustandGet<T> = () => T;

  // An object created from an Agency or AgencyComponent (maybe with parent Agency)
  type FlatListItem = {
    id: string;
    type: 'agency' | 'agency_component';
    title: string;
    abbreviation: string;
    agency?: {
      id: string;
      name: string;
      abbreviation: string;
    };
  };

  type WizardAgency = {
    id: string;
    title: string;
    parent?: {
      id: string;
      abbreviation: string;
      name: string;
    };
    abbreviation: string;
    confidence_score: number;
    department?: string;
    url: string;
  };

  type WizardLink = {
    abbreviation: string;
    component: string;
    confidence_score: number;
    title: string;
    parent_abbreviation: string;
    url: string;
  };

  export type WizardTopic = {
    tid: string;
    title: string;
    /**
     * Reference to the first question
     */
    journey: WizardQuestion;
  };

  type WizardIntro = {
    type: 'intro';
  }

  type WizardQuery = {
    type: 'query';
  }

  type WizardQuestion = {
    type: 'question';
    /**
     * Question text MID (in wizard_extra_messages.js)
     */
    titleMid: string;
    answers: WizardAnswer[];
    addendumMid?: string;
  };

  type WizardContinue = {
    type: 'continue';
    /**
     * MID of text to display
     */
    titleMid: string;
    /**
     * The next activity: a question, continue, or the summary
     */
    next: WizardQuestion | WizardContinue | WizardSummary;
  };

  type WizardSummary = {
    type: 'summary';
    titleMid?: string;
  }

  type WizardStartOver = {
    type: 'start-over';
  }

  type WizardActivity =
      | WizardIntro
      | WizardQuery
      | WizardQuestion
      | WizardContinue
      | WizardSummary
      | WizardStartOver;

  type WizardAnswer = {
    /**
     * Answer text MID (in wizard_extra_messages.js)
     */
    titleMid: string;
    /**
     * If set, selecting this answer will change the displayed topic
     */
    newDisplayedTopic?: string;
    /**
     * The next activity: a question, continue, or the summary
     */
    next: WizardQuestion | WizardContinue | WizardSummary | WizardStartOver;
  };

  type WizardHistorySnapshot = Omit<WizardVars, 'actions' | 'allTopics' | 'ui' | 'numLoading'>;

  type WizardActions = {
    initLoad: () => void;
    jumpBackToQueryPage: () => void;
    nextPage: () => void;
    prevPage: () => void;
    reset: () => void;
    selectAnswer: (answerIdx: number) => void;
    setFlatList: (flatList: FlatListItem[]) => void;
    submitRequest: (arg: {
      query: string;
      topic: WizardTopic | null;
    }) => void;
  };

  type WizardVars = {
    activity: WizardActivity;
    agenciesFirst: boolean;
    allTopics: WizardTopic[] | null;
    /**
     * User selected answer
     */
    answerIdx: number | null;
    displayedTopic: string;
    isError: boolean;
    flatList: FlatListItem[];
    numLoading: number;
    query: string | null;
    ready: boolean;
    recommendedAgencies: WizardAgency[] | null;
    recommendedLinks: WizardLink[] | null;
    ui: Record<string, string>;
    userTopic: WizardTopic | null;
  };

  type WizardNonVars = {
    actions: WizardActions;
  };

  type WizardState = WizardVars & WizardNonVars;
}
