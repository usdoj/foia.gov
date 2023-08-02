/**
 * Store for wizard state
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make
 * decisions throughout the UX.
 */

import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { fetchWizardInitData, fetchWizardPredictions } from '../util/wizard_api';
import { convertSomeLinksToCards, normalizeScore, urlParams } from '../util/wizard_helpers';
import allTopics from '../models/wizard_topics';
import extraMessages from '../models/wizard_extra_messages';

const DEFAULT_CONFIDENCE_THRESHOLD = Number(
  urlParams().get('confidence-threshold') || 0.5,
);

const CONFIDENCE_THRESHOLD_AGENCIES = DEFAULT_CONFIDENCE_THRESHOLD;
const CONFIDENCE_THRESHOLD_LINKS = DEFAULT_CONFIDENCE_THRESHOLD;

/** @type {WizardVars} */
const initialWizardState = {
  activity: { type: 'intro' },
  allTopics,
  answerIdx: null,
  displayedTopic: '',

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
  // Omit<WizardVars, 'actions' | 'allTopics' | 'ui' | 'numLoading'>;
  delete snapshot.allTopics;
  delete snapshot.actions;
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
   * Decorate full state with updated history and pushState
   *
   * @param {Partial<WizardVars>} newState
   * @returns {WizardState}
   */
  const withCapturedHistory = (newState) => {
    const combined = {
      ...get(),
      ...newState,
    };

    const snapshot = createSnapshot(combined);

    // There may be a better place to put this.
    window.history.pushState(snapshot, '', location.href);

    return combined;
  };

  const reset = () => set((state) => ({
    ...initialWizardState,

    // Preserve loaded stuff
    allTopics: state.allTopics,
    ui: state.ui,
    ready: state.ready,
  }));

  /**
   * Pop history to return to last page
   */
  const prevPage = () => {
    try {
      window.history.back();
    } catch (err) {
      location.reload();
    }
  };

  window.addEventListener('popstate', (e) => {
    const snapshot = e.state;
    if (typeof snapshot !== 'object' || !snapshot) {
      reset();
      return;
    }

    set((state) => ({
      ...state,
      ...snapshot,
    }));
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
    const { activity, answerIdx, displayedTopic } = state;

    if (activity.type === 'question') {
      // Check for an answer
      if (answerIdx === null) {
        throw new Error('Cannot continue without an answer');
      }

      const answer = activity.answers[answerIdx];
      return withCapturedHistory({
        answerIdx: null,
        activity: answer.next,
        displayedTopic: answer.newDisplayedTopic || displayedTopic,
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
    let effectiveTopic = topic;

    if (query && !effectiveTopic) {
      nudgeLoading(1);
      await fetchWizardPredictions(query)
        .then((data) => {
          // If a predefined flow is found, we switch to it, but we'll go ahead and populate
          // the links and agencies anyway.
          const { flow } = data.model_output.predefined_flow || {};
          if (typeof flow === 'string') {
            effectiveTopic = allTopics.find(
              (el) => el.title.toUpperCase() === flow.toUpperCase(),
            );
          }

          // Used to avoid agency duplicates.
          const ids = new Set();

          // If name match, always include it.
          recommendedAgencies = (data.model_output.agency_name_match || [])
            .map((agency) => {
              ids.add(agency.id);
              // Show at the top.
              agency.confidence_score = 9999;
              return agency;
            });

          // Match from mission if above threshold.
          recommendedAgencies.push(
            ...data.model_output.agency_mission_match
              .map(normalizeScore)
              .filter((agency) => {
                if (ids.has(agency.id) || agency.confidence_score < CONFIDENCE_THRESHOLD_AGENCIES) {
                  return false;
                }
                ids.add(agency.id);
                return true;
              }),
          );

          // Match from finder if above threshold.
          recommendedAgencies.push(
            ...data.model_output.agency_finder_predictions[0]
              .map(normalizeScore)
              .filter((agency) => {
                if (ids.has(agency.id) || agency.confidence_score < CONFIDENCE_THRESHOLD_AGENCIES) {
                  return false;
                }
                ids.add(agency.id);
                return true;
              }),
          );

          // DESC score order
          recommendedAgencies.sort((a, b) => b.confidence_score - a.confidence_score);

          recommendedLinks = data.model_output.freqdoc_predictions
            .map(normalizeScore)
            .filter((link) => link.confidence_score >= CONFIDENCE_THRESHOLD_LINKS);
        })
        .catch((err) => {
          console.error(err);
          isError = true;
        });
      nudgeLoading(-1);
    }

    set(withCapturedHistory({
      activity: effectiveTopic ? effectiveTopic.journey : { type: 'summary' },
      displayedTopic: effectiveTopic ? effectiveTopic.title : '',
      query,
      recommendedLinks,
      recommendedAgencies,
      isError,
      userTopic: effectiveTopic,
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
 *   displayedTopic: string;
 *   ready: boolean;
 *   request: {
 *     agencies: WizardVars['recommendedAgencies'];
 *     links: WizardVars['recommendedLinks'];
 *     query: WizardVars['query'];
 *     topic: WizardVars['userTopic'];
 *     isError: WizardVars['isError'];
 *   };
 *   ui: WizardVars['ui'];
 *   getMessage: (mid: string, isSummaryAdvice?: boolean) => string;
 * }}
 */
function useWizard() {
  return useRawWizardStore((/** WizardState */ state) => ({
    actions: state.actions,
    allTopics: state.allTopics,
    answerIdx: state.answerIdx,
    displayedTopic: state.displayedTopic,
    canGoBack: state.activity.type !== 'intro',
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
    getMessage: (mid, isSummaryAdvice = false) => {
      const html = mid.startsWith('literal:')
        ? mid.substring(8)
        : (state.ui[mid] || `(missing message: ${mid})`);
      return isSummaryAdvice ? convertSomeLinksToCards(html) : html;
    },
  }), shallow);
}

export { useWizard, useRawWizardStore };
