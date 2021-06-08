import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import QuarterlyReportDataPage from 'pages/quarterly_report_data';

const history = createBrowserHistory();
history.push('/quarterly.html', { view: 'form' });

render(
  <Router history={history}>
    <QuarterlyReportDataPage />
  </Router>,
  document.getElementById('quarterly-report-data-react-app'),
);
