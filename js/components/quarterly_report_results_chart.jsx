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
  rows.forEach((row) => {
    const agency = row.field_agency;
    const component = row.field_agency_component;
    const xAxisLabel = xAxisLabelFromRow(row);
    disaggregationsFromRow(row, columns).forEach((disaggregation) => {
      const fieldTitle = columns.find((column) => column.field === disaggregation.field).title;
      let label = `${agency}, ${component}, ${fieldTitle}`;
      if (agency === 'Sum of multiple agencies and components') {
        label = `${component}, ${fieldTitle}`;
      }
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
    this.options = {
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

    this.state = {
      overall: true,
      totals: true,
      chartType: 'bar',
    };

    this.toggleChartType = this.toggleChartType.bind(this);
    this.toggleOverall = this.toggleOverall.bind(this);
    this.toggleTotals = this.toggleTotals.bind(this);
  }

  applyColorToDatasets(datasets) {
    let colorIndex = 0;
    datasets.forEach((dataset) => {
      dataset.backgroundColor = `#${this.colors[colorIndex]}`;
      colorIndex++;
    });
  }

  getData() {
    const { tableData, tableColumns } = this.props;
    const { overall, totals } = this.state;
    let rows = tableData;
    if (overall) {
      rows = this.getOverall();
    }
    if (totals) {
      rows = this.getTotals(rows);
    }
    const xAxes = xAxesFromRows(rows);
    const datasets = datasetsFromRows(rows, tableColumns, xAxes);
    this.applyColorToDatasets(datasets);
    return {
      labels: xAxes.map((axis) => axis.label),
      datasets,
    }
  }

  getOverall() {
    const agenciesWithOverall = {};
    const { tableData } = this.props;
    tableData.forEach(row => {
      if (row.field_agency_component === 'Agency Overall') {
        agenciesWithOverall[row.field_agency] = true;
      }
    });
    return tableData.filter(row => {
      if (agenciesWithOverall[row.field_agency]) {
        return row.field_agency_component === 'Agency Overall';
      }
      return true;
    });
  }

  getTotals(rows) {
    const totals = {};
    rows.forEach(row => {
      const totalId = [
        row['field_quarterly_quarter'],
        row['field_quarterly_year'],
      ].join('|');
      const componentId = [
        row['field_agency'],
        row['field_agency_component'],
      ].join('|');
      if (!totals[totalId]) {
        totals[totalId] = {
          componentIds: [],
          rows: [],
        };
      }
      totals[totalId].componentIds.push(componentId);
      totals[totalId].rows.push(row);
    });
    Object.values(totals).forEach(total => {
      const summedRow = {};
      total.rows.forEach(row => {
        Object.keys(row).forEach(prop => {
          if (!(nonDisaggregationColumns().includes(prop))) {
            if (Number.isInteger(row[prop])) {
              if (!summedRow[prop]) {
                summedRow[prop] = row[prop];
              }
              else {
                summedRow[prop] += row[prop];
              }
            }
            else if (typeof row[prop] === 'object' && row[prop] !== null) {
              if (!summedRow[prop]) {
                summedRow[prop] = {};
              }
              Object.keys(row[prop]).forEach(childProp => {
                if (!summedRow[prop][childProp]) {
                  summedRow[prop][childProp] = row[prop][childProp];
                }
                else {
                  summedRow[prop][childProp] += row[prop][childProp];
                }
              });
            }
          }
        });
      });
      total.summedRow = summedRow;
    });
    return Object.entries(totals).map(([totalId, totalRow]) => {
      const row = {};
      row['field_quarterly_quarter'] = totalId.split('|')[0];
      row['field_quarterly_year'] = totalId.split('|')[1];
      row['field_agency'] = 'Sum of multiple agencies and components';
      row['field_agency_component'] = 'Sum total of ' + totalRow.componentIds.map(componentId => {
        const [agency, component] = componentId.split('|');
        if (component === 'Agency Overall') {
          return agency;
        }
        return component;
      }).join(', ');
      Object.keys(totalRow.summedRow).forEach(summedProp => {
        if (!(nonDisaggregationColumns().includes(summedProp))) {
          row[summedProp] = totalRow.summedRow[summedProp];
        }
      });
      return row;
    });
  }

  toggleChartType() {
    const { chartType } = this.state;
    const newChartType = chartType === 'bar' ? 'line' : 'bar';
    this.setState({
      chartType: newChartType,
    });
  }

  toggleOverall() {
    const { overall } = this.state;
    this.setState({
      overall: !overall,
    });
  }

  toggleTotals() {
    const { totals } = this.state;
    this.setState({
      totals: !totals,
    });
  }

  render() {
    const { chartType, overall, totals } = this.state;
    const chartTypeLabel = chartType === 'bar' ? 'Switch to line chart' : 'Switch to bar chart';
    const overallLabel = overall ? 'Always show components' : 'Limit to agency overall when possible';
    const totalsLabel = totals ? 'Do not sum values' : 'Sum values';
    return (
      <div>
        { chartType === 'line' &&
          <Line options={this.options} data={this.getData()} />
        }
        {chartType === 'bar' &&
          <Bar options={this.options} data={this.getData()} />
        }

        <button onClick={this.toggleChartType}>
          {chartTypeLabel}
        </button>
        <button onClick={this.toggleOverall}>
          {overallLabel}
        </button>
        <button onClick={this.toggleTotals}>
          {totalsLabel}
        </button>
      </div>
    );
  }
}

QuarterlyReportResultsChart.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
};

export default QuarterlyReportResultsChart;
