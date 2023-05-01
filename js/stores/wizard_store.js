/**
 * WizardStore
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make decisions throughout the UX.
 */

import { create } from 'zustand';

const initialWizardState = {
  currentPageDisplayed: null,
  userKeywords: null,
  isSeekingOwnRecords: null,
  isVeteran: null,
  returnedAgencyAndLinkList: null,
  agencyDetailPage: null,
};

const useWizardStore = create()((set, get) => ({
  ...initialWizardState,
  setCurrentPageDisplayed: (pageName) => set({ currentPageDisplayed: pageName }),
  wizardState: initialWizardState,
  addKeywords: (keyword) => set({ userKeywords: [...get().keywords, keyword] }),
  removeKeyword: (keyword) => set({
    userKeywords: get().userKeywords.filter((word) => word !== keyword),
  }),
  clearKeywords: () => set({ userKeywords: [] }),
  toggleIsVeteran: () => set((state) => ({ isVeteran: !state.isVeteran })),
  toggleIsSeekingOwnRecords: () => set((state) => ({ isSeekingOwnRecords: !state.isSeekingOwnRecords })),
  resetWizardState: () => {
    set(initialWizardState);
  },
}));

export default useWizardStore;
