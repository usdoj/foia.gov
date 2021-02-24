import { List } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions/report';
import dispatcher from '../util/dispatcher';


class AnnualReportFiscalYearStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      fiscalYears: new List(),
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.ANNUAL_REPORT_FISCAL_YEARS_RECEIVE: {
        if (!Object.prototype.hasOwnProperty.call(payload, 'fiscalYears') || !Array.isArray(payload.fiscalYears)) {
          break;
        }

        const updatedFiscalYears = new List(payload.fiscalYears);

        Object.assign(this.state, {
          fiscalYears: updatedFiscalYears,
        });

        this.__emitChange();
        break;
      }
      default:
        break;
    }
  }
}

const annualReportFiscalYearStore = new AnnualReportFiscalYearStore(dispatcher);

export default annualReportFiscalYearStore;

export {
  AnnualReportFiscalYearStore,
};
