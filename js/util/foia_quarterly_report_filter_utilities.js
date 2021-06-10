import { AnnualReportStore } from '../stores/annual_report';
import quarterlyReportDataFormStore from '../stores/quarterly_report_data_form';
import quarterlyReportDataTypesStore from '../stores/quarterly_report_data_types';

/**
 * Provides utility functions for comparing rows of data with applied filters.
 */
class FoiaQuarterlyReportFilterUtilities {
  /**
   * Checks that a set of rows pass any of the given set of filters, returning only passing rows.
   *
   * @param {[{}]} rows
   *   An array of row objects.
   * @param {[{}]} filters
   *   An array of data type filter objects.
   * @returns {*}
   */
  static filter(rows, filters) {
    return rows.filter(row => FoiaQuarterlyReportFilterUtilities.passesAny(row, filters));
  }

  /**
   * Checks that a row passes any of the filters.
   *
   * @param {Object} row
   *   A row of component data to be displayed
   * @param {[{}]} filters
   *   An array of data type filter objects.
   * @returns {boolean}
   */
  static passesAny(row, filters) {
    // Don't filter if there are no filters to apply.
    if (filters.length === 0) {
      return true;
    }
    const passes = filters.filter((filter) => {
      const { compareValue, filterField, op } = filter;
      const value = FoiaQuarterlyReportFilterUtilities.getValue(filterField, row);
      return this.compare(op, value, compareValue);
    });

    return passes.length > 0;
  }

  /**
   * Gets filters for a given data type.
   *
   * @param dataTypeId
   * @returns {unknown[]}
   */
  static getFiltersForType(dataTypeId) {
    const selectedDataTypes = [...quarterlyReportDataFormStore.getState().selectedDataTypes];
    return selectedDataTypes
      .filter(type => (
        typeof type.filter === 'object' && type.filter !== null
      ))
      // Filter out any selected data type that doesn't match the passed in data type.
      // This prevents attempting to apply filters to a row where the data type
      // is not the same.
      .filter(type => type.id === dataTypeId)
      .map(type => Object.assign({}, type.filter))
      .filter(filter => filter.applied);
  }

  /**
   * If the only agency component request is overall data, the filters
   * applied should be applied to overall field values.
   *
   * @returns {boolean}
   */
  static filterOnOverallFields() {
    const selectedAgencies = QuarterlyReportStore.getSelectedAgencies();
    const requestsComponents = Object.keys(selectedAgencies).filter((key) => {
      const agency = selectedAgencies[key];
      const hasComponents = agency
        .filter(component => component.toLowerCase() !== 'agency overall');
      return hasComponents.length > 0;
    });

    return requestsComponents.length <= 0;
  }

  /**
   * Sets a filter's filterField string to the fields corresponding overall field.
   *
   * By default filters are applied against a field id from report_data_map.json file.
   * If only overall data is being requested on the front end, the filters should be applied
   * against a field's corresponding overall_field.
   *
   * @param {[{}]} filters
   *   An array of data type filters.
   * @param {string} dataTypeId
   *   A data type id.
   * @returns {*}
   */
  static transformToOverallFilters(filters, dataTypeId) {
    const fields = quarterlyReportDataTypesStore.getFieldsForDataType(dataTypeId);
    return filters.map((filter) => {
      const field = fields
        .filter(data => data.id === filter.filterField.replace(/\.value$/i, ''));
      if (field.length <= 0) {
        return filter;
      }

      // There is one case in the report_data_map.json file where a field is
      // filterable, but does not have an overall field.  In this case, do not
      // attempt to filter on an overall field, leaving the filter as it is.
      if (field[0].filter && field[0].overall_field !== false) {
        const isTextField = filter.filterField.match(/\.value$/i) !== null;
        filter.filterField = isTextField ? `${field[0].overall_field}.value` : field[0].overall_field;
      }
      return filter;
    }).filter(filter => filter !== false);
  }

  /**
   * Given an operation and two values, compares the two values.
   *
   * @param op
   * @param value
   * @param comparison
   * @returns {boolean}
   */
  static compare(op, value, comparison) {
    switch (op) {
      case 'greater_than': {
        return this.convertToNumber(value) > this.convertToNumber(comparison);
      }
      case 'less_than': {
        return this.convertToNumber(value) < this.convertToNumber(comparison);
      }
      case 'equal_to': {
        return this.convertToNumber(value) === this.convertToNumber(comparison);
      }
      case 'is_na': {
        return typeof value === 'string' && value.toLowerCase() === 'n/a';
      }
      default: {
        return false;
      }
    }
  }

  /**
   * Converts strings and special values to numbers.
   *
   * @param {String} value
   *   A string representing a numeric value.
   * @returns {number}
   *   A number.
   */
  static convertToNumber(value) {
    switch (String(value).toLowerCase()) {
      case '<1':
        return Number(0.1);

      default:
        return Number(value);
    }
  }

  /**
   * Recurses into an object to get a value at a given path.
   *
   * @param {string} path
   *   The path to get a value from, in dot notation.
   * @param {Object} object
   *   The object to recurse into.
   * @returns {*}
   */
  static getValue(path, object) {
    const parts = path.split('.');
    const field = parts.shift();
    if (parts.length === 0) {
      return object[field];
    }

    const next = object[field] || {};
    return this.getValue(parts.join('.'), next);
  }
}

export default FoiaQuarterlyReportFilterUtilities;
