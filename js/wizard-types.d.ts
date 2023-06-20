/* eslint-disable */
/**
 * This file is not used in compilation, but provides type-checking for the wizard
 * app. Use the project file "wizard.tsconfig.json".
 *
 * We tried hard to keep these defined in JSDoc but the mix of tsx and WebStorm support
 * proved unworkable. Either WebStorm would fail to understand the types in use, or tsc
 * would fail to find the types.
 */

import { SetState } from 'zustand';

declare global {
  type ZustandSet<T> = SetState<T>;

  type ZustandGet<T> = () => T;

  type WizardAgency = {
    name: string;
    url: string;
    dept: string;
  };

  type WizardLink = {
    name: string;
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

  type WizardActivity = WizardIntro | WizardQuery | WizardQuestion | WizardContinue | WizardSummary;

  type WizardAnswer = {
    /**
     * Answer text MID (in wizard_extra_messages.js)
     */
    titleMid: string;
    /**
     * The next activity: a question, continue, or the summary
     */
    next: WizardQuestion | WizardContinue | WizardSummary;
  };

  type WizardHistorySnapshot = Omit<WizardVars, 'actions' | 'allTopics' | 'history' | 'ui' | 'numLoading'>;

  type WizardActions = {
    initLoad: () => void;
    nextPage: () => void;
    prevPage: () => void;
    reset: () => void;
    selectAnswer: (answerIdx: number) => void;
    submitRequest: (arg: {
      query: string;
      topic: WizardTopic | null;
    }) => void;
  };

  type WizardVars = {
    activity: WizardActivity;
    allTopics: WizardTopic[] | null;
    /**
     * User selected answer
     */
    answerIdx: number | null;
    history: WizardHistorySnapshot[];
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
