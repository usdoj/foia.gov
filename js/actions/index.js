import assert from 'assert';

import dispatcher from '../util/dispatcher';
import jsonapi from '../util/json_api';
import requestapi from '../util/request_api';


// Action types to identify an action
export const types = {
  AGENCY_FINDER_DATA_FETCH: 'AGENCY_FINDER_DATA_FETCH',
  AGENCY_FINDER_DATA_RECEIVE: 'AGENCY_FINDER_DATA_RECEIVE',
  AGENCY_FINDER_DATA_COMPLETE: 'AGENCY_FINDER_DATA_COMPLETE',
  AGENCY_COMPONENT_FETCH: 'AGENCY_COMPONENT_FETCH',
  AGENCY_COMPONENT_RECEIVE: 'AGENCY_COMPONENT_RECEIVE',
  REQUEST_FORM_UPDATE: 'REQUEST_FORM_UPDATE',
  REQUEST_FORM_SUBMIT: 'REQUEST_FORM_SUBMIT',
  REQUEST_FORM_SUBMIT_COMPLETE: 'REQUEST_FORM_SUBMIT_COMPLETE',
};

// Action creators, to dispatch actions
export const requestActions = {
  fetchAgencyFinderData() {
    dispatcher.dispatch({
      type: types.AGENCY_FINDER_DATA_FETCH,
    });

    return jsonapi.params()
      .include('agency')
      .fields('agency', ['name', 'abbreviation', 'description'])
      .fields('agency_component', ['title', 'abbreviation', 'agency'])
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

    return requestapi.post('/webform/submit', formData)
      .catch((error) => {
        const submissionResult = {
          errorMessage: 'There was a problem submitting your form.',
        };

        if (error.response && error.response.data && error.response.data.errors) {
          submissionResult.errors = error.response.data.errors;
        }

        return Promise.resolve(submissionResult);
      })
      .then(requestActions.completeSubmitRequestForm);
  },

  completeSubmitRequestForm(submissionResult) {
    dispatcher.dispatch({
      type: types.REQUEST_FORM_SUBMIT_COMPLETE,
      submissionResult,
    });

    return Promise.resolve();
  },
};
