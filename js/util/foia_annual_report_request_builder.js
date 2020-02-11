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
   * @param {array | List } sections
   *   An array of section group ids that can be retrieved from
   *   the annualReportDataTypesStore.
   * @param {boolean} withOverallData
   *   A boolean indicating whether or not to include agency overall fields in the request.
   * @returns {FoiaAnnualReportRequestBuilder}
   */
  includeSections(sections, withOverallData = true) {
    const dataTypes = Array.isArray(sections) || List.isList(sections)
      ? List(sections)
      : List([]);

    const includes = FoiaAnnualReportRequestBuilder.getSectionIncludes(dataTypes);
    const fields = FoiaAnnualReportRequestBuilder.getSectionFields(dataTypes, withOverallData);

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

  static getSectionFields(dataTypes, withOverallData = true) {
    return dataTypes.reduce((entities, section) => {
      if (!Object.prototype.hasOwnProperty.call(section, 'fields')) {
        return entities;
      }

      let sectionFields = section.fields.map(item => item.id).filter(item => item !== false);
      if (withOverallData) {
        sectionFields = sectionFields.concat(
          section
            .fields
            .map(item => item.overall_field)
            .filter(item => item !== false),
        );
      }

      const includesForType = annualReportDataTypesStore.getIncludesForDataType(section.id);
      if (includesForType.length > 0) {
        sectionFields = sectionFields.concat(
          includesForType.filter(value => value.split('.').length > 1),
        ).filter((value, index, array) => array.indexOf(value) === index);
      }


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
    }, {});
  }
}


// Export a singleton
const reportRequestBuilder = new FoiaAnnualReportRequestBuilder();
export default reportRequestBuilder;

export {
  FoiaAnnualReportRequestBuilder,
};
