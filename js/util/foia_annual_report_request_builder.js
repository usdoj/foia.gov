import assert from 'assert';
import { List } from 'immutable';
import { JsonApi } from './json_api';
import annualReportDataTypesStore from '../stores/annual_report_data_types';

class FoiaAnnualReportRequestBuilder extends JsonApi {
  constructor(baseUrl) {
    super(baseUrl);

    this.request = this.params();
    // Set default include fields.
    this.includeFields({
      annual_foia_report_data: ['title', 'field_foia_annual_report_yr', 'field_agency', 'field_agency_components'],
      field_agency: ['name', 'abbreviation'],
      field_agency_components: ['title'],
    });
  }

  /**
   * Add agency or component abbreviations in an OR condition group.
   *
   * @param { object } abbreviations
   *   An object with agencies and components keys which are arrays of abbreviations.
   *   Example:
   *   {
   *     agencies: ['DOJ', 'NASA'],
   *     components: ['OIG', 'FMC'],
   *   }
   * @returns {FoiaAnnualReportRequestBuilder}
   */
  addOrganizationsGroup(abbreviations = {}) {
    let { agencies, components } = abbreviations;
    agencies = Array.isArray(agencies) || List.isList(agencies) ? List(agencies) : List([]);
    components = Array.isArray(components) || List.isList(components) ? List(components) : List([]);
    const filterNames = agencies
      .map(agency => `agency-${agency}`)
      .concat(components.map(component => `component-${component}`));

    if (filterNames.size <= 0) {
      return this;
    }

    this
      .addFiltersFromList(agencies, 'agency', 'field_agency.abbreviation')
      .addFiltersFromList(components, 'component', 'field_agency_components.abbreviation');
    this.request.or(...filterNames.toArray());

    return this;
  }

  addFiscalYearsGroup(fiscalYears) {
    const years = Array.isArray(fiscalYears) || List.isList(fiscalYears)
      ? List(fiscalYears)
      : List([]);

    if (years.size <= 0) {
      return this;
    }

    this.addFiltersFromList(years, 'fiscal-year', 'field_foia_annual_report_yr');
    this.request.or(...years.map(year => `fiscal-year-${year}`).toArray());

    return this;
  }

  addDataTypeFiltersGroup(filters = []) {
    if (filters.length <= 0) {
      return this;
    }

    // Transform the filters, adding an index which will be used when
    // naming the filter for the .request.filter() method and
    // handle the special operator `is_na`.
    const dataTypeFilters = filters
      .map((filter, index) => (
        Object.assign({ index }, filter, {
          op: filter.op === 'is_na' ? 'equal_to' : filter.op,
          compareValue: filter.op === 'is_na' ? 'N/A' : filter.compareValue,
        })
      ));
    const filterNames = dataTypeFilters.map(filter => `data-type-filter-${filter.index}`);
    while (dataTypeFilters.length > 0) {
      const filter = dataTypeFilters.shift();
      this.request = this.request.filter(
        `data-type-filter-${filter.index}`,
        filter.filterField,
        filter.compareValue,
      );
      this.request = this.request.operator(
        `data-type-filter-${filter.index}`,
        FoiaAnnualReportRequestBuilder.getOperator(filter.op),
      );
    }

    this.request.or(...filterNames);

    return this;
  }

  /**
   * Iterates a list of values, adding each as a filter condition with the specified path.
   *
   * @param { List } list
   *   A list of values to filter by that have the same filter path.
   * @param { string } prefix
   *   A prefix that can be used to create and identify a unique group per filter value.
   * @param { string } path
   *   The path to the field value in the drupal jsonapi response, eg 'field_agency.abbreviation'.
   *
   * @returns {FoiaAnnualReportRequestBuilder}
   */
  addFiltersFromList(list, prefix, path) {
    assert(List.isList(list), 'The list parameter must be a List.');

    const iterator = list.values();
    let value = iterator.next();
    while (!value.done) {
      this.request = this.request.filter(`${prefix}-${value.value}`, path, value.value);
      value = iterator.next();
    }

    return this;
  }

  /**
   * Include sections and their fields in the request.
   *
   * @param {array | List } types
   *   An array of data type group ids that can be retrieved from
   *   the annualReportDataTypesStore.
   * @returns {FoiaAnnualReportRequestBuilder}
   */
  includeDataTypes(types) {
    const dataTypes = Array.isArray(types) || List.isList(types)
      ? List(types)
      : List([]);

    const includes = FoiaAnnualReportRequestBuilder.getSectionIncludes(dataTypes);
    const fields = FoiaAnnualReportRequestBuilder.getSectionFields(dataTypes, false);

    this.request.includeMultiple(includes);
    this.includeFields(fields);

    return this;
  }

  includeOverallFields(types) {
    const dataTypes = Array.isArray(types) || List.isList(types)
      ? List(types)
      : List([]);

    const includes = FoiaAnnualReportRequestBuilder.getSectionIncludes(dataTypes);
    const fields = FoiaAnnualReportRequestBuilder.getSectionOverallFields(dataTypes);

    this.request.includeMultiple(includes);
    this.includeFields(fields);

    return this;
  }

  includeFields(fields = {}) {
    if (Object.keys(fields).length > 0) {
      Object.keys(fields).forEach((field) => {
        if (field !== 'annual_foia_report_data') {
          this.request.include(field);
        }
        this.request.fields(field, fields[field]);
      });
    }
    // eslint-disable-next-line
    this.request._params.include = this.request._params.include
      .filter((value, index, array) => array.indexOf(value) === index);
    return this;
  }

  static getSectionIncludes(dataTypes) {
    return dataTypes.reduce((entities, section) => {
      const includesForType = annualReportDataTypesStore.getIncludesForDataType(section.id);
      if (includesForType.length <= 0) {
        return entities;
      }

      entities.push(...includesForType);
      return entities;
    }, []);
  }

  static getSectionFields(dataTypes) {
    return dataTypes.reduce((entities, section) => {
      if (!Object.prototype.hasOwnProperty.call(section, 'fields')) {
        return entities;
      }

      let sectionFields = section.fields.map(item => item.id).filter(item => item !== false);
      const includesForType = annualReportDataTypesStore.getIncludesForDataType(section.id);
      if (includesForType.length > 0) {
        sectionFields = sectionFields.concat(
          includesForType.filter(value => value.split('.').length > 1),
        ).filter((value, index, array) => array.indexOf(value) === index);
      }

      return this.includeSectionFields(sectionFields, entities);
    }, {});
  }

  static getSectionOverallFields(dataTypes) {
    return dataTypes.reduce((entities, section) => {
      if (!Object.prototype.hasOwnProperty.call(section, 'fields')) {
        return entities;
      }

      const sectionFields = section.fields
        .map(item => item.overall_field)
        .filter(item => item !== false);

      return this.includeSectionFields(sectionFields, entities);
    }, {});
  }

  static includeSectionFields(sectionFields, entities) {
    const updatedEntities = entities;
    let include = sectionFields.pop();
    while (include) {
      const path = include.split('.');

      while (path.length > 1) {
        const field = path.pop();
        const entity = path.join('.');
        const entityFields = updatedEntities[entity] || [];
        updatedEntities[entity] = entityFields
          .concat(field)
          .filter((value, index, array) => array.indexOf(value) === index);
      }

      if (path.length === 1) {
        const entityFields = updatedEntities.annual_foia_report_data || [];
        updatedEntities.annual_foia_report_data = entityFields
          .concat(path.pop())
          .filter((value, index, array) => array.indexOf(value) === index);
      }

      include = sectionFields.pop();
    }

    return updatedEntities;
  }

  static getOperator(name) {
    const operators = {
      greater_than: '>',
      less_than: '<',
      equal_to: '=',
    };

    return operators[name] || '=';
  }
}


// Export a singleton
const reportRequestBuilder = new FoiaAnnualReportRequestBuilder();
export default reportRequestBuilder;

export {
  FoiaAnnualReportRequestBuilder,
};
