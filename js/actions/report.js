import assert from 'assert';
import axios from 'axios';
import settings from 'settings';
import { List } from 'immutable';

import dispatcher from '../util/dispatcher';
import jsonapi from '../util/json_api';
import localapi from '../util/local_api';
import date from '../util/current_date';
import reportRequestBuilder from '../util/foia_annual_report_request_builder';

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
  SELECTED_FISCAL_YEARS_UPDATE: 'SELECTED_FISCAL_YEARS_UPDATE',
  SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE: 'SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE',
  SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE_ALL: 'SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE_ALL',
  SELECTED_AGENCY_COMPONENTS_DISCARD_TEMPORARY: 'SELECTED_AGENCY_COMPONENTS_DISCARD_TEMPORARY',
  SELECTED_AGENCY_COMPONENTS_MERGE_TEMPORARY: 'SELECTED_AGENCY_COMPONENTS_MERGE_TEMPORARY',
  ANNUAL_REPORT_DATA_TYPE_FILTER_UPDATE: 'ANNUAL_REPORT_DATA_TYPE_FILTER_UPDATE',
  ANNUAL_REPORT_DATA_TYPE_FILTER_SUBMIT: 'ANNUAL_REPORT_DATA_TYPE_FILTER_SUBMIT',
  ANNUAL_REPORT_DATA_TYPE_FILTER_RESET: 'ANNUAL_REPORT_DATA_TYPE_FILTER_RESET',
  ANNUAL_REPORT_DATA_TYPE_FILTER_REMOVE: 'ANNUAL_REPORT_DATA_TYPE_FILTER_REMOVE',
  AGENCY_COMPONENT_FIELD_HAS_ERRORS: 'AGENCY_COMPONENT_FIELD_HAS_ERRORS',
  DATA_TYPE_FIELD_HAS_ERRORS: 'DATA_TYPE_FIELD_HAS_ERRORS',
  FISCAL_YEAR_FIELD_HAS_ERRORS: 'FISCAL_YEAR_FIELD_HAS_ERRORS',
  FORM_HAS_ERRORS: 'FORM_HAS_ERRORS',
  GET_TABLE_DATA_TYPES: 'GET_TABLE_DATA_TYPES',
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

  validateAgencyComponentField(selection) {
    dispatcher.dispatch({
      type: types.AGENCY_COMPONENT_FIELD_HAS_ERRORS,
      selectedAgency: selection,
    });

    return Promise.resolve();
  },

  validateDataTypeField() {
    dispatcher.dispatch({
      type: types.DATA_TYPE_FIELD_HAS_ERRORS,
    });

    return Promise.resolve();
  },

  validateFiscalYearsField() {
    dispatcher.dispatch({
      type: types.FISCAL_YEAR_FIELD_HAS_ERRORS,
    });

    return Promise.resolve();
  },

  returnFieldValidationStateOnSubmit() {
    dispatcher.dispatch({
      type: types.FORM_HAS_ERRORS,
    });

    return Promise.resolve();
  },

  getTableDataTypes(dataTypeOptions) {
    dispatcher.dispatch({
      type: types.GET_TABLE_DATA_TYPES,
      dataTypeOptions,
    });

    return Promise.resolve();
  },

  /**
   * Get reports from the api, only including fields from the named sections.
   *
   * @param {List<string> | Array<string>} sections
   *   A list of the section names to retrieve, which will be transformed into
   *   a map of includes and fields on the jsonapi request.
   * @param {Boolean} agencyOverall
   *   A boolean to determine if the request should include the agency overall
   *   fields if the section.
   * @param {Function | null} modifier
   *   An optional function that will get the JsonapiParams request object.
   *   This function allows modifications to the request such as adding filters
   *   or limits.  The function must return the updated request object.
   * @returns {PromiseLike<T> | Promise<T> | *}
   *
   * @see js/util/json_api_params.js
   * @see js/stores/annual_report_data_types.js
   * @see www.foia.gov/api/annual-report-form/report_data_map.json
   */
  fetchAnnualReportData(sections = List(), agencyOverall = true, modifier = null) {
    dispatcher.dispatch({
      type: types.ANNUAL_REPORT_DATA_FETCH,
    });

    // The default limit could be updated in the
    // modifier function if it needs to be.
    let builder = reportRequestBuilder;
    builder.request.limit(5);
    builder = builder.includeSections(sections, agencyOverall);

    if (modifier && typeof modifier === 'function') {
      builder = modifier(builder);
    }

    return builder
      .request
      .paginate('/annual_foia_report', reportActions.receiveAnnualReportData)
      .then(reportActions.completeAnnualReportData);
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
