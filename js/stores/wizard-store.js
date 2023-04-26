/**
 * WizardStore
 *
 * Stores user responses, data from API calls, and state of all UI controls necessary to make decisions throughout the UX.
*/

import { create } from 'zustand';

const defaultWizardState = {
  currentPageDisplayed: 1,
  userKeywords: [],
  isSeekingOwnRecords: false,
  isVeteran: false,
  returnedAgencyAndLinkList: [],
  agencyDetailPage: null,
};

const useWizardStore = create((set) => ({
  setCurrentPageDisplayed: (pageNumber) => set(() => ({ currentPageDisplayed: pageNumber })),
  wizardState: defaultWizardState,
  addKeywords: (keyword) => set((state) => ({ userKeywords: state.wizardState.push(keyword) })),
  removeKeyword: (keyword) => set((state) => {
    const i = state.userKeywords.indexOf(keyword);
    const newKeywords = state.userKeywords.splice(i, 1);
    return { userKeywords: newKeywords };
  }),
  clearKeywords: () => set(() => ({ userKeywords: [] })),
  toggleIsVeteran: () => set((state) => ({ isVeteran: !state.isVeteran })),
  toggleIsSeekingOwnRecods: () => set((state) => ({ isSeekingOwnRecords: !state.isSeekingOwnRecords })),
  resetWizardState: () => set(defaultWizardState),
}));

export default useWizardStore;
