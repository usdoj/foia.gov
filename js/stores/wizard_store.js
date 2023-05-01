/**
 * WizardStore
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make decisions throughout the UX.
 */

import { create } from 'zustand';

const initialWizardState = {
  page: /** @type string */ 'init',
  userKeywords: /** @type null | string[] */ null,
  isSeekingOwnRecords: /** @type null | boolean */ null,
  isVeteran: /** @type null | boolean */ null,
  returnedAgencyAndLinkList: /** @type null | unknown[] */ null,
  agencyDetailPage: /** @type null | string */ null,
};

const useWizardStore = create((set) => ({
  ...initialWizardState,
  setPage: (pageName) => set({ page: pageName }),
  addKeywords: (keyword) => set((state) => {
    if (Array.isArray(keyword)) {
      return { userKeywords: [...state.keywords, ...keyword] };
    }
    return { userKeywords: [...state.keywords, keyword] };
  }),
  removeKeyword: (keyword) => set((state) => ({
    userKeywords: state.userKeywords.filter((word) => word !== keyword),
  })),
  clearKeywords: () => set({ userKeywords: [] }),
  toggleIsVeteran: () => set((state) => ({ isVeteran: !state.isVeteran })),
  toggleIsSeekingOwnRecords: () => set((state) => ({ isSeekingOwnRecords: !state.isSeekingOwnRecords })),
  resetWizardState: () => set(initialWizardState),
}));

export default useWizardStore;
