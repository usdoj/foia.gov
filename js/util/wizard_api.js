// @ts-ignore
import settings from 'settings';

export function fetchWizardInitData() {
  return fetch(`${settings.api.requestApiBaseURL}/foia_wizard`)
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
    },
    body: JSON.stringify({ input: [query] }),
  };
  return fetch(settings.api.wizardApiURL, polydeltaOptions)
    .then((response) => response.json());
}
