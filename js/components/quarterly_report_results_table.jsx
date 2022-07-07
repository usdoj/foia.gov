/*
 * HTML table
 *
 */

import React, { Component } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import PropTypes from 'prop-types';

class QuarterlyReportResultsTable extends Component {
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
    });
    this.tabulator.on('tableBuilt', () => {
      const selector = `#${tableId} .tabulator-header button`;
      const buttons = document.querySelectorAll(selector);

      Array.from(buttons).forEach((button) => {
        button.addEventListener('focusin', this.handleColumnFocus);
      });
    });
    if (this.props.displayMode === 'download' && this.props.tableData.length > 0) {
      this.downloadCSV();
    }
  }

  downloadCSV() {
    const { tableHeader } = this.props;
    const reportType = tableHeader.replace(/[^a-zA-Z ]/g, '').trim().replace(/[^A-Z0-9]+/ig, '-').toLowerCase();
    const table = this.tabulator;
    table.on('tableBuilt', function () {
      table.download('csv', `foia-${reportType}.csv`);
    });
  }

  handleColumnFocus(event) {
    const button = event.target;
    const columnElement = button.closest('.tabulator-col');
    const colIndex = this
      .tabulator
      .columnManager
      .columns
      .findIndex((column) => column.element === columnElement);
    if (colIndex <= 0) {
      this.tabulator.columnManager.element.scrollLeft = 0;
      this.tabulator.rowManager.element.scrollLeft = 0;

      return;
    }

    const col = this.tabulator.columnManager.columns[colIndex];
    const viewport = this.tabulator.columnManager.element.getBoundingClientRect().width;
    const boundaryRight = col.width + col.element.offsetLeft - viewport;
    const boundaryLeft = col.element.offsetLeft;
    const currentScrollPosition = this.tabulator.columnManager.element.scrollLeft;

    // If the focused element is already fully in view, make sure the
    // table body is scrolled to the same position as the headings.
    // Otherwise do nothing.
    if (this.tabulator.columnManager.element.scrollLeft > boundaryRight
      && this.tabulator.columnManager.element.scrollLeft < boundaryLeft) {
      this.tabulator.rowManager.element.scrollLeft = currentScrollPosition;
      return;
    }

    // If the left edge of the focused element is on the left side of the viewport
    // (eg tabbing backwards), pin the element to the left side of the viewport,
    // otherwise, pin the element to the right side of the viewport.
    const diff = col.element.offsetLeft - currentScrollPosition;
    const side = (viewport / 2) >= diff ? 'left' : 'right';
    if (side === 'left') {
      this.tabulator.columnManager.element.scrollLeft = col.element.offsetLeft;
      this.tabulator.rowManager.element.scrollLeft = col.element.offsetLeft;
    } else {
      const newScrollPosition = col.width + col.element.offsetLeft - viewport;
      this.tabulator.columnManager.element.scrollLeft = newScrollPosition;
      this.tabulator.rowManager.element.scrollLeft = newScrollPosition;
    }
  }

  render() {
    const attributes = this.props.displayMode === 'download' ? {
      style: { display: 'none' },
      'aria-hidden': 'true',
    } : [];
    return (
      <div {...attributes}>
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

QuarterlyReportResultsTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
  tableHeader: PropTypes.string.isRequired,
  displayMode: PropTypes.string.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default QuarterlyReportResultsTable;
