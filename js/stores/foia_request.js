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
          submission_id: null,
          errorMessage: null,
          errors: null,
        });
        this.__emitChange();
        break;
      }

      case types.REQUEST_FORM_SUBMIT_COMPLETE: {
        const { submissionResult } = this.state;
        Object.assign(this.state, {
          submissionResult: submissionResult.clear().merge(payload.submissionResult),
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
