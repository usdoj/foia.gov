const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://uat-api.foia.gov/api',
  requestApiBaseURL: 'https://uat-api.foia.gov/api',
  polydeltaProxyOrigin: 'https://uat-api.foia.gov',
  // keyof POLYDELTA_APIS in /js/util/wizard_api.js
  polydeltaApiVersion: 'v1_1',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: 'PvO2Wh2UppBQqGIxIvdKbogNRI0W0MVLFhkxjWfK',
  jsonApiKey: 'PvO2Wh2UppBQqGIxIvdKbogNRI0W0MVLFhkxjWfK',
};

export default {
  api,
  appEnv: 'uat',
};
