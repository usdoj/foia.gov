import React, { Component } from 'react';
import { Dispatcher } from 'flux';
import { Container } from 'flux/utils';

import { RequestActions } from 'actions';
import AgencyComponentSelector from 'components/agency_component_selector';
import FOIARequestForm from 'components/foia_request_form';
import settings from 'settings';
import AgencyComponentStore from 'stores/agency_component';
import Api from 'util/api';

const api = new Api(settings.api.baseURL);


// TODO fetch list of agencies and agency components from the server
const agencies = {
  gsa: {
    id: 'gsa',
    name: 'General Services Administration',
    agency: 'gsa',
    agency_name: 'General Services Administration',
  },
  oge: {
    id: 'oge',
    name: 'Office of Government Ethics',
    agency: 'oge',
    agency_name: 'Office of Government Ethics',
  },
  aphis: {
    id: 'aphis',
    name: 'Animal & Plant Health Inspection Service',
    agency: 'usda',
    agency_name: 'Department of Agriculture',
  },
  fsa: {
    id: 'fsa',
    name: 'Farm Service Agency',
    agency: 'usda',
    agency_name: 'Department of Agriculture',
  },
  ams: {
    id: 'ams',
    name: 'Agricultural Marketing Service',
    agency: 'usda',
    agency_name: 'Department of Agriculture',
  },
  oip: {
    id: 'oip',
    name: 'Office of Information Policy',
    agency: 'doj',
    agency_name: 'Department of Justice',
  },
  fbi: {
    id: 'fbi',
    name: 'Federal Bureau of Investigation',
    agency: 'doj',
    agency_name: 'Department of Justice',
  },
};


const dispatcher = new Dispatcher();
const agencyComponentStore = new AgencyComponentStore(dispatcher);

const requestActions = RequestActions({ dispatcher, api });

function agencyChange(agency) {
  requestActions.agencyChange(agency.id)
    .then(requestActions.receiveAgency);
}


class FOIARequestFormApp extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agency, selectedAgency } = agencyComponentStore.getState();
    return {
      agencies,
      agency,
      selectedAgency,
    };
  }

  render() {
    return (
      <div>
        <AgencyComponentSelector
          agencies={this.state.agencies}
          selectedAgency={this.state.agency}
          onAgencyChange={agencyChange}
        />
        { this.state.agency && <FOIARequestForm agency={this.state.agency} /> }
      </div>
    );
  }
}

export default Container.create(FOIARequestFormApp);
