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
      Authorization: 'Api-Key RQmvMuDs.vS8ziJy9FeFlrxUoAji4or840T576esG',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: [query] }),
  };
  return fetch('https://app.polydelta.ai/doj-foia/models/ZBA2ow0/predict', polydeltaOptions)
    .then((response) => response.json());
}
