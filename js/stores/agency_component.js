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
      agencyFinderDataComplete: false,
    };
  }

  getState() {
    return this.state;
  }

  getAgency(agencyId) {
    return this.state.agencies.get(agencyId, null);
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

        const updatedAgencies = agencies.withMutations((mutableAgencies) => {
          receivedAgencyComponents
            .map(agencyComponent => agencyComponent.agency)
            .forEach((agency) => {
              if (agency) {
                mutableAgencies.update(
                  agency.id,
                  new Agency(), // not set value
                  (existingAgency) => {
                    const { component_count } = existingAgency;
                    return existingAgency.merge(
                      new Agency(agency),
                      { component_count: component_count + 1 },
                    );
                  },
                );
              }
            });
        });

        // Merge state
        Object.assign(this.state, {
          agencies: updatedAgencies,
          agencyComponents: agencyComponents.concat(
            receivedAgencyComponents.map(agencyComponent => new AgencyComponent(agencyComponent)),
          ),
        });
        this.__emitChange();
        break;
      }

      case types.AGENCY_FINDER_DATA_COMPLETE: {
        this.state.agencyFinderDataComplete = true;
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
