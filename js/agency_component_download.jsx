import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import AgencyComponentDownloadButton from 'components/agency_component_download';

render(
  <AgencyComponentDownloadButton />,
  document.getElementById('agency-component-download-react-app'),
);
