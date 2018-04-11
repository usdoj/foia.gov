import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import AgencyComponentDownloadPage from 'pages/agency_component_download';

render(
  <AgencyComponentDownloadPage />,
  document.getElementById('agency-component-download-react-app'),
);
