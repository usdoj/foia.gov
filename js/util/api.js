import axios from 'axios';
import settings from 'settings';

class Api {
  constructor(baseURL) {
    this._api = axios.create({
      baseURL: baseURL || settings.api.baseURL,
    });
  }

  get(...args) {
    return this._api.get(...args)
      .then(response => response.data);
  }
}

const api = new Api();
export default api;

export {
  Api,
};
