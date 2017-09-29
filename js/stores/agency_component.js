import { Store } from 'flux/utils';

import { types } from '../actions';

class AgencyStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);

    // [string] The selected agency to submit the FOIA request to
    this.state = {
      agencies: {},
      agencyComponents: [],
      agency: null,
      selectedAgency: null,
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.AGENCY_FINDER_DATA_RECEIVE: {
        const { agencyComponents } = payload;

        // Pull out agencies, keyed by it's abbreviation
        this.state.agencies = agencyComponents
          .map(agencyComponent => agencyComponent.agency)
          .reduce((agencies, agency) => {
            if (agency.abbreviation in agencies) {
              return agencies;
            }

            // We add a type so we can distinguish them from agency_components.
            // It's a shame because this info is included in the original
            // jsonapi response, but the parser looses it.
            // https://github.com/mysidewalk/jsonapi-parse/issues/2
            agencies[agency.abbreviation] = Object.assign({}, agency, { type: 'agency' });
            return agencies;
          }, {});

        this.state.agencyComponents = agencyComponents;
        this.__emitChange();
        break;
      }

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
