/// <reference path="./wizard-types.d.ts" />
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import WizardPage from './pages/wizard';

render(
  <WizardPage />,
  document.getElementById('wizard-react-app'),
);
