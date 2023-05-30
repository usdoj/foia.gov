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
import { WizardPageName } from './components/wizard_pages';

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
     * Reference to the first follow-up question
     */
    firstQid: string;
    /**
     * If specified, show an initial message before the first question
     */
    introMid: string | null;
  };

  type WizardQuestion = {
    qid: string;
    title: string;
    answers: WizardAnswer[];
  };

  type WizardAnswer = {
    title: string;
    /**
     * If specified, this answer will be followed by another question
     */
    nextQid: string | null;
    /**
     * If specified, show the message (maybe with a Continue button or a follow-up)
     */
    showMid: string | null;
    /**
     * If true, and showMid is specified, show the message on its own page with a [Continue] button.
     */
    showContinue: boolean | null;
  };

  type WizardMessage = {
    mid: string;
    html: string;
    /**
     * Drupal node ID (may not be needed)
     */
    nid: string;
  };

  type WizardRequest = {
    query: string;
    /**
     * Displayed question (or after on a continue page)
     */
    question: WizardQuestion | null;
    /**
     * User selected answer
     */
    answerIdx: number | null;
    recommendedAgencies: WizardAgency[] | null;
    recommendedLinks: WizardLink[] | null;
    userTopic: WizardTopic | null;
  };

  type WizardHistorySnapshot = {
    page: WizardPageName;
    request: WizardRequest | null;
  };

  type WizardActions = {
    initLoad: () => void;
    initLoadSuccess: (allTopics: WizardTopic[], ui: Record<string, string>) => void;
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
    allTopics: WizardTopic[] | null;
    numLoading: number;
    page: WizardPageName;
    request: WizardRequest | null;
    ui: Record<string, string> | null;
    history: WizardHistorySnapshot[];
  };

  type WizardNonVars = {
    actions: WizardActions;
    isLoading: () => void;
    isReady: () => void;
  };

  type WizardState = WizardVars & WizardNonVars;

  type UseWizard = {
    actions: WizardActions;
    allTopics: WizardVars['allTopics'];
    canGoBack: boolean;
    loading: boolean;
    page: WizardPageName;
    ready: boolean;
    ui: WizardVars['ui'];
    request: WizardVars['request'];
  };
}
