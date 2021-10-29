import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ChiefFoiaOfficersCouncilDataPage from './pages/chief_foia_officers_council_data';

const history = createBrowserHistory();
history.push('/chief-foia-officers-council.html', { view: 'form' });

render(
  <Router history={history}>
    <ChiefFoiaOfficersCouncilDataPage />
  </Router>,
  document.getElementById('chief-foia-officers-council-react-app'),
);
