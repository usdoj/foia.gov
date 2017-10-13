import { List, Map } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions';
import { Agency, AgencyComponent } from '../models';
import dispatcher from '../util/dispatcher';


class AgencyComponentStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    // [string] The selected agency to submit the FOIA request to
    this.state = {
      agencies: new Map(),
      agencyComponents: new List(),
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
        const { agencyComponents: receivedAgencyComponents } = payload;
        const { agencies, agencyComponents } = this.state;

        // Pull out agencies, keyed by it's abbreviation
        const receivedAgencies = receivedAgencyComponents
          .map(agencyComponent => agencyComponent.agency)
          .reduce((memo, agency) => {
            if (agency.abbreviation in memo) {
              return memo;
            }

            // We add a type (in the model) so we can distinguish them from
            // agency_components.  It's a shame because this info is included
            // in the original jsonapi response, but the parser looses it.
            // https://github.com/mysidewalk/jsonapi-parse/issues/2
            return Object.assign(memo, { [agency.abbreviation]: new Agency(agency) });
          }, {});

        // Merge state
        Object.assign(this.state, {
          agencies: agencies.merge(receivedAgencies),
          agencyComponents: agencyComponents.concat(
            receivedAgencyComponents.map(agencyComponent => new AgencyComponent(agencyComponent)),
          ),
        });
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

const agencyComponentStore = new AgencyComponentStore(dispatcher);

export default agencyComponentStore;

export {
  AgencyComponentStore,
};
