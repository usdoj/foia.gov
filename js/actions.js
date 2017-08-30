// Action types to identify an action
export const types = {
  REQUEST_AGENCY_CHANGE: 'REQUEST_AGENCY_CHANGE',
};

// Action creators, to dispatch actions
export const request = {
  agencyChange(dispatcher, agency) {
    dispatcher.dispatch({
      type: types.REQUEST_AGENCY_CHANGE,
      agency,
    });
  },
};
