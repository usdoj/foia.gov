/*
 * JsonApi
 *
 * Client to talk to the Drupal JSON API for FOIA.
 * https://www.drupal.org/docs/8/modules/json-api/json-api
 */

import axios from 'axios';
import { buildQueryString as serialize } from 'd8-jsonapi-querystring';
import { parse } from 'jsonapi-parse';

import settings from 'settings';
import JsonApiParams from './json_api_params';

function finalize(response) {
  // Bug where webform id is returned in attributes, it get's overridden by our
  // parse library. This is a bug in the json-api module since having an
  // attribute named `id` or `type` is not allowed.
  // http://jsonapi.org/format/#document-resource-object-fields
  if (response.data && response.data.included) {
    try {
      response.data.included.forEach((entity, index, included) => {
        if (entity.type !== 'webform') {
          return;
        }

        // Copy attributes id to formId
        const webform = included[index];
        webform.attributes.formId = webform.attributes.id;
      });
    } catch (error) {
      // Log the error and continue
      console.error('Failed to parse webform id attributes', error); // eslint-disable-line
    }
  }

  return parse(response.data).data;
}

function noop() { }

class JsonApi {
  constructor(baseURL) {
    this._api = axios.create({
      baseURL: baseURL || settings.api.jsonApiBaseURL,
      headers: { 'X-Api-Key': settings.api.jsonApiKey },
    });
  }

  params() {
    const params = new JsonApiParams();

    // Convenience methods to hook back to the JsonApi so that you can construct
    // params and then call `get` to execute.
    params.get = (path, options = {}) =>
      this.get(path, Object.assign({ params: params._params }, options)) // eslint-disable-line
        .then(finalize);

    params.paginate = (path, _options, _progress) => {
      // TODO this is duplicated, maybe the pagination should just accept
      // jsonApiParams as an argument
      let options = _options;
      let progress = _progress;
      if (typeof _options === 'function') {
        progress = _options;
        options = {};
      }

      return this.paginate(path, Object.assign({ params: params._params }, options), progress || noop); // eslint-disable-line
    };

    return params;
  }

  get(path, options = {}) {
    return this._api.get(path, { paramsSerializer: serialize, ...options });
  }

  /*
   * Paginates over an API response calling progress function with each page of
   * results. The promise is resolved only when all the pages are processed.
   *
   * The function is overloaded so you can pass paginate(path, progress).
   *
   * @param path the url to fetch
   * @param options any options to pass the http client
   * @param progress a function to call with each page of results
   */
  paginate(path, _options, _progress) {
    let options = _options;
    let progress = _progress;
    if (typeof _options === 'function') {
      progress = _options;
      options = {};
    }

    // Set a default no-op progress function
    if (!progress) {
      progress = noop;
    }

    const getPage = (pagePath, pageOptions) => this.get(pagePath, pageOptions)
      .then((response) => {
        progress(finalize(response)); // Process this page

        if (response.data.links && response.data.links.next) {
          return getPage(response.data.links.next.href);
        }

        return null;
      });

    return getPage(path, options);
  }
}

// Export a singleton
const jsonapi = new JsonApi();
export default jsonapi;

export {
  JsonApi,
};
