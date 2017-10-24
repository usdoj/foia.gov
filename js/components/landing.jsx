import React, { Component } from 'react';

import { requestActions } from 'actions';
import AgencyComponentSelector from 'components/agency_component_selector';
import AgencyComponentPreview from 'components/agency_component_preview';
import agencyComponentStore from '../stores/agency_component';


class LandingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencyComponent: null,
    };
  }

  render() {
    const agencyChange = (agencyComponent) => {
      if (agencyComponent.type === 'agency') {
        // TODO we probably want to make top-level agencies un-selectable?
        return;
      }

      requestActions.fetchAgencyComponent(agencyComponent.id)
        .then(requestActions.receiveAgencyComponent)
        .then(() => {
          const component = agencyComponentStore.getAgencyComponent(agencyComponent.id);
          this.setState({agencyComponent: component});
        });
    };

    const { agencies, agencyComponents } = this.props;
    return (
      <div className="usa-grid">
        <h2>Select the agency that you’d like to send a FOIA request to</h2>
        <AgencyComponentSelector
          agencies={agencies}
          agencyComponents={agencyComponents}
          onAgencyChange={agencyChange}
        />
        {
          this.state.agencyComponent &&
          <AgencyComponentPreview agencyComponent={this.state.agencyComponent.toJS()} />
        }
      </div>
    );
  }
}

export default LandingComponent;
