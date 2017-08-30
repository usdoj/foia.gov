import React, { Component } from 'react';
import { Dispatcher } from 'flux';
import { Container } from 'flux/utils';

import AgencyComponentSelector from './agency_component_selector';
import FOIARequestForm from './foia_request_form';
import Header from './header';

import AgencyStore from './stores/agency';

import { request } from './actions';


// TODO fetch list of agencies and agency components from the server
const agencies = {
  gsa: 'General Services Administration (GSA)',
  oge: 'Office of Government Ethics (OGE)',
};


const dispatcher = new Dispatcher();
const agencyStore = new AgencyStore(dispatcher);

function agencyChange(agency) {
  request.agencyChange(dispatcher, agency);
}


class FOIARequestFormApp extends Component {
  static getStores() {
    return [agencyStore];
  }

  static calculateState() {
    const { selectedAgency } = agencyStore.getState();
    return {
      agencies,
      selectedAgency,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <AgencyComponentSelector
          agencies={this.state.agencies}
          selectedAgency={this.state.selectedAgency}
          onAgencyChange={agencyChange}
        />
        { this.state.selectedAgency && <FOIARequestForm agency={this.state.selectedAgency} /> }
      </div>
    );
  }
}

export default Container.create(FOIARequestFormApp);
