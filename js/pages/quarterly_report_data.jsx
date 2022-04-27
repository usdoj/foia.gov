import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import { List } from 'immutable';
import PropTypes from 'prop-types';

import QuarterlyReportFormSectionOne from '../components/quarterly_report_form_section_one';
import QuarterlyReportFormSectionTwo from '../components/quarterly_report_form_section_two';
import QuarterlyReportFormSectionThree from '../components/quarterly_report_form_section_three';
import QuarterlyReportFormSectionFour from '../components/quarterly_report_form_section_four';
import QuarterlyReportDataSubmit from '../components/quarterly_report_submit';
import QuarterlyReportResultsTable from '../components/quarterly_report_results_table';
import QuarterlyReportResultsChart from '../components/quarterly_report_results_chart';

import quarterlyReportDataFormStore from '../stores/quarterly_report_data_form';
import agencyComponentStore from '../stores/agency_component';
import quarterlyReportFiscalYearStore from '../stores/quarterly_report_fiscal_year';
import quarterlyReportDataTypesStore from '../stores/quarterly_report_data_types';
import quarterlyReportStore from '../stores/quarterly_report';

import { reportActions } from '../actions/quarterly_report';

import { Tabs, TabList, Tab, Panel } from '@accessible/tabs'

class QuarterlyReportDataPage extends Component {
  static getStores() {
    return [
      quarterlyReportDataFormStore,
      quarterlyReportFiscalYearStore,
      agencyComponentStore,
      quarterlyReportDataTypesStore,
      quarterlyReportStore,
    ];
  }

  static calculateState(prevState, props) {
    const {
      fiscalYears,
    } = quarterlyReportFiscalYearStore.getState();

    const quarters = List(['1', '2', '3', '4']);

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
      selectedQuarters,
      fiscalYearsIsValid,
      quartersIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      quartersDisplayError,
      dataTypeDisplayError,
      agencyComponentDisplayError,
      submissionAction,
    } = quarterlyReportDataFormStore.getState();

    const {
      dataTypes,
      dataTypeOptions,
    } = quarterlyReportDataTypesStore.getState();

    const {
      reports,
      reportTables,
      reportDataComplete,
      reportDataHasRows,
    } = quarterlyReportStore.getState();

    const viewMode = props.location.state.view;

    return {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      allAgenciesSelected,
      fiscalYears,
      quarters,
      selectedFiscalYears,
      selectedQuarters,
      fiscalYearsIsValid,
      quartersIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      quartersDisplayError,
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
    reportActions.fetchQuarterlyReportDataFiscalYears();
    reportActions.fetchQuarterlyReportDataTypes();

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
      quarters,
      selectedFiscalYears,
      selectedQuarters,
      fiscalYearsIsValid,
      quartersIsValid,
      dataTypesIsValid,
      agencyComponentIsValid,
      fiscalYearsDisplayError,
      quartersDisplayError,
      dataTypeDisplayError,
      agencyComponentDisplayError,
      reportTables,
      submissionAction,
      reportDataComplete,
      reportDataHasRows,
      viewMode,
    } = this.state;
    const [...reportTableEntries] = reportTables.values();
    const reportToolbar = reportDataComplete && reportDataHasRows
      ? (
        <div className="results-toolbar">
          <button
            onClick={() => window.print()}
            type="button"
            className="print-hide usa-button usa-button-big usa-button-primary-alt"
          >
            Print
          </button>
          <button
            onClick={this.triggerCSV.bind(this)}
            type="button"
            className="print-hide usa-button usa-button-big usa-button-primary-alt"
          >
            Download
            CSV
          </button>
        </div>
      )
      : null;
    return (
      <div className="quarterly-report-data-page usa-grid" ref={(ref) => { this.element = ref; }}>
        {submissionAction === false || submissionAction === 'download' || viewMode === 'form'
          ? (
            <div>
              <h1>Create a Quarterly Report</h1>
              <p>
                FOIA.gov provides a more real-time picture of agency FOIA administration through
                its display of Quarterly Report data. Each quarter, agencies must provide the number
                of requests received, processed, and in the agency&apos;s backlog. Additionally,
                agencies must report the status of the agency&apos;s ten oldest pending requests each
                quarter. Users can filter data by agency, data type, and quarter.
              </p>
              <form>
                <QuarterlyReportFormSectionOne
                  agencies={agencies}
                  agencyComponents={agencyComponents}
                  agencyFinderDataComplete={agencyFinderDataComplete}
                  agencyFinderDataProgress={agencyFinderDataProgress}
                  selectedAgencies={selectedAgencies}
                  agencyComponentDisplayError={agencyComponentDisplayError}
                  allAgenciesSelected={allAgenciesSelected}
                />
                <QuarterlyReportFormSectionTwo
                  dataTypes={dataTypes}
                  dataTypeOptions={dataTypeOptions}
                  selectedDataTypes={selectedDataTypes}
                  dataTypeDisplayError={dataTypeDisplayError}
                />
                <QuarterlyReportFormSectionThree
                  fiscalYears={fiscalYears}
                  selectedFiscalYears={selectedFiscalYears}
                  fiscalYearsDisplayError={fiscalYearsDisplayError}
                />
                <QuarterlyReportFormSectionFour
                  quarters={quarters}
                  selectedQuarters={selectedQuarters}
                  quartersDisplayError={quartersDisplayError}
                />
                <QuarterlyReportDataSubmit
                  selectedDataTypes={selectedDataTypes}
                  agencyComponentIsValid={agencyComponentIsValid}
                  dataTypesIsValid={dataTypesIsValid}
                  fiscalYearsIsValid={fiscalYearsIsValid}
                  quartersIsValid={quartersIsValid}
                  onClick={this.triggerCSV.bind(this)}
                  history={this.props.history}
                />
              </form>
            </div>
          )
          : null}
        {submissionAction === 'view' && viewMode === 'results'
          ? (
            <header className="results-page-header">
              <h1>Report Results</h1>
              {reportToolbar}
            </header>
          )
          : null }
        {(submissionAction === 'view' || submissionAction === 'download') && !reportDataComplete
          && (
          <div className="results-loading">
            <div className="spinner" />
            <div className="results-loading__text">Loading...</div>
          </div>
          )}
        {reportDataComplete && reportDataHasRows && ((submissionAction === 'view' && viewMode === 'results') || submissionAction === 'download')
        && (
        <div>
          {
            reportTableEntries.map((table) => (
              <div key={`report-container-${table.id}`}>
                <h2>{ table.header }</h2>
                <Tabs defaultActive={0} preventScroll>
                  <div className="tab-container">
                    <TabList>
                      <div className="tab-list" aria-label='Report results'>
                        <Tab>
                          <button className="tab-button usa-button usa-button-outline">Table</button>
                        </Tab>
                        <Tab>
                          <button className="tab-button usa-button usa-button-outline">Chart</button>
                        </Tab>
                      </div>
                    </TabList>
                    <Panel>
                      <div className="tab-panel">
                        <QuarterlyReportResultsTable
                          key={`report-${table.id}`}
                          ref={(ref) => { this.reportRefs[table.id] = ref; }}
                          tableId={`report-${table.id}`}
                          tableData={table.data}
                          tableColumns={table.columns}
                          tableHeader={table.header}
                          displayMode={submissionAction}
                        />
                      </div>
                    </Panel>
                    <Panel>
                      <div className="tab-panel">
                        <QuarterlyReportResultsChart
                          key={`report-chart-${table.id}`}
                          tableData={table.data}
                          tableColumns={table.columns}
                        />
                      </div>
                    </Panel>
                  </div>
                </Tabs>
              </div>
            ))
          }
        </div>
        ) }
        {reportDataComplete && !reportDataHasRows
        && (
        <div className="info-box">
          <p>No data meets your search criteria. Please try a new search.</p>
        </div>
        )}
      </div>
    );
  }
}

QuarterlyReportDataPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Container.create(QuarterlyReportDataPage, {
  withProps: true,
}));
