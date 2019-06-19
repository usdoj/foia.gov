import { List, Map } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions';
import dispatcher from '../util/dispatcher';
import rf from '../util/request_form';
import agencyComponentStore from './agency_component';
import domify from '../util/request_form/domify';


class AgencyComponentRequestFormStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      formSections: List(),
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
      case types.REQUEST_FORM_SECTIONS_RECEIVE: {
        const domifiedFormSections = payload
          .formSections
          .map(section =>
            Object.assign({}, section, { description: domify(section.description) }),
          );

        Object.assign(this.state, {
          formSections: new List(domifiedFormSections),
        });
        this.__emitChange();
        break;
      }

      case types.AGENCY_COMPONENT_RECEIVE: {
        dispatcher.waitFor([agencyComponentStore.getDispatchToken()]);
        if (!payload.agencyComponent.request_form) {
          break;
        }

        const { formSections, requestForms } = this.state;
        const agencyComponent = agencyComponentStore.getAgencyComponent(payload.agencyComponent.id);
        const sectionedFormBuilder = new rf.SectionedFormBuilder(formSections.toJS());
        const requestForm = sectionedFormBuilder
          .sectionedFormFromAgencyComponent(agencyComponent.toJS());

        // Set the form id for submission
        requestForm.id = payload.agencyComponent.request_form.drupal_internal__id;

        Object.assign(this.state, {
          requestForms: requestForms.set(agencyComponent.id, requestForm),
        });
        this.__emitChange();
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
