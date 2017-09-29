import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import FOIARequestFormApp from './foia_request_form_app';
import AgencyComponentRequestForm from './agency_component_request_form';
import Four04 from './four04';

const history = createBrowserHistory({
  basename: '/request',
});

// Set some globals
// Not sure if there's a better pattern for sharing globals
window.app = {
  history,
};

render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={FOIARequestFormApp} />
      <Route path="/agency-component/:agency" component={AgencyComponentRequestForm} />
      <Route component={Four04} />
    </Switch>
  </Router>,
  document.getElementById('react-app'),
);
