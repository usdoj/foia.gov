import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ChiefFoiaOfficersCouncilPage from './pages/chief_foia_officers_council_page';
import ChiefFoiaOfficersCouncilMeetingPage from './pages/chief_foia_officers_council_meeting_page';
import ChiefFoiaOfficersCouncilCommitteePage from './pages/chief_foia_officers_council_committee_page';
import NotFoundPage from './pages/not_found';

render(
  <Router basename="/chief-foia-officers-council">
    <Switch>
      <Route path="/" exact component={ChiefFoiaOfficersCouncilPage} />
      <Route path="/meeting/:id" exact component={ChiefFoiaOfficersCouncilMeetingPage} />
      <Route path="/committee/:id" component={ChiefFoiaOfficersCouncilCommitteePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>,
  document.getElementById('chief-foia-officers-council-react-app'),
);
