import annualReportDataFormStore from '../stores/annual_report_data_form';

/**
 * Provides utility functions for comparing rows of data with applied filters.
 */
class FoiaAnnualReportFilterUtilities {
  static filterByDataTypeConditions(rows, filters) {
    return rows.filter(row => FoiaAnnualReportFilterUtilities.passesAny(row, filters));
  }

  /**
   * Checks that a row passes any of the filters.
   *
   * @param row
   * @param filters
   * @returns {boolean}
   */
  static passesAny(row, filters) {
    const passes = filters.filter((filter) => {
      const { compareValue, filterField, op } = filter;
      const value = FoiaAnnualReportFilterUtilities.getValue(filterField, row);
      return this.compare(op, value, compareValue);
    });

    return passes.length > 0;
  }

  /**
   * Gets all applied data type filters from the form state.
   *
   * @returns {unknown[]}
   */
  static getFiltersFromSelectedDataTypes() {
    const selectedDataTypes = [...annualReportDataFormStore.getState().selectedDataTypes];
    return selectedDataTypes
      .filter(type => (typeof type.filter === 'object' && type.filter !== null))
      .map(type => type.filter)
      .filter(filter => filter.applied);
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
        return value.toLowerCase() === 'n/a';
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

export default FoiaAnnualReportFilterUtilities;
