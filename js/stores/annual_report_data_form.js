import { Store } from 'flux/utils';
import { List, Map } from 'immutable';

import dispatcher from '../util/dispatcher';

class AnnualReportDataFormStore extends Store {
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

  _onDispatch(payload) {

  }
}

const annualReportDataFormStore = new AnnualReportDataFormStore(dispatcher);
export default annualReportDataFormStore;

export {
  AnnualReportDataFormStore,
};
