import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Line } from 'react-chartjs-2';
import palette from 'google-palette';

function yearFromLabel(label) {
  const year = label.split(';')[0];
  const quarter = label.split(';')[1];
  return (quarter === '1') ? year : '';
}

function quarterFromLabel(label) {
  return label.split(';')[1];
}

function xAxisLabelFromRow(row) {
  return `${row.field_quarterly_year};${row.field_quarterly_quarter}`;
}

function xAxisValuesFromRow(row) {
  return {
    field_quarterly_year: row.field_quarterly_year,
    field_quarterly_quarter: row.field_quarterly_quarter,
  };
}

function nonDisaggregationColumns() {
  return [
    'field_agency',
    'field_agency_component',
    'field_quarterly_year',
    'field_quarterly_quarter',
  ];
}

function sortByLabel(arr) {
  arr.sort((a, b) => {
    if (a.label > b.label) {
      return 1;
    }
    if (b.label > a.label) {
      return -1;
    }
    return 0;
  });
}

function xAxesFromRows(rows) {
  const xAxes = [];
  rows.forEach((row) => {
    const xAxisLabel = xAxisLabelFromRow(row);
    const xAxis = xAxes.find((axis) => axis.label === xAxisLabel);
    if (!xAxis) {
      xAxes.push({
        label: xAxisLabel,
        values: xAxisValuesFromRow(row),
      });
    }
  });
  sortByLabel(xAxes);
  return xAxes;
}

function disaggregationsFromRow(row, columns) {
  const disaggregations = [];
  columns.forEach((column) => {
    if (nonDisaggregationColumns().includes(column.field) === false) {
      // Drill down into the object using the dot-delimited id.
      let fieldValue = row;
      let valueFound = false;
      column.field.split('.').forEach((fieldProp) => {
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

function datasetsFromRows(rows, columns) {
  const datasets = [];
  const agencyOverall = rows.filter(row => row.field_agency_component === 'Agency Overall');
  if (agencyOverall.length > 0) {
    // If the search included agency overall, just show that.
    rows = agencyOverall;
  }
  rows.forEach((row) => {
    const agency = row.field_agency;
    const component = row.field_agency_component;
    const xAxisLabel = xAxisLabelFromRow(row);
    disaggregationsFromRow(row, columns).forEach((disaggregation) => {
      const fieldTitle = columns.find((column) => column.field === disaggregation.field).title;
      const label = `${agency}, ${component}, ${fieldTitle}`;
      const value = {
        xAxisLabel,
        value: disaggregation.value,
      };
      const existingDataset = datasets.find((dataset) => dataset.label === label);

      if (existingDataset) {
        existingDataset.data.push(value);
      } else {
        datasets.push({
          label,
          data: [value],
        });
      }
    });
  });
  datasets.forEach((dataset) => {
    sortByLabel(dataset.data);
  });
  datasets.forEach((dataset) => {
    dataset.data = dataset.data.map((value) => value.value);
  });
  return datasets;
}

class QuarterlyReportResultsChart extends Component {
  constructor(props) {
    super(props);

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      LineElement,
      PointElement,
      Tooltip,
      Legend,
      ChartDataLabels,
    );

    this.colors = palette('mpn65', 65);

    const { tableData, tableColumns } = this.props;

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        datalabels: {
          backgroundColor: 'black',
          borderRadius: 4,
          color: 'white',
        },
        tooltip: {
          callbacks: {
            title(context) {
              const year = context[0].label.split(';')[0];
              const quarter = context[0].label.split(';')[1];
              return [
                `Year: ${year}`,
                `Quarter: ${quarter}`,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback(label) {
              return quarterFromLabel(this.getLabelForValue(label));
            },
          },
        },
        xAxis2: {
          type: 'category',
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback(label) {
              return yearFromLabel(this.getLabelForValue(label));
            },
          },
        },
      },
    };

    const xAxes = xAxesFromRows(tableData);
    const datasets = datasetsFromRows(tableData, tableColumns, xAxes);
    this.applyColorToDatasets(datasets);

    this.state = {
      chartType: 'bar',
      data: {
        labels: xAxes.map((axis) => axis.label),
        datasets,
      },
      options,
    };
  }

  applyColorToDatasets(datasets) {
    let colorIndex = 0;
    datasets.forEach((dataset) => {
      dataset.backgroundColor = `#${this.colors[colorIndex]}`;
      colorIndex++;
    });
  }

  render() {
    const {
      chartType,
      options,
      data,
    } = this.state;
    return (
      <div>
        { chartType === 'line' &&
          <Line options={options} data={data} />
        }
        {chartType === 'bar' &&
          <Bar options={options} data={data} />
        }
      </div>
    );
  }
}

QuarterlyReportResultsChart.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
};

export default QuarterlyReportResultsChart;
