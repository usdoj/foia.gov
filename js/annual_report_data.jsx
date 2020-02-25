import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AnnualReportDataPage from 'pages/annual_report_data';

const history = createBrowserHistory();
history.push('/data.html', { view: 'form' });

render(
  <Router history={history}>
    <AnnualReportDataPage />
  </Router>,
  document.getElementById('annual-report-data-react-app'),
);
