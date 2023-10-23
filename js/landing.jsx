import 'babel-polyfill';
import { requestActions } from './actions';
import { fetchWizardInitData } from './util/wizard_api';

// No React component needed, just redirect or preload some URLs.
const params = new URLSearchParams(location.search);
if (params.has('id')) {
  // Redirect to new agency display URL
  location.href = `/agency-search.html?${params}`;
} else {
  // Some preloading for other features
  setTimeout(() => {
    requestActions.fetchAgencyFinderData();
    fetchWizardInitData();
  }, 1000);
}
