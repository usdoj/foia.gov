/*
 * FoiaRequestStore
 *
 * Stores a single FOIA request and manages the FOIA request form.
 */

import { Map } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions';
import { SubmissionResult } from '../models';
import dispatcher from '../util/dispatcher';
import agencyComponentRequestFormStore from './agency_component_request_form';
import rf from '../util/request_form';


class FoiaRequestStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      formData: new Map(),
      isSubmitting: false,
      submissionResult: new SubmissionResult(),
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.REQUEST_FORM_UPDATE: {
        const { formData } = this.state;

        Object.assign(this.state, {
          formData: formData.merge(payload.formData),
        });
        this.__emitChange();
        break;
      }

      case types.REQUEST_FORM_SUBMIT: {
        if (this.state.isSubmitting) {
          break;
        }

        Object.assign(this.state, {
          isSubmitting: true,
          // Reset the previous submission results
          submissionResult: this.state.submissionResult.clear(),
        });
        this.__emitChange();
        break;
      }

      case types.REQUEST_FORM_SUBMIT_COMPLETE: {
        dispatcher.waitFor([agencyComponentRequestFormStore.getDispatchToken()]);
        let errors = {};
        if (payload.submissionResult.errors) {
          // Convert webform errors from the API to sectioned errors we can pass
          // to the Form
          const { formSections } = agencyComponentRequestFormStore.getState();
          const builder = rf.SectionedFormBuilder(formSections.toJS());
          errors = builder.sectionedErrorsFromWebformErrors(payload.submissionResult.errors);
        }

        const { submissionResult } = this.state;
        Object.assign(this.state, {
          submissionResult: submissionResult.clear().merge(payload.submissionResult, { errors }),
          isSubmitting: false,
        });
        this.__emitChange();
        break;
      }
      default:
        break;
    }
  }
}

const foiaRequestStore = new FoiaRequestStore(dispatcher);
export default foiaRequestStore;

export {
  FoiaRequestStore,
};
