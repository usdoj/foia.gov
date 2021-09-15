import { List } from 'immutable';
import { Store } from 'flux/utils';

import { types } from '../actions/quarterly_report';
import dispatcher from '../util/dispatcher';


class QuarterlyReportFiscalYearStore extends Store {
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
      case types.QUARTERLY_REPORT_FISCAL_YEARS_RECEIVE: {
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

const quarterlyReportFiscalYearStore = new QuarterlyReportFiscalYearStore(dispatcher);

export default quarterlyReportFiscalYearStore;

export {
  QuarterlyReportFiscalYearStore,
};
