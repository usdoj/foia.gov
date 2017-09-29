import React, { Component } from 'react';
import { Dispatcher } from 'flux';
import { Container } from 'flux/utils';

import { RequestActions } from 'actions';
import AgencyComponentSelector from 'components/agency_component_selector';
import settings from 'settings';
import AgencyComponentStore from 'stores/agency_component';
import Api from 'util/api';

const api = new Api(settings.api.baseURL);
const jsonapi = new Api(settings.api.jsonApiBaseURL);


// TODO fetch list of agencies and agency components from the server
const stubAgencies = {
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

const requestActions = RequestActions({ dispatcher, api, jsonapi });

function init() {
  // Pre-fetch the list of agencies and components for typeahead
  requestActions.fetchAgencyFinderData()
    .then(requestActions.receiveAgencyFinderData);
}

function agencyChange(agency) {
  const { history } = window.app;
  requestActions.agencyChange(agency.id)
    .then(() => {
      history.push(`/agency-component/${agency.id}/`);
    });
}

class FOIARequestFormApp extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agency, selectedAgency } = agencyComponentStore.getState();
    return {
      agencies: stubAgencies,
      agency,
      selectedAgency,
    };
  }

  componentDidMount() {
    init();
  }

  render() {
    const { agencies } = this.state;

    return (
      <div>
        <AgencyComponentSelector
          agencies={agencies}
          onAgencyChange={agencyChange}
        />
      </div>
    );
  }
}

export default Container.create(FOIARequestFormApp);
