import axios from 'axios';

class Api {
  constructor(baseURL) {
    this._api = axios.create({
      baseURL,
    });
  }

  get(url) {
    return this._api.get(url)
      .then(response => response.data);
  }
}

export default Api;
