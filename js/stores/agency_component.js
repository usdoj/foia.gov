import { List, Map } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions';
import { Agency, AgencyComponent } from '../models';
import dispatcher from '../util/dispatcher';


class AgencyComponentStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      agencies: new Map(),
      agencyComponents: new List(),
    };
  }

  getState() {
    return this.state;
  }

  getAgency(abbreviation) {
    // TODO we should probably key this on id instead of abbreviation
    return this.state.agencies.get(abbreviation, null);
  }

  getAgencyComponent(agencyComponentId) {
    return this.state.agencyComponents
      .find(agencyComponent => agencyComponent.id === agencyComponentId);
  }

  getAgencyComponentsForAgency(agencyId) {
    return this.state.agencyComponents
      .filter(agencyComponent => agencyComponent.agency.id === agencyId);
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

      case types.AGENCY_COMPONENT_RECEIVE: {
        // Grab existing component from the store, or a new one
        const [index, agencyComponent] = this.state.agencyComponents.findEntry(
          component => component.id === payload.agencyComponent.id,
          null,
          [undefined, new AgencyComponent()], // Entry does not exist
        );

        // Parse formFields if they exist
        let formFields = [];
        if (payload.agencyComponent.request_form) {
          formFields = AgencyComponent.parseWebformElements(payload.agencyComponent.request_form);
        }

        Object.assign(this.state, {
          agencyComponents: this.state.agencyComponents
            .delete(index) // remove the existing component
            .push(agencyComponent.merge(
              new AgencyComponent(Object.assign(
                // Avoid resetting formFields just because they weren't included in the request
                { formFields: formFields.length ? formFields : agencyComponent.formFields },
                payload.agencyComponent,
              )),
            )),
        });
        this.__emitChange();
        break;
      }

      default:
        break;
    }
  }
}

const agencyComponentStore = new AgencyComponentStore(dispatcher);

export default agencyComponentStore;

export {
  AgencyComponentStore,
};
