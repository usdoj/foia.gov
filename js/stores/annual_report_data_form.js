import { Store } from 'flux/utils';
import { List, Map } from 'immutable';

import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';

class AnnualReportDataFormStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);
    this.state = {
      formSections: List(),
      requestForms: new Map(),
      selectedAgencies: [{ index: 0 }],
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.SELECTED_AGENCIES_UPDATE: {
        const { selectedAgency, previousAgency } = payload;
        const previousIsValid = typeof previousAgency === 'object'
          && Object.prototype.hasOwnProperty.call(previousAgency, 'index');
        const selectedIsValid = typeof selectedAgency === 'object'
          && Object.prototype.hasOwnProperty.call(selectedAgency, 'index');

        if (!selectedIsValid || !previousIsValid) {
          break;
        }

        // Get a copy of the selected agencies state so that we don't
        // mutate state.  Directly mutating the state prevents
        // a rerender from firing, which causes multiple problems.
        const selectedAgencies = [...this.state.selectedAgencies];
        selectedAgencies.splice(previousAgency.index, 1, selectedAgency);

        Object.assign(this.state, {
          selectedAgencies,
        });
        this.__emitChange();
        break;
      }

      case types.SELECTED_AGENCIES_APPEND_BLANK: {
        const selectedAgencies = [...this.state.selectedAgencies];
        selectedAgencies.push({
          index: (selectedAgencies.length),
        });

        Object.assign(this.state, {
          selectedAgencies,
        });
        this.__emitChange();
        break;
      }
      default:
        break;
    }
  }
}

const annualReportDataFormStore = new AnnualReportDataFormStore(dispatcher);
export default annualReportDataFormStore;

export {
  AnnualReportDataFormStore,
};
