/*
 * LocalApi
 *
 * This api requests static files from the front end. Allows us to have content
 * editors write in yaml/markdown but have the data served as json.
 */
import axios from 'axios';
import settings from 'settings';

class LocalApi {
  constructor(baseURL) {
    this._api = axios.create({
      baseURL: baseURL || settings.api.localApiBaseURL,
    });
  }

  get(...args) {
    return this._api.get(...args)
      .then(response => response.data);
  }

  glossary() {
    return this.get('/glossary/terms.json');
  }

  requestFormSections() {
    return this.get('/request-form/sections.json');
  }
}

const localApi = new LocalApi();
export default localApi;

export {
  LocalApi,
};
