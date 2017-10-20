import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import AgencyComponentSelector from 'components/agency_component_selector';
import agencyComponentStore from '../stores/agency_component';


class LandingPage extends Component {
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
    const agencyChange = (agencyComponent) => {
      if (agencyComponent.type === 'agency') {
        // TODO we probably want to make top-level agencies un-selectable?
        return;
      }

      this.setState({
        choosenAgencyComponent: agencyComponent,
      });
    };

    const { agencies, agencyComponents } = this.state;
    return (
      <div className="usa-grid">
        <h2>Select the agency that you’d like to send a FOIA request to</h2>
        <AgencyComponentSelector
          agencies={agencies}
          agencyComponents={agencyComponents}
          onAgencyChange={agencyChange}
        />
        { this.state.choosenAgencyComponent &&
          (
            <div>{this.state.choosenAgencyComponent.title}</div>
          )
        }
      </div>
    );
  }
}

export default Container.create(LandingPage);
