// Action types to identify an action
export const types = {
  REQUEST_AGENCY_CHANGE: 'REQUEST_AGENCY_CHANGE',
  REQUEST_RECEIVE_AGENCY: 'REQUEST_RECEIVE_AGENCY',
};

// Action creators, to dispatch actions
export function RequestActions({ dispatcher, api }) {
  return {
    agencyChange(agency) {
      dispatcher.dispatch({
        type: types.REQUEST_AGENCY_CHANGE,
        agency,
      });

      return api.get(`/agencies/${agency}/`);
    },

    receiveAgency(agency) {
      dispatcher.dispatch({
        type: types.REQUEST_RECEIVE_AGENCY,
        agency,
      });
    },
  };
}
