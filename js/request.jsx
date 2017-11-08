import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import RequestLandingPage from './pages/request_landing';
import ConfirmationPage from './pages/confirmation';
import AgencyComponentRequestPage from './pages/agency_component_request';
import NotFoundPage from './pages/not_found';

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
      <Route
        path="/agency-component/:agencyComponentId/confirmation"
        component={ConfirmationPage}
      />
      <Route path="/agency-component/:agencyComponentId" component={AgencyComponentRequestPage} />
      <Route path="/" component={RequestLandingPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>,
  document.getElementById('react-app'),
);
