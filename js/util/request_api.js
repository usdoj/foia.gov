import axios from 'axios';
import settings from 'settings';

class RequestApi {
  constructor(baseURL) {
    this._api = axios.create({
      baseURL: baseURL || settings.api.requestApiBaseURL,
      headers: { 'X-Api-Key': settings.api.jsonApiKey },
    });
  }

  get(...args) {
    return this._api.get(...args)
      .then((response) => response.data);
  }

  post(...args) {
    return this._api.post(...args)
      .then((response) => response.data);
  }
}

const requestapi = new RequestApi();
export default requestapi;

export {
  RequestApi,
};
