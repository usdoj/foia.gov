import { buildQueryString as serialize } from 'd8-jsonapi-querystring';
import { parse } from 'jsonapi-parse';

function defaults() {
  return {
    _format: 'api_json',
  };
}

class JsonApiParams {
  constructor(api) {
    if (!api) {
      throw new Error('You must provide and api instance to JsonApiParams');
    }

    this._params = defaults();
    this._api = api;
  }

  get(path) {
    return this._api.get(path, {
      params: this._params,
      paramsSerializer: serialize,
      transformResponse: parse,
    })
      .then(response => response.data);
  }

  include(entity) {
    const include = this._params.include || [];
    include.push(entity);
    this._params.include = include;

    return this;
  }

  fields(entity, fields) {
    if (!this._params.fields) {
      this._params.fields = {};
    }

    const entityFields = this._params.fields[entity] || [];
    this._params.fields[entity] = entityFields.concat(fields);

    return this;
  }

  serialize() {
    return serialize(this._params);
  }
}


export default JsonApiParams;
