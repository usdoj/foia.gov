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
    this.handleColumnFocus = this.handleColumnFocus.bind(this);

    this.state = {
      reportTable: false,
    };
  }

  componentDidMount() {
    const { tableData, tableColumns, tableId } = this.props;
    this.tabulator = new Tabulator(this.tabulatorElement, {
      data: tableData,
      columns: tableColumns,
      reactiveData: true,
      layout: 'fitDataStretch',
      tableBuilt: () => {
        const selector = `#${tableId} .tabulator-header button`;
        const buttons = document.querySelectorAll(selector);

        Array.from(buttons).forEach((button) => {
          button.addEventListener('focus', this.handleColumnFocus);
        });
      },
    });
    if (this.props.displayMode === 'download' && this.props.tableData.length > 0) {
      this.downloadCSV();
    }
  }

  downloadCSV() {
    const { tableHeader } = this.props;
    const reportType = tableHeader.replace(/[^a-zA-Z ]/g, '').trim().replace(/[^A-Z0-9]+/ig, '-').toLowerCase();
    this.tabulator.download('csv', `foia-${reportType}.csv`);
  }

  handleColumnFocus(event) {
    const button = event.target;
    const columnElement = button.closest('.tabulator-col');
    columnElement.scrollLeft = 0;
    const tabulatorField = columnElement.getAttribute('tabulator-field');
    this.tabulator.scrollToColumn(tabulatorField, 'right');
  }

  render() {
    const attributes = this.props.displayMode === 'download' ? {
      style: { display: 'none' },
      'aria-hidden': 'true',
    } : [];
    return (
      <div{...attributes}>
        <h2>{this.props.tableHeader}</h2>
        <div
          id={this.props.tableId}
          ref={(ref) => {
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
  tableId: PropTypes.string.isRequired,
};

export default FoiaReportResultsTable;
