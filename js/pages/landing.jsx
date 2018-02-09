import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import LandingComponent from '../components/landing';
import agencyComponentStore from '../stores/agency_component';


class LandingPage extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
    } = agencyComponentStore.getState();

    return {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
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
    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
    } = this.state;

    return (
      <LandingComponent
        agencies={agencies}
        agencyComponents={agencyComponents}
        agencyFinderDataComplete={agencyFinderDataComplete}
        agencyFinderDataProgress={agencyFinderDataProgress}
      />
    );
  }
}

export default Container.create(LandingPage);
