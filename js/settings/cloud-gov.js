const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://dev-api.foia.gov/api',
  requestApiBaseURL: 'https://dev-api.foia.gov/api',
  polydeltaProxyOrigin: 'https://dev-api.foia.gov',
  // keyof POLYDELTA_APIS in /js/util/wizard_api.js
  polydeltaApiVersion: 'v1_1',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: '7aT5REJTpzjKoYKFuc9YIJLalHdYaif6ZqGkDPxG',
  jsonApiKey: '7aT5REJTpzjKoYKFuc9YIJLalHdYaif6ZqGkDPxG',
};

export default {
  api,
  appEnv: 'cloud-gov',
};
