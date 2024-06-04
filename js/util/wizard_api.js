// @ts-ignore
import settings from 'settings';

export function fetchWizardInitData() {
  const options = {
    headers: {
      'X-Api-Key': settings.api.apiProxyKey,
    },
  };
  return fetch(`${settings.api.requestApiBaseURL}/foia_wizard`, options)
    .then((r) => r.json());
}

/**
 * @param {string} query
 */
export function fetchWizardPredictions(query) {
  const polydeltaOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': settings.api.apiProxyKey,
    },
    body: JSON.stringify({ input: [query] }),
  };
  return fetch(settings.api.wizardApiURL, polydeltaOptions)
    .then((response) => response.json());
}

/**
 * @param {number} relevanceValue
 * @param {number} expectationsValue
 * @param {string} otherFeedback
 */
export function sendWizardFeedback(relevanceValue, expectationsValue, otherFeedback) {
  const url = `${settings.api.jsonApiBaseURL}/webform/submit`;
  const options = {
    method: 'POST',
    headers: {
      'X-Api-Key': settings.api.jsonApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 'wizard_feedback',
      results_meet_expectations: { 'How well do these results meet your expectations?': expectationsValue },
      results_relevant_to_search: { 'How relevant were the results to your search?': relevanceValue },
      additional_feedback: otherFeedback,
    }),
  };
  return fetch(url, options).then((response) => response.json());
}
