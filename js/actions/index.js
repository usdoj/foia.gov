import assert from 'assert';
import axios from 'axios';
import settings from 'settings';

import dispatcher from '../util/dispatcher';
import jsonapi from '../util/json_api';
import localapi from '../util/local_api';
import requestapi from '../util/request_api';

// Action types to identify an action
export const types = {
  AGENCY_FINDER_DATA_FETCH: 'AGENCY_FINDER_DATA_FETCH',
  AGENCY_FINDER_DATA_RECEIVE: 'AGENCY_FINDER_DATA_RECEIVE',
  AGENCY_FINDER_DATA_COMPLETE: 'AGENCY_FINDER_DATA_COMPLETE',
  AGENCY_COMPONENT_FETCH: 'AGENCY_COMPONENT_FETCH',
  AGENCY_COMPONENT_RECEIVE: 'AGENCY_COMPONENT_RECEIVE',
  ANNUAL_REPORT_FISCAL_YEARS_FETCH: 'ANNUAL_REPORT_FISCAL_YEARS_FETCH',
  ANNUAL_REPORT_FISCAL_YEARS_RECEIVE: 'ANNUAL_REPORT_FISCAL_YEARS_RECEIVE',
  ANNUAL_REPORT_FISCAL_YEARS_COMPLETE: 'ANNUAL_REPORT_FISCAL_YEARS_COMPLETE',
  SELECTED_AGENCIES_APPEND_BLANK: 'SELECTED_AGENCIES_APPEND_BLANK',
  SELECTED_AGENCIES_UPDATE: 'SELECTED_AGENCIES_UPDATE',
  REQUEST_FORM_UPDATE: 'REQUEST_FORM_UPDATE',
  REQUEST_FORM_SUBMIT: 'REQUEST_FORM_SUBMIT',
  REQUEST_FORM_SUBMIT_COMPLETE: 'REQUEST_FORM_SUBMIT_COMPLETE',
  REQUEST_FORM_SUBMIT_PROGRESS: 'REQUEST_FORM_SUBMIT_PROGRESS',
  REQUEST_FORM_SECTIONS_FETCH: 'REQUEST_FORM_SECTIONS_FETCH',
  REQUEST_FORM_SECTIONS_RECEIVE: 'REQUEST_FORM_SECTIONS_RECEIVE',
};

// Action creators, to dispatch actions
export const requestActions = {
  fetchAgencyFinderData(includeReferenceFields = null) {
    dispatcher.dispatch({
      type: types.AGENCY_FINDER_DATA_FETCH,
    });

    const referenceFields = includeReferenceFields || {
      agency_component: ['title', 'abbreviation', 'agency'],
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
      .limit(50) // Maximum allowed by drupal
      .paginate('/agency_components', requestActions.receiveAgencyFinderData)
      .then(requestActions.completeAgencyFinderData);
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
      .then(requestActions.receiveAnnualReportFiscalYearsData)
      .then(requestActions.completeAnnualReportFiscalYearsData);
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

  updateRequestForm(formData) {
    dispatcher.dispatch({
      type: types.REQUEST_FORM_UPDATE,
      formData,
    });

    return Promise.resolve();
  },

  submitRequestForm(formData) {
    dispatcher.dispatch({
      type: types.REQUEST_FORM_SUBMIT,
      formData,
    });

    const options = {
      onUploadProgress: requestActions.submitRequestFormProgress,
    };

    return requestapi.post('/webform/submit', formData, options)
      .catch((error) => {
        const defaultErrorMessage = 'Sorry, something went wrong and your request could not be submitted.';
        const submissionResult = {
          errorMessage: error.message || defaultErrorMessage,
        };

        if (error.message === 'Network Error') {
          // Network Error isn't any more helpful than our default message
          submissionResult.errorMessage = 'The connection failed and your request could not be submitted. Please try again later.';
        }

        if (error.code === 'ECONNABORTED') {
          submissionResult.errorMessage =
            'The connection timed out and your request could not be submitted. Please try again.';
        }

        if (error.response && error.response.data && error.response.data.errors) {
          submissionResult.errors = error.response.data.errors;
        }

        if (error.response && error.response.status === 422) {
          submissionResult.errorMessage =
            'Sorry, there was a problem with the information you provided, please check the form and correct any errors.';
        }

        return Promise.resolve(submissionResult);
      })
      .then(requestActions.completeSubmitRequestForm);
  },

  submitRequestFormProgress(progress) {
    dispatcher.dispatch({
      type: types.REQUEST_FORM_SUBMIT_PROGRESS,
      progress,
    });

    return Promise.resolve();
  },

  completeSubmitRequestForm(submissionResult) {
    dispatcher.dispatch({
      type: types.REQUEST_FORM_SUBMIT_COMPLETE,
      submissionResult,
    });

    return submissionResult.errorMessage ? Promise.reject() : Promise.resolve();
  },

  fetchRequestFormSections() {
    dispatcher.dispatch({
      type: types.REQUEST_FORM_SECTIONS_FETCH,
    });

    return localapi.requestFormSections()
      .then(requestActions.receiveRequestFormSections);
  },

  receiveRequestFormSections(formSections) {
    dispatcher.dispatch({
      type: types.REQUEST_FORM_SECTIONS_RECEIVE,
      formSections,
    });

    return Promise.resolve();
  },
};
