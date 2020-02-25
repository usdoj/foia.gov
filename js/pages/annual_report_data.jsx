import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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

  static calculateState(prevState, props) {
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
      allAgenciesSelected,
      selectedAgencies,
      selectedDataTypes,
      selectedFiscalYears,
      fiscalYearsIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      dataTypeDisplayError,
      agencyComponentDisplayError,
      submissionAction,
    } = annualReportDataFormStore.getState();

    const {
      dataTypes,
      dataTypeOptions,
    } = annualReportDataTypesStore.getState();

    const {
      reports,
      reportTables,
      reportDataComplete,
      reportDataHasRows,
    } = annualReportStore.getState();

    const viewMode = props.location.state.view;

    return {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      allAgenciesSelected,
      fiscalYears,
      selectedFiscalYears,
      fiscalYearsIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      dataTypeDisplayError,
      agencyComponentDisplayError,
      submissionAction,
      selectedAgencies,
      dataTypes,
      dataTypeOptions,
      selectedDataTypes,
      reports,
      reportTables,
      reportDataComplete,
      reportDataHasRows,
      viewMode,
    };
  }

  constructor(props) {
    super(props);
    this.reportRefs = {};
    this.handlePopState = this.handlePopState.bind(this);
  }

  componentDidMount() {
    window.onpopstate = this.handlePopState;
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
    const reports = Object.values(this.reportRefs);
    reports.forEach((reportTable) => {
      reportTable.downloadCSV();
    });
  }

  handlePopState(event) {
    event.preventDefault();
    reportActions.reloadForm(this.state.viewMode);
  }

  render() {
    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      allAgenciesSelected,
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
      reportTables,
      submissionAction,
      reportDataComplete,
      reportDataHasRows,
      viewMode,
    } = this.state;
    const [...reportTableEntries] = reportTables.values();
    const reportToolbar = reportDataComplete && reportDataHasRows ?
      (<div className="results-toolbar">
        <button
          onClick={() => window.print()}
          type="button"
          className="usa-button usa-button-big usa-button-primary-alt"
        >Print
        </button>
        <button
          onClick={this.triggerCSV.bind(this)}
          type="button"
          className="usa-button usa-button-big usa-button-primary-alt"
        >Download
          CSV
        </button>
      </div>)
      : null;
    return (
      <div className="annual-report-data-page usa-grid" ref={(ref) => { this.element = ref; }}>
        {submissionAction === false || submissionAction === 'download' || viewMode === 'form' ?
          <div>
            <h1>Create a Report</h1>
            <form >
              <FoiaReportFormSectionOne
                agencies={agencies}
                agencyComponents={agencyComponents}
                agencyFinderDataComplete={agencyFinderDataComplete}
                agencyFinderDataProgress={agencyFinderDataProgress}
                selectedAgencies={selectedAgencies}
                agencyComponentDisplayError={agencyComponentDisplayError}
                allAgenciesSelected={allAgenciesSelected}
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
                history={this.props.history}
              />
            </form>
          </div>
          : null
        }
        {submissionAction === 'view' && viewMode === 'results' ?
          <header className="results-page-header">
            <h1>Report Results</h1>
            {reportToolbar}
          </header>
          : null }
        {(submissionAction === 'view' || submissionAction === 'download') && !reportDataComplete &&
          <div className="results-loading">
            <div className="spinner" />
            <div className="results-loading__text">Loading...</div>
          </div>
        }
        {reportDataComplete && reportDataHasRows && ((submissionAction === 'view' && viewMode === 'results') || submissionAction === 'download') &&
        <div>
          {
            reportTableEntries.map(table => (
              <FoiaReportResultsTable
                key={`report-${table.id}`}
                ref={(ref) => { this.reportRefs[table.id] = ref; }}
                tableHeader={table.header}
                tableData={table.data}
                tableColumns={table.columns}
                displayMode={submissionAction}
              />
            ))
          }
        </div> }
        {reportDataComplete && !reportDataHasRows &&
        <div className="info-box">
          <p>No data meets your search criteria. Please try a new search.</p>
        </div>

        }
      </div>
    );
  }
}

AnnualReportDataPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Container.create(AnnualReportDataPage, {
  withProps: true,
}));
