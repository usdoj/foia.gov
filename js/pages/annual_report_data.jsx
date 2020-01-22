import React, { Component } from 'react';
import { Container } from 'flux/utils';
import FoiaReportFormSectionOne from '../components/foia_report_form_section_one';
import FoiaReportFormSectionTwo from '../components/foia_report_form_section_two';

import annualReportDataFormStore from '../stores/annual_report_data_form';
import FoiaReportFormSectionThree from '../components/foia_report_form_section_three';
import annualReportFiscalYearStore from '../stores/annual_report_fiscal_year';
import { requestActions } from '../actions/index';

class AnnualReportDataPage extends Component {
  static getStores() {
    return [annualReportDataFormStore, annualReportFiscalYearStore];
  }

  static calculateState(prevState) {
    const {
      fiscalYears,
    } = annualReportFiscalYearStore.getState();

    return {
      fiscalYears,
    };
  }

  componentDidMount() {
    requestActions.fetchAnnualReportDataFiscalYears();
  }

  render() {
    return (
      <div className="annual-report-data-page usa-grid" ref={(ref) => { this.element = ref; }}>
        <h1>Create a Report</h1>
        <form>
          <FoiaReportFormSectionOne />
          <FoiaReportFormSectionTwo />
          <FoiaReportFormSectionThree />
        </form>
      </div>
    );
  }
}

export default Container.create(AnnualReportDataPage, { pure: false });
