import annualReportDataTypesStore from '../stores/annual_report_data_types';

/**
 * Utility functions for working with report data.
 */
class FoiaAnnualReportUtilities {
  /**
   * Given a report and data type, flattens out and merges the data into an array of
   * objects that can be used by tabulator.
   *
   * @param {Map} report
   *   A report retrieved from the api.
   * @param {Object} dataType
   *   A dataType object as defined in report_data_map.json.
   * @returns {{}}
   *   An array of objects where drupal paragraph data has been flattened for use by tabulator.
   *   Example:
   *   [
   *     {
   *       field_agency_component: 'BIS',
   *       field_statute_iv: {
   *         field_case_citation: "Sussman v. USMS, 494 F.3d",
   *         field_statute: "Some statute name",
   *         field_total_num_relied_by_agency: 30
   *         field_type_of_info_withheld: "Type of info",
   *         field_agency_component_inf: {
   *           field_num_relied_by_agency_comp: 4,
   *         }
   *       }
   *     }
   *     ...
   *   ]
   */
  static getDataForType(report, dataType) {
    // By default, data can safely merge fields into an object keyed
    // by component abbreviation.  This will, if required by the data type,
    // zip data from multiple report fields into a single object
    // based on the component abbreviation.
    // The data types below that don't follow the default convention have
    // nested data that, when flattened out, can result in multiple rows
    // per component.  These must be merged on a unique identifying key
    // that is not the component abbreviation so that multiple rows per
    // component don't overwrite and merge together in unexpected ways.
    if (dataType.id === 'group_vi_c_3_reasons_for_denial_') {
      return FoiaAnnualReportUtilities.mergeBy(
        report,
        dataType,
        'field_admin_app_vic3.field_admin_app_vic3_info.field_desc_oth_reasons.value',
      );
    }

    if (dataType.id === 'group_v_b_2_disposition_of_foia_') {
      return FoiaAnnualReportUtilities.mergeBy(
        report,
        dataType,
        'field_foia_requests_vb2.field_foia_req_vb2_info.field_desc_oth_reasons.value',
      );
    }

    if (dataType.id === 'group_iv_exemption_3_statutes') {
      return FoiaAnnualReportUtilities.mergeBy(
        report,
        dataType,
        'field_statute_iv.field_statute',
      );
    }

    return FoiaAnnualReportUtilities.mergeBy(report, dataType, 'field_agency_component');
  }

  /**
   * Flattens any field data required by the data type, then merges field data that shares
   * a unique identifier.
   *
   * @param {Map} report
   *   A report retrieved from the api.
   * @param {Object} dataType
   *   A dataType object as defined in report_data_map.json.
   * @param {string} idPath
   *   A path to a unique field that can be used as an identifier, in dot notation.
   * @returns {{}}
   *   An array of objects where drupal paragraph data has been flattened for use by tabulator.
   *   See the example return value for FoiaAnnualReportUtilities.getDataByType().
   */
  static mergeBy(report, dataType, idPath) {
    const data = FoiaAnnualReportUtilities.flattenFields(report, dataType);
    // Zips into an array where values that share the same unique id based
    // on the idPath are merged into the same object.
    return Object.keys(data).reduce((zipped, key) => {
      const values = data[key] || [];
      values.forEach((value) => {
        const id = FoiaAnnualReportUtilities.buildRowId(idPath, value);
        if (id === false) {
          return;
        }

        const component = zipped[id] || {};
        zipped[id] = Object.assign(component, value);
      });

      return zipped;
    }, {});
  }

  /**
   * Flattens any field included by a data type.
   *
   * Most cases will include data from a single field and only need to lift
   * the component abbreviation to each data object in a field.  There are edge cases
   * that contain nested arrays.  In these cases the top level data has to be merged
   * into every nested object, creating a row for each nested array item.
   *
   * @param {Map} report
   *   A report retrieved from the api.
   * @param {Object} dataType
   *   A dataType object as defined in report_data_map.json.
   * @returns {Object}
   *   An object containing the flattened values for each top level include of the
   *   data type.
   * @see report_data_map.json
   */
  static flattenFields(report, dataType) {
    // Only deal with the includes that are report field.
    // Nested data will be flattened later.
    const fields = annualReportDataTypesStore.getIncludesForDataType(dataType.id)
      .filter(field => field.split('.').length === 1);

    return fields.reduce((values, field) => {
      // Check for nested values that can be flattened and build an array
      // of field objects.  If there are no nested values to flatten, the
      // data variable will be equivalent to report.get(field).
      const data = report.get(field).reduce((flattened, fieldValue) => (
        flattened.concat(...FoiaAnnualReportUtilities.maybeFlatten(fieldValue))
      ), []);

      // Lift the component value up to each data object since tabulator will
      // expect a field_agency_component field directly on each row.
      const transformed = FoiaAnnualReportUtilities.mergeComponent(
        data,
        field,
      );
      const allTransformed = values[field] || [];
      allTransformed.push(...transformed);
      values[field] = allTransformed;

      return values;
    }, {});
  }

  /**
   * Lift the component abbreviation up to sit directly on a data object.
   *
   * @param {Array} data
   *   An array of component data objects.
   * @param {string} parent
   *   This data's parent field.
   * @returns {*[]|*}
   */
  static mergeComponent(data = [], parent) {
    if (!Array.isArray(data)) {
      return data;
    }

    return data.reduce((collected, value) => {
      const component = FoiaAnnualReportUtilities.retrieveComponent(value);
      if (!component) {
        return collected;
      }
      const compiled = {};
      compiled[parent] = value;
      compiled.field_agency_component = component;

      return collected.concat(compiled);
    }, []);
  }

  /**
   * Retrieve a component abbreviation from the data objects that
   * will be encountered once component data has been flattened.
   *
   * @param {Object} raw
   *   A component data object.
   * @returns {string|boolean}
   *   The component abbreviation or false.
   */
  static retrieveComponent(raw) {
    let value = raw;
    // In most successful cases, the data passed to this method is an object that contains,
    // a field_agency_component.abbreviation value. Statute data nests the field_agency_component
    // within a field_agency_component_inf object, so lift the agency component information
    // from there before continuing.
    if (Object.prototype.hasOwnProperty.call(value, 'field_agency_component_inf')) {
      value = value.field_agency_component_inf;
    }

    if (!Object.prototype.hasOwnProperty.call(value, 'field_agency_component')) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(value.field_agency_component, 'abbreviation')) {
      return false;
    }

    return value.field_agency_component.abbreviation;
  }

  /**
   * Build a unique row id from component data based on a given field.
   *
   * @param {string} fieldPath
   *   A path to a value that is unique for the data in this object, in dot notation.
   * @param {Object} flatRow
   *   A component data object that has already been flattened (no nested arrays).
   * @returns {string|boolean}
   */
  static buildRowId(fieldPath, flatRow) {
    const parts = fieldPath.split('.');
    let uniqueId = flatRow;
    while (parts.length > 0) {
      const field = parts.shift();
      uniqueId = uniqueId[field] || null;
      if (uniqueId === null) {
        return false;
      }
    }
    // In many cases, the field path will be only the component.
    // There is no need to double that string in the key.
    if (uniqueId !== flatRow.field_agency_component) {
      uniqueId = `${flatRow.field_agency_component}_${uniqueId}`;
    }

    return uniqueId
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
  }

  /**
   * Checks if a piece of raw data has nested arrays of data, and flattens
   * the nested data if required.
   *
   * @param {Object} raw
   *   Raw component data from a report field.
   * @returns {{}[]|*[]}
   */
  static maybeFlatten(raw = {}) {
    const shouldFlatten = Object.keys(raw).filter(key => Array.isArray(raw[key]));
    if (shouldFlatten.length <= 0) {
      return [raw];
    }

    return shouldFlatten.reduce((data, key) => (
      data.concat(...FoiaAnnualReportUtilities.flatten(raw, key))
    ), []);
  }

  /**
   * Loops nested data in an objects field, merging (flattening) with the raw
   * parent data.
   *
   * @param {Object} raw
   *   An object containing nested data that needs to be flattened.
   * @param {String} field
   *   A field name in the raw data object that contains an array of values.
   * @returns {{}[]|*}
   */
  static flatten(raw = {}, field) {
    const data = raw[field] || false;
    if (data === false || !Array.isArray(data) || data.length <= 0) {
      return [raw];
    }

    return data.map((value) => {
      const newValue = Object.assign({}, raw);
      newValue[field] = value;

      return newValue;
    });
  }

  /**
   * Recurse into a data object, fixing text values from the drupal api where the field
   * value is an object and the value that should be displayed is at {value: 'some value'}.
   *
   * @param {Object} data
   *   A data object.
   * @returns {{}|*}
   */
  static normalize(data) {
    if (Array.isArray(data)) {
      return data.map(value => FoiaAnnualReportUtilities.normalize(value));
    }
    if (data === null) {
      return data;
    }
    if (typeof data !== 'object') {
      return data;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'value')) {
      return data.value;
    }

    return Object.keys(data).reduce((normalized, key) => {
      normalized[key] = FoiaAnnualReportUtilities.normalize(data[key]);

      return normalized;
    }, {});
  }
}

export default FoiaAnnualReportUtilities;
