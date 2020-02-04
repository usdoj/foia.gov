import { Store } from 'flux/utils';
import { List, OrderedMap } from 'immutable';

import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';

class AnnualReportDataTypesStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);
    this.state = {
      dataTypes: new OrderedMap(),
      dataTypeOptions: new List(),
    };
  }

  getState() {
    return this.state;
  }

  getDataType(dataTypeId) {
    return this.state.dataTypes.get(dataTypeId, null);
  }

  getFieldsForDataType(dataTypeId) {
    return this.getDataType(dataTypeId).fields ?
      this.getDataType(dataTypeId).fields :
      [];
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.ANNUAL_REPORT_DATA_TYPES_RECEIVE: {
        if (!Object.prototype.hasOwnProperty.call(payload, 'annualReportDataTypes') || !Array.isArray(payload.annualReportDataTypes)) {
          break;
        }
        const reportTypeOptions = payload.annualReportDataTypes;
        const updatedDataTypes = new OrderedMap(reportTypeOptions.map(
          (item => ([item.id, item]))));

        Object.assign(this.state, {
          dataTypes: updatedDataTypes,
        });

        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPES_COMPLETE: {
        const [...dataTypesArray] = this.state.dataTypes.values();
        const dataTypeOptions = dataTypesArray.map(item => ({
          value: item.id,
          label: item.label,
        }));
        const updatedDataTypeOptions = new List(dataTypeOptions);
        Object.assign(this.state, {
          dataTypeOptions: updatedDataTypeOptions,
        });

        this.__emitChange();
        break;
      }

      default:
        break;
    }
  }
}

const annualReportDataTypesStore = new AnnualReportDataTypesStore(dispatcher);
export default annualReportDataTypesStore;

export {
  AnnualReportDataTypesStore,
};
