import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import AgencyComponentSelector from 'components/agency_component_selector';
import agencyComponentStore from '../stores/agency_component';


function agencyChange(agencyComponent) {
  if (agencyComponent.type === 'agency') {
    // TODO we probably want to make top-level agencies un-selectable?
    return;
  }

  const { history } = window.app;
  history.push(`/agency-component/${agencyComponent.id}/`);
}


class RequestLandingPage extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agencyComponents, agencies } = agencyComponentStore.getState();
    return {
      agencies,
      agencyComponents,
    };
  }

  componentDidMount() {
    // If there is any agency data, assume all the data is fetched.
    if (this.state.agencies.size) {
      return;
    }

    // Pre-fetch the list of agencies and components for typeahead
    requestActions.fetchAgencyFinderData();
  }

  render() {
    const { agencies, agencyComponents } = this.state;

    return (
      <div id="request-landing-page" className="usa-grid">
        <div className="usa-width-one-whole">
          <h1>Select an agency to make a FOIA request</h1>
          <AgencyComponentSelector
            agencies={agencies}
            agencyComponents={agencyComponents}
            onAgencyChange={agencyChange}
          />
        </div>
      </div>
    );
  }
}

export default Container.create(RequestLandingPage);
