import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import LandingPage from 'pages/landing';

render(
  <LandingPage />,
  document.getElementById('landing-react-app'),
);
