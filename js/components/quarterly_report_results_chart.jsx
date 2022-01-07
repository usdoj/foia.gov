import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import palette from 'google-palette';

class QuarterlyReportResultsChart extends Component {
  constructor(props) {
    super(props);

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Tooltip,
      Legend
    );

    this.colors = palette('mpn65', 65);

    const { tableData, tableColumns } = this.props;

    const thisClass = this;
    this.options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              const year = context[0].label.split(';')[0];
              const quarter = context[0].label.split(';')[1];
              return [
                'Year: ' + year,
                'Quarter: ' + quarter,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback: function (label) {
              return thisClass.quarterFromLabel(this.getLabelForValue(label));
            }
          }
        },
        xAxis2: {
          type: "category",
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (label) {
              return thisClass.yearFromLabel(this.getLabelForValue(label));
            }
          }
        },
      }
    };

    const xAxes = this.xAxesFromRows(tableData);
    const datasets = this.datasetsFromRows(tableData, tableColumns, xAxes);
    this.applyColorToDatasets(datasets);
    this.data = {
      labels: xAxes.map(axis => axis.label),
      datasets: datasets,
    };
  }

  applyColorToDatasets(datasets) {
    let colorIndex = 0;
    datasets.forEach(dataset => {
      dataset.backgroundColor = '#' + this.colors[colorIndex];
      colorIndex++;
    });
  }

  xAxesFromRows(rows) {
    const xAxes = [];
    rows.forEach(row => {
      const xAxisLabel = this.xAxisLabelFromRow(row);
      const xAxis = xAxes.find(axis => axis.label === xAxisLabel);
      if (!xAxis) {
        xAxes.push({
          label: xAxisLabel,
          values: this.xAxisValuesFromRow(row),
        });
      }
    });
    this.sortByLabel(xAxes);
    return xAxes;
  }

  xAxisLabelFromRow(row) {
    return row.field_quarterly_year + ';' + row.field_quarterly_quarter;
  }

  xAxisValuesFromRow(row) {
    return {
      field_quarterly_year: row.field_quarterly_year,
      field_quarterly_quarter: row.field_quarterly_quarter,
    };
  }

  nonDisaggregationColumns() {
    return [
      'field_agency',
      'field_agency_component',
      'field_quarterly_year',
      'field_quarterly_quarter',
    ];
  }

  sortByLabel(arr) {
    arr.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
  }

  disaggregationsFromRow(row, columns) {
    const disaggregations = [];
    columns.forEach(column => {
      if (this.nonDisaggregationColumns().includes(column.field) === false) {
        // Drill down into the object using the dot-delimited id.
        let fieldValue = row;
        let valueFound = false;
        column.field.split('.').forEach(fieldProp => {
          if (typeof fieldValue[fieldProp] !== 'undefined') {
            fieldValue = fieldValue[fieldProp];
            valueFound = true;
          }
        });
        if (valueFound) {
          disaggregations.push({
            field: column.field,
            value: fieldValue,
          });
        }
      }
    });
    return disaggregations;
  }

  datasetsFromRows(rows, columns, xAxes) {
    const datasets = [];
    rows.forEach(row => {
      const agency = row.field_agency;
      const component = row.field_agency_component;
      const xAxisLabel = this.xAxisLabelFromRow(row);
      this.disaggregationsFromRow(row, columns).forEach(disaggregation => {
        const fieldTitle = columns.find(column => column.field === disaggregation.field).title;
        const label = agency + ', ' + component + ', ' + fieldTitle;
        const value = {
          xAxisLabel: xAxisLabel,
          value: disaggregation.value,
        };
        const existingDataset = datasets.find(dataset => dataset.label === label);

        if (existingDataset) {
          existingDataset.data.push(value);
        }
        else {
          datasets.push({
            label: label,
            data: [value],
          });
        }
      })
    });
    datasets.forEach(dataset => {
      this.sortByLabel(dataset.data);
    });
    datasets.forEach(dataset => {
      dataset.data = dataset.data.map(value => value.value);
    });
    return datasets;
  }

  datasetLabelFromRow(row) {
    const agency = row.field_agency;
    const component = row.field_agency_component;
  }

  yearFromLabel(label) {
    const year = label.split(';')[0];
    const quarter = label.split(';')[1];
    return (quarter === '1') ? year : '';
  }

  quarterFromLabel(label) {
    const year = label.split(';')[0];
    return label.split(';')[1];
  }

  render() {
    return (
      <Bar options={this.options} data={this.data} />
    );
  }
}

QuarterlyReportResultsChart.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
};

export default QuarterlyReportResultsChart;
