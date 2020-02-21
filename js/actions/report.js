import assert from 'assert';
import axios from 'axios';
import settings from 'settings';

import dispatcher from '../util/dispatcher';
import jsonapi from '../util/json_api';
import localapi from '../util/local_api';
import date from '../util/current_date';
import { FoiaAnnualReportRequestBuilder } from '../util/foia_annual_report_request_builder';
import annualReportDataFormStore from '../stores/annual_report_data_form';
import { List } from 'immutable';

// Action types to identify an action
export const types = {
  AGENCY_FINDER_DATA_FETCH: 'AGENCY_FINDER_DATA_FETCH',
  AGENCY_FINDER_DATA_RECEIVE: 'AGENCY_FINDER_DATA_RECEIVE',
  AGENCY_FINDER_DATA_COMPLETE: 'AGENCY_FINDER_DATA_COMPLETE',
  AGENCY_COMPONENT_FETCH: 'AGENCY_COMPONENT_FETCH',
  AGENCY_COMPONENT_RECEIVE: 'AGENCY_COMPONENT_RECEIVE',
  ANNUAL_REPORT_DATA_FETCH: 'ANNUAL_REPORT_DATA_FETCH',
  ANNUAL_REPORT_DATA_RECEIVE: 'ANNUAL_REPORT_DATA_RECEIVE',
  ANNUAL_REPORT_DATA_COMPLETE: 'ANNUAL_REPORT_DATA_COMPLETE',
  ANNUAL_REPORT_FISCAL_YEARS_FETCH: 'ANNUAL_REPORT_FISCAL_YEARS_FETCH',
  ANNUAL_REPORT_FISCAL_YEARS_RECEIVE: 'ANNUAL_REPORT_FISCAL_YEARS_RECEIVE',
  ANNUAL_REPORT_FISCAL_YEARS_COMPLETE: 'ANNUAL_REPORT_FISCAL_YEARS_COMPLETE',
  SELECTED_AGENCIES_APPEND_BLANK: 'SELECTED_AGENCIES_APPEND_BLANK',
  SELECTED_AGENCIES_UPDATE: 'SELECTED_AGENCIES_UPDATE',
  ANNUAL_REPORT_DATA_TYPES_FETCH: 'ANNUAL_REPORT_DATA_TYPES_FETCH',
  ANNUAL_REPORT_DATA_TYPES_RECEIVE: 'ANNUAL_REPORT_DATA_TYPES_RECEIVE',
  ANNUAL_REPORT_DATA_TYPES_COMPLETE: 'ANNUAL_REPORT_DATA_TYPES_COMPLETE',
  ANNUAL_REPORT_DATA_TYPE_UPDATE: 'ANNUAL_REPORT_DATA_TYPE_UPDATE',
  ANNUAL_REPORT_DATA_TYPE_FILTER_ADD_GROUP: 'ANNUAL_REPORT_DATA_TYPE_FILTER_ADD_GROUP',
  ANNUAL_REPORT_DATA_TYPE_FIELD_REMOVE: 'ANNUAL_REPORT_DATA_TYPE_FIELD_REMOVE',
  SELECTED_FISCAL_YEARS_UPDATE: 'SELECTED_FISCAL_YEARS_UPDATE',
  SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE: 'SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE',
  SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE_ALL: 'SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE_ALL',
  SELECTED_AGENCY_COMPONENTS_DISCARD_TEMPORARY: 'SELECTED_AGENCY_COMPONENTS_DISCARD_TEMPORARY',
  SELECTED_AGENCY_COMPONENTS_MERGE_TEMPORARY: 'SELECTED_AGENCY_COMPONENTS_MERGE_TEMPORARY',
  SELECTED_AGENCIES_TOGGLE_SELECT_ALL: 'SELECTED_AGENCIES_TOGGLE_SELECT_ALL',
  ANNUAL_REPORT_AGENCY_COMPONENT_REMOVE: 'ANNUAL_REPORT_AGENCY_COMPONENT_REMOVE',
  ANNUAL_REPORT_DATA_TYPE_FILTER_UPDATE: 'ANNUAL_REPORT_DATA_TYPE_FILTER_UPDATE',
  ANNUAL_REPORT_DATA_TYPE_FILTER_SUBMIT: 'ANNUAL_REPORT_DATA_TYPE_FILTER_SUBMIT',
  ANNUAL_REPORT_DATA_TYPE_FILTER_RESET: 'ANNUAL_REPORT_DATA_TYPE_FILTER_RESET',
  ANNUAL_REPORT_DATA_TYPE_FILTER_REMOVE: 'ANNUAL_REPORT_DATA_TYPE_FILTER_REMOVE',
  VALIDATE_FORM: 'VALIDATE_FORM',
  REPORT_SUBMISSION_TYPE: 'REPORT_SUBMISSION_TYPE',
};

// Action creators, to dispatch actions
export const reportActions = {
  fetchAgencyFinderData(includeReferenceFields = null) {
    dispatcher.dispatch({
      type: types.AGENCY_FINDER_DATA_FETCH,
    });

    const referenceFields = includeReferenceFields || {
      agency_component: ['title', 'abbreviation', 'agency', 'field_rep_start'],
      agency: ['name', 'abbreviation', 'description', 'category'],
      'agency.category': ['name'],
    };

    const request = jsonapi.params();
    Object.keys(referenceFields).forEach((field) => {
      if (field !== 'agency_component') {
        request.include(field);
      }
      request.fields(field, referenceFields[field]);
    });

    return request
      .filter('rep_start', 'field_rep_start', date.getCurrentDate('-'))
      .operator('rep_start', '<=')
      .limit(50) // Maximum allowed by drupal
      .paginate('/agency_components', reportActions.receiveAgencyFinderData)
      .then(reportActions.completeAgencyFinderData);
  },

  receiveAgencyFinderData(agencyComponents) {
    dispatcher.dispatch({
      type: types.AGENCY_FINDER_DATA_RECEIVE,
      agencyComponents,
    });

    return Promise.resolve(agencyComponents);
  },

  completeAgencyFinderData() {
    dispatcher.dispatch({
      type: types.AGENCY_FINDER_DATA_COMPLETE,
    });

    return Promise.resolve();
  },

  fetchAgencyComponent(agencyComponentId) {
    assert(agencyComponentId, 'You must provide an agencyComponentId to fetchAgencyComponent.');
    dispatcher.dispatch({
      type: types.AGENCY_COMPONENT_FETCH,
      agencyComponentId,
    });

    return jsonapi.params()
      .include('agency')
      .include('field_misc')
      .include('foia_officers')
      .include('paper_receiver')
      .include('public_liaisons')
      .include('request_form')
      .include('service_centers')
      .get(`/agency_components/${agencyComponentId}`);
  },

  receiveAgencyComponent(agencyComponent) {
    dispatcher.dispatch({
      type: types.AGENCY_COMPONENT_RECEIVE,
      agencyComponent,
    });

    return Promise.resolve(agencyComponent);
  },

  fetchAnnualReportDataFiscalYears() {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_FISCAL_YEARS_FETCH,
    });

    const request = axios.create({
      baseURL: settings.api.jsonApiBaseURL,
      headers: { 'X-Api-Key': settings.api.jsonApiKey },
    });

    return request
      .get('/annual_foia_report/fiscal_years')
      .then(response => response.data || [])
      .then(reportActions.receiveAnnualReportFiscalYearsData)
      .then(reportActions.completeAnnualReportFiscalYearsData);
  },

  receiveAnnualReportFiscalYearsData(fiscalYears) {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_FISCAL_YEARS_RECEIVE,
      fiscalYears,
    });

    return Promise.resolve(fiscalYears);
  },

  completeAnnualReportFiscalYearsData() {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_FISCAL_YEARS_COMPLETE,
    });

    return Promise.resolve();
  },

  fetchAnnualReportDataTypes() {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPES_FETCH,
    });

    return localapi.annualReportDataTypes()
      .then(reportActions.receiveAnnualReportDataTypes)
      .then(reportActions.completeAnnualReportDataTypes);
  },

  receiveAnnualReportDataTypes(annualReportDataTypes) {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPES_RECEIVE,
      annualReportDataTypes,
    });

    return Promise.resolve();
  },

  completeAnnualReportDataTypes() {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_TYPES_COMPLETE,
    });

    return Promise.resolve();
  },

  updateSelectedFiscalYears(data) {
    dispatcher.dispatch({
      type: types.SELECTED_FISCAL_YEARS_UPDATE,
      data,
    });

    // @todo: Do we need to resolve with any meaningful data here? For now,
    // returning an empty promise for parity with other actions.
    return Promise.resolve();
  },

  validateForm() {
    dispatcher.dispatch({
      type: types.VALIDATE_FORM,
    });

    return Promise.resolve();
  },

  /**
   * Makes a base report api request with the correct events dispatched
   * while allowing the request to be modified before sending.
   *
   * @param {Function | null} modifier
   *   An optional function that will get the JsonapiParams request object.
   *   This function allows modifications to the request such as adding filters
   *   or limits.  The function must return the updated request object.
   *
   * @see js/util/json_api_params.js
   * @see js/stores/annual_report_data_types.js
   * @see www.foia.gov/api/annual-report-form/report_data_map.json
   */
  fetchAnnualReportData(dataTypes = {}) {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_FETCH,
      typesCount: Object.keys(dataTypes).length || 0,
    });


    Object.keys(dataTypes).forEach((key) => {
      let builder = new FoiaAnnualReportRequestBuilder();
      // The default limit could be updated in the
      // modifier function if it needs to be.
      builder.request.limit(5);
      builder = this.buildRequestForSelectedType(dataTypes[key], builder);

      return builder
        .request
        .paginate('/annual_foia_report', reportActions.receiveAnnualReportData)
        .then(reportActions.completeAnnualReportData);
    });
  },

  /**
   * Add filters and include fields to a request based on the form state.
   *
   * @param type
   * @param builder
   * @returns {FoiaAnnualReportRequestBuilder}
   */
  buildRequestForSelectedType(type, builder) {
    const selectedAgencies = annualReportDataFormStore.buildSelectedAgencies();
    const { allAgenciesSelected, selectedFiscalYears } = annualReportDataFormStore.getState();
    const agencies = selectedAgencies.filter(selection => selection.type === 'agency');
    const components = selectedAgencies.filter(selection => selection.type === 'agency_component');
    const dataTypeFilters = type
      .filter(selection => selection.filter.applied || false)
      .map(selection => selection.filter);
    const includeOverall = agencies.filter((agency) => {
      const overall = agency
        .components
        .filter(component => component.selected && component.isOverall);

      return List.isList(overall) ? overall.size > 0 : overall.length > 0;
    }).length > 0;

    let updatedBuilder = builder;
    if (includeOverall) {
      updatedBuilder = updatedBuilder.includeOverallFields(type);
    }

    if (!allAgenciesSelected) {
      updatedBuilder = updatedBuilder
        .includeDataTypes(type)
        .addOrganizationsGroup({
          agencies: agencies.map(agency => agency.abbreviation),
          components: components.map(component => component.abbreviation),
        });
    }

    return updatedBuilder
      .addDataTypeFiltersGroup(dataTypeFilters)
      .addFiscalYearsGroup(selectedFiscalYears);
  },

  receiveAnnualReportData(annualReports) {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_RECEIVE,
      annualReports,
    });
    return Promise.resolve(annualReports);
  },

  completeAnnualReportData() {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_COMPLETE,
    });

    return Promise.resolve();
  },
};
