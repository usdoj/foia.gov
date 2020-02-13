/*
 * HTML table
 *
 */

import React, { Component } from 'react';
import Tabulator from 'tabulator-tables';

class FoiaReportResultsTable extends Component {
  constructor() {
    super();

    this.tabulatorElement = null;
    this.tabulator = null;
    this.tableData = [];
    this.columns = [];

    this.downloadCSV = this.downloadCSV.bind(this);

    this.state = {
      reportTable: false,
    };
  }

  componentDidMount() {
    const sampleData = [
      { id: 1, agency: 'Administrative Conference of the United States', component: 'ACUS', fiscalYear: '2017' },
      { id: 2, agency: 'Central Intelligence Agency', component: 'CIA', fiscalYear: '2016' },
      { id: 3, agency: 'Department of Agriculture', component: 'AMS', fiscalYear: '2014' },
    ];
    const sampleColumns = [
      { title: 'Agency', field: 'agency', align: 'center' },
      { title: 'Component', field: 'component', align: 'center' },
      { title: 'Fiscal Year', field: 'fiscalYear', align: 'center' },
    ];

    this.tableData = sampleData;
    this.tableColumns = sampleColumns;
    this.tabulator = new Tabulator(this.element, {
      data: this.tableData,
      columns: this.tableColumns,
      reactiveData: true,
    });
  }

  downloadCSV(reportType) {
    this.tabulator.download('csv', `foia-${reportType}.csv`);
  }

  render() {
    return (
      <div>
        <div ref={(ref) => { this.element = ref; }} />
      </div>
    );
  }
}

export default FoiaReportResultsTable;
