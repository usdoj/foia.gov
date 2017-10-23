import { Map } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions';
import dispatcher from '../util/dispatcher';
import rf from '../util/request_form';
import agencyComponentStore from './agency_component';


class AgencyComponentRequestFormStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      requestForms: new Map(),
    };
  }

  getState() {
    return this.state;
  }

  getAgencyComponentForm(agencyComponentId) {
    return this.state.requestForms.get(agencyComponentId);
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.AGENCY_COMPONENT_RECEIVE: {
        dispatcher.waitFor([agencyComponentStore.getDispatchToken()]);
        if (!payload.agencyComponent.request_form) {
          break;
        }

        const { requestForms } = this.state;
        const agencyComponent = agencyComponentStore.getAgencyComponent(payload.agencyComponent.id);
        const requestForm = rf.sectionedFormFromAgencyComponent(agencyComponent.toJS());

        // Set the form id for submission
        requestForm.id = payload.agencyComponent.request_form.formId;

        Object.assign(this.state, {
          requestForms: requestForms.set(agencyComponent.id, requestForm),
        });
        break;
      }

      default:
        break;
    }
  }
}

const agencyComponentRequestFormStore = new AgencyComponentRequestFormStore(dispatcher);
export default agencyComponentRequestFormStore;

export {
  AgencyComponentRequestFormStore,
};
