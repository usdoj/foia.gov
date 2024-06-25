const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://stg-api.foia.gov/api',
  requestApiBaseURL: 'https://stg-api.foia.gov/api',
  polydeltaProxyOrigin: 'https://stg-api.foia.gov',
  // keyof POLYDELTA_APIS in /js/util/wizard_api.js
  polydeltaApiVersion: 'v2_0beta',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: 'Ear1funbgPVsgIAvRDZQK4yHq1XrLnrgfUBJM0Su',
  jsonApiKey: 'Ear1funbgPVsgIAvRDZQK4yHq1XrLnrgfUBJM0Su',
};

export default {
  api,
  appEnv: 'staging',
};
