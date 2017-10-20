import { Map } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions';
import dispatcher from '../util/dispatcher';
import rf from '../util/request_form';
import agencyComponentStore from './agency_component';


class RequestFormStore extends Store {
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
        const { requestForms } = this.state;
        const agencyComponent = agencyComponentStore.getAgencyComponent(payload.agencyComponent.id);
        const requestForm = rf.sectionedFormFromAgencyComponent(agencyComponent.toJS());

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

const requestFormStore = new RequestFormStore(dispatcher);
export default requestFormStore;

export {
  RequestFormStore,
};
