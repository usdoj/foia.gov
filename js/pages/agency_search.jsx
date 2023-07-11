import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import agencyComponentStore from '../stores/agency_component';
import AgencySearch from '../components/agency_search';

class AgencySearchPage extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    return agencyComponentStore.getState();
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
      flatList,
    } = this.state;

    return (
      <AgencySearch
        agencies={agencies}
        agencyComponents={agencyComponents}
        agencyFinderDataComplete={agencyFinderDataComplete}
        agencyFinderDataProgress={agencyFinderDataProgress}
        flatList={flatList}
      />
    );
  }
}

export default Container.create(AgencySearchPage);
