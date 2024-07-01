const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://foia-api.ddev.site/api',
  requestApiBaseURL: 'https://foia-api.ddev.site/api',
  polydeltaProxyOrigin: 'https://uat-api.foia.gov',
  // keyof POLYDELTA_APIS in /js/util/wizard_api.js
  polydeltaApiVersion: 'v2_0',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: 'PvO2Wh2UppBQqGIxIvdKbogNRI0W0MVLFhkxjWfK',
  jsonApiKey: 'local-not-needed',
};

export default {
  api,
  appEnv: 'ddev',
};
