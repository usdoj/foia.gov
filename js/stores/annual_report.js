import { Map } from 'immutable';
import { Store } from 'flux/utils';
import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';
import annualReportDataFormStore from './annual_report_data_form';

class AnnualReportStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);
    this.initializeState();
  }

  initializeState() {
    this.state = {
      reports: new Map(),
      reportTables: new Map(),
      reportDataComplete: false,
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.ANNUAL_REPORT_DATA_FETCH: {
        // Reset the report data to initial value so that report state after a new form submission
        // is limited to only the data specific to that request.
        this.state.reportDataComplete = false;
        Object.assign(this.state, {
          reports: new Map(),
        });
        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_RECEIVE: {
        const { reports } = this.state;

        const updatedReports = reports.withMutations((mutableReports) => {
          payload.annualReports.forEach((report) => {
            // Merge new values if a report already exists since most report requests won't
            // contain all data.
            if (mutableReports.has(report.id)) {
              mutableReports.update(
                report.id,
                previousValue => previousValue.merge(new Map(report)),
              );
            } else {
              mutableReports.set(report.id, new Map(report));
            }
          });
        });

        Object.assign(this.state, {
          reports: updatedReports,
        });
        this.__emitChange();

        break;
      }

      case types.ANNUAL_REPORT_DATA_COMPLETE: {
        const { selectedDataTypes } = annualReportDataFormStore.getState();
        // Set up the default columns that appear in all data tables.
        const defaultColumns = [
          {
            title: 'Agency',
            field: 'field_agency',
            align: 'center',
          },
          {
            title: 'Component',
            field: 'field_agency_component',
            align: 'center',
          },
          {
            title: 'Fiscal Year',
            field: 'field_foia_annual_report_yr',
            align: 'center',
          },
        ];

        const tables = [];
        selectedDataTypes.forEach((dataType) => {
          if (!tables.some(item => item.id === dataType.id)) {
            // Get our dataType-specific columns.
            const dataColumns = dataType.fields
              .filter(field => field.display)
              .map(item => (
                {
                  title: item.label,
                  field: item.id,
                  align: 'center',
                }));
            const reportHeaders = defaultColumns.concat(dataColumns);
            // @TODO: Actually fetch the data from the JSON:API result.
            const dataRows = [];
            tables.push({
              id: dataType.id,
              header: dataType.heading,
              columns: reportHeaders,
              data: dataRows,
            });
          }
        });

        const updatedReportTables = new Map(tables.map(table => ([
          table.id,
          table,
        ])));

        Object.assign(this.state, {
          reportTables: updatedReportTables,
          reportDataComplete: true,
        });

        this.__emitChange();
        break;
      }

      case types.CLEAR_FORM: {
        this.initializeState();
        this.__emitChange();
        break;
      }

      default:
        break;
    }
  }
}

const annualReportStore = new AnnualReportStore(dispatcher);

export default annualReportStore;

export {
  AnnualReportStore,
};
