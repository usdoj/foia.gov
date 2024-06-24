const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://api.foia.gov/api',
  requestApiBaseURL: 'https://api.foia.gov/api',
  polydeltaProxyOrigin: 'https://api.foia.gov',
  // keyof POLYDELTA_APIS in /js/util/wizard_api.js
  polydeltaApiVersion: 'v1_1',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: 'mUPoczW5VDRQOvroK6srQIjEGc5xBP0KDHgE34fv',
  jsonApiKey: 'mUPoczW5VDRQOvroK6srQIjEGc5xBP0KDHgE34fv',
};

export default {
  api,
  appEnv: 'production',
};
