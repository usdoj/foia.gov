/**
 * Store for wizard state
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make
 * decisions throughout the UX.
 */

import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import allTopics from '../models/wizard_topics';
import extraMessages from '../models/wizard_extra_messages';
import polydeltaAPIsample from '../../samples/polydelta_api_sample.json';

/** @type {WizardVars} */
const initialWizardState = {
  activity: { type: 'intro' },
  allTopics: null,
  answerIdx: null,
  history: [],

  // How many async operations are we waiting on?
  // Use useWizard().loading instead of reading this.
  numLoading: 0,

  query: '',
  recommendedAgencies: null,
  recommendedLinks: null,
  ui: null,
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

  /** @type {WizardActions['initLoadSuccess']} */
  const initLoadSuccess = (topics, ui) => set({
    allTopics: topics,
    ui,
  });

  const initLoad = async () => {
    // Emulate API call
    await new Promise((res) => {
      setTimeout(res, 1e3);
    });

    initLoadSuccess(
      allTopics,

      {
        // Move all this to be delivered by Drupal
        intro0: '<h1>Hello,</h1><p>The government hosts a vast amount of information, with records spread across many different agencies, and even across different offices within agencies.</p><p>To help you figure out which federal agency might have the information you seek, we\'ve developed this tool.  If you\'re looking for non-federal records, such as from your local police department, we suggest contact the appropriate state or local authorities.</p><p>We recommend giving yourself at least 5 minutes to explore this tool.</p>',
        intro1: '<h1>Let\'s dive in...</h1><p>What information are you looking for?</p>',
        intro2: '<h1>Page Two</h1>',
        intro3: '<h1>Page Three</h1>',
        m1: '<p>If you are seeking records on yourself you will be required ...</p>',
        m2: '<p>Generally, when requesting information about another person ...</p>',
        m3: '<p>If you are seeking medical records from the Department of Veterans Affairs (VA), you may ...</p>',
        m4: '<p>Select specific branch of the military to start FOIA request ...</p>',
        m5: '<p>The following agencies may have the information you seek:...</p>',
        m6: '<p>If you are seeking medical records from the Department of Veterans Affairs (VA), you may ...</p>',
        m7: '<p>Select specific branch of the military to start FOIA request ...</p>',
        m8: '<p>The following agencies may have the information you seek: ...</p>',

        // These will remain hardcoded and merged here.
        ...extraMessages,
      },
    );
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
  }));

  /** @type {WizardActions['submitRequest']} */
  const submitRequest = async ({ query, topic }) => {
    set((state) => ({ numLoading: state.numLoading + 1 }));

    let recommendedAgencies = [];
    let recommendedLinks = [];

    recommendedAgencies = polydeltaAPIsample.model_output.agency_finder_predictions[0];
    recommendedLinks = polydeltaAPIsample.model_output.freqdoc_predictions;

    set((state) => withCapturedHistory({
      activity: topic ? topic.journey : { type: 'summary' },
      numLoading: Math.max(0, state.numLoading - 1),
      query,
      recommendedLinks,
      recommendedAgencies,
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
    initLoadSuccess,
    nextPage,
    prevPage,
    reset,
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
    ready: state.ui !== null,
    request: {
      agencies: state.recommendedAgencies,
      links: state.recommendedLinks,
      query: state.query,
      topic: state.userTopic,
    },
    ui: state.ui,
    getMessage: (mid) => (mid.startsWith('literal:') ? mid.substring(8) : state.ui[mid] || `(missing message: ${mid})`),
  }), shallow);
}

export { useWizard, useRawWizardStore };
