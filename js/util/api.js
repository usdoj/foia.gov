import axios from 'axios';
import JsonApi from './json_api_params';

class Api {
  constructor(baseURL) {
    this._api = axios.create({
      baseURL,
    });
  }

  params() {
    return new JsonApi(this._api);
  }

  get(...args) {
    return this._api.get(...args)
      .then(response => response.data);
  }
}

export default Api;
