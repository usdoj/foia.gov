/**
 * Store for wizard state
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make
 * decisions throughout the UX.
 */

import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { allTopics, getQuestion } from '../models/wizard';
import { WizardPageName } from '../components/wizard_pages';

/**
 * @type {WizardVars}
 */
const initialWizardState = {
  // Topics loaded from Drupal
  allTopics: null,

  // How many async operations are we waiting on?
  // Use useWizard().loading instead of reading this.
  numLoading: 0,

  // Current react component rendered.
  // See js/components/wizard_pages.jsx
  page: 'Intro',

  // After submitting the first page this will be created to track progress through the app.
  // This design allows us to, in the future, separate the UX into multiple requests.
  request: null,

  // UI text loaded from Drupal
  ui: null,

  history: [],
};

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
    const currentState = get();
    const { history, page, request } = currentState;
    /** @type {WizardHistorySnapshot} */
    const snapshot = { page, request };
    return {
      ...currentState,
      ...newState,
      history: [...history, snapshot],
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
    const { page, request } = history[history.length - 1];
    return {
      page,
      request,
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

      // Move all this to be delivered by Drupal
      {
        intro0: '<h1>Hello,</h1><p>The government hosts a vast amount of information, with records spread across many different agencies, and even across different offices within agencies.</p><p>To help you figure out which federal agency might have the information you seek, we\'ve developed this tool.  If you\'re looking for non-federal records, such as from your local police department, we suggest contact the appropriate state or local authorities.</p><p>We recommend giving yourself at least 5 minutes to explore this tool.</p>',
        intro1: '<h1>Let\'s dive in...</h1><h2>What information are you looking for?</h2>',
        intro2: '<h1>Page Two</h1>',
        intro3: '<h1>Page Three</h1>',
        m1: 'If you are seeking records on yourself you will be required ...',
        m2: 'Generally, when requesting information about another person ...',
        m3: 'If you are seeking medical records from the Department of Veterans Affairs (VA), you may ...',
        m4: 'Select specific branch of the military to start FOIA request ...',
        m5: 'The following agencies may have the information you seek:...',
        m6: 'If you are seeking medical records from the Department of Veterans Affairs (VA), you may ...',
        m7: 'Select specific branch of the military to start FOIA request ...',
        m8: 'The following agencies may have the information you seek: ...',
      },
    );
  };

  const nextPage = () => set((state) => {
    const { request, page } = state;

    if (page === WizardPageName.Intro) {
      return withCapturedHistory({
        page: WizardPageName.Init,
      });
    }

    const { answerIdx, question, userTopic } = request;

    if (!question) {
      // Move to summary.
      return withCapturedHistory({
        page: WizardPageName.Summary,
      });
    }

    if (page === WizardPageName.TopicIntro) {
      // Move to question
      return withCapturedHistory({
        page: userTopic && userTopic.firstQid ? WizardPageName.Question : WizardPageName.Summary,
      });
    }

    if (page === WizardPageName.Continue) {
      const answer = question.answers[answerIdx];
      if (answer.nextQid) {
        return withCapturedHistory({
          page: WizardPageName.Question,
          request: { ...request, question: getQuestion(answer.nextQid), answerIdx: null },
        });
      }

      // Done!
      return withCapturedHistory({
        page: WizardPageName.Summary,
      });
    }

    if (page === WizardPageName.Question) {
      if (answerIdx === null) {
        throw new Error('Cannot continue without an answer');
      }

      const answer = question.answers[answerIdx];
      if (answer.showContinue) {
        // Move to continue page
        return withCapturedHistory({
          page: WizardPageName.Continue,
        });
      }

      if (answer.nextQid) {
        // Move to next question
        return withCapturedHistory({
          ...state,
          request: {
            ...request,
            question: getQuestion(answer.nextQid),
            answerIdx: null,
          },
          page: WizardPageName.Question,
        });
      }

      // Done!
      return withCapturedHistory({
        page: WizardPageName.Summary,
      });
    }

    throw new Error('Next page cannot be determined');
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

    // Emulate API call
    await new Promise((res) => {
      setTimeout(res, 1e3);
    });

    const question = topic ? getQuestion(topic.firstQid) : null;

    /** @type {WizardRequest} */
    const request = {
      query,
      answerIdx: null,
      question,
      recommendedAgencies: [],
      recommendedLinks: [],
      userTopic: topic,
    };

    let page = WizardPageName.Summary;
    if (topic && topic.introMid) {
      // Topic has an intro page
      page = WizardPageName.TopicIntro;
    } else if (question) {
      page = WizardPageName.Question;
    }

    set((state) => withCapturedHistory({
      request,
      numLoading: Math.max(0, state.numLoading - 1),
      page,
    }));
  };

  /** @type {WizardActions['selectAnswer']} */
  const selectAnswer = (answerIdx) => set((state) => ({
    request: { ...state.request, answerIdx },
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
 *   page: WizardPageName;
 *   ready: boolean;
 *   ui: WizardVars['ui'];
 *   request: WizardVars['request'];
 * }}
 */
function useWizard() {
  return useRawWizardStore((/** WizardState */ state) => ({
    actions: state.actions,
    allTopics: state.allTopics,
    canGoBack: state.history.length > 0,
    loading: state.numLoading > 0,
    page: state.page,
    ready: state.ui !== null,
    ui: state.ui,
    request: state.request,
  }), shallow);
}

export { useWizard, useRawWizardStore };
