import assert from 'assert';

import dispatcher from '../util/dispatcher';
import jsonapi from '../util/json_api';


// Action types to identify an action
export const types = {
  AGENCY_FINDER_DATA_FETCH: 'AGENCY_FINDER_DATA_FETCH',
  AGENCY_FINDER_DATA_RECEIVE: 'AGENCY_FINDER_DATA_RECEIVE',
  AGENCY_COMPONENT_FETCH: 'AGENCY_COMPONENT_FETCH',
  AGENCY_COMPONENT_RECEIVE: 'AGENCY_COMPONENT_RECEIVE',
};

// Action creators, to dispatch actions
export const requestActions = {
  fetchAgencyFinderData() {
    dispatcher.dispatch({
      type: types.AGENCY_FINDER_DATA_FETCH,
    });

    return jsonapi.params()
      .include('agency')
      .fields('agency', ['name', 'abbreviation'])
      .fields('agency_component', ['title', 'abbreviation', 'agency'])
      .limit(50) // Maximum allowed by drupal
      .paginate('/agency_components', requestActions.receiveAgencyFinderData);
  },

  receiveAgencyFinderData(agencyComponents) {
    dispatcher.dispatch({
      type: types.AGENCY_FINDER_DATA_RECEIVE,
      agencyComponents,
    });

    return Promise.resolve(agencyComponents);
  },

  fetchAgency(agencyId) {
    assert(agencyId, 'You must provide an agencyId to fetchAgency.');
    dispatcher.dispatch({
      type: types.AGENCY_COMPONENT_FETCH,
      agencyId,
    });

    if (!agencyId) {
      return Promise.reject(new Error('You must provide an agencyId to fetch.'));
    }

    return jsonapi.params()
      .include('agency')
      .include('field_misc')
      .include('foia_officers')
      .include('paper_receiver')
      .include('public_liaisons')
      .include('request_form')
      .include('service_centers')
      .get(`/agency_components/${agencyId}`);
  },

  receiveAgency(agencyComponent) {
    dispatcher.dispatch({
      type: types.AGENCY_COMPONENT_RECEIVE,
      agencyComponent,
    });

    return Promise.resolve(agencyComponent);
  },
};
