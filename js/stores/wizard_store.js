/**
 * Store for wizard state
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make
 * decisions throughout the UX.
 */

import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { fetchWizardInitData, fetchWizardPredictions } from '../util/wizard_api';
import allTopics from '../models/wizard_topics';
import extraMessages from '../models/wizard_extra_messages';

/** @type {WizardVars} */
const initialWizardState = {
  activity: { type: 'intro' },
  allTopics,
  answerIdx: null,
  history: [],

  // How many async operations are we waiting on?
  // Use useWizard().loading instead of reading this.
  numLoading: 0,

  query: '',
  ready: false,
  recommendedAgencies: null,
  recommendedLinks: null,
  isError: false,
  ui: extraMessages,
  userTopic: null,
};

/**
 * @param {WizardState} state
 * @returns {WizardHistorySnapshot}
 */
function createSnapshot(state) {
  const snapshot = { ...state };
  // Omit<WizardVars, 'actions' | 'allTopics' | 'history' | 'ui' | 'numLoading'>;
  delete snapshot.allTopics;
  delete snapshot.actions;
  delete snapshot.history;
  delete snapshot.ui;
  delete snapshot.numLoading;

  return snapshot;
}

/**
 * Low-level hook to manage state. Use useWizard instead...
 *
 * Example:
 *   const page = useRawWizardStore((state) => state.page);
 */
const useRawWizardStore = create((
  /** ZustandSet<WizardState> */ set,
  /** ZustandGet<WizardState> */ get,
) => {
  // Actions separated from state vars.

  /**
   * @param {number} delta
   */
  function nudgeLoading(delta) {
    set((prev) => ({ numLoading: Math.max(0, prev.numLoading + delta) }));
  }

  /**
   * Decorate full state with updated history
   *
   * @param {Partial<WizardVars>} newState
   * @returns {WizardState}
   */
  const withCapturedHistory = (newState) => {
    const activityState = get();
    return {
      ...activityState,
      ...newState,
      history: [...activityState.history, createSnapshot(activityState)],
    };
  };

  /**
   * Pop history to return to last page
   */
  const prevPage = () => set((state) => {
    const { history } = state;
    if (!history.length) {
      throw new Error('No history snapshots available!');
    }
    const snapshot = history[history.length - 1];

    return {
      ...state,
      ...snapshot,
      history: history.slice(0, history.length - 1),
    };
  });

  const initLoad = async () => {
    nudgeLoading(1);
    let data;
    try {
      data = await fetchWizardInitData();
    } catch (err) {
      throw new Error(`API call to fetch wizard strings failed: ${err}`);
    }
    nudgeLoading(-1);

    const lang = 'en';
    try {
      // Basic validation
      data.language[lang].messages.m1.indexOf('');
      data.language[lang].intro_slide.indexOf('');
    } catch (err) {
      throw new Error('Unexpected wizard strings format');
    }

    const ui = {
      // These will remain hardcoded and merged here.
      ...extraMessages,

      intro_slide: data.language[lang].intro_slide,
      query_slide: data.language[lang].query_slide,
      ...data.language[lang].messages,
    };
    set({ ready: true, ui });
  };

  const nextPage = () => set((state) => {
    const { activity, answerIdx } = state;

    if (activity.type === 'question') {
      // Check for an answer
      if (answerIdx === null) {
        throw new Error('Cannot continue without an answer');
      }

      const answer = activity.answers[answerIdx];
      return withCapturedHistory({
        answerIdx: null,
        activity: answer.next,
      });
    }

    if (activity.type === 'intro') {
      return withCapturedHistory({
        activity: { type: 'query' },
      });
    }

    if (activity.type === 'summary' || activity.type === 'query') {
      throw new Error('Next page not allowed');
    }

    return withCapturedHistory({
      activity: activity.next,
    });
  });

  const reset = () => set((state) => ({
    ...initialWizardState,

    // Preserve loaded stuff
    allTopics: state.allTopics,
    ui: state.ui,
    ready: state.ready,
  }));

  const jumpBackToQueryPage = () => set((state) => ({
    ...initialWizardState,
    activity: { type: 'query' },
    // Preserve loaded stuff
    allTopics: state.allTopics,
    ui: state.ui,
    ready: state.ready,
  }));

  /** @type {WizardActions['submitRequest']} */
  const submitRequest = async ({ query, topic }) => {
    let isError = false;
    let recommendedAgencies = [];
    let recommendedLinks = [];

    if (query && !topic) {
      nudgeLoading(1);
      await fetchWizardPredictions(query)
        .then((data) => {
          recommendedAgencies = data.model_output.agency_finder_predictions[0];
          recommendedLinks = data.model_output.freqdoc_predictions;
        })
        .catch((err) => {
          console.error(err);
          isError = true;
        });
      nudgeLoading(-1);
    }

    set(withCapturedHistory({
      activity: topic ? topic.journey : { type: 'summary' },
      query,
      recommendedLinks,
      recommendedAgencies,
      isError,
      userTopic: topic,
    }));
  };

  /** @type {WizardActions['selectAnswer']} */
  const selectAnswer = (answerIdx) => set(({
    answerIdx,
  }));

  /** @type {WizardActions} */
  const actions = {
    initLoad,
    nextPage,
    prevPage,
    reset,
    jumpBackToQueryPage,
    selectAnswer,
    submitRequest,
  };

  return ({
    ...initialWizardState,
    actions,
  });
});

/**
 * Hook for simplified operation within wizard pages.
 *
 * @returns {{
 *   actions: WizardActions;
 *   allTopics: WizardVars['allTopics'];
 *   canGoBack: boolean;
 *   loading: boolean;
 *   activity: WizardVars['activity'];
 *   answerIdx: WizardVars['answerIdx'];
 *   ready: boolean;
 *   request: {
 *     agencies: WizardVars['recommendedAgencies'];
 *     links: WizardVars['recommendedLinks'];
 *     query: WizardVars['query'];
 *     topic: WizardVars['userTopic'];
 *     isError: WizardVars['isError'];
 *   };
 *   ui: WizardVars['ui'];
 *   getMessage: (mid: string) => string;
 * }}
 */
function useWizard() {
  return useRawWizardStore((/** WizardState */ state) => ({
    actions: state.actions,
    allTopics: state.allTopics,
    answerIdx: state.answerIdx,
    canGoBack: state.history.length > 0,
    loading: state.numLoading > 0,
    activity: state.activity,
    ready: state.ready,
    request: {
      agencies: state.recommendedAgencies,
      links: state.recommendedLinks,
      query: state.query,
      topic: state.userTopic,
      isError: state.isError,
    },
    ui: state.ui,
    getMessage: (mid) => (mid.startsWith('literal:') ? mid.substring(8) : state.ui[mid] || `(missing message: ${mid})`),
  }), shallow);
}

export { useWizard, useRawWizardStore };
