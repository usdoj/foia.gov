import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';

import annualReportDataFormStore from "../stores/annual_report_data_form";

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
            </div>
        );
    }

}

export default Container.create(AnnualReportDataPage);
