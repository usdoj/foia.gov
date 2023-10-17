const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://dev-api.foia.gov/api',
  requestApiBaseURL: 'https://dev-api.foia.gov/api',
  wizardApiURL: 'https://dev-api.foia.gov/doj-foia/models/ZBA2ow0/predict',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: '7aT5REJTpzjKoYKFuc9YIJLalHdYaif6ZqGkDPxG',
  jsonApiKey: '7aT5REJTpzjKoYKFuc9YIJLalHdYaif6ZqGkDPxG',
};

export default {
  api,
  appEnv: 'development',
};
