/*
 * HTML table
 *
 */

import React, { Component } from 'react';
import Tabulator from 'tabulator-tables';
import PropTypes from 'prop-types';

class FoiaReportResultsTable extends Component {
  constructor(props) {
    super(props);

    this.tabulatorElement = null;
    this.tabulator = null;

    this.downloadCSV = this.downloadCSV.bind(this);

    this.state = {
      reportTable: false,
    };
  }

  componentDidMount() {
    const { tableData, tableColumns } = this.props;
    this.tabulator = new Tabulator(this.tabulatorElement, {
      data: tableData,
      columns: tableColumns,
      reactiveData: true,
    });
    if (this.props.displayMode === 'download') {
      this.downloadCSV();
    }
  }

  downloadCSV() {
    const { tableHeader } = this.props;
    const reportType = tableHeader.replace(/[^a-zA-Z ]/g, '').trim().replace(/[^A-Z0-9]+/ig, '-').toLowerCase();
    this.tabulator.download('csv', `foia-${reportType}.csv`);
  }

  render() {
    const attributes = this.props.displayMode === 'download' ? {
      style: { display: 'none' },
      'aria-hidden': 'true',
    } : [];
    return (
      <div{...attributes}>
        <h2>{this.props.tableHeader}</h2>
        <div ref={(ref) => {
          this.tabulatorElement = ref;
        }}
        />
      </div>
    );
  }
}

FoiaReportResultsTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
  tableHeader: PropTypes.string.isRequired,
  displayMode: PropTypes.string.isRequired,
};

export default FoiaReportResultsTable;
