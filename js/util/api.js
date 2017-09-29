import axios from 'axios';
import JsonApiParams from './json_api';

class Api {
  constructor(baseURL) {
    this._api = axios.create({
      baseURL,
    });
  }

  params() {
    return new JsonApiParams(this._api);
  }

  get(...args) {
    return this._api.get(...args)
      .then(response => response.data);
  }
}

export default Api;
