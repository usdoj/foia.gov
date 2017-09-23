import { Store } from 'flux/utils';

import { types } from '../actions';

class AgencyStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);

    // [string] The selected agency to submit the FOIA request to
    this.state = {
      agency: null,
      selectedAgency: null,
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.REQUEST_AGENCY_CHANGE: {
        this.state.selectedAgency = payload.agency || null;
        this.__emitChange();
        break;
      }

      case types.REQUEST_RECEIVE_AGENCY: {
        this.state.agency = payload.agency;
        this.__emitChange();
        break;
      }


      default:
    }
  }
}

export default AgencyStore;
