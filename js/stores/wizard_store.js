/**
 * Store for wizard state
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make
 * decisions throughout the UX.
 */

import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { fetchWizardInitData, fetchWizardPredictions } from '../util/wizard_api';
import {
  convertSomeLinksToCards, normalizeScore, scanForTriggers, urlParams,
} from '../util/wizard_helpers';
import searchMatchingAgency from '../util/wizard_agency_search';
import allTopics from '../models/wizard_topics';
import extraMessages from '../models/wizard_extra_messages';
import { defaultSummary, stateLocalSummary, stateOrLocalFlow } from '../models/wizard_summaries';
import agencyComponentStore from './agency_component';

const DEBUG_TO_CONSOLE = true;
const DEFAULT_CONFIDENCE_THRESHOLD = Number(
  urlParams().get('confidence-threshold') || 0.5,
);

const CONFIDENCE_THRESHOLD_AGENCIES = DEFAULT_CONFIDENCE_THRESHOLD;
const CONFIDENCE_THRESHOLD_LINKS = DEFAULT_CONFIDENCE_THRESHOLD;

/** @type {WizardVars} */
const initialWizardState = {
  activity: { type: 'intro' },
  agenciesFirst: false,
  allTopics,
  answerIdx: null,
  displayedTopic: '',
  flatList: null,
  modelLoading: false,
  query: '',
  recommendedAgencies: null,
  recommendedLinks: null,
  showModelResults: true,
  triggerPhrases: null,
  isError: false,
  ui: extraMessages,
  userTopic: null,
};

export const log = (...args) => DEBUG_TO_CONSOLE && console.log(...args);

/**
 * Keys of state to preserve on a reset.
 *
 * @type {Array<keyof WizardVars>}
 */
const preserveKeys = ['allTopics', 'flatList', 'triggerPhrases', 'ui'];

/**
 * @param {WizardState} state
 * @returns {WizardHistorySnapshot}
 */
function createSnapshot(state) {
  const snapshot = { ...state };
  delete snapshot.actions;
  preserveKeys.forEach((key) => delete snapshot[key]);

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
   * @param {FlatListItem[]} flatList
   */
  function setFlatList(flatList) {
    set({ flatList });
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

  const reset = () => set((state) => {
    const obj = { ...initialWizardState };
    // preserve loaded stuff
    preserveKeys.forEach((key) => {
      obj[key] = state[key];
    });
    return obj;
  });

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
    let data;
    let triggerPhrases = null;
    try {
      data = await fetchWizardInitData();
    } catch (err) {
      throw new Error(`API call to fetch wizard strings failed: ${err}`);
    }

    const lang = 'en';
    try {
      // Basic validation
      data.language[lang].messages.m1.indexOf('');
      data.language[lang].intro_slide.indexOf('');
    } catch (err) {
      throw new Error('Unexpected wizard strings format');
    }

    if (Array.isArray(data.trigger_phrases)) {
      triggerPhrases = data.trigger_phrases;
    }

    const ui = {
      // These will remain hardcoded and merged here.
      ...extraMessages,

      intro_slide: data.language[lang].intro_slide,
      query_slide_1: data.language[lang].query_slide_1,
      query_slide_2: data.language[lang].query_slide_2,
      ...data.language[lang].messages,
    };
    set({ ui, triggerPhrases });
  };

  /**
   * @param {WizardVars} state
   * @returns {WizardVars}
   */
  function getJumpBackState(state) {
    const obj = {
      ...initialWizardState,
      activity: { type: 'query' },
      bypassPresetJourney: false,
    };
    // Preserve loaded stuff
    preserveKeys.forEach((key) => {
      obj[key] = state[key];
    });
    return obj;
  }

  const jumpBackToQueryPage = () => set((state) => getJumpBackState(state));

  const nextPage = () => set((state) => {
    const { activity, answerIdx, displayedTopic } = state;

    if (activity.type === 'question') {
      // Check for an answer
      if (answerIdx === null) {
        throw new Error('Cannot continue without an answer');
      }

      const answer = activity.answers[answerIdx];
      if (answer.next.type === 'start-over') {
        return getJumpBackState(state);
      }

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

  /** @type {WizardActions['submitRequest']} */
  const submitRequest = async ({ query, topic }) => {
    // Wait for agencies to load...
    await new Promise((res) => {
      let interval;
      function checkLoaded() {
        if (get().flatList) {
          window.clearInterval(interval);
          res();
        }
      }

      interval = window.setInterval(checkLoaded, 250);
      checkLoaded();
    });

    const flatList = get().flatList;
    const triggerPhrases = get().triggerPhrases || [];
    let isError = false;
    let recommendedAgencies = [];
    let recommendedLinks = [];
    let effectiveTopic = topic;
    let isStateOrLocal = false;
    let agenciesFirst = false;
    let trustAgencyMatch = false;
    let matchingFlatAgency = null;

    const triggerMatch = scanForTriggers(query, triggerPhrases);
    if (triggerMatch) {
      log(`Found trigger phrase "${triggerMatch.trigger}": Sending the user to message ${triggerMatch.skip}.`);
    } else {
      const {
        item,
        matchedAbbr,
        queryWords,
        wordsMatched,
      } = searchMatchingAgency(query, flatList, DEBUG_TO_CONSOLE);
      matchingFlatAgency = item;

      if (matchingFlatAgency) {
        log(`Found matching agency ${item.title} matching ${wordsMatched} words.`);
        log(`User's query (stop words removed) was ${queryWords} words.`);

        // See if it's a close enough match to bypass intent model
        if (matchedAbbr) {
          trustAgencyMatch = true;
          log('User\'s query had a matching agency abbreviation. Skipping intent model check.');
        } else {
          const nonMatchWords = (queryWords - wordsMatched);
          log(`User's query had ${nonMatchWords} non-match words.`);
          if (nonMatchWords <= 2) {
            trustAgencyMatch = true;
            log('Since this is <= 2, the query is deemed "mostly" matching words. Skipping intent model check.');
          }
        }
      }
    }

    // Even if we have a trigger match, we want to collect model results so the user can
    // switch to them if they prefer.
    if (query && !topic) {
      set({ modelLoading: true });
      await fetchWizardPredictions(query)
        .then((data) => {
          if (triggerMatch) {
            log('Collecting model results in case user chooses to switch to them.');
          } else if (trustAgencyMatch) {
            log('An agency match was most of user\'s query: Skipping intent model.');
          } else {
            // If a predefined flow is found, we switch to it, but we'll go ahead and populate
            // the links and agencies anyway.
            let { flow } = data.model_output.predefined_flow || {};
            if (typeof flow === 'string') {
              if (flow === stateOrLocalFlow) {
                log('Moving user to state/local summary page due to intent model result.');
                isStateOrLocal = true;
              } else {
                // In case the intent model hasn't already been updated, check for these two cases:
                flow = flow.replace(/IRS records/i, 'Tax records');
                flow = flow.replace(/(Immigration records)|(Travel records)/i, 'Immigration or Travel records');
                effectiveTopic = allTopics.find(
                  (el) => el.title.toUpperCase() === flow.toUpperCase(),
                );
                if (effectiveTopic) {
                  log(`Moving user to flow for topic "${effectiveTopic.title}" due to intent model result.`);
                }
              }
            }
          }

          if (matchingFlatAgency) {
            recommendedAgencies = [
              {
                ...matchingFlatAgency,
                confidence_score: 10000,
                parent: matchingFlatAgency.agency,
                url: agencyComponentStore.getFlatItemUrl(matchingFlatAgency),
              },
            ];
            agenciesFirst = true;
          }

          // If name match, always include it.
          recommendedAgencies.push(
            ...(data.model_output.agency_name_match || [])
              .map((agency) => {
                // Show near top.
                agency.confidence_score = 9999;
                agenciesFirst = true;
                return agency;
              }),
          );

          // Match from mission if above threshold.
          recommendedAgencies.push(
            ...data.model_output.agency_mission_match
              .map(normalizeScore)
              .filter((agency) => (agency.confidence_score >= CONFIDENCE_THRESHOLD_AGENCIES)),
          );

          // Match from finder if above threshold.
          recommendedAgencies.push(
            ...data.model_output.agency_finder_predictions[0]
              .map(normalizeScore)
              .filter((agency) => (agency.confidence_score >= CONFIDENCE_THRESHOLD_AGENCIES)),
          );

          // DESC score order
          recommendedAgencies.sort((a, b) => b.confidence_score - a.confidence_score);

          // De-dupe agencies
          const ids = new Set();
          recommendedAgencies = recommendedAgencies.filter((el) => {
            if (ids.has(el.id)) {
              return false;
            }
            ids.add(el.id);
            return true;
          });

          recommendedLinks = data.model_output.freqdoc_predictions
            .map(normalizeScore)
            .filter((link) => link.confidence_score >= CONFIDENCE_THRESHOLD_LINKS);
        })
        .catch((err) => {
          console.error(err);
          isError = true;
        });
    }

    set({ modelLoading: false });

    // We use this if no topic is selected/predicted.
    let summary = isStateOrLocal ? stateLocalSummary : defaultSummary;
    if (triggerMatch) {
      summary = { type: 'summary', titleMid: triggerMatch.skip };
    }

    set(withCapturedHistory({
      activity: effectiveTopic ? effectiveTopic.journey : summary,
      agenciesFirst,
      displayedTopic: effectiveTopic ? effectiveTopic.title : '',
      query,
      recommendedLinks,
      recommendedAgencies,
      showModelResults: !(effectiveTopic || isStateOrLocal || triggerMatch),
      isError,
      userTopic: effectiveTopic,
    }));
  };

  const switchToModelResults = () => {
    set(withCapturedHistory({
      activity: { type: 'summary' },
      showModelResults: true,
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
    setFlatList,
    submitRequest,
    switchToModelResults,
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
 *   activity: WizardVars['activity'];
 *   agenciesFirst: boolean;
 *   allTopics: WizardVars['allTopics'];
 *   answerIdx: WizardVars['answerIdx'];
 *   canGoBack: boolean;
 *   canSwitchToModelResults: boolean;
 *   displayedTopic: string;
 *   introReady: boolean;
 *   loading: boolean;
 *   request: {
 *     agencies: WizardVars['recommendedAgencies'];
 *     links: WizardVars['recommendedLinks'];
 *     query: WizardVars['query'];
 *     topic: WizardVars['userTopic'];
 *     isError: WizardVars['isError'];
 *   };
 *   showModelResults: WizardVars['showModelResults'];
 *   ui: WizardVars['ui'];
 *   getMessage: (mid: string, isSummaryAdvice?: boolean) => string;
 * }}
 */
function useWizard() {
  return useRawWizardStore((/** WizardState */ state) => ({
    actions: state.actions,
    activity: state.activity,
    agenciesFirst: state.agenciesFirst,
    allTopics: state.allTopics,
    answerIdx: state.answerIdx,
    canGoBack: state.activity.type !== 'intro',
    canSwitchToModelResults: Boolean(!state.showModelResults && state.query),
    displayedTopic: state.displayedTopic,
    introReady: Boolean(state.triggerPhrases),
    loading: Boolean(state.modelLoading || !state.flatList || !state.triggerPhrases),
    request: {
      agencies: state.recommendedAgencies,
      links: state.recommendedLinks,
      query: state.query,
      topic: state.userTopic,
      isError: state.isError,
    },
    showModelResults: state.showModelResults,
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
