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

function getTimeKeyFromRow(row) {
  const { field_quarterly_year, field_quarterly_quarter } = row;
  return {
    year: field_quarterly_year,
    quarter: field_quarterly_quarter,
    id: `${field_quarterly_year}|${field_quarterly_quarter}`,
  };
}

// Get timeKeys, keyed by key.
function getTimeKeysFromRows(rows) {
  const timeKeys = {};
  for (const row of rows) {
    const timeKey = getTimeKeyFromRow(row);
    timeKeys[timeKey.id] = timeKey;
  }
  return timeKeys;
}

// Figure out which agencies have "Agency Overall" rows.
// Returns a Set object.
function getOverallOnlyAgencies(rows) {
  const agenciesWithOverall = new Set();
  for (const row of rows) {
    if (row.field_agency_component === 'Agency Overall') {
      agenciesWithOverall.add(row.field_agency);
    }
  }
  return agenciesWithOverall;
}

function getDataTypeValueFromRow(dataType, row) {
  let drilled = row;
  const levels = dataType.field.split('.');
  for (const level of levels) {
    if (typeof drilled !== 'object') {
      break;
    }
    if (typeof drilled[level] !== 'undefined') {
      drilled = drilled[level];
    }
  }
  return drilled;
}

function getSeriesKeyFromRowAndDataType(row, dataType, totals) {
  const dataTypeValue = getDataTypeValueFromRow(dataType, row);
  const seriesKey = {};
  let seriesKeyId = dataType.field;
  seriesKey.data_type = dataType.field;
  seriesKey.value = dataTypeValue;
  seriesKey.field_agency = row.field_agency;
  seriesKey.field_agency_component = row.field_agency_component;
  if (!totals) {
    seriesKeyId += `|${row.field_agency}|${row.field_agency_component}`;
  }
  seriesKey.id = seriesKeyId;
  return seriesKey;
}

function nonDisaggregationColumns() {
  return [
    'field_agency',
    'field_agency_component',
    'field_quarterly_year',
    'field_quarterly_quarter',
  ];
}

function isFieldDataType(field) {
  return !(nonDisaggregationColumns().includes(field));
}

function getDataTypes(columns) {
  return columns.filter((col) => isFieldDataType(col.field));
}

function sortObservationsInDatasets(datasets) {
  function sortByTimeKey(a, b) {
    return (a.timeKey.id > b.timeKey.id) ? 1 : -1;
  }
  for (const ds of Object.values(datasets)) {
    ds.observations.sort(sortByTimeKey);
  }
}

function getDatasetsFromRows(rows, columns, overall, totals) {
  const datasets = {};
  const overallOnly = getOverallOnlyAgencies(rows);
  const dataTypes = getDataTypes(columns);
  for (const row of rows) {
    const { field_agency, field_agency_component } = row;
    const isAgencyOverall = field_agency_component === 'Agency Overall';
    // Skip non-overall rows if needed.
    if (overall && !isAgencyOverall && overallOnly.has(field_agency)) {
      continue;
    }
    // Skip overall fields if summing.
    if (!overall && isAgencyOverall && totals) {
      continue;
    }
    const timeKey = getTimeKeyFromRow(row);
    for (const dataType of dataTypes) {
      const seriesKey = getSeriesKeyFromRowAndDataType(row, dataType, totals);
      if (typeof datasets[seriesKey.id] === 'undefined') {
        datasets[seriesKey.id] = {
          seriesKey,
          observations: [],
        };
      }
      const dataset = datasets[seriesKey.id];
      const existing = dataset.observations.find((obs) => obs.timeKey.id === timeKey.id);
      if (existing) {
        existing.value += seriesKey.value;
      } else {
        dataset.observations.push({
          timeKey,
          value: seriesKey.value,
        });
      }
    }
  }
  sortObservationsInDatasets(datasets);
  return datasets;
}

function yearFromLabel(label) {
  const year = label.split('|')[0];
  const quarter = label.split('|')[1];
  return (quarter === '1') ? year : '';
}

function quarterFromLabel(label) {
  return label.split('|')[1];
}

function convertToChartJsDatasets(datasets, tableColumns) {
  return Object.values(datasets).map((dataset) => {
    const labelParts = dataset.seriesKey.id.split('|');
    const label = labelParts.map((labelPart) => {
      const field = tableColumns.find((col) => col.field === labelPart);
      return field ? field.title : labelPart;
    }).join(', ');
    return {
      label,
      data: dataset.observations.map((obs) => obs.value),
    };
  });
}

function convertToChartJsLabels(timeKeys) {
  return Object.keys(timeKeys).sort();
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
              const year = context[0].label.split('|')[0];
              const quarter = context[0].label.split('|')[1];
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

  getAllComponentsInTotal() {
    const { totals, overall } = this.state;
    const all = new Set();
    if (totals) {
      const { tableData } = this.props;
      // TODO: This is duplicated in getDatasetsFromRows, maybe refactor?
      const overallOnly = getOverallOnlyAgencies(tableData);
      for (const row of tableData) {
        const { field_agency, field_agency_component } = row;
        const isAgencyOverall = field_agency_component === 'Agency Overall';
        // Skip non-overall rows if needed.
        if (overall && !isAgencyOverall && overallOnly.has(field_agency)) {
          continue;
        }
        // Skip overall fields if summing.
        if (!overall && isAgencyOverall && totals) {
          continue;
        }
        all.add(`${field_agency} - ${field_agency_component}`);
      }
    }
    return [...all];
  }

  getData() {
    const { tableData, tableColumns } = this.props;
    const { overall, totals } = this.state;
    const timeKeys = getTimeKeysFromRows(tableData);
    const datasets = getDatasetsFromRows(tableData, tableColumns, overall, totals);
    const chartJsLabels = convertToChartJsLabels(timeKeys);
    const chartJsDatasets = convertToChartJsDatasets(datasets, tableColumns);
    this.applyColorToDatasets(chartJsDatasets);
    return {
      labels: chartJsLabels,
      datasets: chartJsDatasets,
    };
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
    const data = this.getData();
    const showChart = data.datasets.length <= 10;
    return (
      <div>
        { showChart && chartType === 'line' && <Line options={this.options} data={data} /> }
        { showChart && chartType === 'bar' && <Bar options={this.options} data={data} /> }
        <button onClick={this.toggleChartType}>
          {chartTypeLabel}
        </button>
        <button onClick={this.toggleOverall}>
          {overallLabel}
        </button>
        <button onClick={this.toggleTotals}>
          {totalsLabel}
        </button>
        { totals && (
        <div>
          <h2>Showing sums of:</h2>
          <ul>
            {this.getAllComponentsInTotal().map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        )}
        { !showChart && (
          <h2>There are too many datasets to display as on a chart.</h2>
        )}
      </div>
    );
  }
}

QuarterlyReportResultsChart.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
};

export default QuarterlyReportResultsChart;
