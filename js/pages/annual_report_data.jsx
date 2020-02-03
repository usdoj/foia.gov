import React, { Component } from 'react';
import { Container } from 'flux/utils';
import FoiaReportFormSectionOne from '../components/foia_report_form_section_one';
import FoiaReportFormSectionTwo from '../components/foia_report_form_section_two';

import annualReportDataFormStore from '../stores/annual_report_data_form';
import FoiaReportFormSectionThree from '../components/foia_report_form_section_three';
import agencyComponentStore from '../stores/agency_component';
import annualReportFiscalYearStore from '../stores/annual_report_fiscal_year';
import annualReportDataTypesStore from '../stores/annual_report_data_types';
import { reportActions } from '../actions/report';

class AnnualReportDataPage extends Component {
  static getStores() {
    return [
      annualReportDataFormStore,
      annualReportFiscalYearStore,
      agencyComponentStore,
      annualReportDataTypesStore,
    ];
  }

  static calculateState(prevState) {
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
    } = annualReportDataFormStore.getState();

    const {
      dataTypes,
      dataTypeOptions,
    } = annualReportDataTypesStore.getState();

    return {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
      fiscalYears,
      selectedFiscalYears,
      selectedAgencies,
      dataTypes,
      dataTypeOptions,
      selectedDataTypes,
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
          />
          <FoiaReportFormSectionTwo
            dataTypes={dataTypes}
            dataTypeOptions={dataTypeOptions}
            selectedDataTypes={selectedDataTypes}
          />
          <FoiaReportFormSectionThree
            fiscalYears={fiscalYears}
            selectedFiscalYears={selectedFiscalYears}
          />
        </form>
      </div>
    );
  }
}

export default Container.create(AnnualReportDataPage);
