/*
 * JsonApi
 *
 * Client to talk to the Drupal JSON API for FOIA.
 * https://www.drupal.org/docs/8/modules/json-api/json-api
 */

import { buildQueryString as serialize } from 'd8-jsonapi-querystring';
import { parse } from 'jsonapi-parse';

import settings from 'settings';
import { Api } from './api';
import JsonApiParams from './json_api_params';


class JsonApi extends Api {
  constructor(baseURL) {
    super(baseURL || settings.api.jsonApiBaseURL);
  }

  params() {
    const params = new JsonApiParams();

    // A convenience method to hook back to the JsonApi so that you can construct
    // params and then call `get` to execute.
    params.get = (path, options = {}) =>
      this.get(path, Object.assign({ params: params._params }, options)); // eslint-disable-line
    return params;
  }

  get(path, options = {}) {
    return this._api.get(path, Object.assign({
      paramsSerializer: serialize,
      transformResponse: [parse, response => response.data],
    }, options))
      .then(response => response.data);
  }
}


// Export a singleton
const jsonapi = new JsonApi();
export default jsonapi;

export {
  JsonApi,
};
