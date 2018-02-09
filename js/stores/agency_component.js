import { List, Map } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions';
import { Agency, AgencyComponent } from '../models';
import dispatcher from '../util/dispatcher';


// In order to show progress of the agency finder, we need to know the total
// number of agency components we're waiting for. We don't have that number, so
// we hard-code a guess. It's not a huge deal if it's wrong as long as we clip
// the progress to 100%. Worse case it jumps from x% to loaded e.g. 90% to
// loaded or, it sits on 100% for longer than it should.
const GUESS_TOTAL_AGENCY_COMPONENTS = 400;


class AgencyComponentStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      agencies: new Map(),
      agencyComponents: new List(),
      agencyFinderDataComplete: false,
      agencyFinderDataProgress: 0,
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
        const { agencies, agencyComponents } = this.state;

        // Remove agency components with no parent agency. The component was
        // probably created unintentionally and should be ignored.
        const receivedAgencyComponents = payload.agencyComponents
          .filter(agencyComponent => !!agencyComponent.agency && !!agencyComponent.agency.id);

        const updatedAgencies = agencies.withMutations((mutableAgencies) => {
          receivedAgencyComponents
            .map(agencyComponent => agencyComponent.agency)
            .forEach((agency) => {
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
            });
        });

        const updatedAgencyComponents = agencyComponents.concat(
          receivedAgencyComponents.map(agencyComponent => new AgencyComponent(agencyComponent)),
        );

        // Figure out the progress of our load. Cap it to 100 since we only
        // have a guess at what the total count is.
        const agencyFinderDataProgress = Math.min(
          Math.floor(agencyComponents.size / GUESS_TOTAL_AGENCY_COMPONENTS * 100),
          100,
        );

        // Merge state
        Object.assign(this.state, {
          agencies: updatedAgencies,
          agencyComponents: updatedAgencyComponents,
          agencyFinderDataProgress,
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
