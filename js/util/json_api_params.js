/*
 * JsonApiParams
 *
 * Incomplete DSL to construct queries against the Drupal json-api module.
 * https://www.drupal.org/docs/8/modules/json-api/json-api
 */

import assert from 'assert';

import { buildQueryString as serialize } from 'd8-jsonapi-querystring';


function defaults() {
  return {};
}

class JsonApiParams {
  constructor(api) {
    this._params = defaults();
    this._api = api;
    this._groupId = 0;
  }

  get(...args) {
    return this._api.get(...args);
  }

  include(entity) {
    const include = this._params.include || [];
    include.push(entity);
    this._params.include = include;

    return this;
  }

  includeMultiple(entities) {
    const include = this._params.include || [];
    this._params.include = include
      .concat(entities)
      .filter((value, index, array) => array.indexOf(value) === index);

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

  offset(offset) {
    const page = this._params.page || {};
    page.offset = offset;

    this._params.page = page;
    return this;
  }

  limit(limit) {
    const page = this._params.page || {};
    page.limit = limit;

    this._params.page = page;
    return this;
  }

  // https://www.drupal.org/docs/8/modules/json-api/collections-filtering-sorting-and-paginating
  filter(name, path, value) {
    const filter = this._params.filter || {};

    if (value === undefined) {
      // Only path and value given, rearrange params for shorthand syntax
      /* eslint-disable no-param-reassign */
      value = path;
      path = name;
      name = null;
      /* eslint-enable no-param-reassign */

      filter[path] = {
        value,
      };


      this._params.filter = filter;
      return this;
    }

    // Longform syntax
    filter[name] = {
      condition: {
        path,
        value,
      },
    };

    this._params.filter = filter;
    return this;
  }

  or(...filterNames) {
    const group = `or-filter-${++this._groupId}`;
    return this._group(group, 'OR', ...filterNames);
  }

  and(...filterNames) {
    const group = `and-filter-${++this._groupId}`;
    return this._group(group, 'AND', ...filterNames);
  }

  _group(group, conjunction, ...filterNames) {
    const filter = this._params.filter;
    assert(filter, 'You must define your named filters before assigning them a group.');

    // Add each filter to the group
    filterNames.forEach((filterName) => {
      assert(filter[filterName]);

      const condition = filter[filterName].condition;
      assert(condition);

      condition.memberOf = group;
    });

    // Define the group operation
    filter[group] = {
      group: { conjunction },
    };

    return this;
  }

  operator(filterName, operator) {
    const filter = this._params.filter;
    assert(filter, 'You must define your named filters before assigning them an operator.');

    filter[filterName].condition.operator = operator;

    return this;
  }

  contains(path, value) {
    const filterName = `${path}-filter`;

    // Create the longform filter
    this.filter(filterName, path, value);

    // Set the operator
    this.operator(filterName, 'CONTAINS');

    return this;
  }

  serialize() {
    return serialize(this._params);
  }
}


export default JsonApiParams;
