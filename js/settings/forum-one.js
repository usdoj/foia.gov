const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://api.main-bvxea6i-oafzps2pqxjxw.us-2.platformsh.site/api',
  requestApiBaseURL: 'https://api.main-bvxea6i-oafzps2pqxjxw.us-2.platformsh.site/api',
  polydeltaProxyOrigin: 'https://uat-api.foia.gov',
  // keyof POLYDELTA_APIS in /js/util/wizard_api.js
  polydeltaApiVersion: 'v2_0beta',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  apiProxyKey: '7aT5REJTpzjKoYKFuc9YIJLalHdYaif6ZqGkDPxG',
  jsonApiKey: '7aT5REJTpzjKoYKFuc9YIJLalHdYaif6ZqGkDPxG',
};

export default {
  api,
  appEnv: 'forum-one',
};
