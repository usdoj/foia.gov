const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'http://local-api.foia.doj.gov/api',
  requestApiBaseURL: 'http://local-api.foia.doj.gov/api',
  wizardApiURL: 'https://uat-api.foia.gov/doj-foia/models/ZBA2ow0/predict',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: 'PvO2Wh2UppBQqGIxIvdKbogNRI0W0MVLFhkxjWfK',
  jsonApiKey: 'local-not-needed',
};

export default {
  api,
  appEnv: 'local',
};
