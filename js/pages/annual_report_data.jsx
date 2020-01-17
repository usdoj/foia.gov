import React, { Component } from 'react';
import { Container } from 'flux/utils';
import FoiaReportFormSectionTwo from '../components/foia_report_form_section_two';

import annualReportDataFormStore from '../stores/annual_report_data_form';

class AnnualReportDataPage extends Component {
  static getStores() {
    return [annualReportDataFormStore];
  }
  static calculateState(prevState) {
    return {};
  }

  render() {
    return (
      <div className="usa-grid" ref={(ref) => { this.element = ref; }}>
        <h1>Create a Report</h1>
        <form>
          <FoiaReportFormSectionTwo />
        </form>
      </div>
    );
  }
}

export default Container.create(AnnualReportDataPage);
