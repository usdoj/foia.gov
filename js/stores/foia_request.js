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
      upload: new Map(),
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
        if (this.state.upload.get('inProgress')) {
          break;
        }

        Object.assign(this.state, {
          upload: this.state.upload.merge({
            inProgress: true,
            progressLoaded: 0,
            progressTotal: 0,
          }),
          // Reset the previous submission results
          submission_id: null,
          errorMessage: null,
          errors: null,
        });
        this.__emitChange();
        break;
      }

      case types.REQUEST_FORM_SUBMIT_PROGRESS: {
        const progress = payload.progress;
        if (!progress.lengthComputable) {
          break;
        }

        Object.assign(this.state, {
          upload: this.state.upload.merge({
            progressLoaded: progress.loaded,
            progressTotal: progress.total,
          }),
        });
        this.__emitChange();
        break;
      }

      case types.REQUEST_FORM_SUBMIT_COMPLETE: {
        const { submissionResult } = this.state;
        Object.assign(this.state, {
          submissionResult: submissionResult.clear().merge(payload.submissionResult),
          upload: this.state.upload.clear(),
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
