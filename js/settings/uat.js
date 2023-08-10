const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://uat-api.foia.gov/api',
  requestApiBaseURL: 'https://uat-api.foia.gov/api',
  wizardApiURL: 'https://uat-api.foia.gov/doj-foia/models/ZBA2ow0/predict',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  jsonApiKey: 'PvO2Wh2UppBQqGIxIvdKbogNRI0W0MVLFhkxjWfK',
};

export default {
  api,
  appEnv: 'uat',
};
