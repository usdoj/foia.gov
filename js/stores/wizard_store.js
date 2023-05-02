/**
 * Store for wizard state
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make
 * decisions throughout the UX.
 */

import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

/**
 * @type {WizardVars}
 */
const initialWizardState = {
  // Topics loaded from Drupal
  allTopics: null,

  // How many async operations are we waiting on?
  // Use isLoading() to show a loading indicator.
  numLoading: 0,

  page: 'Init',

  // Current query being worked on.
  request: null,

  // Queued queries to help the user with later.
  remainingRequests: [],

  // UI text loaded from Drupal
  ui: null,
};

/**
 * Low-level hook to manage state. Use useWizard instead...
 *
 * Example:
 *   const page = useRawWizardStore((state) => state.page);
 */
const useRawWizardStore = create((set, get) => {
  // Actions separated from state vars.

  /**
   * @param {WizardTopic[]} allTopics
   * @param {Record<string, string>} ui
   */
  const initLoadSuccess = (allTopics, ui) => set({
    allTopics,
    ui,
  });

  const initLoad = async () => {
    // Emulate API call
    await new Promise((res) => {
      setTimeout(res, 1e3);
    });

    initLoadSuccess(
      [
        { label: 'Topic One', tid: 123 },
        { label: 'Topic Two', tid: 124 },
      ],
      {
        intro1: '<h1>Page One</h1>',
        intro2: '<h1>Page Two</h1>',
        intro3: '<h1>Page Three</h1>',
      },
    );
  };

  const isLoading = () => get().numLoading > 0;

  const isReady = () => get().ui !== null;

  const nextPage = () => set((state) => {
    switch (state.page) {
      case 'Two':
        return { page: 'Three' };
      default:
        return {};
    }
  });

  const reset = () => set((state) => ({
    ...initialWizardState,

    // Preserve loaded stuff
    allTopics: state.allTopics,
    ui: state.ui,
  }));

  /**
   * @param {string} query
   * @param {WizardTopic[]} topics
   */
  const submitRequest = async (query, topics) => {
    set((state) => ({ numLoading: state.numLoading + 1 }));

    // Emulate API call
    await new Promise((res) => {
      setTimeout(res, 1e3);
    });

    set((state) => ({
      request: {
        isSeekingOwnRecords: null,
        isVeteran: null,
        query,
        recommendedAgencies: [],
        type: 'unknown',
        userTopics: topics,
      },
      numLoading: Math.max(0, state.numLoading - 1),
      page: 'Two',
      remainingRequests: [],
    }));
  };

  /**
   * @param {boolean} isSeekingOwnRecords
   */
  const setIsSeekingOwnRecords = (isSeekingOwnRecords) => set(
    (state) => {
      const { request } = state;
      if (!request) {
        return {};
      }

      return {
        request: {
          ...request,
          isSeekingOwnRecords,
        },
      };
    },
  );

  /**
   * @param {boolean} isVeteran
   */
  const setIsVeteran = (isVeteran) => set(
    (state) => {
      const { request } = state;
      if (!request) {
        return {};
      }

      return {
        request: {
          ...request,
          isVeteran,
        },
      };
    },
  );

  /**
   * @type {WizardActions}
   */
  const actions = {
    initLoad,
    initLoadSuccess,
    nextPage,
    reset,
    setIsSeekingOwnRecords,
    setIsVeteran,
    submitRequest,
  };

  return ({
    ...initialWizardState,
    isLoading,
    isReady,
    actions,
  });
});

/**
 * Hook for simplified operation within wizard pages.
 *
 * @returns {{
 *   actions: WizardActions;
 *   allTopics: WizardVars['allTopics'];
 *   loading: boolean;
 *   ready: boolean;
 *   ui: WizardVars['ui'];
 *   request: WizardVars['request'];
 *   remainingRequests: WizardVars['remainingRequests'];
 * }}
 */
function useWizard() {
  return useRawWizardStore((state) => ({
    actions: /** WizardActions */ state.actions,
    allTopics: state.allTopics,
    loading: state.numLoading > 0,
    ready: state.ui !== null,
    ui: state.ui,
    request: state.request,
    remainingRequests: state.remainingRequests,
  }), shallow);
}

export { useWizard, useRawWizardStore };
