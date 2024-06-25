// @ts-ignore
import settings from 'settings';

const POLYDELTA_APIS = {
  v1_1: {
    proxyPath: '/doj-foia/models/ZBA2ow0/predict',
    inputIsArray: true,
    nestedAgencyFinder: true,
  },
  v2_0beta: {
    proxyPath: '/doj-foia/pd-api/wizard-api/development/predict',
    inputIsArray: false,
    nestedAgencyFinder: false,
  },
  v2_0: {
    proxyPath: '/doj-foia/pd-api/wizard-api/production/predict',
    inputIsArray: false,
    nestedAgencyFinder: false,
  },
};

const polydeltaApi = POLYDELTA_APIS[settings.api.polydeltaApiVersion];
if (!polydeltaApi) {
  throw new Error(`Invalid polydeltaApiVersion setting: ${settings.api.polydeltaApiVersion}`);
}

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
 * Sends a request to the Polydelta prediction API (proxied through api.foia.gov)
 *
 * @param {string} query
 */
export function fetchWizardPredictions(query) {
  const url = settings.api.polydeltaProxyOrigin + polydeltaApi.proxyPath;
  const polydeltaOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': settings.api.apiProxyKey,
    },
    body: JSON.stringify({
      input:
        polydeltaApi.inputIsArray ? [query] : query,
    }),
  };
  return fetch(url, polydeltaOptions)
    .then((response) => response.json())
    .then((obj) => {
      // Normalize responses.
      const output = obj;

      if (!output || typeof output !== 'object') {
        throw new Error('Polydelta response not an object');
      }

      const hasNestedAgencyFinder = Array.isArray(output.agency_finder_predictions[0]);
      if (hasNestedAgencyFinder !== polydeltaApi.nestedAgencyFinder) {
        // eslint-disable-next-line no-console
        console.warn(`agency_finder_predictions is ${hasNestedAgencyFinder ? 'nested' : 'not nested'}. This doesn't match the configured API.`);
      }

      if (hasNestedAgencyFinder) {
        output.agency_finder_predictions = output.agency_finder_predictions[0];
      }

      return output;
    });
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
      other_feedback: otherFeedback,
    }),
  };
  return fetch(url, options).then((response) => response.json());
}
