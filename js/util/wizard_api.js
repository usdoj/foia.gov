// @ts-ignore
import settings from 'settings';

export function fetchWizardInitData() {
  const options = {
    headers: {
      'Content-Type': 'application/json',
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
