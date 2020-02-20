import { Map } from 'immutable';
import { Store } from 'flux/utils';
import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';
import annualReportDataFormStore from './annual_report_data_form';
import FoiaAnnualReportUtilities from '../util/foia_annual_report_utilities';
import FoiaAnnualReportFilterUtilities from '../util/foia_annual_report_filter_utilities';

class AnnualReportStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);

    this.state = {
      reports: new Map(),
      reportTables: new Map(),
      reportDataComplete: false,
    };
  }

  getState() {
    return this.state;
  }


  static getSelectedAgencies() {
    const selectedAgencies = annualReportDataFormStore.buildSelectedAgencies();
    return selectedAgencies.reduce((formatted, selected) => {
      switch (selected.type) {
        case 'agency': {
          const { abbreviation, components } = selected;
          const selectedComponents = formatted[abbreviation] || [];
          const componentAbbreviations = components
            .filter(component => component.selected)
            .map(component => component.abbreviation);

          formatted[abbreviation] = selectedComponents.concat(...componentAbbreviations.toArray())
            .filter((value, index, array) => array.indexOf(value) === index)
            .sort();
          break;
        }
        case 'agency_component': {
          const { abbreviation, agency } = selected;
          const agencyComponents = formatted[agency.abbreviation] || [];
          formatted[agency.abbreviation] = agencyComponents
            .concat(abbreviation)
            .filter((value, index, array) => array.indexOf(value) === index)
            .sort();
          break;
        }
        default: {
          break;
        }
      }

      return formatted;
    }, {});
  }

  getReportDataForType(dataType) {
    // @todo: Filter rows based on data type filters.
    const componentData = [];
    const overallData = [];
    const { reports } = this.state;
    const selectedAgencies = AnnualReportStore.getSelectedAgencies();

    // Iterate over each report.
    reports.forEach((report) => {
      const { abbreviation: agency_abbr, name: agency_name } = report.get('field_agency');
      const selectedComponents = [...selectedAgencies[agency_abbr] || []];
      // When all agencies are selected, only overall fields are retrieved, so the
      // getDataForType() function call will fail.
      const flattened = FoiaAnnualReportUtilities.getDataForType(report, dataType);
      const overall = FoiaAnnualReportUtilities.getOverallDataForType(report, dataType);

      selectedComponents.forEach((component) => {
        const fiscal_year = report.get('field_foia_annual_report_yr');
        const defaults = {
          field_agency_component: component,
          field_agency: agency_name,
          field_foia_annual_report_yr: fiscal_year,
        };
        const allRows = component.toLowerCase() === 'agency overall' ? overall : flattened;

        // It is not guaranteed that the flattened data will be keyed by
        // a component abbreviation.  This gathers an array of all the rows
        // for this component.
        const componentRows = Object.keys(allRows).map((key) => {
          if (allRows[key].field_agency_component !== component) {
            return false;
          }

          return allRows[key];
        }).filter(value => value !== false);

        const filtered = FoiaAnnualReportFilterUtilities.filterByDataTypeConditions(
          componentRows,
          FoiaAnnualReportFilterUtilities.getFiltersFromSelectedDataTypes(),
        );

        const normalized = filtered.map(row => (
          // Normalization essentially checks every field to see if it's
          // an object with a value property.  If it is, it sets the field to the
          // field.value, allowing tablulator to use the ids in report_data_map.json.
          Object.assign({}, defaults, FoiaAnnualReportUtilities.normalize(row))
        ));

        if (component.toLowerCase() === 'agency overall') {
          overallData.push(...normalized);
        } else {
          componentData.push(...normalized);
        }
      });
    });

    return componentData.concat(overallData);
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
            const dataRows = this.getReportDataForType(dataType);
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
