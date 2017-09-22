import { buildQueryString as serialize } from 'd8-jsonapi-querystring';
import Api from './api';

function defaults() {
  return {
    _format: 'api_json',
  };
}


class JsonApiParams {
  constructor(baseURL) {
    this._params = defaults();
    this._api = new Api(baseURL);
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
