import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import AgencyComponentSelector from 'components/agency_component_selector';
import agencyComponentStore from '../stores/agency_component';


function agencyChange(agency) {
  const { history } = window.app;
  requestActions.agencyChange(agency.id)
    .then(() => {
      history.push(`/agency-component/${agency.id}/`);
    });
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
      <div>
        <AgencyComponentSelector
          agencies={agencies}
          agencyComponents={agencyComponents}
          onAgencyChange={agencyChange}
        />
      </div>
    );
  }
}

export default Container.create(RequestLandingPage);
