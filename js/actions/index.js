// Action types to identify an action
export const types = {
  AGENCY_FINDER_DATA_FETCH: 'AGENCY_FINDER_DATA_FETCH',
  AGENCY_FINDER_DATA_RECEIVE: 'AGENCY_FINDER_DATA_RECEIVE',
  REQUEST_AGENCY_CHANGE: 'REQUEST_AGENCY_CHANGE',
  REQUEST_RECEIVE_AGENCY: 'REQUEST_RECEIVE_AGENCY',
};

// Action creators, to dispatch actions
export function RequestActions({ dispatcher, api, jsonapi }) {
  return {
    fetchAgencyFinderData() {
      dispatcher.dispatch({
        type: types.AGENCY_FINDER_DATA_FETCH,
      });

      return jsonapi.params()
        .include('agency')
        .fields('agency', ['name', 'abbreviation'])
        .fields('agency_component', ['title', 'abbreviation'])
        .get('/agency_components');
    },

    receiveAgencyFinderData(data) {
      dispatcher.dispatch({
        type: types.AGENCY_FINDER_DATA_RECEIVE,
        data,
      });

      return Promise.resolve(data);
    },

    agencyChange(agency) {
      dispatcher.dispatch({
        type: types.REQUEST_AGENCY_CHANGE,
        agency,
      });

      if (!agency) {
        // The agency was unselected
        return Promise.resolve(null);
      }

      // TODO this should be in a fetch action, results cached
      return api.get(`/agencies/${agency}.json`);
    },

    receiveAgency(agency) {
      dispatcher.dispatch({
        type: types.REQUEST_RECEIVE_AGENCY,
        agency,
      });

      return Promise.resolve(agency);
    },
  };
}
