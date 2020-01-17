import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import AnnualReportDataPage from 'pages/annual_report_data';

render(
    <AnnualReportDataPage />,
    document.getElementById('annual-report-data-react-app'),
);
