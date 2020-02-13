import React, { Component } from 'react';
import { Container } from 'flux/utils';
import FoiaReportFormSectionOne from '../components/foia_report_form_section_one';
import FoiaReportFormSectionTwo from '../components/foia_report_form_section_two';
import FoiaReportFormSectionThree from '../components/foia_report_form_section_three';
import FoiaReportDataSubmit from '../components/foia_report_submit';
import FoiaReportResultsTable from '../components/foia_report_results_table';

import annualReportDataFormStore from '../stores/annual_report_data_form';
import agencyComponentStore from '../stores/agency_component';
import annualReportFiscalYearStore from '../stores/annual_report_fiscal_year';
import annualReportDataTypesStore from '../stores/annual_report_data_types';
import annualReportStore from '../stores/annual_report';

import { reportActions } from '../actions/report';

class AnnualReportDataPage extends Component {
  static getStores() {
    return [
      annualReportDataFormStore,
      annualReportFiscalYearStore,
      agencyComponentStore,
      annualReportDataTypesStore,
      annualReportStore,
    ];
  }

  static calculateState() {
    const {
      fiscalYears,
    } = annualReportFiscalYearStore.getState();

    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
    } = agencyComponentStore.getState();

    const {
      selectedAgencies,
      selectedDataTypes,
      selectedFiscalYears,
      fiscalYearsIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      dataTypeDisplayError,
      agencyComponentDisplayError,
      tableDataTypes,
    } = annualReportDataFormStore.getState();

    const {
      dataTypes,
      dataTypeOptions,
    } = annualReportDataTypesStore.getState();

    const {
      reports,
    } = annualReportStore.getState();

    return {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      fiscalYears,
      selectedFiscalYears,
      fiscalYearsIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      dataTypeDisplayError,
      agencyComponentDisplayError,
      tableDataTypes,
      selectedAgencies,
      dataTypes,
      dataTypeOptions,
      selectedDataTypes,
      reports,
    };
  }

  componentDidMount() {
    reportActions.fetchAnnualReportDataFiscalYears();
    reportActions.fetchAnnualReportDataTypes();

    // If there is any agency data, assume all the data is fetched.
    if (this.state.agencies.size) {
      return;
    }

    // Pre-fetch the list of agencies and components for typeahead
    reportActions.fetchAgencyFinderData();
  }

  triggerCSV(event) {
    event.preventDefault();

    this.state.tableDataTypes.forEach((selectedDataType) => {
      this.reportTable.downloadCSV(selectedDataType);
    });
  }

  render() {
    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      selectedAgencies,
      dataTypes,
      dataTypeOptions,
      selectedDataTypes,
      fiscalYears,
      selectedFiscalYears,
      fiscalYearsIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      dataTypeDisplayError,
      agencyComponentDisplayError,
    } = this.state;

    return (
      <div className="annual-report-data-page usa-grid" ref={(ref) => { this.element = ref; }}>
        <h1>Create a Report</h1>
        <form>
          <FoiaReportFormSectionOne
            agencies={agencies}
            agencyComponents={agencyComponents}
            agencyFinderDataComplete={agencyFinderDataComplete}
            agencyFinderDataProgress={agencyFinderDataProgress}
            selectedAgencies={selectedAgencies}
            agencyComponentDisplayError={agencyComponentDisplayError}
          />
          <FoiaReportFormSectionTwo
            dataTypes={dataTypes}
            dataTypeOptions={dataTypeOptions}
            selectedDataTypes={selectedDataTypes}
            dataTypeDisplayError={dataTypeDisplayError}
          />
          <FoiaReportFormSectionThree
            fiscalYears={fiscalYears}
            selectedFiscalYears={selectedFiscalYears}
            fiscalYearsDisplayError={fiscalYearsDisplayError}
          />
          <FoiaReportDataSubmit
            selectedDataTypes={selectedDataTypes}
            agencyComponentIsValid={agencyComponentIsValid}
            dataTypesIsValid={dataTypesIsValid}
            fiscalYearsIsValid={fiscalYearsIsValid}
            onClick={this.triggerCSV.bind(this)}
          />
        </form>

        <div className="results-toolbar">
          <button type="button" className="usa-button usa-button-big usa-button-primary-alt">Print</button>
          <button onClick={this.triggerCSV.bind(this)} type="button" className="usa-button usa-button-big usa-button-primary-alt">Download CSV</button>
        </div>
        <FoiaReportResultsTable
          ref={(reportTable) => { this.reportTable = reportTable; }}
        />
      </div>
    );
  }
}

export default Container.create(AnnualReportDataPage);
