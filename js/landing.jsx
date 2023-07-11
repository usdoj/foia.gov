import 'babel-polyfill';
import { requestActions } from './actions';
import { fetchWizardInitData } from './util/wizard_api';

const params = new URLSearchParams(location.search);
if (params.has('id')) {
  // Redirect to new agency display URL
  location.href = `/agency-search.html?${params}`;
} else {
  // Some preloading for other features
  requestActions.fetchAgencyFinderData();
  fetchWizardInitData();
}
