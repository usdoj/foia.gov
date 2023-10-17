import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import AgencySearchPage from 'pages/agency_search';

render(
  <AgencySearchPage />,
  document.getElementById('agency-search-react-app'),
);
