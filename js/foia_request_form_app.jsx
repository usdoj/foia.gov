import React, { Component } from 'react';
import { Dispatcher } from 'flux';
import { Container } from 'flux/utils';

import AgencyComponentSelector from 'components/agency_component_selector';
import FOIARequestForm from 'components/foia_request_form';
import Header from 'components/header';

import AgencyStore from 'stores/agency';

import { RequestActions } from 'actions';

import Api from 'util/api';

const api = new Api('http://localhost:4000/api');


// TODO fetch list of agencies and agency components from the server
const agencies = {
  gsa: 'General Services Administration (GSA)',
  oge: 'Office of Government Ethics (OGE)',
};


const dispatcher = new Dispatcher();
const agencyStore = new AgencyStore(dispatcher);

const requestActions = RequestActions({ dispatcher, api });

function agencyChange(agency) {
  requestActions.agencyChange(agency)
    .then(requestActions.receiveAgency);
}


class FOIARequestFormApp extends Component {
  static getStores() {
    return [agencyStore];
  }

  static calculateState() {
    const { agency, selectedAgency } = agencyStore.getState();
    return {
      agencies,
      agency,
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
        { this.state.agency && <FOIARequestForm agency={this.state.agency} /> }
      </div>
    );
  }
}

export default Container.create(FOIARequestFormApp);
